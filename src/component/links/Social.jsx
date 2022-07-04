import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";
import axios from "axios";
import Select from "react-select";
import Editticons from "../icons/Editticons";

const config = JSON.parse(localStorage.getItem("headers"));

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});
const queryAttr = "data-rbd-drag-handle-draggable-id";
const Social = (props) => {
  const { t } = props;

  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([]);
  const [socialPlatforms, setSocialPlatforms] = useState([]);
  const [socialPlaceholder, setSocialPlaceholder] = useState(null);

  const sortItems = (values) => {
    const ides = values.map((item) => item.id);

    props.onStartRequest(true);
    axios
      .post(
        "https://swipyy.com/api/user/social/sort/update",
        { sort_social: ides },
        config
      )
      .then((res) => {
        getSocials();
      });
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    sortItems(result);

    return result;
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
  const initialValues = {
    url: "",
    social_id: "",
    type: "icon",
  };
  const getAllSocialPlatforms = async () => {
    try {
      await axios
        .get("https://swipyy.com/api/user/social/get", config)
        .then((res) => {
          const newPlatforms = res.data.data.map((item) => {
            return {
              value: item.name,
              icon: item.icon,
              id: item.id,
              placeholder: item.placeholder,
            };
          });
          setSocialPlatforms(newPlatforms);
        });
    } catch (error) {}
  };
  const onSubmit = (values) => {
    props.onStartRequest(false);
    axios
      .post("https://swipyy.com/api/user/socialUser", values, config)
      .then((res) => {
        getSocials();
      });
  };
  const validationSchema = Yup.object({
    url: Yup.string().required(t("links.social.add-your-link")),
    social_id: Yup.string().required(t("links.social.add-your-link")),
  });
  const getSocials = () => {
    axios.get("https://swipyy.com/api/user/socialUser", config).then((res) => {
      setItems(res.data.data);
      props.onFinishRequest(false);
    });
  };
  const handleSocialPlatform = (value, func) => {
    func("social_id", value.id);
    func("url", "");

    setSocialPlaceholder(value.placeholder);
  };
  const handlePhone = (value, func) => {
    func("url", '+' +  value);
  };

  useEffect(() => {
    getSocials();
    getAllSocialPlatforms();
  }, []);
  const handleEditData = (key, e) => {
    getSocials();
  };
  const formatOptionLabel = ({ icon, id, value }) => (
    <div className="social-list-item">
      <div class="social-list-item-icon">
        <img src={icon} alt="" />
      </div>
      <div className="text">{value}</div>
    </div>
  );

  const handleChangeSelect = (id, value, url) => {
    props.onStartRequest(false);
    axios
      .patch(
        "https://swipyy.com/api/user/socialUser/" + id,
        { type: value },
        config
      )
      .then((res) => {
        getSocials();
      });
  };
  const socialLinkIsButton = [
    // { id: "Show as", name: t("links.social.select.showAs") },
    { id: "button", name: t("links.social.select.button") },
    { id: "icon", name: t("links.social.select.icon") },
  ];

  // const finalSpaceCharacters = [
  //   {
  //     id: "whatsapp",
  //     title: "My Whatsapp",
  //     subTitle: "+9705667897",
  //     icon: <WhatsAppIcon />,
  //   },
  //   {
  //     id: "facebook",
  //     title: "My Facebook",
  //     subTitle: "FahadMuhayya",
  //     icon: <FacebookIcon />,
  //   },
  //   {
  //     id: "twitter",
  //     title: "My Twitter",
  //     subTitle: "FahadMuhayya",
  //     icon: <WhatsAppIcon />,
  //   },
  // ];
  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      height: 50,
      border: "1px solid #ccc",
    }),
  };
  return (
    <div className="social-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="form-page form-head">
            <div className="form-control">
              <Select
                defaultValue={socialPlatforms[0]}
                formatOptionLabel={formatOptionLabel}
                options={socialPlatforms}
                onChange={(e) => handleSocialPlatform(e, formik.setFieldValue)}
                styles={customStyles}
              />
            </div>

            {/* <FormikControl
              control="select"
              name="social_id"
              options={socialPlatforms}
              error="true"
            /> */}

            {formik.values.social_id == 2 ? (
              <div className="form-control">
                <PhoneInput
                  country={"us"}
                  value={formik.values.url}
                  onChange={(e) => handlePhone(e, formik.setFieldValue)}
                  enableSearch={true}
                />
                <div className="error-mes">
                  <ErrorMessage name={"url"}></ErrorMessage>
                </div>
              </div>
            ) : (
              <FormikControl
                control="input"
                type="text"
                name="url"
                placeholder={
                  socialPlaceholder || t("links.social.button-placholder")
                }
                error="true"
              />
            )}

            <LinkButton
              type="submit"
              buttontext={t("links.social.button")}
              icon="yes"
              disabled={formik.values.url === "" ? true : false}
            />
          </Form>
        )}
      </Formik>
      <div className="social-content">
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((social, index) => (
                  <Draggable
                    key={social.id}
                    draggableId={String(social.id)}
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
                      >
                        <div className="single-item mb-3">
                          <div className="link-and-icon">
                            <img
                              src="https://cdn-f.heylink.me/static/media/ic_swap_icon.60319cd6.svg"
                              alt=""
                            />
                            <div className="single-item-icon">
                              <img src={social.icon} alt="" />
                            </div>
                            <div className="single-item-info">
                              <p className="name-from-link">{social.social}</p>
                              <span className="the-link">{social.url}</span>
                            </div>
                          </div>

                          <div className="link-action">
                            <Formik initialValues={initialValues}>
                              <Form className="form-page">
                                {/* <FormikControl
                                control="select"
                                name="socialLinkIsButton"
                                value={social.type}
                                options={socialLinkIsButton}
                                onChange={(e) =>
                                  handleChangeSelect(
                                    social.id,
                                    e.target.value,
                                    social.url
                                  )
                                }
                              /> */}
                                <div
                                  role="group"
                                  aria-labelledby="my-radio-group"
                                  className="button-icon"
                                >
                                  {/* {socialLinkIsButton.map((option) => {
                                  return (
                                    <label>
                                      <Field
                                        key={option.id}
                                        type="radio"
                                        name="socialLinkIsButton"
                                        value={social.type}
                                        checked={
                                          social.type == option.id
                                            ? true
                                            : false
                                        }
                                        onChange={(e) =>
                                          handleChangeSelect(
                                            social.id,
                                            option.id,
                                            social.url
                                          )
                                        }
                                      />
                                      {option.name}
                                    </label>
                                  );
                                })} */}
                                  <span>{t("links.social.select.showAs")}</span>
                                  <label
                                    className={
                                      social.type == "button"
                                        ? "input-selected"
                                        : null
                                    }
                                  >
                                    <Field
                                      key="button"
                                      type="radio"
                                      name="socialLinkIsButton"
                                      value={social.type}
                                      checked={
                                        social.type == "button" ? true : false
                                      }
                                      onChange={(e) =>
                                        handleChangeSelect(
                                          social.id,
                                          "button",
                                          social.url
                                        )
                                      }
                                    />
                                    {t("links.social.select.button")}
                                  </label>
                                  <label
                                    className={
                                      social.type == "icon"
                                        ? "input-selected"
                                        : null
                                    }
                                  >
                                    <Field
                                      key="icon"
                                      type="radio"
                                      name="socialLinkIsButton"
                                      value={social.type}
                                      checked={
                                        social.type == "icon" ? true : false
                                      }
                                      onChange={(e) =>
                                        handleChangeSelect(
                                          social.id,
                                          "icon",
                                          social.url
                                        )
                                      }
                                    />
                                    {t("links.social.select.icon")}
                                  </label>
                                </div>
                              </Form>
                            </Formik>
                            <div className="d-flex">
                              <div className="mx-3">
                                
                                <Editicon
                                  item={social}
                                  config={config}
                                  onSaveData={() => handleEditData()}
                                  api="user/socialUser"
                                  t={t}
                                />
                              </div>

                              <Deleteicon
                                item={social}
                                config={config}
                                onSaveData={() => handleEditData()}
                                api="user/socialUser"
                                t={t}
                              />
                            </div>
                          </div>
                        </div>
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
      </div>
    </div>
  );
};
export default Social;
