import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import SocialDistanceOutlinedIcon from "@mui/icons-material/SocialDistanceOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const LinksHeader = () => {
  const LinksHeaderData = [
    {
      title: "Links",
      icon: <LinkIcon />,
      link: "/link",
    },
    {
      title: "Social",
      icon: <SocialDistanceOutlinedIcon />,
      link: "/social",
    },
    {
      title: "Location",
      icon: <LocationOnOutlinedIcon />,
      link: "/location",
    },
    {
      title: "Images",
      icon: <ImageOutlinedIcon />,
      link: "/images",
    },
    {
      title: "PDF",
      icon: <ImageOutlinedIcon />,
      link: "/pdf",
    },
    {
      title: "Banks",
      icon: <AccountBalanceIcon />,
      link: "/banks",
    },
  ];
  return (
    <div className="links-header my-3">
      <ul className="LinksHeaderList">
        {LinksHeaderData.map((val, key) => {
          return (
            <li key={key} className="list-item">
              <Link to={val.link}>
                <div className="icon">{val.icon}</div>
                <div className="title">{val.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default LinksHeader;
