import React, { useState, useEffect } from "react";
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
import ArtificialIcon from "./icons/ArtificialIcon";



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
      title: t("sidebar.smart-products"),
      icon: <ArtificialIcon />,
      link: "out",
      fullLink: "https://swipyy.store/",
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
  const [width, setWidth] = useState(window.innerWidth);

  const config = JSON.parse(localStorage.getItem("headers"));

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  const Logout = () => {
    localStorage.removeItem("headers");
    localStorage.removeItem("user_token");
    window.location.replace("/login");
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return (
    <>
      <div className="icon-mobile">
        <button type="button" className="form-button" onClick={showSidebar}>
          <MenuIcon />
        </button>
      </div>
      <div
        className={
          isMobile ? (sidebar ? "overlay show" : "overlay") : "overlay"
        }
        onClick={showSidebar}
      ></div>
      <div
        className={
          isMobile ? (sidebar ? "sidebar show" : "sidebar") : "sidebar"
        }
      >
        <div className="logo">
          <Link to="/links">
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
                {val.link === "out" ? (
                  <a href={val.fullLink} target="_blank" onClick={() => showSidebar()}>
                    <div className="icon">{val.icon}</div>
                    <div className="title">{val.title}</div>
                  </a>
                ) : (
                  <NavLink to={val.link} onClick={() => showSidebar()}>
                    <div className="icon">{val.icon}</div>
                    <div className="title">{val.title}</div>
                  </NavLink>
                )}
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
