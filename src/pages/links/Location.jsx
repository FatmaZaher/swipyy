import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";

const initialValues = {
  yourLink: "",
};
const onSubmit = (values) => {
  console.log("values", values);
};
const validationSchema = Yup.object({
  yourLink: Yup.string().required("Add You Link*"),
});

const Location = () => {
  return (
    <div className="location-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="link-form">
            {/* <div className="form-control">
              <Field
                type="text"
                id="yourLink"
                name="yourLink"
                placeholder="Type or paste location address"
                className="link-input"
              />
              <div className="error-mes">
                <ErrorMessage name="yourLink" />
              </div>
            </div>
            <button type="submit" className="link-button">
              <AddOutlinedIcon />
              Add Location
            </button> */}
            <FormikControl
              control="input"
              type="text"
              name="yourLink"
              placeholder="Type or paste location address"
              error="true"
            />
            <LinkButton type="submit" buttontext="Add Location" icon="yes" />
          </Form>
        )}
      </Formik>
      <div className="your-links pt-4">
        <p className="your-links-header mb-5">Locations</p>
        <div className="single-link mb-3">
          <div className="single-link-info">
            <p className="name-from-link">Jeddah Saudi Arabia</p>
          </div>
          <div className="link-action">
            <span className="edit-icon">
              <EditIcon />
            </span>
            <span className="trash-icon">
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        </div>
        <div className="single-link mb-3">
          <div className="single-link-info">
            <p className="name-from-link">Jeddah Saudi Arabia</p>
          </div>
          <div className="link-action">
            <span className="edit-icon">
              <EditIcon />
            </span>
            <span className="trash-icon">
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        </div>
        <div className="single-link mb-3">
          <div className="single-link-info">
            <p className="name-from-link">Jeddah Saudi Arabia</p>
          </div>
          <div className="link-action">
            <span className="edit-icon">
              <EditIcon />
            </span>
            <span className="trash-icon">
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Location;
