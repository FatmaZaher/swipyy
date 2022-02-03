import React, { useState, useRef } from "react";
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

const Verify = () => {
  const history = useHistory();
  const [loadingg, setLoadingg] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [newMessage, setNewMessage] = useState(null);

  const dispatch = useDispatch();

  const length = 4;
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const [loading, setLoading] = useState(false);

  const newCode = code.reduce((t, s) => {
    return t + s;
  });
  const inputs = useRef([]);
  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])

  const initialValues = {
    code: newCode,
  };

  const validationSchema = Yup.object({});
  const onSubmit = (code) => {
    console.log(code);
    // setLoadingg(true);
    dispatch(verify(code || newCode))
      .then((res) => {
        if (res.status.status === "true") {
          window.location.replace("/links");
        }
      })
      .catch(() => {
        setLoadingg(false);
      });
  };
  const onComplete = (code) => {
    onSubmit(code);
    setLoading(true);
    setTimeout(() => setLoading(false), 10000);
  };
  if (isLoggedIn) {
    return history.push("/links");
  }

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every((num) => num !== "")) {
      if (newCode.length === 4) {
        console.log(newCode);
        onComplete(newCode.join(""));
      }
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
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
            <h2 className="login-head">Identity Verification</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form className="login-form">
                  <div className="code-input">
                    <div className="code-inputs">
                      {code.map((num, idx) => {
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
                      })}
                      {/* <ErrorMessage />  */}
                    </div>
                  </div>
                  <div className="login-btn my-3">
                    <button type="submit">
                      {" "}
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      Verify
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
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
export default Verify;
