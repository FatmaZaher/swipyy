import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ImageUpload from "image-upload-react";
import "image-upload-react/dist/index.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import tele from "../../assets/images/tele.png";
import * as Yup from "yup";
import SwitchButton from "../../component/SwitchButton";
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

const Link = () => {
  const [imageSrc, setImageSrc] = useState();
  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="link-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="link-form">
            <FormikControl
              control="input"
              type="text"
              name="yourLink"
              placeholder="Paste your link here"
              error="true"
            />
            <LinkButton type="submit" buttontext="Add your Link" />
          </Form>
        )}
      </Formik>

      <div className="your-links pt-4">
        <p className="your-links-header mb-5">
          Add Header
          <span className="icon">
            <HelpOutlineOutlinedIcon />
          </span>
        </p>

        <div className="single-link mb-3">
          <div className="link-and-icon">
            <SwitchButton />
            <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: 65,
                height: 65,
                margin: 0,
              }}
            />
            <div className="single-link-info">
              <p className="name-from-link">sewarsa.com</p>
              <span className="the-link">
                <img src={tele} alt="" />
                https://sewarsa.com/
              </span>
            </div>
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
          <div className="link-and-icon">
            <SwitchButton />
            <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: 65,
                height: 65,
                margin: 0,
              }}
            />
            <div className="single-link-info">
              <p className="name-from-link">sewarsa.com</p>
              <span className="the-link">
                <img src={tele} alt="" />
                https://sewarsa.com/
              </span>
            </div>
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
          <div className="link-and-icon">
            <SwitchButton />
            <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: 65,
                height: 65,
                margin: 0,
              }}
            />
            <div className="single-link-info">
              <p className="name-from-link">sewarsa.com</p>
              <span className="the-link">
                <img src={tele} alt="" />
                https://sewarsa.com/
              </span>
            </div>
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
export default Link;
