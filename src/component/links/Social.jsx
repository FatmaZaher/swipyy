import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import tele from "../../assets/images/tele.png";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";

const initialValues = {
  yourLink: "",
  yourLinkType: "",
  socialLinkIsButton: "button",
};
const onSubmit = (values) => {
  console.log("values", values);
};
const validationSchema = Yup.object({
  yourLink: Yup.string().required("Add You Link*"),
  yourLinkType: Yup.string().required("Add You Link*"),
});
const dropdwonoptions = [
  { key: "Select Popular Social Link", value: "" },
  { key: "Whatsapp", value: "whatsapp" },
  { key: "Facebook", value: "facebook" },
  { key: "Telegram", value: "telegram" },
];
const socialLinkIsButton = [
  { key: "Show as", value: "" },
  { key: "Button", value: "button" },
  { key: "Icon", value: "icon" },
];
const Social = () => {
  return (
    <div className="social-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="link-form">
            {/* <Select
              name="yourLinkType"
              options={dropdwonoptions}
              error="true"
            />
            <div className="form-control">
              <Field
                type="text"
                id="yourLink"
                name="yourLink"
                placeholder="Paste your social link here"
                className="link-input"
              />
              <div className="error-mes">
                <ErrorMessage name="yourLink" />
              </div>
            </div>
            <button type="submit" className="link-button">
              <AddOutlinedIcon />
              Add Social Link
            </button> */}
            <FormikControl
              control="select"
              name="yourLinkType"
              options={dropdwonoptions}
              error="true"
            />
            <FormikControl
              control="input"
              type="text"
              name="yourLink"
              placeholder="Paste your social link here"
              error="true"
            />
            <LinkButton type="submit" buttontext="Add Social Link" icon="yes" />
          </Form>
        )}
      </Formik>
      <div className="your-links pt-4">
        <p className="your-links-header mb-3 mb-m-5">Social Links</p>
        <div className="single-link mb-3">
          <div className="link-and-icon">
            <div className="single-link-icon">
              <WhatsAppIcon />
            </div>
            <div className="single-link-info">
              <p className="name-from-link">Whatsapp</p>
              <span className="the-link">
                <img src={tele} alt="" />
                https://sewarsa.com/
              </span>
            </div>
          </div>

          <div className="link-action">
            <Formik initialValues={initialValues}>
              <Form className="link-form">
                {/* <Select
                  name="socialLinkIsButton"
                  options={socialLinkIsButton}
                /> */}
                <FormikControl
                  control="select"
                  name="socialLinkIsButton"
                  options={socialLinkIsButton}
                />
              </Form>
            </Formik>
            <Editicon />
            <Deleteicon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Social;
