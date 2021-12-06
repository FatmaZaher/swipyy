import React from "react";
import "../../assets/scss/index.scss";
import logo from "../../assets/images/logo.svg";
import shap1 from "../../assets/images/shap1.svg";
import shap2 from "../../assets/images/shap2.svg";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import LinkButton from "../../component/form/LinkButton";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  repatePassword: "",
  remeberCheckbox: "",
};
const onSubmit = (values) => {
  console.log("values", values);
};
const validationSchema = Yup.object({
  email: Yup.string().required("Enter Your Email*"),
  password: Yup.string().required("Enter Your Email*"),
  repeatPassword: Yup.string().required("Repeat Your Password*"),
});
const remeberCheckbox = [
  {
    key: "check1",
    value: "I agree to the Terms of Service and Privacy Policy",
  },
];

const signUp = () => {
  return (
    <div className="login-content">
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
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    label="Email address or user name**"
                    placeholder="Enter email address or user name"
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
                    name="repeatPassword"
                    label="Repeat password*"
                    placeholder="Repeat password"
                    error="true"
                  />
                  <div className="remmeber-forget">
                    <FormikControl
                      control="checkbox"
                      name="remember"
                      label="Remember me"
                      options={remeberCheckbox}
                    />
                  </div>
                  <div className="login-btn">
                    <LinkButton type="submit" buttontext="Sign up" />
                  </div>
                </Form>
              )}
            </Formik>
            <div className="other-login">
              <p>or</p>
              <Link to="/" className="link other-link">
                <div className="img-link">
                  <img src={google} alt="" />
                </div>
                <span> Sign in with Google</span>
              </Link>
              <Link to="/" className="link other-link">
                <div className="img-link">
                  <img src={facebook} alt="" />
                </div>
                <span>Sign in with Facebook</span>
              </Link>
            </div>
            <div className="not-member">
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
export default signUp;
