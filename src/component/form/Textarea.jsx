import React from "react";
import { Field, ErrorMessage } from "formik";

const Textarea = (props) => {
  const { label, name, error, note, ...rest } = props;
  return (
    <div className="form-control">
      {label && <label htmlFor={name}>{label}</label>}
      <Field as="textarea" id={name} name={name} {...rest} className="form-input text-area"/>
      {error ? (
        <div className="error-mes">
          <ErrorMessage name={name} />
        </div>
      ) : (
        <div className="error-mes">
          {note}
        </div>
      )}
    </div>
  );
};
export default Textarea;
