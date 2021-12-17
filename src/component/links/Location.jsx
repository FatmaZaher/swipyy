import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";

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
          <Form className="form-page">
            {/* <div className="form-control">
              <Field
                type="text"
                id="yourLink"
                name="yourLink"
                placeholder="Type or paste location address"
                className="form-input"
              />
              <div className="error-mes">
                <ErrorMessage name="yourLink" />
              </div>
            </div>
            <button type="submit" className="form-button">
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
        <p className="your-links-header mb-3 mb-m-5">Locations</p>
        <div className="single-item mb-3">
          <div className="single-item-info">
            <p className="name-from-link">Jeddah Saudi Arabia</p>
          </div>
          <div className="link-action">
            <Editicon />
            <Deleteicon />
          </div>
        </div>
        <div className="single-item mb-3">
          <div className="single-item-info">
            <p className="name-from-link">Jeddah Saudi Arabia</p>
          </div>
          <div className="link-action">
            <Editicon />
            <Deleteicon />
          </div>
        </div>
        <div className="single-item mb-3">
          <div className="single-item-info">
            <p className="name-from-link">Jeddah Saudi Arabia</p>
          </div>
          <div className="link-action">
            <Editicon />
            <Deleteicon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Location;
