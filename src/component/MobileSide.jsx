import React, { useState, useEffect } from "react";
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
import mobileLoader from "../assets/images/mobile-loader.svg";

import logo from "../assets/images/logo.svg";
import Editticons from "../component/icons/Editticons";
import * as Yup from "yup";
import MobileViewContent from "./MobileViewContent";
import { useSelector } from "react-redux";

const initialValues = {
  email: "",
};
const onSubmit = (values) => {};
const validationSchema = Yup.object({
  email: Yup.string().required("Add You Link*"),
});

const MobileSide = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [mobileSide, setMobileSide] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
    var iframe = document.getElementById("mbile-frame");
    iframe.src = `https://test-place.site/${currentUser.username}`;
  }
  const { isRender } = props;
  const showMobileSide = () => setMobileSide(!mobileSide);
  const renderIframe = () => {
    setTimeout(() => {
      console.log("ameer");
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 5000);
  }, []);
  return (
    <>
      <div className="icon-view">
        <button type="button" className="form-button" onClick={showMobileSide}>
          <RemoveRedEyeIcon />
        </button>
      </div>
      <div
        className={mobileSide ? "overlay show" : "overlay"}
        onClick={showMobileSide}
      ></div>
      <div className={mobileSide ? "mobile-side show" : "mobile-side"}>
        <div className="close-icon">
          <button
            type="button"
            className="form-button"
            onClick={showMobileSide}
          >
            <CancelIcon />
          </button>
        </div>
        <img src={mobileCover} alt="" />
        {/* <MobileViewContent /> */}

        {isRender === true ? (
          <div className="mobile-loading-box">
            <img src={mobileLoader} alt="" />
          </div>
        ) : null}
        {isLoad ? (
          <div className="mobile-loading-box">
            <img src={mobileLoader} alt="" />
          </div>
        ) : null}
        <iframe id="mbile-frame" title="description" />
        <a
          href={`https://test-place.site/${currentUser.username}`}
          rel="noreferrer"
          className="link upgrad-btn"
          target="_blank"
        >
          <RemoveRedEyeIcon />
          View Live
        </a>
      </div>
    </>
  );
};
export default MobileSide;
