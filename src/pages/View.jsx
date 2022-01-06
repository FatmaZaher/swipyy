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
import LinkButton from "../component/form/LinkButton";
import Editticons from "../component/icons/Editticons";

import * as Yup from "yup";
import MobileViewContent from "../component/MobileViewContent";

const initialValues = {
  email: "",
};
const onSubmit = (values) => {};
const validationSchema = Yup.object({
  email: Yup.string().required("Add You Link*"),
});

const View = () => {
  return (
    <div className="viewPage">
      <div className="back-view"></div>
      <MobileViewContent />
      <div className="logo-view">
        <img src={logo} alt="logo" />
        <Link to="/payments"><Editticons /></Link>
      </div>
    </div>
  );
};
export default View;
