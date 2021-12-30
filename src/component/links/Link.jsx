import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "image-upload-react/dist/index.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tele from "../../assets/images/tele.png";
// import SwitchButton from "../../component/SwitchButton";
import Editicon from "../../component/icons/Editicon";
import LinkButton from "../../component/form/LinkButton";
import ImageDrop from "../../component/icons/ImageDrop";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import TrashIcon from "../icons/TrashIcon";
import ImageUploading from "react-images-uploading";

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
const Link = () => {
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState([
    {
      id: "0",
      title: "sewarsa.com",
      link: "https://sewarsa.com/",
    },
    {
      id: "1",
      title: "fdfdfd.com",
      link: "https://dddddddd.com/",
    },
    {
      id: "2",
      title: "dfrerere.com",
      link: "https://6y666.com/",
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

  const [image, setImage] = useState("");
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImage(imageList);
  };
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
    console.log(checked);
  };
  const initialValues = {
    yourLink: "",
  };
  const onSubmit = (values) => {
    console.log("values", values);
  };
  const validationSchema = Yup.object({
    yourLink: Yup.string().required("Add You Link*"),
  });

  return (
    <div className="link-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="form-page">
            <FormikControl
              control="input"
              type="text"
              name="yourLink"
              placeholder="Paste your link here"
              error="true"
            />
            <LinkButton type="submit" buttontext="Add your Link" icon="yes" />
          </Form>
        )}
      </Formik>

      <div className="your-links pt-4">
        <p className="your-links-header mb-3 mb-m-5">
          Add Header
          <span className="icon">
            <HelpOutlineOutlinedIcon />
          </span>
        </p>
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map(({ id, title, link }, index) => (
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
                            <div className="single-item-switch">
                              <div className="checkbox">
                                <input
                                  type="checkbox"
                                  name="show"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="drop-img">
                              <ImageUploading
                                multiple
                                value={image}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                              >
                                {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
                                  dragProps,
                                }) => (
                                  // write your building UI
                                  <div className="upload__image-wrapper">
                                    <div>
                                      <button
                                        onClick={onImageUpload}
                                        {...dragProps}
                                      >
                                        <div className="img-upload">
                                          <ImageDrop />
                                        </div>
                                      </button>
                                    </div>
                                    <div
                                      className="images-uploads"
                                      style={
                                        imageList.length > 0
                                          ? { top: "0" }
                                          : { top: "50px" }
                                      }
                                    >
                                      {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                          <img
                                            src={image.data_url}
                                            alt=""
                                            width="100"
                                          />
                                          <div className="image-item__btn-wrapper">
                                            <button
                                              onClick={() =>
                                                onImageRemove(index)
                                              }
                                            >
                                              <TrashIcon />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </ImageUploading>
                            </div>
                            <div className="single-item-info">
                              <p className="name-from-link">{title}</p>
                              <span className="the-link">
                                <img src={tele} alt="" />
                                {link}
                              </span>
                            </div>
                          </div>
                          <div className="link-action">
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
    </div>
  );
};
export default Link;
