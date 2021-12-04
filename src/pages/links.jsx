import React from "react";
import { Tabs, Tab } from "react-bootstrap";
// import LinksHeader from "../component/LinksHeader";
import Link from "./links/Link";
import Social from "./links/Social";
import Location from "./links/Location";
import Images from "./links/Images";
import Banks from "./links/Banks";
import LinkIcon from "@mui/icons-material/Link";
import SocialDistanceOutlinedIcon from "@mui/icons-material/SocialDistanceOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

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
        <Tab eventKey="link" title="Links">
          <Link />
        </Tab>
        <Tab eventKey="social" title="Social">
          <Social />
        </Tab>
        <Tab eventKey="location" title="Location">
          <Location />
        </Tab>
        <Tab eventKey="images" title="Images">
          <Images />
        </Tab>
        <Tab eventKey="banks" title="Banks">
          <Banks />
        </Tab>
      </Tabs>
    </div>
  );
};
export default Links;
