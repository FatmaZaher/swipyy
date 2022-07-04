import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "image-upload-react/dist/index.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tele from "../../assets/images/tele.png";
// import SwitchButton from "../../component/SwitchButton";
import Editicon from "../../component/icons/Editicon";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import TrashIcon from "../icons/TrashIcon";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import UploadImg from "../UploadImg";
import { useTranslation } from "react-i18next";
import PlusIcon from "../icons/PlusIcon";

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});
const config = JSON.parse(localStorage.getItem("headers"));
const queryAttr = "data-rbd-drag-handle-draggable-id";

const Link = (props) => {
  // const { t } = useTranslation();
  const { t } = props;

  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([]);
  const [isPhone, setIsPhone] = useState(null);

  const sortItems = (values) => {
    const ides = values.map((item) => item.id);

    props.onStartRequest(true);
    axios
      .post(
        "https://swipyy.com/api/user/link/sort/update",
        { sort_link: ides },
        config
      )
      .then((res) => {
        getLinks();
      });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    sortItems(result);
    return result;
  };
  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    setPlaceholderProps({});
    await setItems((items) =>
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
    type: "link",
    name: "",
  };

  const onSubmit = (values) => {
   
    props.onStartRequest(true);
    axios
      .post("https://swipyy.com/api/user/link", values, config)
      .then((res) => {
        getLinks();
      });
  };

  const validationSchema = Yup.object({
    url: Yup.string().required(t("links.link.add-your-link")),
  });
  const getLinks = () => {
    axios.get("https://swipyy.com/api/user/link", config).then((res) => {
      props.onFinishRequest(false);

      setItems(res.data.data);
    });
  };
  useEffect(() => {
    getLinks();
  }, []);
  const handleEditData = (key, e) => {
    props.onStartRequest(true);

    getLinks();
  };
  const handleChangeSwitch = (id, value) => {
    props.onStartRequest(true);

    const newValue = value === true ? "active" : "inactive";
    axios
      .patch(
        "https://swipyy.com/api/user/link/" + id,
        { status: newValue },
        config
      )
      .then((res) => {
        getLinks();
      });
  };
  const handlePhone = (value, func) => {
    func("type", "phone");
    func("name", "انقر للاتصال بنا");

    func("url", '+' + value);
  };
  const handleLink = (e, func) => {
    func("type", "link");
    func("name", null);

    func("url", e.target.value);
  };
  const setPhone = (value, func) => {
    setIsPhone(value);

    func("url", null);
  };

  return (
    <div className="link-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <>
            <Form className="form-page">
              {isPhone ? (
                <PhoneInput
                  country={"us"}
                  value={formik.values.url}
                  onChange={(e) => handlePhone(e, formik.setFieldValue)}
                  enableSearch={true}
                />
              ) : (
                <FormikControl
                  control="input"
                  type="url"
                  value={formik.values.url}
                  placeholder={t("links.link.button-placholder")}
                  onChange={(e) => handleLink(e, formik.setFieldValue)}
                />
              )}

              <LinkButton
                type="submit"
                buttontext={t("links.link.button")}
                icon="yes"
                disabled={formik.values.url === "" ? true : false}
              />
            </Form>

            {isPhone ? (
              <button
                className="add-phone-link btn"
                onClick={() => setPhone(false, formik.setFieldValue)}
              >
                <PlusIcon />
                <span> Add Link</span>
              </button>
            ) : (
              <button
                className="add-phone-link btn"
                onClick={() => setPhone(true, formik.setFieldValue)}
              >
                <PlusIcon />
                <span> Add Phone number</span>
              </button>
            )}
          </>
        )}
      </Formik>

      <div className="your-links pt-4">
        {/* <p className="your-links-header mb-3 mb-m-5">
          Add Header
          <span className="icon">
            <HelpOutlineOutlinedIcon />
          </span>
        </p> */}
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items
                  ? items.map((link, index) => (
                      <Draggable
                        key={link.id}
                        draggableId={String(link.id)}
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
                                <div className="single-item-switch">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      name="show"
                                      checked={
                                        link.status === "active" ? true : false
                                      }
                                      onChange={(e) =>
                                        handleChangeSwitch(
                                          link.id,
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="drop-img">
                                  <UploadImg
                                    item={link}
                                    config={config}
                                    uploadType="link"
                                    onSaveData={() => handleEditData()}
                                  />
                                </div>
                                <div className="single-item-info">
                                  <p className="name-from-link">{link.name}</p>
                                  <span className="the-link">
                                    <img src={tele} alt="" />
                                    {link.url}
                                  </span>
                                </div>
                              </div>
                              <div className="link-action">
                                <Editicon
                                  item={link}
                                  config={config}
                                  onSaveData={() => handleEditData()}
                                  api="user/link"
                                  t={t}
                                />
                                <Deleteicon
                                  item={link}
                                  config={config}
                                  onSaveData={() => handleEditData()}
                                  api="user/link"
                                  t={t}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  : null}

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
export default Link;
