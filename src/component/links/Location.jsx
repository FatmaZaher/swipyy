import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";
import axios from "axios";
const config = JSON.parse(localStorage.getItem("headers"));

const Location = (props) => {
  const { t } = props;

  const [items, setItems] = useState([]);

  const initialValues = {
    name: "",
    url:""
  };
  const onSubmit = (values) => {
    props.onStartRequest(true);

    axios
      .post("https://swipyy.com/api/user/location", values, config)
      .then((res) => {
        getLocations();
      });
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(t("links.location.add-your-link")),
  });
  const getLocations = () => {
    axios
      .get("https://swipyy.com/api/user/location", config)
      .then((res) => {
        setItems(res.data.data);
        props.onFinishRequest(false);
      });
  };
  useEffect(() => {
    getLocations();
  }, []);
  const handleEditData = (key, e) => {
    props.onStartRequest(true);

    getLocations();
  };
  const handleChangeSwitch = (id, value) => {
    const newValue = value === true ? "active" : "inactive";
    axios
      .patch(
        "https://swipyy.com/api/user/location/" + id,
        { status: newValue },
        config
      )
      .then((res) => {
        getLocations();
      });
  };
  return (
    <div className="location-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="form-page location-form">
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
              name="name"
              placeholder={t("links.location.button-placholder")}
              error="true"
            />
             <FormikControl
              control="input"
              type="text"
              name="url"
              placeholder={t("links.location.button-url")}
              error="true"
            />
            <LinkButton
              type="submit"
              buttontext={t("links.location.button")}
              icon="yes"
              disabled={formik.values.name === "" ? true : false}
            />
          </Form>
        )}
      </Formik>
      <div className="your-links pt-4">
        <p className="your-links-header mb-3 mb-m-5">
          {t("links.location.location-header")}
        </p>

        {items.map((location, index) => (
          <div className="single-item mb-3">
            <div className="single-item-info">
              <p className="name-from-link">{location.location}</p>
            </div>
            <div className="link-action">
              <Editicon
                item={location}
                config={config}
                onSaveData={() => handleEditData()}
                api="user/location"
                t={t}
              />
              <Deleteicon
                item={location}
                config={config}
                onSaveData={() => handleEditData()}
                api="user/location"
                t={t}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Location;
