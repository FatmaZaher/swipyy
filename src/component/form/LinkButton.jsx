import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const LinkButton = (props) => {
  const { type, buttontext, icon, ...rest } = props;
  return (
    <button type={type} className="link-button" {...rest}>
      {icon && <AddOutlinedIcon />}
      {buttontext}
    </button>
  );
};
export default LinkButton;
