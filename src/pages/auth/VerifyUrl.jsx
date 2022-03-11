import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "../../assets/scss/index.scss";
import logo from "../../assets/images/logo.svg";
import shap1 from "../../assets/images/shap1.svg";
import shap2 from "../../assets/images/shap2.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import { Link, Redirect } from "react-router-dom";
import { verifyUrl } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../actions/auth";

import ReactCodeInput from "react-verification-code-input";
import LanguageSelector from "../../component/LanguageSelector ";
var qs = require("qs");

const VerifyUrl = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const history = useHistory();
  const [loadingg, setLoadingg] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [token, setToken] = useState(null);

  const VerifyUser = (token) => {
    // setLoadingg(true);
    localStorage.removeItem("headers");
    localStorage.removeItem("user_token");
    dispatch(verifyUrl(token))
      .then((res) => {
        if (res.status.status === "true") {
          window.location.replace("/links");
        }
      })
      .catch(() => {
        setLoadingg(false);
      });
  };
  useEffect(() => {
    const queryString = window.location.search;
    const query = decodeURIComponent(queryString).replace("?", "");
    var str = qs.parse(query);
    console.log(str);
    setToken(str.token);
    VerifyUser(str.token);
  }, []);
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
export default VerifyUrl;
