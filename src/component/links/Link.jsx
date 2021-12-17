import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ImageUpload from "image-upload-react";
import "image-upload-react/dist/index.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HideImageIcon from "@mui/icons-material/HideImage";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import tele from "../../assets/images/tele.png";
import * as Yup from "yup";
import SwitchButton from "../../component/SwitchButton";
import Editicon from "../../component/icons/Editicon";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import ImageUploading from "react-images-uploading";
import ImgUpload from "../../component/ImgUpload";
import Deleteicon from "../../component/icons/Deleteicon";

const initialValues = {
  yourLink: "",
};
const onSubmit = (values) => {
  console.log("values", values);
};
const validationSchema = Yup.object({
  yourLink: Yup.string().required("Add You Link*"),
});

const Link = () => {
  const [imageSrc, setImageSrc] = useState();
  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  // const [images, setImages] = useState([]);
  // const maxNumber = 69;

  // const onChange = (imageList, addUpdateIndex) => {
  //   // data for submit
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // };
  const linksList = [
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
  ];
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
        <DragDropContext>
          <Droppable droppableId="characters" className="soical-drag">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {linksList.map(({ id, title, link }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="single-item mb-3">
                            <div className="link-and-icon">
                              <img
                                src="https://cdn-f.heylink.me/static/media/ic_swap_icon.60319cd6.svg"
                                alt=""
                              />
                              <SwitchButton />
                              <ImageUpload
                                handleImageSelect={handleImageSelect}
                                imageSrc={imageSrc}
                                setImageSrc={setImageSrc}
                                className="immmg"
                                style={{
                                  width: 65,
                                  height: 65,
                                  margin: 0,
                                }}
                              />
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
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
export default Link;
