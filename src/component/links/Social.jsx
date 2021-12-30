import React, { useState } from "react";
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
const Social = () => {
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([
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
  ]);

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
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map(({ id, title, subTitle, icon }, index) => (
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
                    >
                      <div className="single-item mb-3">
                        <div className="link-and-icon">
                          <img
                            src="https://cdn-f.heylink.me/static/media/ic_swap_icon.60319cd6.svg"
                            alt=""
                          />
                          <div className="single-item-icon">{icon}</div>
                          <div className="single-item-info">
                            <p className="name-from-link">{title}</p>
                            <span className="the-link">{subTitle}</span>
                          </div>
                        </div>

                        <div className="link-action">
                          <Formik initialValues={initialValues}>
                            <Form className="form-page">
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
