import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LinkButton from "./form/LinkButton";

const ProBtn = (props) => {
  const { isStatic } = props;
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  if (currentUser.is_pro) {
    return (
      <div className={`pro-btn ${isStatic ? "position-static" : null}`}>
        <LinkButton type="" buttontext="PRO" />
      </div>
    );
  } else {
    return (
      <div className={`pro-btn ${isStatic ? "position-static" : null}`}>
        <Link to="/payments">
          <LinkButton type="" buttontext="PRO" />
        </Link>
      </div>
    );
  }
};

export default ProBtn;
