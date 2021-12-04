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
  newPassword: "",
  repaetPassword: "",
};
const onSubmit = (values) => {
  console.log("values", values);
};
const validationSchema = Yup.object({
  newPassword: Yup.string().required("Enter Your Email*"),
  repaetPassword: Yup.string().required("Enter Your Password*"),
});

const changePassword = () => {
  return (
    <div className="login-content">
      <div className="left-side">
        <img src={logo} alt="" className="logo" />
        <img src={shap1} alt="" className="shap1" />
        <img src={shap2} alt="" className="shap2" />
      </div>
      <div className="right-side">
        <div>
          <h2 className="login-head">Change Password</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className="login-form">
                <FormikControl
                  control="input"
                  type="password"
                  name="newPassword"
                  label="New password*"
                  placeholder="type the new password here.."
                  error="true"
                />
                <FormikControl
                  control="input"
                  type="password"
                  name="repaetPassword"
                  label="Repaet password*"
                  placeholder="type the new password here.."
                  error="true"
                />
                <div className="login-btn">
                  <LinkButton type="submit" buttontext="Update Password" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default changePassword;
