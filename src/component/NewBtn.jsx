import React from "react";
import LinkButton from "./form/LinkButton";

const ProBtn = (props) => {
  const { isStatic } = props;

  return (
    <div className={`new-btn ${isStatic ? "position-static" : null}`}>
      <LinkButton type="" buttontext="New" />
    </div>
  );
};

export default ProBtn;
