import React, { useState, useRef } from "react";
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

const SignUp = () => {
  const history = useHistory();
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    // name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("invalid email format*")
      .required("Enter Your Email*"),
    password: Yup.string().required("Enter Your password*"),
    password_confirmation: Yup.string().required("Enter Your password*"),
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
        <div>
          <div className="logo-mobile">
            <img src={logo} alt="" className="logo" />
          </div>
          <div className="login-section">
            <h2 className="login-head">Sign up</h2>
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
                    label="Email address**"
                    placeholder="Enter email address"
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    label="Create password*"
                    placeholder="Password"
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password*"
                    placeholder="Confirm Password"
                    error="true"
                  />

                  <div className="remmeber-forget">
                    <FormikControl
                      control="checkbox"
                      label="I agree to the Terms of Service and Privacy Policy"
                      name="checkboxOption"
                      options={checkboxOptions}
                    />
                  </div>
                  <div className="login-btn my-3">
                    <button type="submit" disabled={!formik.isValid}>
                      Sign up
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
              <p>or</p>
              <Link to="/" className="link other-link mb-3">
                <div className="img-link">
                  <img src={google} alt="" />
                </div>
                <span> Sign in with Google</span>
              </Link>
              <Link to="/" className="link other-link mb-3">
                <div className="img-link">
                  <img src={facebook} alt="" />
                </div>
                <span>Sign in with Facebook</span>
              </Link>
            </div>
            <div className="not-member text-center my-3">
              <p>
                Not a member?{" "}
                <Link to="/login" className="link sign-login">
                  Sign in
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
