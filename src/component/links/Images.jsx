import React, { useState } from "react";
// import SwitchButton from "../../component/SwitchButton";
// import  Form from "react-bootstrap";

import Editicon from "../icons/Editicon";
import Deleteicon from "../icons/Deleteicon";
import DropImg from "../form/DropImg";
import { Accordion } from "react-bootstrap";
import FormikControl from "../form/FormikControl";
import { Formik, Form } from "formik";
import SwitchButton from "../SwitchButton";
import { Tabs, Tab } from "react-bootstrap";

const initialValues = {
  highTitle: "",
  imageSize: "",
};
const imagesSizeList = [
  { key: "Square 1:1 (width:Height)", value: "1" },
  { key: "Square 1:1 (width:Height)", value: "2" },
  { key: "Square 1:1 (width:Height)", value: "3" },
  { key: "Square 1:1 (width:Height)", value: "4" },
];

const Images = () => {
  const [color1, setColor1] = useState("#8055f0");
  const [color2, setColor2] = useState("#163152");
  const [color3, setColor3] = useState("#8055f0");

  return (
    <div className="images">
      <p className="your-links-header mb-3 mb-m-5">Image Sliders</p>
      <div className="single-link mb-3">
        <div className="link-and-icon">
          <SwitchButton />
          <div className="single-link-info">
            <p className="name-from-link">New Image Slider</p>
          </div>
        </div>
        <div className="link-action">
          <Editicon />
          <Deleteicon />
        </div>
      </div>
      <div className="drop-img">
        <DropImg />
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Description & link</Accordion.Header>
          <Accordion.Body>
            <div className="add-description">
              <div className="high-header">
                <p>Add Description</p>
                <SwitchButton />
              </div>
              <Formik initialValues={initialValues}>
                <Form className="">
                  <FormikControl
                    control="input"
                    name="title"
                    label="Title"
                    placeholder="image slider title"
                  />
                  <FormikControl
                    control="input"
                    name="description"
                    label="Description"
                    placeholder="image slider Description"
                  />
                </Form>
              </Formik>
            </div>
            <div className="add-description">
              <div className="high-header">
                <p>Add Link</p>
                <SwitchButton />
              </div>
              <Formik initialValues={initialValues}>
                <Form className="">
                  <FormikControl
                    control="input"
                    name="linkText"
                    label="Link Text"
                    placeholder="image slider Link text"
                  />
                  <FormikControl
                    control="input"
                    name="linkUrl"
                    label="Link URL"
                    placeholder="image slider Link URL"
                  />
                </Form>
              </Formik>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Shape & size</Accordion.Header>
          <Accordion.Body>
            <div className="add-description">
              <div className="high-header">
                <p>Add Image Shape & Size</p>
              </div>
              <Formik initialValues={initialValues}>
                <Form className="">
                  <FormikControl
                    control="select"
                    name="imageSize"
                    options={imagesSizeList}
                  />
                </Form>
              </Formik>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Appearance</Accordion.Header>
          <Accordion.Body>
            <div className="color-div">
              <p>Title & Description</p>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
              />
            </div>
            <div className="color-div">
              <p>Link Text Color</p>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
              />{" "}
            </div>
            <div className="color-div">
              <p>Title & Button Background color</p>
              <input
                type="color"
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
              />{" "}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default Images;
