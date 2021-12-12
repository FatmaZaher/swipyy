import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const finalSpaceCharacters = [
  {
    id: "whatsapp",
    title: "My Whatsapp",
    subTitle: "+9705667897",
    icon: <WhatsAppIcon />,
  },
  {
    id: "facebook",
    title: "My Facebook",
    subTitle: "FahadMuhayya",
    icon: <FacebookIcon />,
  },
  {
    id: "twitter",
    title: "My Twitter",
    subTitle: "FahadMuhayya",
    icon: <WhatsAppIcon />,
  },
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
          <Form className="link-form form-head">
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
      {/* <div className="your-links pt-4">
        <p className="your-links-header mb-3 mb-m-5">Social Links</p>
        <div className="single-link mb-3">
          <div className="link-and-icon">
            <div className="single-link-icon">
              <WhatsAppIcon />
            </div>
            <div className="single-link-info">
              <p className="name-from-link">My Whatsapp</p>
              <span className="the-link">+9705667897</span>
            </div>
          </div>

          <div className="link-action">
            <Formik initialValues={initialValues}>
              <Form className="link-form">
                 <Select
                  name="socialLinkIsButton"
                  options={socialLinkIsButton}
                /> 
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
        <div className="single-link mb-3">
          <div className="link-and-icon">
            <div className="single-link-icon">
              <FacebookIcon />
            </div>
            <div className="single-link-info">
              <p className="name-from-link">My Facebook</p>
              <span className="the-link">FahadMuhayya</span>
            </div>
          </div>

          <div className="link-action">
            <Formik initialValues={initialValues}>
              <Form className="link-form">
                 <Select
                  name="socialLinkIsButton"
                  options={socialLinkIsButton}
                /> 
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
        <div className="single-link mb-3">
          <div className="link-and-icon">
            <div className="single-link-icon">
              <TwitterIcon />
            </div>
            <div className="single-link-info">
              <p className="name-from-link">My Twitter</p>
              <span className="the-link">FahadMuhayya</span>
            </div>
          </div>

          <div className="link-action">
            <Formik initialValues={initialValues}>
              <Form className="link-form">
                 <Select
                  name="socialLinkIsButton"
                  options={socialLinkIsButton}
                /> 
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
      </div> */}
      <DragDropContext>
        <Droppable droppableId="characters" className="soical-drag">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {finalSpaceCharacters.map(
                ({ id, title, subTitle, icon }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="single-link mb-3">
                            <div className="link-and-icon">
                              <img src="https://cdn-f.heylink.me/static/media/ic_swap_icon.60319cd6.svg" alt="" />
                              <div className="single-link-icon">{icon}</div>
                              <div className="single-link-info">
                              
                                <p className="name-from-link">{title}</p>
                                <span className="the-link">{subTitle}</span>
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
                        </li>
                      )}
                    </Draggable>
                  );
                }
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Social;
