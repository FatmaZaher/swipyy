import React, { useState } from "react";
// import SidebarData from "./SidebarData";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import vectary from "../assets/images/vectary.png";
import shap1 from "../assets/images/shap1.png";
import shap2 from "../assets/images/shap2.png";

import SettingsIcon from "@mui/icons-material/Settings";
import LinksIcon from "./icons/LinksIcon";
import AppearanceIcon from "./icons/AppearanceIcon";
import MessageIcon from "./icons/MessageIcon";
import AnalyticIcon from "./icons/AnalyticIcon";
import PaymentIcon from "./icons/PaymentIcon";

import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import axios from "axios";
const Sidebar = (props) => {
  const { t } = props;
  const SidebarData = [
    {
      title: t("sidebar.home"),
      icon: <LinksIcon />,
      link: "/links",
    },
    {
      title: t("sidebar.appearance"),
      icon: <AppearanceIcon />,
      link: "/appearance",
    },
    {
      title: t("sidebar.messages"),
      icon: <MessageIcon />,
      link: "/messages",
    },
    {
      title: t("sidebar.analytic"),
      icon: <AnalyticIcon />,
      link: "/analytic",
    },
    {
      title: t("sidebar.payments"),
      icon: <PaymentIcon />,
      link: "/payments",
    },
    ,
    {
      title: t("sidebar.settings"),
      icon: <SettingsIcon />,
      link: "/settings",
    },
  ];
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const config = JSON.parse(localStorage.getItem("headers"));

  const Logout = () => {
    try {
      axios
        .post("https://test-place.site/api/logout", {}, config)
        .then((res) => {

          localStorage.removeItem('headers')
          localStorage.removeItem('user_token')
          window.location.replace("/login");


        });
    } catch (error) {}
  };
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
          <li className="list-item">
            <a onClick={() => Logout()}>
              <div className="icon">
                <PaymentIcon />
              </div>
              <div className="title">{t("sidebar.logout")}</div>
            </a>
          </li>
        </ul>
        {currentUser.is_pro === false ? (
          <div className="upgrad">
            <img src={vectary} alt="logo" />
            <div className="box">
              <p className="text">Updrade to pro for More features</p>
              <Link to="/payments" className="link upgrad-btn">
                Upgrade
              </Link>
            </div>
          </div>
        ) : null}

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
