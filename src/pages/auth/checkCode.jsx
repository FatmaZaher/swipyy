import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactPinField from "react-pin-field";

import "../../assets/scss/index.scss";
import logo from "../../assets/images/logo.svg";
import shap1 from "../../assets/images/shap1.svg";
import shap2 from "../../assets/images/shap2.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../actions/auth";

import ReactCodeInput from "react-verification-code-input";
import LanguageSelector from "../../component/LanguageSelector ";
import axios from "axios";

const Verify = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const [loadingg, setLoadingg] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [newMessage, setNewMessage] = useState(null);
  const [otp, setOtp] = useState(null);

  const [loading, setLoading] = useState(false);

  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])
  const handleOtp = (otp) => {
    setOtp(otp);
    if (otp.length === 4) {
      onComplete(otp);
    }
  };

  const onSubmit = async (code) => {
    setLoadingg(true);

    const reset_value = localStorage.getItem("reset-value");
    const reset_type = localStorage.getItem("reset-type");
    let full_detail = {};
    if (reset_type === "email") {
      full_detail = {
        email: reset_value,
        code,
      };
    } else if (reset_type === "phone") {
      full_detail = {
        phone: reset_value,
        code,
      };
    }
    try {
      await axios
        .post("https://swipyy.com/api/auth/check/code", full_detail)
        .then((res) => {
          if (res.data.status.code === "200") {
            localStorage.setItem("code-reset", code);

            history.push("/reset");
          }
          setLoadingg(false);
        });
    } catch (error) {
      setLoadingg(false);
    }
  };
  const onComplete = (code) => {
    onSubmit(code);
  };
  if (isLoggedIn) {
    return history.push("/links");
  }

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
            <h2 className="login-head">{t("verify.title")}</h2>
            <p>{t("verify.note")}</p>

            <form className="login-form">
              <div className="code-input">
                <div className="code-inputs">
                  <ReactPinField
                    length={4}
                    onChange={(e) => handleOtp(e)}
                    type="tel"
                    inputMode="number"
                    maxLength={1}
                    style={{
                      width: 52,
                      height: 52,
                    }}
                  />
                  {/* <ErrorMessage />  */}
                </div>
              </div>
              <div className="login-btn my-3">
                <button type="button" onClick={() => onSubmit(otp)}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  {t("verify.btn")}
                </button>
              </div>
            </form>

            <div className="not-member text-center my-3">
              <p>
                {t("verify.is_remember")}
                <Link to="/login" className="link sign-login">
                  {t("verify.sign_in")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Verify;
