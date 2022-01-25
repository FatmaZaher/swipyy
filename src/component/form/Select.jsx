import { ErrorMessage, Field } from "formik";
import React from "react";

const Select = (props) => {
  const { label, name, value, options, error, ...rest } = props;
  return (
    <div className="form-control">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        as="select"
        id={name}
        value={value}
        name={name}
        {...rest}
        className="form-input"
      >
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Field>
      {error && (
        <div className="error-mes">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};
export default Select;
