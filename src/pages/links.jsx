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
      <Tabs
        defaultActiveKey="link"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab
          eventKey="link"
          title={
            <span>
              <LinkIcon /> Links
            </span>
          }
        >
          <Link onSaveData={() => handleEditData()} />
        </Tab>
        <Tab
          eventKey="social"
          title={
            <span>
              <SocialIcon /> Social
            </span>
          }
        >
          <Social onSaveData={() => handleEditData()} />
        </Tab>
        <Tab
          eventKey="location"
          title={
            <span>
              <LocationIcon /> Location
            </span>
          }
        >
          <Location onSaveData={() => handleEditData()} />
        </Tab>
        <Tab
          eventKey="images"
          title={
            <span>
              <ImagesIcon /> Images
            </span>
          }
        >
          <Images onSaveData={() => handleEditData()} />
        </Tab>
        <Tab
          eventKey="pdf"
          title={
            <span>
              <AttachFileIcon /> PDF
            </span>
          }
        >
          <Pdf onSaveData={() => handleEditData()} />
        </Tab>
        <Tab
          eventKey="banks"
          title={
            <span>
              <BankIcon /> Banks
            </span>
          }
        >
          <Banks onSaveData={() => handleEditData()} />
        </Tab>
      </Tabs>
    </div>
  );
};
export default Links;
