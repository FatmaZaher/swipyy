import React, { Children } from "react";
import { Field, ErrorMessage } from "formik";
const Radio = ({props, children}) => {
  const { name, error, options, ...rest } = props;
  return (
    <div className="form-control">
      <Field id={name} name={name} {...rest} className="link-input">
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value}
                />
                <label htmlFor={option.value}>{option.value}</label>
                {children}
              </React.Fragment>
            );
          });
        }}
      </Field>
      {error && (
        <div className="error-mes">
          <ErrorMessage name={name} />
        </div>
      )}
    </div>
  );
};
export default Radio;
