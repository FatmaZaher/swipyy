import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { Tabs, Tab } from "react-bootstrap";
import LinkButton from "../component/form/LinkButton";
import { Link } from "react-router-dom";
import SwitchButton from "../component/SwitchButton";
import personal from "../assets/images/personal.png";
import layout1 from "../assets/images/layout1.svg";
import layout2 from "../assets/images/layout2.svg";
import checkIcon from "../assets/images/checkIcon.svg";
import cover from "../assets/images/cover-img.svg";
import squer from "../assets/images/squer.png";
import circell from "../assets/images/circell.svg";
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
import FormikControl from "../component/form/FormikControl";
import { Formik, Form, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Editicon from "../component/icons/Editicon";
import Deleteicon from "../component/icons/Deleteicon";
import Sharicon from "../component/icons/Sharicon";
import LinkBlue from "../component/icons/LinkBlue";
import SocialBlue from "../component/icons/SocialBlue";
import SliderBlue from "../component/icons/SliderBlue";
import MeasssssBlue from "../component/icons/MeasssssBlue";
import LocationBlue from "../component/icons/LocationBlue";
import LeftAlign from "../component/icons/LeftAlign";
import CenterAlign from "../component/icons/CenterAlign";
import RightAlign from "../component/icons/RightAlign";
import axios from "axios";
import LinkUploadImg from "../component/LinkUploadImg";
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});
const queryAttr = "data-rbd-drag-handle-draggable-id";

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
// const finalSpaceCharacters = [
//   {
//     id: "links",
//     title: "Links",
//     icon: <LinkBlue />,
//   },
//   {
//     id: "social",
//     title: "Social",
//     icon: <SocialBlue />,
//   },
//   {
//     id: "images",
//     title: "Slider",
//     icon: <SliderBlue />,
//   },
//   {
//     id: "messages",
//     title: "Messages",
//     icon: <MeasssssBlue />,
//   },
//   {
//     id: "location",
//     title: "Location",
//     icon: <LocationBlue />,
//   },
// ];
const avatars = [
  {
    id: "0",
    img: squer,
  },
  {
    id: "1",
    img: circell,
  },
  {
    id: "2",
    img: Polygon,
  },
  {
    id: "3",
    img: squer,
  },
  {
    id: "4",
    img: circell,
  },
  {
    id: "5",
    img: Polygon,
  },
];
const themes = [
  {
    id: "0",
    img: them1,
    text: "Cerulean Blue",
  },
  {
    id: "1",
    img: them1,
    text: "Cerulean Blue",
  },
];
const backgroundStyles = [
  {
    id: "0",
    img: background1,
    text: "Falt",
  },
  {
    id: "1",
    img: background2,
    text: "Up",
  },
  {
    id: "2",
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
    pro: true,
  },
  {
    id: "3",
    img: fontE1,
    pro: false,
  },
  {
    id: "4",
    img: fontE1,
    pro: true,
  },
];
const config = JSON.parse(localStorage.getItem("headers"));

