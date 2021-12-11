import React from "react";
import { Accordion } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";

import { Tabs, Tab } from "react-bootstrap";

import LinkButton from "../component/form/LinkButton";

import SwitchButton from "../component/SwitchButton";
import personal from "../assets/images/personal.png";
import avatar from "../assets/images/avatar.svg";
import cover from "../assets/images/cover-img.svg";
import squer from "../assets/images/squer.png";
import circel from "../assets/images/circel.png";
import Polygon from "../assets/images/Polygon.svg";
import them1 from "../assets/images/them1.png";
import button1 from "../assets/images/button1.png";
import button2 from "../assets/images/button2.png";
import button3 from "../assets/images/button3.png";
import button4 from "../assets/images/button4.png";
import button5 from "../assets/images/button5.png";
import button6 from "../assets/images/button6.png";
import button7 from "../assets/images/button7.png";
import button8 from "../assets/images/button8.png";
import button9 from "../assets/images/button9.png";
import buttonIcon1 from "../assets/images/buttonIcon1.png";
import buttonIcon2 from "../assets/images/buttonIcon2.png";
import buttonIcon3 from "../assets/images/buttonIcon3.png";
import buttonIcon4 from "../assets/images/buttonIcon4.png";
import buttonIcon5 from "../assets/images/buttonIcon5.png";
import buttonIcon6 from "../assets/images/buttonIcon6.png";

import background1 from "../assets/images/background1.png";
import background2 from "../assets/images/background2.png";
import background3 from "../assets/images/background3.png";

import animatedBack1 from "../assets/images/animatedBack1.png";
import animatedBack2 from "../assets/images/animatedBack3.png";
import animatedBack3 from "../assets/images/animatedBack1.png";

import fontE1 from "../assets/images/fontE1.png";

import upload from "../assets/images/upload.png";
// import them2 from "../assets/images/them2.png";
import FormikControl from "../component/form/FormikControl";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Editicon from "../component/icons/Editicon";
import Deleteicon from "../component/icons/Deleteicon";
import Sharicon from "../component/icons/Sharicon";

// import LinkIcon from "../component/icons/LinkIcon";
// import SocialIcon from "../component/icons/SocialIcon";
// import LocationIcon from "../component/icons/LocationIcon";
// import ImagesIcon from "../component/icons/ImagesIcon";
// import MeesaIcon from "../component/icons/MeesaIcon";



import LinkBlue from "../component/icons/LinkBlue";
import SocialBlue from "../component/icons/SocialBlue";
import SliderBlue from "../component/icons/SliderBlue";
import MeasssssBlue from "../component/icons/MeasssssBlue";
import LocationBlue from "../component/icons/LocationBlue";

const initialValues = {
  description: "",
  details: [""],
};
const validationSchema = Yup.object({
  description: Yup.string().required("You must lower than 500 characters*"),
});
const dropdwonoptions = [
  { key: "Select Popular Social Link", value: "" },
  { key: "Whatsapp", value: "whatsapp" },
  { key: "Facebook", value: "facebook" },
  { key: "Telegram", value: "telegram" },
];
const finalSpaceCharacters = [
  {
    id: "links",
    title: "Links",
    icon: <LinkBlue/>,
  },
  {
    id: "social",
    title: "Social",
    icon: <SocialBlue/>,
  },
  {
    id: "images",
    title: "Slider",
    icon: <SliderBlue/>,
  },
  {
    id: "messages",
    title: "Messages",
    icon: <MeasssssBlue/>,
  },
  {
    id: "location",
    title: "Location",
    icon: <LocationBlue/>,
  },
];
const avatars = [
  {
    id: "1",
    img: squer,
  },
  {
    id: "2",
    img: circel,
  },
  {
    id: "3",
    img: Polygon,
  },
  {
    id: "4",
    img: squer,
  },
  {
    id: "5",
    img: circel,
  },
  {
    id: "6",
    img: Polygon,
  },
];
const themes = [
  {
    id: "1",
    img: them1,
    text: "Cerulean Blue",
  },
  {
    id: "2",
    img: them1,
    text: "Cerulean Blue",
  },
];
const backgroundStyles = [
  {
    id: "1",
    img: background1,
    text: "Falt",
  },
  {
    id: "2",
    img: background2,
    text: "Up",
  },
  {
    id: "3",
    img: background3,
    text: "Down",
  },
];
const animatedBack = [
  {
    id: "1",
    img: animatedBack1,
    text: "Snow",
  },
  {
    id: "2",
    img: animatedBack2,
    text: "Waves",
  },
  {
    id: "3",
    img: animatedBack3,
    text: "Blur",
  },
];
const buttonStyles = [
  {
    id: "1",
    img: button1,
  },
  {
    id: "2",
    img: button2,
  },
  {
    id: "3",
    img: button3,
  },
  {
    id: "4",
    img: button4,
  },
  {
    id: "5",
    img: button5,
  },
  {
    id: "6",
    img: button6,
  },
  {
    id: "7",
    img: button7,
  },
  {
    id: "8",
    img: button8,
  },
  {
    id: "9",
    img: button9,
  },
];
const buttonIconStyles = [
  {
    id: "1",
    img: buttonIcon1,
  },
  {
    id: "2",
    img: buttonIcon2,
  },
  {
    id: "3",
    img: buttonIcon3,
  },
  {
    id: "4",
    img: buttonIcon4,
  },
  {
    id: "5",
    img: buttonIcon5,
  },
  {
    id: "6",
    img: buttonIcon6,
  },
];
const fontEnglish = [
  {
    id: "1",
    img: fontE1,
  },
  {
    id: "2",
    img: fontE1,
  },
  {
    id: "3",
    img: fontE1,
  },
  {
    id: "4",
    img: fontE1,
  },
];

