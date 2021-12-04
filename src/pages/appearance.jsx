import React from "react";
import { Accordion } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import SwitchButton from "../component/SwitchButton";
import personal from "../assets/images/personal.png";
import avatar from "../assets/images/avatar.svg";
import cover from "../assets/images/cover-img.svg";
import squer from "../assets/images/squer.png";
import circel from "../assets/images/circel.png";
import Polygon from "../assets/images/Polygon.png";
import them1 from "../assets/images/them1.png";
import FormikControl from "../component/form/FormikControl";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LinkIcon from "@mui/icons-material/Link";
import SocialDistanceOutlinedIcon from "@mui/icons-material/SocialDistanceOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

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
    icon: <LinkIcon />,
  },
  {
    id: "social",
    title: "Social",
    icon: <SocialDistanceOutlinedIcon />,
  },
  {
    id: "images",
    title: "Images",
    icon: <ImageOutlinedIcon />,
  },
  {
    id: "messages",
    title: "Messages",
    icon: <MailOutlineIcon />,
  },
  {
    id: "location",
    title: "Location",
    icon: <LocationOnOutlinedIcon />,
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
  {
    id: "3",
    img: them1,
    text: "Cerulean Blue",
  },
  {
    id: "4",
    img: them1,
    text: "Cerulean Blue",
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
                <span className="edit-icon">
                  <EditIcon />
                </span>
                <span className="trash-icon">
                  <ShareIcon />
                </span>
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
                <span className="edit-icon">
                  <EditIcon />
                </span>
                <span className="trash-icon">
                  <ShareIcon />
                </span>
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
                    <span className="edit-icon">
                      <EditIcon />
                    </span>
                    <span className="trash-icon">
                      <ShareIcon />
                    </span>
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
                    <span className="edit-icon">
                      <EditIcon />
                    </span>
                    <span className="trash-icon">
                      <ShareIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>description</Accordion.Header>
          <Accordion.Body>
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
                              <div key={index}>
                                <p className="high-title-head">Detail</p>
                                <Field
                                  name={`details[${index}]`}
                                  className="link-input"
                                  placeholder="Type the detail here"
                                />
                                <button
                                  type="button"
                                  className="link-button"
                                  onClick={() => push("")}
                                >
                                  add
                                </button>
                              </div>
                            ))}
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
                              <div className="icon">{icon}</div>
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
                      {/* {img} */}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="10">
          <Accordion.Header>background</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="11">
          <Accordion.Header>font style</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="12">
          <Accordion.Header>links text alignment</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="13">
          <Accordion.Header>social icon style</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default Appearance;
