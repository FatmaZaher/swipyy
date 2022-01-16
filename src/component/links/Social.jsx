import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";
import axios from "axios";
const config = JSON.parse(localStorage.getItem("headers"));

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
const Social = (props) => {
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([]);
  const [socialPlatforms, setSocialPlatforms] = useState([]);

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
    socialLinkIsButton: "button",
  };
  const getAllSocialPlatforms = async () => {
    props.onStartRequest(false);

    try {
      await axios
        .get("https://test-place.site/api/user/social/get", config)
        .then((res) => {
          setSocialPlatforms(res.data.data);
        });
    } catch (error) {}
  };
  const onSubmit = (values) => {
    axios
      .post("https://test-place.site/api/user/socialUser", values, config)
      .then((res) => {
        getSocials();
      });
  };
  const validationSchema = Yup.object({
    url: Yup.string().required("Add You Link*"),
    social_id: Yup.string().required("Add You Link*"),
  });
  const getSocials = () => {
    axios
      .get("https://test-place.site/api/user/socialUser", config)
      .then((res) => {
        setItems(res.data.data);
        props.onFinishRequest(false);

      });
  };
  useEffect(() => {
    getSocials();
    getAllSocialPlatforms();
  }, []);
  const handleEditData = (key, e) => {
    getSocials();
  };
  const handleChangeSelect = (id, value, url) => {
    console.log(id);
    axios
      .patch(
        "https://test-place.site/api/user/socialUser/" + id,
        { type: value, url },
        config
      )
      .then((res) => {
        getSocials();
      });
  };
  const socialLinkIsButton = [
    { id: "Show as", name: "Show as" },
    { id: "button", name: "button" },
    { id: "icon", name: "icon" },
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

  return (
    <div className="social-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="form-page form-head">
            <FormikControl
              control="select"
              name="social_id"
              options={socialPlatforms}
              error="true"
            />
            <FormikControl
              control="input"
              type="text"
              name="url"
              placeholder="Paste your social link here"
              error="true"
            />
            <LinkButton type="submit" buttontext="Add Social Link" icon="yes" />
          </Form>
        )}
      </Formik>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((social, index) => (
                <Draggable
                  key={index}
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
                              <FormikControl
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
                              />
                            </Form>
                          </Formik>
                          <Editicon
                            item={social}
                            config={config}
                            onSaveData={() => handleEditData()}
                            api="user/socialUser"
                          />
                          <Deleteicon
                            item={social}
                            config={config}
                            onSaveData={() => handleEditData()}
                            api="user/socialUser"
                          />
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
  );
};
export default Social;
