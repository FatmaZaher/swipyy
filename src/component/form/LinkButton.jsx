import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const LinkButton = (props) => {
    const { type, buttontext, ...rest } = props;
  return (
    <button type={type} className="link-button">
      <AddOutlinedIcon />
      {buttontext}
    </button>
  );
};
export default LinkButton;
