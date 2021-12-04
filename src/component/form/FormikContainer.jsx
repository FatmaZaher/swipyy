import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "./FormikControl";

const initialValues = {
  email: "",
};
const onSubmit = (values) => {};
const validationSchema = Yup.object({
  email: Yup.string().required("Add You Link*"),
});

const Button = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="link-form">
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <button type="submit" className="link-button">
            Add Bank Account
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Button;
