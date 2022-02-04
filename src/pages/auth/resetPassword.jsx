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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

const initialValues = {
  password: "",
  password_confirmation: "",
};

const validationSchema = Yup.object({
  password: Yup.string().required("Enter Your Email*"),
  password_confirmation: Yup.string().required("Enter Your Password*"),
});

const ChangePassword = (props) => {
  const { t } = props;

  function sucesesChange() {
    Swal.fire("Good job", "edit success");
  }
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const email = localStorage.getItem("email-reset");
      const code = localStorage.getItem("code-reset");

      await axios
        .post("https://swipyy.com/api/auth/reset/password", {
          email,
          code,
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
        .then((res) => {
          if (res.data.status.code === "200") {
            localStorage.removeItem("code-reset");
            localStorage.removeItem("email-reset");
            sucesesChange();

            setTimeout(() => {
              window.location.replace("/login");
            }, 3000);
          }
          // localStorage.setItem("email-reset", values.email);
        });
    } catch (error) {}
  };
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
                    name="password"
                    label="New password*"
                    placeholder="type the new password here.."
                    error="true"
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    name="password_confirmation"
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
    </div>
  );
};
export default ChangePassword;
