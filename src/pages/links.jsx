import React from "react";
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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Pdf from "../component/links/Pdf";

import LinkIcon from "../component/icons/LinkIcon";
import SocialIcon from "../component/icons/SocialIcon";
import LocationIcon from "../component/icons/LocationIcon";
import ImagesIcon from "../component/icons/ImagesIcon";
import BankIcon from "../component/icons/BankIcon";

const Links = () => {
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
  return (
    <div className="links-page">
      {/* <LinksHeader /> */}
      <Tabs
        defaultActiveKey="link"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="link" title={<span><LinkIcon /> Links</span>}>
          <Link />
        </Tab>
        <Tab eventKey="social" title={<span><SocialIcon /> Social</span>}>
          <Social />
        </Tab>
        <Tab eventKey="location" title={<span><LocationIcon /> Location</span>}>
          <Location />
        </Tab>
        <Tab eventKey="images" title={<span><ImagesIcon /> Images</span>}>
          <Images />
        </Tab>
        <Tab eventKey="pdf" title={<span><AttachFileIcon /> PDF</span>}>
          <Pdf />
        </Tab>
        <Tab eventKey="banks" title={<span><BankIcon /> Banks</span>}>
          <Banks />
        </Tab>
      </Tabs>
    </div>
  );
};
export default Links;
