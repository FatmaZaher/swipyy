import React from "react";
import personal from "../assets/images/personal.png";
import group from "../assets/images/Group.png";
import langSwitch from "../assets/images/lang-switch.png";

const HomeHeader = () => {
  return (
    <>
      <div className="home-header">
        <div className="my-link">
          <p className="link-text">
            <span>
              heylink.me/<a href="#">FahadMuhayya</a>
            </span>
            <img src={group} alt="" className="person-photo"/>
          </p>
        </div>
        <div className="personal-pho">
          <img src={personal} alt="" />
        </div>
        <div className="lang-switch">
          <img src={langSwitch} alt="" />
        </div>
      </div>
    </>
  );
};
export default HomeHeader;