const Appearance = () => {
  const [settings, setSettings] = useState({});
  const [color1, setColor1] = useState("#8cc8cc");
  const [color2, setColor2] = useState("#163152");
  const [color3, setColor3] = useState("#fff");
  const [color4, setColor4] = useState("#8cc8cc");
  const [color5, setColor5] = useState("#8cc8cc");

  const getAllSettings = async () => {
    try {
      axios
        .get("https://test-place.site/api/user/appearance", config)
        .then((res) => {
          setSettings(res.data.data.Settings);
        });
    } catch (error) {}
  };
  useEffect(() => {
    getAllSettings();
  }, []);
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([
    {
      id: "links",
      title: "Links",
      icon: <LinkBlue />,
    },
    {
      id: "social",
      title: "Social",
      icon: <SocialBlue />,
    },
    {
      id: "images",
      title: "Slider",
      icon: <SliderBlue />,
    },
    {
      id: "messages",
      title: "Messages",
      icon: <MeasssssBlue />,
    },
    {
      id: "location",
      title: "Location",
      icon: <LocationBlue />,
    },
  ]);
  const handleEditData = (key, e) => {
    getAllSettings();
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setPlaceholderProps({});
    setItems((items) =>
      reorder(items, result.source.index, result.destination.index)
    );
  };

  const onDragUpdate = (update) => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);
    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  return (
    <div className="appearance-page">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>username</Accordion.Header>
          <Accordion.Body>
            <div className="single-item mb-3">
              <div className="single-item-info">
                <div className="my-link">
                  <p className="link-text">
                    <span>
                      heylink.me/<a href="#">{settings.username}</a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="link-action">
                <Editicon
                  settingName="username"
                  item={settings}
                  config={config}
                  onSaveData={() => handleEditData()}
                  api="user/appearance/update"
                />
                <Sharicon />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>short username</Accordion.Header>
          <Accordion.Body>
            <div className="single-item mb-3">
              <div className="single-item-info">
                <div className="my-link">
                  <p className="link-text">
                    <span>
                      heylink.me/<a href="#">{settings.short_name}</a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="link-action">
                <Editicon
                  settingName="short_name"
                  item={settings}
                  config={config}
                  onSaveData={() => handleEditData()}
                  api="user/appearance/update"
                />
                <Sharicon />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>layout</Accordion.Header>
          <Accordion.Body>
            <div className="layout">
              <div className="avatar">
                <input
                  type="radio"
                  id="layout1"
                  name="drone"
                  value="layout1"
                  checked
                />
                <label htmlFor="layout1" className="">
                  <img src={checkIcon} alt="" className="check-icon" />
                  <img src={layout1} alt="" />
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio"
                  id="layout2"
                  name="drone"
                  value="layout2"
                  checked
                />
                <label htmlFor="layout2" className="">
                  <img src={checkIcon} alt="" className="check-icon" />
                  <img src={layout2} alt="" />
                </label>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>avatar & title</Accordion.Header>
          <Accordion.Body>
            <div className="avatar-title">
              <div className="single-item mb-3">
                <div className="single-item-img">
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
              <div className="single-item mb-3">
                <div className="single-item-info">
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
                <Form className="form-page">
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
                                  className="form-input"
                                  placeholder="Type the detail here"
                                />
                              </div>
                            ))}
                            <button
                              type="button"
                              className="form-button"
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
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map(({ id, title, icon }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className="link-dragg"
                          >
                            <img
                              src="https://cdn-f.heylink.me/static/media/ic_swap_icon.60319cd6.svg"
                              alt=""
                              className="drag-img"
                            />
                            <div className="icon">{icon}</div>
                            <div className="title">{title}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                    <div
                      style={{
                        position: "absolute",
                        top: placeholderProps.clientY,
                        left: placeholderProps.clientX,
                        height: placeholderProps.clientHeight,
                        width: placeholderProps.clientWidth,
                      }}
                    />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>custom avatars</Accordion.Header>
          <Accordion.Body>
            <div className="custom-avatars">
              {avatars.map(({ id, img }, index) => {
                return (
                  <div className="avatar-back">
                    <div className="avatar" key={id} index={index}>
                      <input
                        type="radio"
                        id={id}
                        name="drone"
                        value={id}
                        checked
                      />
                      <label htmlFor={id} className="">
                        <img src={checkIcon} alt="" className="check-icon" />
                        <img src={img} alt="" />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>theme</Accordion.Header>
          <Accordion.Body>
            {/* <ul className="avatar-theme-list">
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
            </ul> */}
            <div className="custom-avatars">
              {themes.map(({ id, img, text }, index) => {
                return (
                  <div className="avatar-back">
                    <div className="avatar" key={id} index={index}>
                      <input
                        type="radio"
                        id={id}
                        name="themes"
                        value={id}
                        checked
                      />
                      <label htmlFor={id} className="d-block">
                        <img src={checkIcon} alt="" className="check-icon" />
                        <img src={img} alt="" />
                        <p className="mt-2">{text}</p>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>buttons</Accordion.Header>
          <Accordion.Body>
            <div className="buttons">
              <div className="buttons-style">
                <p>Buttons Style</p>
                <div className="buttons-style-shap">
                  <div className="custom-avatars">
                    {buttonStyles.map(({ id, img }, index) => {
                      return (
                        <div className="avatar-back">
                          <div
                            className="avatar buttons-style-shap-list"
                            key={id}
                            index={index}
                          >
                            <input
                              type="radio"
                              id={id}
                              name="buttonStyle"
                              value={id}
                              checked
                            />
                            <label htmlFor={id} className="d-block">
                              <img
                                src={checkIcon}
                                alt=""
                                className="check-icon"
                              />
                              <img src={img} alt="" />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <ul className="buttons-style-shap-list">
                    {buttonStyles.map(({ id, img }, index) => {
                      return (
                        <li key={id} index={index}>
                          <div className="avatar-theme-image">
                            <img src={img} alt="" />
                          </div>
                        </li>
                      );
                    })}
                  </ul> */}
                </div>
              </div>
              <div className="buttons-icon-style">
                <p>Buttons Icon Style</p>
                <div className="buttons-style-shap">
                  <div className="custom-avatars">
                    {buttonIconStyles.map(({ id, img }, index) => {
                      return (
                        <div className="avatar-back">
                          <div
                            className="avatar buttons-style-shap-list"
                            key={id}
                            index={index}
                          >
                            <input
                              type="radio"
                              id={id}
                              name="buttonIcon"
                              value={id}
                              checked
                            />
                            <label htmlFor={id} className="d-block">
                              <img
                                src={checkIcon}
                                alt=""
                                className="check-icon"
                              />
                              <img src={img} alt="" />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <ul className="buttons-style-shap-list">
                    
                    {buttonIconStyles.map(({ id, img }, index) => {
                      return (
                        <li key={id} index={index}>
                          <div className="avatar-theme-image">
                            <img src={img} alt="" />
                          </div>
                        </li>
                      );
                    })}
                  </ul> */}
                </div>
              </div>
            </div>
            <div className="button-color my-3">
              <p>
                Button Background Color{" "}
                <div className="pro-btn back-pro">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                  />
                </div>
              </p>
              <p>
                Button Font Color{" "}
                <div className="pro-btn font-pro">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                  />
                </div>
              </p>
              <p>
                Title & Description Font Color
                <div className="pro-btn title-pro">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                  />
                </div>
              </p>
            </div>
            <div className="description">
              <p>Buttons Style</p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                <Form className="form-page">
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
            <div className="custom-avatars">
              {backgroundStyles.map(({ id, img, text }, index) => {
                return (
                  <div className="avatar-back">
                    <div
                      className="avatar buttons-style-shap-list"
                      key={id}
                      index={index}
                    >
                      <input
                        type="radio"
                        id={id}
                        name="background"
                        value={id}
                        checked
                      />
                      <label htmlFor={id} className="d-block">
                        <img src={checkIcon} alt="" className="check-icon" />
                        <img src={img} alt="" />
                        <p className="mt-2">{text}</p>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4">Animated Background</p>
            <div className="custom-avatars">
              {animatedBack.map(({ id, img, text }, index) => {
                return (
                  <div className="avatar-back">
                    <div
                      className="avatar buttons-style-shap-list"
                      key={id}
                      index={index}
                    >
                      <input
                        type="radio"
                        id={id}
                        name="animat"
                        value={id}
                        checked
                      />
                      <label htmlFor={id} className="d-block">
                        <img src={checkIcon} alt="" className="check-icon" />
                        <img src={img} alt="" />
                        <p className="mt-2">{text}</p>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="upload-button">
              <div>
                <p className="mt-4">Background Color</p>
                <input
                  type="color"
                  value={color4}
                  onChange={(e) => setColor4(e.target.value)}
                />
              </div>
              <div>
                {/* <p className="mt-4">Upload Image</p> */}
                {/* <LinkUploadImg
                  // link={link}
                  // config={config}
                  // onSaveData={() => handleEditData()}
                /> */}
                {/* <img src={upload} alt="" /> */}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="11">
          <Accordion.Header>font style</Accordion.Header>
          <Accordion.Body>
            <div className="font-style">
              <p>Font Style</p>
              <div className="font-style-tabs">
                <Tabs
                  defaultActiveKey="english"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="english" title="E">
                    <div className="custom-avatars">
                      {fontEnglish.map(({ id, img, pro }, index) => {
                        return (
                          <div className="avatar-back">
                            <div
                              className="avatar buttons-style-shap-list"
                              key={id}
                              index={index}
                            >
                              <input
                                type="radio"
                                id={id}
                                name="fontEnglish"
                                value={id}
                                checked
                              />
                              <label htmlFor={id} className="d-block">
                                <img
                                  src={checkIcon}
                                  alt=""
                                  className="check-icon"
                                />
                                <span className="align-pro">
                                  {pro && (
                                    <div className="pro-btn">
                                      <Link to="/payments">
                                        <LinkButton type="" buttontext="PRO" />
                                      </Link>
                                    </div>
                                  )}
                                  <img src={img} alt="" />
                                </span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* <ul className="avatar-theme-list">
                      {fontEnglish.map(({ id, img, pro }, index) => {
                        return (
                          <li key={id} index={index}>
                            <div className="avatar-theme-image">
                              <span className="align-pro">
                                {pro && (
                                  <div className="pro-btn">
                                    <Link to="/payments">
                                      <LinkButton type="" buttontext="PRO" />
                                    </Link>
                                  </div>
                                )}
                                <img src={img} alt="" />
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul> */}
                  </Tab>
                  <Tab eventKey="arabic" title="ع">
                    <div className="custom-avatars">
                      {fontEnglish.map(({ id, img, pro }, index) => {
                        return (
                          <div className="avatar-back">
                            <div
                              className="avatar buttons-style-shap-list"
                              key={id}
                              index={index}
                            >
                              <input
                                type="radio"
                                id={id}
                                name="fontArabic"
                                value={id}
                                checked
                              />
                              <label htmlFor={id} className="d-block">
                                <img
                                  src={checkIcon}
                                  alt=""
                                  className="check-icon"
                                />
                                <span className="align-pro">
                                  {pro && (
                                    <div className="pro-btn">
                                      <Link to="/payments">
                                        <LinkButton type="" buttontext="PRO" />
                                      </Link>
                                    </div>
                                  )}
                                  <img src={img} alt="" />
                                </span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="12">
          <Accordion.Header>links text alignment</Accordion.Header>
          <Accordion.Body>
            <div className="links-align">
              <div className="avatar-back">
                <div className="avatar buttons-style-shap-list">
                  <input
                    type="radio"
                    id="left"
                    name="textalign"
                    value="left"
                    checked
                    className=""
                  />
                  <label htmlFor="left" className="d-block form-button">
                    <img src={checkIcon} alt="" className="check-icon" />
                    <LeftAlign />
                    Left
                  </label>
                </div>
              </div>
              <div className="avatar-back">
                <div className="avatar buttons-style-shap-list">
                  <input
                    type="radio"
                    id="center"
                    name="textalign"
                    value="center"
                    checked
                    disabled
                    className=""
                  />

                  <label htmlFor="center" className="d-block form-button">
                    <img src={checkIcon} alt="" className="check-icon" />
                    <span className="align-pro">
                      <div className="pro-btn">
                        <Link to="/payments">
                          <LinkButton type="" buttontext="PRO" />
                        </Link>
                      </div>
                    </span>
                    <CenterAlign />
                    Center
                  </label>
                </div>
              </div>
              <div className="avatar-back">
                <div className="avatar buttons-style-shap-list">
                  <input
                    type="radio"
                    id="right"
                    name="textalign"
                    value="right"
                    checked
                    disabled
                    className=""
                  />
                  <label htmlFor="right" className="d-block form-button">
                    <span className="align-pro">
                      <div className="pro-btn">
                        <Link to="/payments">
                          <LinkButton type="" buttontext="PRO" />
                        </Link>
                      </div>
                    </span>
                    <img src={checkIcon} alt="" className="check-icon" />
                    <RightAlign />
                    Right
                  </label>
                </div>
              </div>
              {/* <button type="button" className="form-button">
                <LeftAlign />
                Left
              </button>
              <span className="align-pro">
                <div className="pro-btn">
                  <Link to="/payments">
                    <LinkButton type="" buttontext="PRO" />
                  </Link>
                </div>
                <button type="button" className="form-button" disabled>
                  <CenterAlign />
                  Center
                </button>
              </span>
              <span className="align-pro">
                <div className="pro-btn">
                  <Link to="/payments">
                    <LinkButton type="" buttontext="PRO" />
                  </Link>
                </div>
                <button type="button" className="form-button" disabled>
                  <RightAlign />
                  Right
                </button>
              </span> */}

              {/* <LinkButton type="" buttontext="Left" />
              <LinkButton type="" buttontext="Center" />
              <LinkButton type="" buttontext="Right" /> */}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="13">
          <Accordion.Header>social icon style</Accordion.Header>
          <Accordion.Body>
            <div className="social-icon">
              <p>SOCIAL ICONS STYLE</p>
              <input
                type="color"
                value={color5}
                onChange={(e) => setColor5(e.target.value)}
              />
              {/* <LinkButton type="" buttontext="#8cc8cc" /> */}
              <div className="high-title with-border">
                <p>
                  Hide HeyLink.me Logo{" "}
                  <div className="pro-btn">
                    <Link to="/payments">
                      <LinkButton type="" buttontext="PRO" />
                    </Link>
                  </div>
                </p>
                <SwitchButton />
              </div>
              <div className="high-title with-border">
                <p>
                  Hide (i) icon{" "}
                  <div className="pro-btn">
                    <Link to="/payments">
                      <LinkButton type="" buttontext="PRO" />
                    </Link>
                  </div>
                </p>
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
