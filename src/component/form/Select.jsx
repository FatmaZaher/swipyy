import { ErrorMessage, Field } from "formik";
import React from "react";

const Select = (props) => {
  const { label, name, options, error, ...rest } = props;
  return (
    <div className="form-control">
      {label && <label htmlFor={name}>{label}</label>} 
      <Field as="select" id={name} name={name} {...rest} className="link-input">
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      {error && <div className="error-mes">
        <ErrorMessage name={name}/>
      </div>}
    </div>
  );
};
export default Select;
