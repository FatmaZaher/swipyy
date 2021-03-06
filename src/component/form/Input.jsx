import React from "react";
import { Field, ErrorMessage } from "formik";

const Input = (props) => {
  const { label, name, error, ...rest } = props;
  return (
    <div className="form-control">
      {label && <label htmlFor={name} className="label mb-3">{label}</label>}
      <Field id={name} name={name} {...rest} className="form-input" />
      {error && (
        <div className="error-mes">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};
export default Input;
