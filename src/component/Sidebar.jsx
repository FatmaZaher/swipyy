import React from "react";
// import SidebarData from "./SidebarData";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import vectary from "../assets/images/vectary.png";
import shap1 from "../assets/images/shap1.png";
import shap2 from "../assets/images/shap2.png";
import LinkIcon from "@mui/icons-material/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

const Sidebar = () => {
  const SidebarData = [
    {
      title: "Links",
      icon: <LinkIcon />,
      link: "/",
    },
    {
      title: "Appearance",
      icon: <VisibilityIcon />,
      link: "/appearance",
    },
    {
      title: "Messages",
      icon: <MailOutlineIcon />,
      link: "/messages",
    },
    {
      title: "Analytic",
      icon: <PollOutlinedIcon />,
      link: "/",
    },
    {
      title: "Payments & Subscription",
      icon: <PaymentOutlinedIcon />,
      link: "/",
    },
  ];
  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="list-item">
              <Link to={val.link}>
                <div className="icon">{val.icon}</div>
                <div className="title">{val.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="upgrad">
        <img src={vectary} alt="logo" />
        <div className="box">
          <p className="text">Updrade to pro for More features</p>
          <Link to="/" className="link upgrad-btn">
            Upgrade
          </Link>
        </div>
      </div>
      <div className="shap1">
        <img src={shap1} alt="logo" />
      </div>
      <div className="shap2">
        <img src={shap2} alt="logo" />
      </div>
    </div>
  );
};
export default Sidebar;
