import React, { useState } from "react";
import mobileCover from "../assets/images/mobile-cover.png";
import personal from "../assets/images/personal.png";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import FormikControl from "../component/form/FormikControl";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelIcon from "@mui/icons-material/Cancel";

import * as Yup from "yup";

const initialValues = {
  email: "",
};
const onSubmit = (values) => {};
const validationSchema = Yup.object({
  email: Yup.string().required("Add You Link*"),
});

const MobileSide = () => {
  const [mobileSide, setMobileSide] = useState(false);
  const showMobileSide = () => setMobileSide(!mobileSide);
  return (
    <>
      <div className="icon-view">
        <button type="button" className="link-button" onClick={showMobileSide}>
          <RemoveRedEyeIcon />
        </button>
      </div>
      <div
        className={mobileSide ? "overlay show" : "overlay"}
        onClick={showMobileSide}
      ></div>
      <div className={mobileSide ? "mobile-side show" : "mobile-side"}>
        <div className="close-icon">
          <button type="button" className="link-button" onClick={showMobileSide}>
            <CancelIcon />
          </button>
        </div>
        <img src={mobileCover} alt="" />
        <div className="mobile-side-content">
          <div className="personl-img mb-3">
            <img src={personal} alt="" />
          </div>
          <div className="username mb-3">FahadMuhayya</div>
          <div className="description mb-3">
            FahadMuhayya FahadMuhayya FahadMuhayya
          </div>
          <div className="links">
            <p className="mb-3">
              <a href="#">sewarsa.com</a>
              <ShareIcon />
            </p>
            <p className="mb-3">
              <a href="#">sewarsa.com</a>
              <ShareIcon />
            </p>
          </div>
          <div className="social-links">
            <a href="#">
              <WhatsAppIcon />
            </a>
            <a href="#">
              <FacebookIcon />
            </a>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form className="mobiel-form">
                <FormikControl
                  control="input"
                  type="text"
                  name="name"
                  placeholder="your name"
                />
                <FormikControl
                  control="input"
                  type="email"
                  name="email"
                  placeholder="your email"
                />
                <button type="submit" className="mobile-button">
                  Send Message
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <Link to="/view" className="link upgrad-btn">
          <RemoveRedEyeIcon />
          View Live
        </Link>
      </div>
    </>
  );
};
export default MobileSide;
