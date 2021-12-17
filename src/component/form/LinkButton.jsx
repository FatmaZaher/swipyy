import React, { Children } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DownloadIcon from "@mui/icons-material/Download";


const LinkButton = (props) => {
  const { type, buttontext, icon, exportIcon, ...rest } = props;
  return (
    <button type={type} className="form-button" {...rest}>
      {icon && <AddOutlinedIcon />}
      {exportIcon && <DownloadIcon/>}
      {buttontext}
    </button>
  );
};
export default LinkButton;
