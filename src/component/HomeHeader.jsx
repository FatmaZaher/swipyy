import React, { useState } from "react";
import personal from "../assets/images/personal.png";
import group from "../assets/images/Group.png";
import langSwitch from "../assets/images/lang-switch.png";
import LinksIcon from "./icons/LinkIcon";
import LogoutIcon from "./icons/LogoutIcon";
import { useSelector } from "react-redux";
import LanguageSelector from "./LanguageSelector ";

const HomeHeader = () => {
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
    await navigator.clipboard.writeText("swipyy.me/" + currentUser.username);
    showLinkList();
  };
  const copyShortName = async () => {
    await navigator.clipboard.writeText("swipyy.me/" + currentUser.short_name);
    showLinkList();
  };

  return (
    <>
      <div className="home-header">
        <div className="my-link">
          <p className="link-text">
            <span>
              swipyy.me/<a href="#">{currentUser.username}</a>
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
                Copy Full Link
              </button>

              <button
                type="button"
                className="link-icon form-button"
                onClick={copyShortName}
              >
                <LinksIcon />
                Copy Short Link
              </button>
            </div>
          </p>
        </div>
        <div className="personal-pho" onClick={showPersonalList}>
          <img src={personal} alt="" />
          {/* <div
            className={personalList ? "link-icon-list" : "link-icon-list show"}
          >
            <p className="link-icon personal-info">
              FahadMuhayya
              <br />
              <span>fahadmuhayya@gmail.com</span>
            </p>

            <button type="button" className="link-icon form-button">
              <LogoutIcon />
              Log Out
            </button>
          </div> */}
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
