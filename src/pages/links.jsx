import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Tabs, Tab } from "react-bootstrap";
import Link from "../component/links/Link";
import Social from "../component/links/Social";
import Location from "../component/links/Location";
import Images from "../component/links/Images";
import Banks from "../component/links/Banks";
import Menu from "../component/links/Menu";

// import LinkIcon from "@mui/cons-material/Link";
import SocialDistanceOutlinedIcon from "@mui/icons-material/SocialDistanceOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Pdf from "../component/links/Pdf";
import LinkIcon from "../component/icons/LinkIcon";
import SocialIcon from "../component/icons/SocialIcon";
import LocationIcon from "../component/icons/LocationIcon";
import ImagesIcon from "../component/icons/ImagesIcon";
import BankIcon from "../component/icons/BankIcon";
import MenuIcon from "../component/icons/MenuIcon";
import axios from "axios";
import NewBtn from "../component/NewBtn";

const config = JSON.parse(localStorage.getItem("headers"));

const Links = (props) => {
  // const { user: currentUser } = useSelector((state) => state.auth);

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }
  const [nav, setNav] = useState({});

  const { t } = props;

  const handleEditData = (key, e) => {
    console.log("log from linkss");
    props.onSaveData();
  };

  const startRequest = (key, e) => {
    props.onStartRequest(true);
  };
  const finishRequest = (key, e) => {
    props.onFinishRequest(false);
  };
  const getMenu = async () => {
    try {
      await axios
        .get("https://swipyy.com/api/user/home", config)
        .then((res) => {
          setNav(res.data.data[0]);
          console.log(res);
        });
    } catch (error) {}
  };
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <div className="links-page">
      {/* <header className="jumbotron">
        <h3>
          <strong>{currentUser.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token} ... {currentUser.token}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
      {/* <LinksHeader /> */}
      {/* {t("intro.label")} */}
      <div className="links-page-nav">
        <Tabs
          defaultActiveKey="link"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="social"
            title={
              <div className="align-pro">
                <div className="link-svg">
                  <SocialIcon />
                </div>

                <div>
                  <strong>{t("links.header.social")}</strong>
                </div>
              </div>
            }
          >
            <Social
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              t={t}
            />
          </Tab>
          <Tab
            eventKey="link"
            title={
              <div className="align-pro">
                <div className="link-svg">
                  <LinkIcon />
                </div>

                <div>
                  <strong>{t("links.header.links")}</strong>
                </div>
                {nav.links == 1 ? <NewBtn /> : null}
              </div>
            }
          >
            <Link
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              t={t}
            />
          </Tab>

          <Tab
            eventKey="location"
            title={
              <div className="align-pro">
                <div className="link-svg">
                  <LocationIcon />
                </div>

                <div>
                  <strong>{t("links.header.location")}</strong>
                </div>
                {nav.locations == 1 ? <NewBtn /> : null}
              </div>
            }
          >
            <Location
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              t={t}
            />
          </Tab>
          <Tab
            eventKey="images"
            title={
              <div className="align-pro">
                <div className="link-svg">
                  <ImagesIcon />
                </div>

                <div>
                  <strong>{t("links.header.slider")}</strong>
                </div>
                {nav.images == 1 ? <NewBtn /> : null}
              </div>
            }
          >
            <Images
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              t={t}
            />
          </Tab>
          <Tab
            eventKey="menu"
            title={
              <div className="align-pro">
                <div className="link-svg">
                  <MenuIcon />
                </div>

                <div>
                  <strong>{t("links.header.menu")}</strong>
                </div>
                {nav.menues == 1 ? <NewBtn /> : null}
              </div>
            }
          >
            <Menu
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              t={t}
            />
          </Tab>
          <Tab
            eventKey="pdf"
            title={
              <div className="align-pro">
                <div className="link-svg">
                  <AttachFileIcon />
                </div>

                <div>
                  <strong>PDF</strong>
                </div>
                {nav.pdf == 1 ? <NewBtn /> : null}
              </div>
            }
          >
            <Pdf
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              t={t}
            />
          </Tab>
          <Tab
            eventKey="banks"
            title={
              <div className="align-pro">
                <div className="link-svg">
                  <BankIcon />
                </div>

                <div>
                  <strong>{t("links.header.banks")}</strong>
                </div>
                {nav.bank == 1 ? <NewBtn /> : null}
              </div>
            }
          >
            <Banks
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              t={t}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default Links;
