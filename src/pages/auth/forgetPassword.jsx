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
import { register } from "../../actions/auth";
import axios from "axios";
import LanguageSelector from "../../component/LanguageSelector ";
import PhoneInput from "react-phone-input-2";
import { Tab, Tabs } from "react-bootstrap";
const SignUp = () => {
  const { t } = useTranslation();
  const [key, setKey] = useState("email");

  const history = useHistory();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    // name: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t("reset.email_valid")),

    // name: Yup.string().required("Enter Your Name*"),
  });
  const onSubmit = async (values) => {
    console.log(values);
    setSuccessful(false);
    let newValues = values;
    if (key === "email") {
      newValues = { email: values.email };
    } else if (key === "phone") {
      newValues = { phone: '+' + values.phone };
    }
    try {
      await axios
        .post("https://swipyy.com/api/auth/forget", newValues)
        .then((res) => {
          setSuccessful(true);
          if (key === "email") {
            localStorage.setItem("reset-value", newValues.email);
          } else if (key === "phone") {
            localStorage.setItem("reset-value",  newValues.phone);
          }
          localStorage.setItem("reset-type", key);

          setMessage(res.data.status.message);
          history.push("/check");
        });
    } catch (error) {}
  };
  const handlePhone = (value, func) => {
    func("phone", value);
  };
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
            <h2 className="login-head">{t("reset.title")}</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="login-form">
                  <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="email" title={t("register.email")}>
                      <div className="row pt-3">
                        <div className="col-md-12">
                          <FormikControl
                            control="input"
                            type="email"
                            name="email"
                            label={t("reset.email_label")}
                            placeholder={t("reset.email_placeholder")}
                            error="true"
                          />
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="phone" title={t("register.phone")}>
                      <div className="row pt-3">
                        <div className="col-md-12">
                          <div className="form-control mb-3">
                            <label htmlFor="" className="mb-2">
                              {t("register.phone_label")}
                            </label>
                            <PhoneInput
                              country={"us"}
                              value={formik.values.phone}
                              onChange={(e) =>
                                handlePhone(e, formik.setFieldValue)
                              }
                              enableSearch={true}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>

                  <div className="login-btn my-3">
                    <button type="submit" disabled={!formik.isValid}>
                      {t("reset.btn")}
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

            <div className="not-member text-center my-3">
              <p>
                {t("reset.is_remember")}
                <Link to="/login" className="link sign-login">
                  {t("reset.sign_in")}
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
