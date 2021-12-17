import React, { useState } from "react";
// import SidebarData from "./SidebarData";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import vectary from "../assets/images/vectary.png";
import shap1 from "../assets/images/shap1.png";
import shap2 from "../assets/images/shap2.png";

import SettingsIcon from '@mui/icons-material/Settings';
import LinksIcon from "./icons/LinksIcon";
import AppearanceIcon from "./icons/AppearanceIcon";
import MessageIcon from "./icons/MessageIcon";
import AnalyticIcon from "./icons/AnalyticIcon";
import PaymentIcon from "./icons/PaymentIcon";

import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";

const Sidebar = () => {
  const SidebarData = [
    {
      title: "Home",
      icon: <LinksIcon />,
      link: "/links",
    },
    {
      title: "Appearance",
      icon: <AppearanceIcon />,
      link: "/appearance",
    },
    {
      title: "Messages",
      icon: <MessageIcon />,
      link: "/messages",
    },
    {
      title: "Analytic",
      icon: <AnalyticIcon />,
      link: "/analytic",
    },
    {
      title: "Payments & Subscription",
      icon: <PaymentIcon />,
      link: "/payments",
    },
    ,
    {
      title: "Settings",
      icon: <SettingsIcon />,
      link: "/settings",
    },
  ];
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="icon-mobile">
        <button type="button" className="form-button" onClick={showSidebar}>
          <MenuIcon />
        </button>
      </div>
      <div
        className={sidebar ? "overlay show" : "overlay"}
        onClick={showSidebar}
      ></div>
      <div className={sidebar ? "sidebar show" : "sidebar"}>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="close-icon">
            <button type="button" className="form-button" onClick={showSidebar}>
              <CancelIcon />
            </button>
          </div>
        </div>
        <ul className="sidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li key={key} className="list-item">
                <NavLink to={val.link}>
                  <div className="icon">{val.icon}</div>
                  <div className="title">{val.title}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="upgrad">
          <img src={vectary} alt="logo" />
          <div className="box">
            <p className="text">Updrade to pro for More features</p>
            <Link to="/payments" className="link upgrad-btn">
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
    </>
  );
};
export default Sidebar;
