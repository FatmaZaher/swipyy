import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import "../../assets/scss/index.scss";
import logo from "../../assets/images/logo.svg";
import shap1 from "../../assets/images/shap1.svg";
import shap2 from "../../assets/images/shap2.svg";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { loginSocial } from "../../actions/auth";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { GoogleLogin } from "react-google-login";
import LanguageSelector from "../../component/LanguageSelector ";

// import { GoogleLogin, GoogleLogout } from "react-google-login";
// const clientId =
//   "658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com";
const Login = (props) => {
  const { t } = useTranslation();

  // const [showloginButton, setShowloginButton] = useState(true);
  // const [showlogoutButton, setShowlogoutButton] = useState(false);
  // const onLoginSuccess = (res) => {
  //   console.log("Login Success:", res.profileObj);
  //   setShowloginButton(false);
  //   setShowlogoutButton(true);
  // };

  // const onLoginFailure = (res) => {
  //   console.log("Login Failed:", res);
  // };

  // const onSignoutSuccess = () => {
  //   alert("You have been logged out successfully");
  //   console.clear();
  //   setShowloginButton(true);
  //   setShowlogoutButton(false);
  // };

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [newMessage, setNewMessage] = useState(null);

  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    console.log(response);

    if (Object.keys(response).length > 1) {
      setLoading(true);
      if (response.profileObj) {
        dispatch(
          loginSocial(
            response.profileObj.name,
            response.profileObj.email,
            response.profileObj.imageUrl,
            response.accessToken
          )
        ).then((res) => {
          if (res.status.code === "200") {
            window.location.replace("/links");
          } else {
            setNewMessage(res.status.message);
          }
          setLoading(false);
        });
      }else{
        setLoading(false)
      }
    }

    console.log(JSON.stringify(response));
  };
  const responseFacebook = (response) => {
    console.log(response);
    if (Object.keys(response).length > 1) {
      setLoading(true);
      dispatch(
        loginSocial(
          response.name,
          response.email,
          response.picture.data.url,
          response.accessToken
        )
      ).then((res) => {
        if (res.status.status === "true") {
          window.location.replace("/links");
        }
        setLoading(false);
      });
    }
  };
  const initialValues = {
    login_input: "",
    password: "",
  };
  const validationSchema = Yup.object({
    login_input: Yup.string()
      .required(t("login.email_required")),
    password: Yup.string().required(t("login.password_valid")),
  });
  const onSubmit = (values) => {
    console.log(values);
    setLoading(true);
    dispatch(login(values.login_input, values.password)).then((res) => {
      if (res.status.code === "200") {
        window.location.replace("/links");
      } else {
        setNewMessage(res.status.message);
        setTimeout(() => {
          if (res.status.message == "Please Active your account ") {
            setTimeout(() => {
              setNewMessage("You will be redirect to activate your account");

              setTimeout(() => {
                console.log("res.data.data.access_token");
                const token = res.data.access_token;
                console.log(token);

                if (token) {
                  localStorage.setItem("user_token", token);
                }
                history.push("/verify");
              }, 2000);
            }, 1000);
          }
        }, 1000);
      }
      setLoading(false);
    });
  };
  if (isLoggedIn) {
    return history.push("/links");
  }

  const checkboxOptions = [{ key: "check1", value: "remmberMe" }];

  return (
    <div className="login-page">
      <div className="left-login-side">
        <img src={logo} alt="" className="logo" />
        <img src={shap1} alt="" className="shap1" />
        <img src={shap2} alt="" className="shap2" />
      </div>
      <div className="right-login-side">
        <div className="right-login-side-language">
          <LanguageSelector />
        </div>
        <div>
          <div className="logo-mobile">
            <img src={logo} alt="" className="logo" />
          </div>
          <div className="login-section">
            <h2 className="login-head">{t("login.title")}</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="login-form">
                  <FormikControl
                    control="input"
                    type="text"
                    name="login_input"
                    label={t("login.email_label")}
                    placeholder={t("login.email_placeholder")}
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    label={t("login.password_label")}
                    placeholder="*************"
                    error="true"
                  />
                  <div className="remmeber-forget">
                    <FormikControl
                      control="checkbox"
                      label={t("login.remember_me")}
                      name="checkboxOption"
                      options={checkboxOptions}
                    />
                    <Link to="/forget" className="forget-password">
                      {t("login.forget_password")}
                    </Link>
                  </div>
                  <div className="login-btn my-3">
                    {/* <Link to="/">
                    </Link> */}
                    <button type="submit" disabled={!formik.isValid}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      {t("login.btn")}
                    </button>
                  </div>
                  {newMessage ? (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {newMessage}
                      </div>
                    </div>
                  ) : (
                    message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )
                  )}
                </Form>
              )}
            </Formik>
            <div className="other-login text-center">
              <p>{t("login.or")}</p>

              <GoogleLogin
                clientId="920258247825-124qt28gas3buqomvf6lksmkush8t8o3.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                autoLoad={false}

                onFailure={responseGoogle}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="link other-link mb-3"
                  >
                    <div className="img-link">
                      <img src={google} alt="" />
                    </div>
                    <span> {t("login.login_by_google")}</span>
                  </button>
                )}
              />
              <FacebookLogin
                appId="355571643079716"
                fields="name,email,picture"
                callback={responseFacebook}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="link other-link mb-3"
                  >
                    <div className="img-link">
                      <img src={facebook} alt="" />
                    </div>
                    <span>{t("login.login_by_facebook")}</span>
                  </button>
                )}
              />
            </div>
            <div className="not-member text-center my-3">
              <p>
                {t("login.not_remember")}
                <Link to="/signUp" className="link sign-login">
                  {t("login.sign_up")}
                </Link>
              </p>
            </div>
            <div>
              {/* {showloginButton ? (
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Sign In"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                />
              ) : null}

              {showlogoutButton ? (
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Sign Out"
                  onLogoutSuccess={onSignoutSuccess}
                ></GoogleLogout>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
