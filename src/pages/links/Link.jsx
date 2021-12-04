import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ImageUpload from "image-upload-react";
import "image-upload-react/dist/index.css";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HideImageIcon from "@mui/icons-material/HideImage";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import tele from "../../assets/images/tele.png";
import * as Yup from "yup";
import SwitchButton from "../../component/SwitchButton";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import ImageUploading from "react-images-uploading";

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

  // const [images, setImages] = React.useState([]);
  // const maxNumber = 69;

  // const onChange = (imageList, addUpdateIndex) => {
  //   // data for submit
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // };
  return (
    <div className="link-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="link-form">
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
        <p className="your-links-header mb-5">
          Add Header
          <span className="icon">
            <HelpOutlineOutlinedIcon />
          </span>
        </p>

        <div className="single-link mb-3">
          <div className="link-and-icon">
            <SwitchButton />
            {/* <ImageUploading
              multiple
              value={images}
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
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <AddPhotoAlternateIcon />
                  </button>
                  &nbsp;
                  <button onClick={onImageRemoveAll}>
                    <HideImageIcon />
                  </button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          <UpdateIcon />
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          <DeleteOutlineIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading> */}
            <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: 65,
                height: 65,
                margin: 0,
              }}
            />
            <div className="single-link-info">
              <p className="name-from-link">sewarsa.com</p>
              <span className="the-link">
                <img src={tele} alt="" />
                https://sewarsa.com/
              </span>
            </div>
          </div>

          <div className="link-action">
            <span className="edit-icon">
              <EditIcon />
            </span>
            <span className="trash-icon">
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        </div>
        <div className="single-link mb-3">
          <div className="link-and-icon">
            <SwitchButton />
            {/* <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: 65,
                height: 65,
                margin: 0,
              }}
            /> */}
            <div className="single-link-info">
              <p className="name-from-link">sewarsa.com</p>
              <span className="the-link">
                <img src={tele} alt="" />
                https://sewarsa.com/
              </span>
            </div>
          </div>

          <div className="link-action">
            <span className="edit-icon">
              <EditIcon />
            </span>
            <span className="trash-icon">
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        </div>
        <div className="single-link mb-3">
          <div className="link-and-icon">
            <SwitchButton />
            {/* <ImageUpload
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: 65,
                height: 65,
                margin: 0,
              }}
            /> */}
            <div className="single-link-info">
              <p className="name-from-link">sewarsa.com</p>
              <span className="the-link">
                <img src={tele} alt="" />
                https://sewarsa.com/
              </span>
            </div>
          </div>

          <div className="link-action">
            <span className="edit-icon">
              <EditIcon />
            </span>
            <span className="trash-icon">
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Link;
