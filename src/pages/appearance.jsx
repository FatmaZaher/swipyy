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
import ProBtn from "../component/ProBtn";
import Editticons from "../component/icons/Editticons";
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

const onSubmit = (values) => {
  console.log(values);
  // axios
  //   .post("https://swipyy.com/api/user/link", values, config)
  //   .then((res) => {
  //     getLinks();
  //   });
};
const validationSchema = Yup.object({
  description: Yup.string().required("You must lower than 500 characters*"),
});

const backgroundStyles = [
  {
    id: "soild",
    img: background1,
    text: "Falt",
  },
  {
    id: "up",
    img: background2,
    text: "Up",
  },
  {
    id: "down",
    img: background3,
    text: "Down",
  },
];

const config = JSON.parse(localStorage.getItem("headers"));

const Appearance = (props) => {
  const { t } = props;

  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const [settings, setSettings] = useState({});

  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");
  const [color3, setColor3] = useState("#000000");
  const [color4, setColor4] = useState("#000000");
  const [color5, setColor5] = useState("#000000");
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [placements, setPlacements] = useState([
    "links",
    "social",
    "slider",
    "messages",
    "location",
  ]);
  const [themes, setThemes] = useState([]);

  const getAllSettings = async () => {
    props.onStartRequest(true);

    try {
      axios
        .get("https://swipyy.com/api/user/appearance", config)
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
          if (res.data.data.Settings.placement.length) {
            setPlacements(res.data.data.Settings.placement);
          }
          setThemes(themes);
          setDetails(res.data.data.Settings.details);
        });
    } catch (error) {}
  };
  const initialValues = {
    description: "",
  };
  const settingsChange = (property, value) => {
    let oldSettings = { ...settings };
    oldSettings[property] = value;
    let newSettings = oldSettings;
    setSettings(newSettings);
  };
  const hexToRGB = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };

  const apiChange = async (values) => {
    props.onStartRequest(true);

    try {
      axios
        .post("https://swipyy.com/api/user/appearance/update", values, config)
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
  const changeCoverStatus = (value) => {
    const cover_img_status = value === true ? 1 : 0;
    apiChange({ cover_img_status });
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
    apiChange({ placement: placements });
  };
  const changeAvatarType = (avatar_type_id, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ avatar_type_id });
  };
  const changeTheme = (theme_id, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ theme_id, background_final: "empty" });
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

  const changeBackground = (background_type) => {
    let color = "";
    if (background_type === "soild") {
      color = color4;
    } else if (background_type === "up") {
      color = `linear-gradient(0deg, ${hexToRGB(color4, 1)}, ${hexToRGB(
        color4,
        0.5
      )})`;
    } else if (background_type === "down") {
      color = `linear-gradient(180deg,  ${hexToRGB(color4, 1)}, ${hexToRGB(
        color4,
        0.5
      )})`;
    }
    apiChange({
      background_type,
      background_final: color,
      background_color: color4,
    });
  };
  const changeBackgroundColor = () => {
    changeBackground(settings.background_type);
    // apiChange({ background_color: color4, background_final: color4 });
  };
  const changeBackgroundAnimate = (background_animated_id, isPro) => {
    if (checkIsPro(isPro) === false) return;
    apiChange({ background_animated_id });
  };

  const changeFont = (font_id, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ font_id });
  };

  const changeTextAlign = (text_alignment, isPro) => {
    if (checkIsPro(isPro) === false) return;

    apiChange({ text_alignment });
  };

  const changeSocialColor = () => {
    apiChange({ social_icons_color: color5 });
  };
  const saveDetails = (details) => {
    apiChange({ details });
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

  const renderIcon = (icon) => {
    if (icon === "links") {
      return <LinkBlue />;
    } else if (icon === "social") {
      return <SocialBlue />;
    } else if (icon === "slider") {
      return <SliderBlue />;
    } else if (icon === "messages") {
      return <MeasssssBlue />;
    } else if (icon === "location") {
      return <LocationBlue />;
    }
  };
  const handleEditData = (key, e) => {
    getAllSettings();
  };

  const editAvatarImage = () => {
    document.querySelector('.avatar-avatar [type="file"]').click();
  };
  const editCoverImage = () => {
    document.querySelector('.cover-cover [type="file"]').click();
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setPlaceholderProps({});
    setPlacements((items) =>
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
  const sumbitDetails = async (item) => {
    console.log(item);
    try {
      if (item.newItem) {
        apiChange({ details: [item.detail] });
      } else {
        await axios
          .patch(
            `https://swipyy.com/api/user/appearance/update/detail/${item.id}`,
            item,
            config
          )
          .then((res) => {
            getAllSettings();
          });
      }
    } catch (error) {}
  };
  const addDetailsItem = () => {
    let oldDetails = [...details];
    oldDetails.push({ detail: "", newItem: true });
    let newDetails = oldDetails;
    setDetails(newDetails);
  };
  const editDetailsItem = (index, value) => {
    let oldDetails = [...details];
    oldDetails[index]["detail"] = value;
    let newDetails = oldDetails;
    setDetails(newDetails);
  };
  return (
    <div className="appearance-page">
      <Accordion>
        <div className="row w-100 m-0">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="apperance-head">
              {t("apperance.username")} {currentUser.username}
            </div>
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
                  t={t}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="apperance-head">ID Link</div>
            <div className="single-item mb-3">
              <div className="single-item-info">
                <div className="my-link">
                  <p className="link-text">
                    <span>
                      Swipyy.com/<a href="#">{settings.short_name}</a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="apperance-head">{t("apperance.layout.title")}</div>
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
                  <p className="mt-2">{t("apperance.layout.avatar")}</p>
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
                  <ProBtn />
                  <p className="mt-2">{t("apperance.layout.cover-image")}</p>
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {settings.layout === "cover" ? (
              <div>
                <div className="apperance-head">
                  {t("apperance.cover-image-title")}
                </div>

                <div className="avatar-title">
                  <div className="single-item mb-3">
                    <div className="single-item-img cover-cover">
                      <UploadImg
                        config={config}
                        uploadType="cover_img"
                        item={settings}
                        onSaveData={() => handleEditData()}
                      />
                    </div>
                    <div className="link-and-icon">
                      <div className="single-item-switch">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="cover_img_status"
                            checked={
                              settings.cover_img_status === 1 ? true : false
                            }
                            onChange={(e) =>
                              changeCoverStatus(e.target.checked)
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="link-action"
                        onClick={() => editCoverImage()}
                      >
                        <div className="edit-icon">
                          <Editticons />
                        </div>
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
                            name="title_status"
                            checked={settings.title_status === 1 ? true : false}
                            onChange={(e) =>
                              changeTitleStatus(e.target.checked)
                            }
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
                          t={t}
                        />
                        {/* <Sharicon /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : //   </Accordion.Body>
            // </Accordion.Item>
            null}
            {settings.layout === "avatar" ? (
              <div>
                <div className="apperance-head">
                  {t("apperance.avatar-title")}
                </div>
                <div className="avatar-title">
                  <div className="single-item mb-3">
                    <div className="single-item-img avatar-avatar">
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
                            onChange={(e) =>
                              changeAvatarStatus(e.target.checked)
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="link-action"
                        onClick={() => editAvatarImage()}
                      >
                        <div className="edit-icon">
                          <Editticons />
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
                            onChange={(e) =>
                              changeTitleStatus(e.target.checked)
                            }
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
                          t={t}
                        />
                        {/* <Sharicon /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            {t("apperance.description.title")}
          </Accordion.Header>
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
                    placeholder={t("apperance.description.input-placeholder")}
                    note={t("apperance.description.note")}
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
          <Accordion.Header>{t("apperance.highlights.title")}</Accordion.Header>
          <Accordion.Body>
            <div className="high-header">
              <p>{t("apperance.highlights.switch-text")}</p>
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
                        <p className="high-title-head">
                          {t("apperance.highlights.highlights-title")}
                        </p>
                        <FormikControl
                          control="input"
                          name="highTitle"
                          placeholder={t(
                            "apperance.highlights.highlights-placeholder"
                          )}
                          value={settings.highlights}
                          onChange={(e) =>
                            settingsChange("highlights", e.target.value)
                          }
                          onBlur={(e) => changeHighlightTitle(e.target.value)}
                        />
                      </div>
                      <div className="field-array">
                        {details.map((detail, index) => (
                          <div key={index} className="high-details">
                            <p className="high-title-head">
                              {t("apperance.highlights.detail")}
                            </p>
                            <Field
                              name={`details[${index}]`}
                              className="form-input"
                              placeholder={t(
                                "apperance.highlights.detail-placeholder"
                              )}
                              value={detail.detail}
                              onChange={(e) =>
                                editDetailsItem(index, e.target.value)
                              }
                              onBlur={(e) => sumbitDetails(detail)}
                            />
                            <Deleteicon
                              item={detail}
                              config={config}
                              onSaveData={() => handleEditData()}
                              api="user/appearance/update/detail"
                              t={t}
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          className="form-button"
                          onClick={() => addDetailsItem()}
                        >
                          {t("apperance.highlights.button")}
                        </button>
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
          <Accordion.Header>
            {t("apperance.placement-manager.title")}
          </Accordion.Header>
          <Accordion.Body>
            <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {placements.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
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
                            <div className="icon">{renderIcon(item)}</div>
                            <div className="title">{item}</div>
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
              {t("apperance.placement-manager.button")}
            </button>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>{t("apperance.custom-avatars")}</Accordion.Header>
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
                            {avatar_type.is_pro ? <ProBtn /> : null}
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
          <Accordion.Header>{t("apperance.theme")}</Accordion.Header>
          <Accordion.Body>
            <div className="custom-avatars theme-style">
              {themes.map((theme, themeIndex) => {
                return (
                  <div
                    className={`avatar-back ${
                      parseInt(theme.is_pro) ? "align-pro" : null
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
                        <div className="theme-img">
                          <img src={theme.img} alt="" />
                        </div>
                        <p className="mt-2">{theme.name}</p>
                        {parseInt(theme.is_pro) ? <ProBtn /> : null}
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
              <Accordion.Header>
                {t("apperance.buttons.title")}
              </Accordion.Header>
              <Accordion.Body>
                <div className="buttons">
                  <div className="buttons-style">
                    <p>{t("apperance.buttons.buttons-style")}</p>
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
                    <p>{t("apperance.buttons.buttons-icon-style")}</p>
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
                                            <ProBtn />
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
                  <div className="input-color-box-parent">
                    <h3> {t("apperance.buttons.button-background-color")}</h3>
                    <div
                      className="input-color-box"
                      style={{ background: color1 }}
                    >
                      <input
                        type="color"
                        id="changebtn_background_color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        onBlur={(e) => changebtn_background_color()}
                      />
                      <span>{color1}</span>
                      <label htmlFor="changebtn_background_color"></label>
                    </div>
                  </div>

                  <div className="input-color-box-parent">
                    <h3>{t("apperance.buttons.button-font-color")}</h3>
                    <div
                      className="input-color-box"
                      style={{ background: color2 }}
                    >
                      <input
                        type="color"
                        id="changebtn_font_color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        onBlur={(e) => changebtn_font_color()}
                      />
                      <span>{color2}</span>
                      <label htmlFor="changebtn_font_color"></label>
                    </div>
                  </div>
                  <div className="input-color-box-parent">
                    <h3>
                      {t("apperance.buttons.title-description-font-color")}
                    </h3>

                    <div
                      className="input-color-box"
                      style={{ background: color3 }}
                    >
                      <input
                        type="color"
                        id="changetitile_descreption_color"
                        value={color3}
                        onChange={(e) => setColor3(e.target.value)}
                        onBlur={(e) => changetitile_descreption_color()}
                      />
                      <span>{color3}</span>
                      <label htmlFor="changetitile_descreption_color"></label>
                    </div>
                  </div>
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
              <Accordion.Header>
                {t("apperance.background.title")}
              </Accordion.Header>
              <Accordion.Body>
                <p>{t("apperance.background.background-style")}</p>
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
                            checked={background.id === settings.background_type}
                          />
                          <label htmlFor={background.id} className="d-block">
                            <img
                              src={checkIcon}
                              alt=""
                              className="check-icon"
                            />
                            <img src={background.img} alt="" />
                            {/* {background.id === settings.background_type
                              ? "checked"
                              : "nott"} */}
                            <p className="mt-2">{background.text}</p>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4">
                  {t("apperance.background.animated-background")}
                </p>
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
                                id={"background_animated" + background.id}
                                name="animat"
                                value={background.id}
                                onChange={() =>
                                  changeBackgroundAnimate(
                                    background.id,
                                    background.is_pro
                                  )
                                }
                                checked={background.id === 2}
                              />

                              <label
                                htmlFor={"background_animated" + background.id}
                                className="d-block"
                              >
                                <img
                                  src={checkIcon}
                                  alt=""
                                  className="check-icon"
                                />
                                <img src={background.img} alt="" />
                                <p className="mt-2">{background.name}</p>
                                {/* {background.id}
                                <br />
                                {settings.background_animated_id}
                                {background.id ===
                                parseInt(settings.background_animated_id)
                                  ? "checked"
                                  : "nott"} */}

                                {background.is_pro ? <ProBtn /> : null}
                              </label>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
                <div className="upload-button">
                  <div className="input-color-box-parent">
                    <h3>{t("apperance.background.background-color")}</h3>
                    <div
                      className="input-color-box"
                      style={{ background: color4 }}
                    >
                      <input
                        type="color"
                        id="changeBackgroundColor"
                        value={color4}
                        onChange={(e) => setColor4(e.target.value)}
                        onBlur={(e) => changeBackgroundColor()}
                      />
                      <span>{color4}</span>
                      <label htmlFor="changeBackgroundColor"></label>
                    </div>
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

            <Accordion.Item eventKey="11" className="font-section">
              <Accordion.Header>{t("apperance.font.title")}</Accordion.Header>
              <Accordion.Body>
                <div className="custom-avatars">
                  {settings.fonts
                    ? settings.fonts.map((font, index) => {
                        return (
                          <div
                            className={`avatar-back ${
                              font.is_pro ? "align-pro" : null
                            }`}
                          >
                            <div
                              className="avatar buttons-style-shap-list"
                              key={font.id}
                              index={index}
                            >
                              <input
                                type="radio"
                                id={"font" + font.id}
                                name="animat"
                                value={font.id}
                                onChange={() =>
                                  changeFont(font.id, font.is_pro)
                                }
                                checked={
                                  font.id === parseInt(settings.font_id)
                                    ? true
                                    : null
                                }
                              />
                              <label
                                htmlFor={"font" + font.id}
                                className="d-block"
                              >
                                <img
                                  src={checkIcon}
                                  alt=""
                                  className="check-icon"
                                />
                                <img height="100px" src={font.img} alt="" />
                                <p className="mt-2">{font.name}</p>
                                {font.is_pro ? <ProBtn /> : null}
                              </label>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="12">
              <Accordion.Header>
                {t("apperance.links-text-alignment.title")}
              </Accordion.Header>
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
                        {t("apperance.links-text-alignment.left")}
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
                          <ProBtn />
                        </span>
                        <CenterAlign />
                        {t("apperance.links-text-alignment.center")}
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
                          <ProBtn />
                        </span>
                        <img src={checkIcon} alt="" className="check-icon" />
                        <RightAlign />
                        {t("apperance.links-text-alignment.right")}
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
              <Accordion.Header>
                {t("apperance.social-icon-style.title")}
              </Accordion.Header>
              <Accordion.Body>
                <div className="social-icon">
                  <div className="input-color-box-parent">
                    <h3>
                      {t("apperance.social-icon-style.social-icon-style-color")}
                    </h3>
                    <div
                      className="input-color-box"
                      style={{ background: color5 }}
                    >
                      <input
                        type="color"
                        id="changeSocialColor"
                        value={color5}
                        onChange={(e) => setColor5(e.target.value)}
                        onBlur={(e) => changeSocialColor()}
                      />
                      <span>{color5}</span>
                      <label htmlFor="changeSocialColor"></label>
                    </div>
                  </div>

                  {/* <LinkButton type="" buttontext="#8cc8cc" /> */}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </>
        ) : null}
        <div className="social-icon">
          <div className="high-title with-border">
            <p>
              {t("apperance.hide-swippy-logo")}
              <ProBtn />
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
