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

const MobileSide = () => {
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const [mobileSide, setMobileSide] = useState(false);
  const showMobileSide = () => setMobileSide(!mobileSide);
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
        <iframe
          src={`https://test-place.site/${currentUser.username}`}
          title="description"
        />
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
