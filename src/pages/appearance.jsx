import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

import { Tabs, Tab } from "react-bootstrap";
import LinkButton from "../component/form/LinkButton";
import { Link } from "react-router-dom";
import SwitchButton from "../component/SwitchButton";
import personal from "../assets/images/personal.png";
import layout1 from "../assets/images/layout1.svg";
import layout2 from "../assets/images/layout2.svg";
import layout1Active from "../assets/images/layout1-active.svg";
import layout2Active from "../assets/images/layout2-active.svg";
import checkIcon from "../assets/images/checkIcon.svg";
import customTheme from "../assets/images/custom-theme.png";

import background1 from "../assets/images/background1.png";
import background2 from "../assets/images/background2.png";
import background3 from "../assets/images/background3.png";

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
import UploadImg from "../component/UploadImg";
import LockModal from "../component/LockModal";
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
const onSubmit = (values) => {
  console.log(values);
  // axios
  //   .post("https://test-place.site/api/user/link", values, config)
  //   .then((res) => {
  //     getLinks();
  //   });
};
const validationSchema = Yup.object({
  description: Yup.string().required("You must lower than 500 characters*"),
});

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

const config = JSON.parse(localStorage.getItem("headers"));

const Appearance = (props) => {
  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const [settings, setSettings] = useState({});

  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("#8cc8cc");
  const [color5, setColor5] = useState("#8cc8cc");
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  const [placements, setPlacements] = useState([
    { id: "links", name: "links" },
    { id: "social", name: "social" },
    { id: "slider", name: "slider" },
    { id: "messages", name: "messages" },
    { id: "location", name: "location" },
  ]);
  const [themes, setThemes] = useState([]);

  const getAllSettings = async () => {
    props.onStartRequest(true);

    try {
      axios
        .get("https://test-place.site/api/user/appearance", config)
        .then((res) => {
          props.onFinishRequest(true);

          setSettings(res.data.data.Settings);
          setColor1(res.data.data.Settings.btn_background_color);
          setColor2(res.data.data.Settings.btn_font_color);
          setColor3(res.data.data.Settings.titile_descreption_color);
          setColor4(res.data.data.Settings.background_color);
          setColor5(res.data.data.Settings.social_icons_color);
          let themes = res.data.data.Settings.themes;

          themes.splice(0, 0, {
            class: "theme-class-01",
            id: 0,
            img: customTheme,
            name: "Custom theme",
          });

          setThemes(themes);
        });
    } catch (error) {}
  };
  const settingsChange = (property, value) => {
    console.log({ property, value });
    let oldSettings = { ...settings };
    oldSettings[property] = value;
    let newSettings = oldSettings;
    setSettings(newSettings);
  };
  const apiChange = async (values) => {
    props.onStartRequest(true);

    try {
      axios
        .post(
          "https://test-place.site/api/user/appearance/update",
          values,
          config
        )
        .then((res) => {
          getAllSettings();
        });
    } catch (error) {}
  };
  const checkIsPro = (value) => {
    if (value === 1) {
      if (currentUser.is_pro === false) {
        setIsLockModalOpen(true);
        return false;
      }
    }
  };
  const changeLayout = (layout, isPro) => {
    if (checkIsPro(isPro) === false) return;
    apiChange({ layout });
  };

  const handleCloseLockModal = () => {
    setIsLockModalOpen(false);
  };
  const changeAvatarStatus = (value) => {
    const avtar_status = value === true ? 1 : 0;
    apiChange({ avtar_status });
  };
  const changeTitleStatus = (value) => {
    const title_status = value === true ? 1 : 0;
    apiChange({ title_status });
  };
  const changeDescription = (description) => {
    apiChange({ description });
  };

  const changeHighlightsStatus = (value) => {
    const highlights_status = value === true ? 1 : 0;
    apiChange({ highlights_status });
  };
  const changeHighlightTitle = (highlights) => {
    apiChange({ highlights });
  };

  const changePlacement = () => {
    apiChange({ placement: items });
  };
  const changeAvatarType = (avatar_type_id, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ avatar_type_id });
  };
  const changeTheme = (theme_id, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ theme_id });
  };
  const changeButton = (button_type_id) => {
    apiChange({ button_type_id });
  };
  const changeButtonIcon = (button_icon_style_id) => {
    apiChange({ button_icon_style_id });
  };
  const changebtn_background_color = () => {
    apiChange({ btn_background_color: color1 });
  };
  const changebtn_font_color = () => {
    apiChange({ btn_font_color: color2 });
  };
  const changetitile_descreption_color = () => {
    apiChange({ titile_descreption_color: color3 });
  };

  const changeBackgroundColor = () => {
    apiChange({ background_color: color4 });
  };

  const changeBackground = (background_id) => {
    apiChange({ background_id });
  };
  const changeBackgroundAnimate = (background_animated_id, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ background_animated_id });
  };
  const changeTextAlign = (text_alignment, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ text_alignment });
  };

  const changeSocialColor = () => {
    apiChange({ social_icons_color: color5 });
  };
  const saveDetails = (details) => {
    apiChange(details);
  };
  const changeSwipyInformationStatuss = (value) => {
    const swipy_information_status = value === true ? 1 : 0;
    apiChange({ swipy_information_status });
  };
  const changeSwipyLogoStatus = (value) => {
    if (checkIsPro(1) === false) return;

    const swipy_logo_status = value === true ? 1 : 0;
    apiChange({ swipy_logo_status });
  };

  useEffect(() => {
    getAllSettings();
  }, []);
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([
    {
      id: "links",
      title: "Links",
      icon: "LinkBlue",
    },
    {
      id: "social",
      title: "Social",
      icon: "SocialBlue",
    },
    {
      id: "images",
      title: "Slider",
      icon: "SliderBlue",
    },
    {
      id: "messages",
      title: "Messages",
      icon: "MeasssssBlue",
    },
    {
      id: "location",
      title: "Location",
      icon: "LocationBlue",
    },
  ]);
  const renderIcon = (icon) => {
    if (icon === "LinkBlue") {
      return <LinkBlue />;
    } else if (icon === "SocialBlue") {
      return <SocialBlue />;
    } else if (icon === "SliderBlue") {
      return <SliderBlue />;
    } else if (icon === "MeasssssBlue") {
      return <MeasssssBlue />;
    } else if (icon === "LocationBlue") {
      return <LocationBlue />;
    }
  };
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
          <Accordion.Header>username {currentUser.username}</Accordion.Header>
          <Accordion.Body>
            <div className="single-item mb-3">
              <div className="single-item-info">
                <div className="my-link">
                  <p className="link-text">
                    <span>
                      swippy.me/<a href="#">{settings.username}</a>
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
                {/* <Sharicon /> */}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            short username{" "}
            <div className="pro-btn position-static">
              <Link to="/payments">
                <LinkButton type="" buttontext="PRO" />
              </Link>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="single-item mb-3">
              <div className="single-item-info">
                <div className="my-link">
                  <p className="link-text">
                    <span>
                      swippy.me/<a href="#">{settings.short_name}</a>
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
                {/* <Sharicon /> */}
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
                  checked={settings.layout === "avatar" ? true : null}
                  onChange={() => changeLayout("avatar", 0)}
                />
                <label htmlFor="layout1" className="d-block">
                  <img src={checkIcon} alt="" className="check-icon" />
                  {settings.layout === "avatar" ? (
                    <img src={layout1Active} alt="" />
                  ) : (
                    <img src={layout1} alt="" />
                  )}
                  <p className="mt-2">Avatar</p>
                </label>
              </div>
              <div className="avatar">
                <input
                  type="radio"
                  id="layout2"
                  name="drone"
                  value="layout2"
                  onChange={() => changeLayout("cover", 1)}
                  checked={settings.layout === "cover" ? true : null}
                />
                <label htmlFor="layout2" className="d-block align-pro">
                  <img src={checkIcon} alt="" className="check-icon" />
                  {settings.layout === "cover" ? (
                    <img src={layout2Active} alt="" />
                  ) : (
                    <img src={layout2} alt="" />
                  )}
                  <div className="pro-btn">
                    <Link to="/payments">
                      <LinkButton type="" buttontext="PRO" />
                    </Link>
                  </div>
                  <p className="mt-2">Cover Image</p>
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
                  <UploadImg
                    config={config}
                    uploadType="avatar"
                    item={settings}
                    onSaveData={() => handleEditData()}
                  />
                </div>
                <div className="link-and-icon">
                  <div className="single-item-switch">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        name="show"
                        checked={settings.avtar_status === 1 ? true : false}
                        onChange={(e) => changeAvatarStatus(e.target.checked)}
                      />
                    </div>
                  </div>
                  <div className="link-action">
                    {/* <Editicon /> */}
                    {/* <Sharicon /> */}
                  </div>
                </div>
              </div>
              <div className="single-item mb-3">
                <div className="single-item-info">
                  <div className="my-link">
                    <div className="link-text">
                      <p className="profile-title m-0">{settings.title}</p>
                    </div>
                  </div>
                </div>
                <div className="link-and-icon">
                  <div className="single-item-switch">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        name="show"
                        checked={settings.title_status === 1 ? true : false}
                        onChange={(e) => changeTitleStatus(e.target.checked)}
                      />
                    </div>
                  </div>
                  <div className="link-action">
                    <Editicon
                      settingName="title"
                      item={settings}
                      config={config}
                      onSaveData={() => handleEditData()}
                      api="user/appearance/update"
                    />
                    {/* <Sharicon /> */}
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
                onSubmit={onSubmit}
              >
                <Form className="form-page">
                  <FormikControl
                    control="textarea"
                    name="description"
                    placeholder="Type the description here.."
                    note="500 characters left"
                    value={settings.description}
                    onBlur={(e) => changeDescription(e.target.value)}
                    onChange={(e) =>
                      settingsChange("description", e.target.value)
                    }
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
              <p>Add the main highlights on your swippy.me page</p>
              <div className="single-item-switch">
                <div className="checkbox">
                  <input
                    type="checkbox"
                    name="show"
                    checked={settings.highlights_status === 1 ? true : false}
                    onChange={(e) => changeHighlightsStatus(e.target.checked)}
                  />
                </div>
              </div>
            </div>
            {settings.highlights_status === 1 ? (
              <>
                <div className="highlights">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    <Form className="">
                      <div className="high-title">
                        <p className="high-title-head">Highlights Title</p>
                        <FormikControl
                          control="input"
                          name="highTitle"
                          placeholder="Type the tilte here"
                          value={settings.highlights}
                          onChange={(e) =>
                            settingsChange("highlights", e.target.value)
                          }
                          onBlur={(e) => changeHighlightTitle(e.target.value)}
                        />
                      </div>
                      <div className="field-array">
                        <FieldArray name="details">
                          {(fieldArrayProps) => {
                            const { push, form } = fieldArrayProps;
                            const { values } = form;
                            const { details } = values;
                            return (
                              <div>
                                {details.map((detail, index) => (
                                  <div key={index} className="high-details">
                                    <p className="high-title-head">Detail</p>
                                    <Field
                                      name={`details[${index}]`}
                                      className="form-input"
                                      placeholder="Type the detail here"
                                      onBlur={(e) => saveDetails(details)}
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
              </>
            ) : null}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>placement manager</Accordion.Header>
          <Accordion.Body>
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {placements.map((item, index) => (
                      <Draggable
                        key={item.name}
                        draggableId={item.name}
                        index={index}
                      >
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
                              src="https://cdn-f.swippy.me/static/media/ic_swap_icon.60319cd6.svg"
                              alt=""
                              className="drag-img"
                            />
                            <div className="icon">{renderIcon(item.name)}</div>
                            <div className="title">{item.name}</div>
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
            <button
              type="button"
              className="form-button"
              onClick={() => changePlacement()}
            >
              Save placement
            </button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>custom avatars</Accordion.Header>
          <Accordion.Body>
            <div className="custom-avatars">
              {settings.avatars_type
                ? settings.avatars_type.map((avatar_type, avatar_typeIndex) => {
                    return (
                      <div
                        className={`avatar-back ${
                          avatar_type.is_pro ? "align-pro" : null
                        }`}
                      >
                        <div
                          className="avatar"
                          key={avatar_type.id}
                          index={avatar_typeIndex}
                        >
                          <input
                            type="radio"
                            id={"avatar_type-" + avatar_type.id}
                            name="avatar_type"
                            value={avatar_type.id}
                            onChange={() =>
                              changeAvatarType(
                                avatar_type.id,
                                avatar_type.is_pro
                              )
                            }
                            checked={
                              avatar_type.id === settings.avtar_type_id
                                ? true
                                : null
                            }
                          />
                          <label
                            htmlFor={"avatar_type-" + avatar_type.id}
                            className="d-block"
                          >
                            <img
                              src={checkIcon}
                              alt=""
                              className="check-icon"
                            />
                            <img src={avatar_type.img} alt="" />
                            {avatar_type.is_pro ? (
                              <div className="pro-btn">
                                <Link to="/payments">
                                  <LinkButton type="" buttontext="PRO" />
                                </Link>
                              </div>
                            ) : null}
                          </label>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>theme</Accordion.Header>
          <Accordion.Body>
            <div className="custom-avatars">
              {themes.map((theme, themeIndex) => {
                return (
                  <div
                    className={`avatar-back ${
                      theme.is_pro ? "align-pro" : null
                    }`}
                  >
                    <div className="avatar" key={theme.id} index={themeIndex}>
                      <input
                        type="radio"
                        id={"theme-" + theme.id}
                        name="theme"
                        value={theme.id}
                        onChange={() => changeTheme(theme.id, theme.is_pro)}
                        checked={theme.id === settings.theme_id ? true : null}
                      />
                      <label htmlFor={"theme-" + theme.id} className="d-block">
                        <img src={checkIcon} alt="" className="check-icon" />
                        <img width="100px" src={theme.img} alt="" />
                        <p className="mt-2">{theme.name}</p>
                        {theme.is_pro ? (
                          <div className="pro-btn">
                            <Link to="/payments">
                              <LinkButton type="" buttontext="PRO" />
                            </Link>
                          </div>
                        ) : null}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {settings.is_theme_pro === 0 ? (
          <>
            <Accordion.Item eventKey="9">
              <Accordion.Header>buttons</Accordion.Header>
              <Accordion.Body>
                <div className="buttons">
                  <div className="buttons-style">
                    <p>Buttons Style</p>
                    <div className="buttons-style-shap">
                      <div className="custom-avatars">
                        {settings.buttons
                          ? settings.buttons.map((button, index) => {
                              return (
                                <div
                                  className={`avatar-back ${
                                    button.is_pro ? "align-pro" : null
                                  }`}
                                >
                                  <div
                                    className="avatar buttons-style-shap-list"
                                    key={button.id}
                                    index={index}
                                  >
                                    <input
                                      type="radio"
                                      id={"button-" + button.id}
                                      name="buttonStyle"
                                      value={button.id}
                                      onChange={() => changeButton(button.id)}
                                      checked={
                                        button.id ===
                                        parseInt(settings.button_type_id)
                                          ? true
                                          : null
                                      }
                                    />
                                    <label
                                      htmlFor={"button-" + button.id}
                                      className="d-block"
                                    >
                                      <img
                                        src={checkIcon}
                                        alt=""
                                        className="check-icon"
                                      />
                                      <img
                                        src={button.img}
                                        height="40px"
                                        alt=""
                                      />
                                    </label>
                                  </div>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>

                  <div className="buttons-icon-style">
                    <p>Buttons Icon Style</p>
                    <div className="buttons-style-shap">
                      <div className="custom-avatars">
                        {settings.button_icon_style
                          ? settings.button_icon_style.map(
                              (buttonIcon, index) => {
                                return (
                                  <div
                                    className="avatar-back"
                                    className={`avatar-back ${
                                      buttonIcon.is_pro ? "align-pro" : null
                                    }`}
                                  >
                                    <div
                                      className="avatar buttons-style-shap-list"
                                      key={buttonIcon.id}
                                      index={index}
                                    >
                                      <input
                                        type="radio"
                                        id={"button_style" + buttonIcon.id}
                                        name="button_style"
                                        value={buttonIcon.id}
                                        onChange={() =>
                                          changeButtonIcon(buttonIcon.id)
                                        }
                                        checked={
                                          buttonIcon.id ===
                                          parseInt(
                                            settings.button_icon_style_id
                                          )
                                            ? true
                                            : null
                                        }
                                      />
                                      <label
                                        htmlFor={"button_style" + buttonIcon.id}
                                        className="d-block"
                                      >
                                        <img
                                          src={checkIcon}
                                          alt=""
                                          className="check-icon"
                                        />
                                        <img
                                          height="40px"
                                          src={buttonIcon.img}
                                          alt=""
                                        />
                                        {buttonIcon.is_pro ? (
                                          <div className="pro-btn">
                                            <Link to="/payments">
                                              <LinkButton
                                                type=""
                                                buttontext="PRO"
                                              />
                                            </Link>
                                          </div>
                                        ) : null}
                                      </label>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button-color my-3">
                  <p>
                    Button Background Color
                    <div className="pro-btn back-pro">
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        onBlur={(e) => changebtn_background_color()}
                      />
                    </div>
                  </p>
                  <p>
                    Button Font Color
                    <div className="pro-btn font-pro">
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        onBlur={(e) => changebtn_font_color()}
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
                        onBlur={(e) => changetitile_descreption_color()}
                      />
                    </div>
                  </p>
                </div>
                {/* <div className="description">
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
            </div> */}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>background</Accordion.Header>
              <Accordion.Body>
                <p>Background Style</p>
                <div className="custom-avatars">
                  {backgroundStyles.map((background, index) => {
                    return (
                      <div className="avatar-back">
                        <div
                          className="avatar buttons-style-shap-list"
                          key={background.id}
                          index={index}
                        >
                          <input
                            type="radio"
                            id={background.id}
                            name="background"
                            value={background.id}
                            onChange={() => changeBackground(background.id)}
                            checked={
                              background.id ===
                              parseInt(settings.background_type)
                                ? true
                                : null
                            }
                          />
                          <label htmlFor={background.id} className="d-block">
                            <img
                              src={checkIcon}
                              alt=""
                              className="check-icon"
                            />
                            <img src={background.img} alt="" />
                            <p className="mt-2">{background.text}</p>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4">Animated Background</p>
                <div className="custom-avatars">
                  {settings.background_animated
                    ? settings.background_animated.map((background, index) => {
                        return (
                          <div
                            className={`avatar-back ${
                              background.is_pro ? "align-pro" : null
                            }`}
                          >
                            <div
                              className="avatar buttons-style-shap-list"
                              key={background.id}
                              index={index}
                            >
                              <input
                                type="radio"
                                id={background.id}
                                name="animat"
                                value={background.id}
                                onChange={() =>
                                  changeBackgroundAnimate(
                                    background.id,
                                    background.is_pro
                                  )
                                }
                                checked={
                                  background.id ===
                                  parseInt(settings.background_animated_id)
                                    ? true
                                    : null
                                }
                              />
                              <label
                                htmlFor={background.id}
                                className="d-block"
                              >
                                <img
                                  src={checkIcon}
                                  alt=""
                                  className="check-icon"
                                />
                                <img src={background.img} alt="" />
                                <p className="mt-2">{background.name}</p>
                                {background.is_pro ? (
                                  <div className="pro-btn">
                                    <Link to="/payments">
                                      <LinkButton type="" buttontext="PRO" />
                                    </Link>
                                  </div>
                                ) : null}
                              </label>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
                <div className="upload-button">
                  <div>
                    <p className="mt-4">Background Color</p>
                    <input
                      type="color"
                      value={color4}
                      onChange={(e) => setColor4(e.target.value)}
                      onBlur={(e) => changeBackgroundColor()}
                    />
                  </div>
                  <div>
                    {/* <p className="mt-4">Upload Image</p> */}
                    {/* <UploadImg
                  // link={link}
                  // config={config}
                  // onSaveData={() => handleEditData()}
                /> */}
                    {/* <img src={upload} alt="" /> */}
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
                        checked={
                          settings.text_alignment === "left" ? true : null
                        }
                        onChange={(e) => changeTextAlign(e.target.value, 0)}
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
                        checked={
                          settings.text_alignment === "center" ? true : null
                        }
                        onChange={(e) => changeTextAlign(e.target.value, 1)}
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
                        checked={
                          settings.text_alignment === "right" ? true : null
                        }
                        onChange={(e) => changeTextAlign(e.target.value, 1)}
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
                    onBlur={(e) => changeSocialColor()}
                  />
                  {/* <LinkButton type="" buttontext="#8cc8cc" /> */}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </>
        ) : null}
        <div className="social-icon">
          <div className="high-title with-border">
            <p>
              Hide swippy.me Logo
              <div className="pro-btn">
                <Link to="/payments">
                  <LinkButton type="" buttontext="PRO" />
                </Link>
              </div>
            </p>

            <div className="single-item-switch">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="show"
                  checked={settings.swipy_logo_status === 1 ? true : false}
                  onChange={(e) => changeSwipyLogoStatus(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </Accordion>
      <LockModal
        modalIsOpen={isLockModalOpen}
        onCloseLockModal={() => handleCloseLockModal()}
      />
    </div>
  );
};
export default Appearance;
