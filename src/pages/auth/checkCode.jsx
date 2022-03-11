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

  const dispatch = useDispatch();

  const length = 4;
  const [loading, setLoading] = useState(false);

 
  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])
  const handleOtp = (otp) => {
    setOtp(otp);
  };

  const onSubmit = async (code) => {
    setLoadingg(true);

    const email = localStorage.getItem("email-reset");
    try {
      await axios
        .post("https://swipyy.com/api/auth/check/code", {
          email,
          code,
        })
        .then((res) => {
          if (res.data.status.code === "200") {
            localStorage.setItem("code-reset", code);

            history.push("/reset");
          }
        });
    } catch (error) {
      setLoadingg(false);
    }
  };
  const onComplete = (e) => {
    onSubmit(otp);
    setLoading(true);
    setTimeout(() => setLoading(false), 10000);
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
                  {/* {code.map((num, idx) => {
                        return (
                          <input
                            key={idx}
                            type="text"
                            className="form-control"
                            inputMode="numeric"
                            maxLength={1}
                            value={num}
                            autoFocus={!code[0].length && idx === 0}
                            readOnly={loading}
                            onChange={(e) => processInput(e, idx)}
                            onKeyUp={(e) => onKeyUp(e, idx)}
                            ref={(ref) => inputs.current.push(ref)}
                          />
                        );
                      })} */}
                  <ReactPinField
                    length={4}
                    onChange={(e) => handleOtp(e)}
                    onComplete={() => onComplete()}
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
                <button type="submit">
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
