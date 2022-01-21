import React from "react";
import { useSelector } from "react-redux";

import { Tabs, Tab } from "react-bootstrap";
import Link from "../component/links/Link";
import Social from "../component/links/Social";
import Location from "../component/links/Location";
import Images from "../component/links/Images";
import Banks from "../component/links/Banks";
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

const Links = (props) => {
  // const { user: currentUser } = useSelector((state) => state.auth);

  // if (!currentUser) {
  //   return <Redirect to="/login" />;
  // }
  const { t } = props;
  const LinksHeaderData = [
    {
      title: "Links",
      icon: <LinkIcon />,
    },
    {
      title: "Social",
      icon: <SocialDistanceOutlinedIcon />,
    },
    {
      title: "Location",
      icon: <LocationOnOutlinedIcon />,
    },
    {
      title: "Images",
      icon: <ImageOutlinedIcon />,
    },
    {
      title: "Banks",
      icon: <AccountBalanceIcon />,
    },
  ];
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
      <Tabs
        defaultActiveKey="link"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab
          eventKey="link"
          title={
            <div>
              <div className="link-svg">
                <LinkIcon />
              </div>

              <div>
                <strong>{t("links.header.links")}</strong>
              </div>
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
          eventKey="social"
          title={
            <div>
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
          eventKey="location"
          title={
            <div>
              <div className="link-svg">
                <LocationIcon />
              </div>

              <div>
                <strong>{t("links.header.location")}</strong>
              </div>
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
            <div>
              <div className="link-svg">
                <ImagesIcon />
              </div>

              <div>
                <strong>{t("links.header.images")}</strong>
              </div>
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
          eventKey="pdf"
          title={
            <div>
              <div className="link-svg">
                <AttachFileIcon />
              </div>

              <div>
                <strong>PDF</strong>
              </div>
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
            <div>
              <div className="link-svg">
                <BankIcon />
              </div>

              <div>
                <strong>{t("links.header.banks")}</strong>
              </div>
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
  );
};
export default Links;
