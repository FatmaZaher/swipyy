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
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import LanguageSelector from "../../component/LanguageSelector ";
import { loginSocial } from "../../actions/auth";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { GoogleLogin } from "react-google-login";
const SignUp = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    console.log(response);

    if (Object.keys(response).length > 1) {
      setSuccessful(false);
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
        }
        setSuccessful(true);
      });
    }

    console.log(JSON.stringify(response));
  };
  const responseFacebook = (response) => {
    console.log(response);
    if (Object.keys(response).length > 1) {
      setSuccessful(false);
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
        setSuccessful(true);
      });
    }
  };
  const initialValues = {
    // name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("register.email_valid"))
      .required(t("register.email_required")),
    password: Yup.string().required(t("register.password_valid")),
    password_confirmation: Yup.string().required(
      t("register.password_confirm_valid")
    ),
    // name: Yup.string().required("Enter Your Name*"),
  });
  const onSubmit = (values) => {
    console.log(values);
    setSuccessful(false);

    dispatch(
      register(values.email, values.password, values.password_confirmation)
    )
      .then((res) => {
        setSuccessful(true);
        console.log("register done");
        history.push("/verify");
      })
      .then((res) => {
        if (res.status.status === "true") {
          setSuccessful(true);

          history.push("/verify");
        }
        setSuccessful(false);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  if (isLoggedIn) {
    return history.push("/links");
  }
  const checkboxOptions = [
    {
      key: "check1",
      value: "agreePolicy",
    },
  ];
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
            <h2 className="login-head">{t("register.title")}</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="login-form">
                  {/* <FormikControl
                    control="input"
                    type="text"
                    name="name"
                    label="User Name*"
                    placeholder="user name"
                    error="true"
                  /> */}
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    label={t("register.email_label")}
                    placeholder={t("register.email_placeholder")}
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    label={t("register.password_label")}
                    placeholder="*************"
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password_confirmation"
                    label={t("register.password_confirm_label")}
                    placeholder="*************"
                    error="true"
                  />

                  <div className="remmeber-forget">
                    <FormikControl
                      control="checkbox"
                      label={t("register.agree")}
                      name="checkboxOption"
                      options={checkboxOptions}
                    />
                  </div>
                  <div className="login-btn my-3">
                    <button type="submit" disabled={!formik.isValid}>
                      {t("register.btn")}
                    </button>
                  </div>
                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
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
                    <span> {t("register.signup_by_google")}</span>
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
                    <span>{t("register.signup_by_facebook")}</span>
                  </button>
                )}
              />
            </div>
            <div className="not-member text-center my-3">
              <p>
                {t("register.is_remember")}
                <Link to="/login" className="link sign-login">
                  {t("register.sign_in")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
