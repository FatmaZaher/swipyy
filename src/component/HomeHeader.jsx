import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import personal from "../assets/images/personal.jpg";
import group from "../assets/images/Group.png";
import LinksIcon from "./icons/LinkIcon";
import LogoutIcon from "./icons/LogoutIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import AppearanceIcon from "./icons/AppearanceIcon";
import PaymentIcon from "./icons/PaymentIcon";
import { useSelector } from "react-redux";
import LanguageSelector from "./LanguageSelector ";

const HomeHeader = (props) => {
  const { t } = props;

  const [linkList, setLinkList] = useState(false);
  const showLinkList = () => setLinkList(!linkList);
  const [personalList, setPersonalList] = useState(false);
  const showPersonalList = () => setPersonalList(!personalList);
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const copyUserName = async () => {
    await navigator.clipboard.writeText("swipyy.com/" + currentUser.username);
    showLinkList();
  };
  const copyShortName = async () => {
    await navigator.clipboard.writeText("swipyy.com/" + currentUser.short_name);
    showLinkList();
  };
  const config = JSON.parse(localStorage.getItem("headers"));

  const Logout = () => {
    localStorage.removeItem("headers");
    localStorage.removeItem("user_token");
    window.location.replace("/login");
  };
  return (
    <>
      <div className="home-header">
        <div className="my-link">
          <p className="link-text">
            <span>
              swipyy.com/<a href="#">{currentUser.username}</a>
            </span>
            <img
              src={group}
              alt=""
              className="link-icon-to-list"
              onClick={showLinkList}
            />
            <div
              className={linkList ? "link-icon-list" : "link-icon-list show"}
            >
              <button
                type="button"
                className="link-icon form-button"
                onClick={copyUserName}
              >
                <LinksIcon />
                {t("home-header.copy-full")}
              </button>
              <button
                type="button"
                className="link-icon form-button"
                onClick={copyShortName}
              >
                <LinksIcon />
                {t("home-header.copy-short")}
              </button>
            </div>
          </p>
        </div>
        <div className="personal-pho" onClick={showPersonalList}>
          <img src={currentUser.image || personal} alt="" />
          <div
            className={personalList ? "link-icon-list" : "link-icon-list show"}
          >
            <p className="link-icon personal-info">
              {currentUser.username}
              <br />
              {/* <span>{currentUser.email}</span> */}
            </p>
            <Link to="/appearance" className="link-icon form-button">
              <AppearanceIcon />
              <span>{t("sidebar.appearance")}</span>
            </Link>
            <Link to="/settings" className="link-icon form-button">
              <SettingsIcon />
              <span>{t("sidebar.settings")}</span>
            </Link>
            <Link to="/payments" className="link-icon form-button">
              <PaymentIcon />
              <span>{t("sidebar.payments")}</span>
            </Link>
            <a className="link-icon form-button" onClick={() => Logout()}>
              <LogoutIcon />
              <span>{t("sidebar.logout")}</span>
            </a>
          </div>
        </div>
        <div className="lang-switch">
          <div>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeHeader;
