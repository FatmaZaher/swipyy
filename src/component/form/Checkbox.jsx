import React from "react";
import { Field, ErrorMessage } from "formik";

const Checkbox = (props) => {
  const { label, name, error, options, ...rest } = props;
  return (
    <div className="form-control">
      <Field id={name} name={name} {...rest} className="link-input">
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value}
                />

                <label htmlFor={option.value}>
                  {option.value}
                </label>
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
export default Checkbox;