const Appearance = () => {

  return (
    <div className="appearance-page">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>username</Accordion.Header>
          <Accordion.Body>
            <div className="single-link mb-3">
              <div className="single-link-info">
                <div className="my-link">
                  <p className="link-text">
                    <span>
                      heylink.me/<a href="#">FahadMuhayya</a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="link-action">
                <Editicon />
                <Sharicon />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>short username</Accordion.Header>
          <Accordion.Body>
            <div className="single-link mb-3">
              <div className="single-link-info">
                <div className="my-link">
                  <p className="link-text">
                    <span>
                      heylink.me/<a href="#">fffff</a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="link-action">
                <Editicon />
                <Sharicon />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>layout</Accordion.Header>
          <Accordion.Body>
            <div className="layout">
              <img src={avatar} alt="" />
              <img src={cover} alt="" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>avatar & title</Accordion.Header>
          <Accordion.Body>
            <div className="avatar-title">
              <div className="single-link mb-3">
                <div className="single-link-img">
                  <img src={personal} alt="" />
                </div>
                <div className="link-and-icon">
                  <SwitchButton />
                  <div className="link-action">
                    <Editicon />
                    <Sharicon />
                  </div>
                </div>
              </div>
              <div className="single-link mb-3">
                <div className="single-link-info">
                  <div className="my-link">
                    <div className="link-text">
                      <p className="profile-title m-0">FahadMuhayya</p>
                    </div>
                  </div>
                </div>
                <div className="link-and-icon">
                  <SwitchButton />
                  <div className="link-action">
                    <Editicon />
                    <Sharicon />
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>description</Accordion.Header>
          <Accordion.Body>
            <div className="description">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                <Form className="link-form">
                  <FormikControl
                    control="textarea"
                    name="description"
                    placeholder="Type the description here.."
                    note="500 characters left"
                  />
                </Form>
              </Formik>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>highlights</Accordion.Header>
          <Accordion.Body>
            <div className="high-header">
              <p>Add the main highlights on your HeyLink.me page</p>
              <SwitchButton />
            </div>
            <div className="highlights">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                <Form className="">
                  <div className="high-title">
                    <p className="high-title-head">Highlights Title</p>
                    <FormikControl
                      control="input"
                      name="highTitle"
                      placeholder="Type the tilte here"
                    />
                  </div>
                  <div className="field-array">
                    <FieldArray name="details">
                      {(fieldArrayProps) => {
                        console.log("fieldArrayProps", fieldArrayProps);
                        const { push, form } = fieldArrayProps;
                        const { values } = form;
                        const { details } = values;
                        console.log("details", details);
                        return (
                          <div>
                            {details.map((detail, index) => (
                              <div key={index} className="high-details">
                                <p className="high-title-head">Detail</p>
                                <Field
                                  name={`details[${index}]`}
                                  className="link-input"
                                  placeholder="Type the detail here"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              className="link-button"
                              onClick={() => push("")}
                            >
                              Add Another Detail
                            </button>
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="high-detail"></div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>placement manager</Accordion.Header>
          <Accordion.Body>
            <DragDropContext>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {finalSpaceCharacters.map(({ id, title, icon }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="link-dragg"
                            >
                              <div className="icon">
                              {icon}
                              </div>
                              <div className="title">{title}</div>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>custom avatars</Accordion.Header>
          <Accordion.Body>
            <ul className="avatar-theme-list">
              {avatars.map(({ id, img }, index) => {
                return (
                  <li key={id} index={index}>
                    <div className="avatar-theme-image">
                      <img src={img} alt="" />
                      {/* {img} */}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>theme</Accordion.Header>
          <Accordion.Body>
            <ul className="avatar-theme-list">
              {themes.map(({ id, img, text }, index) => {
                return (
                  <li key={id} index={index}>
                    <div className="avatar-theme-image">
                      <img src={img} alt="" />
                    </div>
                    <p className="">{text}</p>
                  </li>
                );
              })}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>buttons</Accordion.Header>
          <Accordion.Body>
            <div className="buttons">
              <div className="buttons-style">
                <p>Buttons Style</p>
                <div className="buttons-style-shap">
                  <ul className="buttons-style-shap-list">
                    {buttonStyles.map(({ id, img }, index) => {
                      return (
                        <li key={id} index={index}>
                          <div className="avatar-theme-image">
                            <img src={img} alt="" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="buttons-icon-style">
                <p>Buttons Icon Style</p>
                <div className="buttons-style-shap">
                  <ul className="buttons-style-shap-list">
                    {buttonIconStyles.map(({ id, img }, index) => {
                      return (
                        <li key={id} index={index}>
                          <div className="avatar-theme-image">
                            <img src={img} alt="" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="description">
              <p>Buttons Style</p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                <Form className="link-form">
                  <FormikControl
                    control="textarea"
                    name="description"
                    placeholder="Type the description here.."
                    note="500 characters left"
                  />
                </Form>
              </Formik>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="10">
          <Accordion.Header>background</Accordion.Header>
          <Accordion.Body>
            <p>Background Style</p>

            <ul className="avatar-theme-list">
              {backgroundStyles.map(({ id, img, text }, index) => {
                return (
                  <li key={id} index={index}>
                    <div className="avatar-theme-image">
                      <img src={img} alt="" />
                    </div>
                    <p className="">{text}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4">Animated Background</p>

            <ul className="avatar-theme-list">
              {animatedBack.map(({ id, img, text }, index) => {
                return (
                  <li key={id} index={index}>
                    <div className="avatar-theme-image">
                      <img src={img} alt="" />
                    </div>
                    <p className="">{text}</p>
                  </li>
                );
              })}
            </ul>
            <div className="upload-button">
              <div>
                <p className="mt-4">Background Color</p>
                <LinkButton type="" buttontext="#8cc8cc" />
              </div>
              <div>
                <p className="mt-4">Upload Image</p>
                <img src={upload} alt="" />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="11">
          <Accordion.Header>font style</Accordion.Header>
          <Accordion.Body>
            <p>Background Style</p>
            <div className="font-style-tabs">
              <Tabs
                defaultActiveKey="english"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="english" title="E">
                  <ul className="avatar-theme-list">
                    {fontEnglish.map(({ id, img }, index) => {
                      return (
                        <li key={id} index={index}>
                          <div className="avatar-theme-image">
                            <img src={img} alt="" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Tab>
                <Tab eventKey="arabic" title="ع">
                  <ul className="avatar-theme-list">
                    {fontEnglish.map(({ id, img }, index) => {
                      return (
                        <li key={id} index={index}>
                          <div className="avatar-theme-image">
                            <img src={img} alt="" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Tab>
              </Tabs>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="12">
          <Accordion.Header>links text alignment</Accordion.Header>
          <Accordion.Body>
            <div className="links-align">
              <LinkButton type="" buttontext="Left" />
              <LinkButton type="" buttontext="Center" />
              <LinkButton type="" buttontext="Right" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="13">
          <Accordion.Header>social icon style</Accordion.Header>
          <Accordion.Body>
            <div className="social-icon">
              <p>Background Color</p>
              <LinkButton type="" buttontext="#8cc8cc" />
              <div className="high-title with-border">
                <p>Hide HeyLink.me Logo</p>
                <SwitchButton />
              </div>
              <div className="high-title with-border">
                <p>Hide (i) icon</p>
                <SwitchButton />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default Appearance;
