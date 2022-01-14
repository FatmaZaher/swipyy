import React, { useState, useEffect } from "react";
// import SwitchButton from "../../component/SwitchButton";
// import  Form from "react-bootstrap";

import Editicon from "../icons/Editicon";
import Deleteicon from "../icons/Deleteicon";
import DropImg from "../form/DropImg";
import { Accordion } from "react-bootstrap";
import FormikControl from "../form/FormikControl";
import { Formik, Form } from "formik";
import SwitchButton from "../SwitchButton";
import axios from "axios";

const initialValues = {
  highTitle: "",
  imageSize: "",
};
const config = JSON.parse(localStorage.getItem("headers"));

const imagesSizeList = [
  { key: "Square 1:1 (width:Height)", value: "1" },
  { key: "Square 1:1 (width:Height)", value: "2" },
  { key: "Square 1:1 (width:Height)", value: "3" },
  { key: "Square 1:1 (width:Height)", value: "4" },
];

const Images = (props) => {
  const [color1, setColor1] = useState("#8055f0");
  const [color2, setColor2] = useState("#163152");
  const [color3, setColor3] = useState("#8055f0");
  const [settings, setSettings] = useState({});

  const apiChange = async (values) => {
    try {
      axios
        .post("https://test-place.site/api/user/slider/update", values, config)
        .then((res) => {
          getAllSlider();
        });
    } catch (error) {}
  };
  const settingsChange = (property, value) => {
    let oldSettings = { ...settings };
    oldSettings[property] = value;
    let newSettings = oldSettings;
    setSettings(newSettings);
  };
  const changeSliderStatus = (value) => {
    settingsChange("slider_status", value);

    const slider_status = value === true ? 1 : 0;

    apiChange({ slider_status });
  };
  const changeDescriptionStatus = (value) => {
    const description_status = value === true ? 1 : 0;
    apiChange({ description_status });
  };
  const changeLinkStatus = (value) => {
    const link_status = value === true ? 1 : 0;
    apiChange({ link_status });
  };
  const changeDescription = (description) => {
    apiChange({ description });
  };
  const changeTitle = (title) => {
    apiChange({ title });
  };
  const changeLinkText = (link_text) => {
    apiChange({ link_text });
  };
  const changeLinkUrl = (link_url) => {
    apiChange({ link_url });
  };

  const getAllSlider = async () => {
    try {
      axios
        .get("https://test-place.site/api/user/slider", config)
        .then((res) => {
          setSettings(res.data.data.Settings);
          props.onSaveData();
        });
    } catch (error) {}
  };

  useEffect(() => {
    getAllSlider();
  }, []);
  const handleEditData = (key, e) => {
    getAllSlider();
  };
  return (
    <div className="images">
      <p className="your-links-header mb-3 mb-m-5">Image Sliders</p>
      <div className="single-item mb-3">
        <div className="link-and-icon">
          <div className="single-item-switch">
            <div className="checkbox">
              <input
                type="checkbox"
                name="show"
                checked={settings.slider_status === 1 ? true : false}
                onChange={(e) => changeSliderStatus(e.target.checked)}
              />
            </div>
          </div>
          <div className="single-item-info">
            <p className="name-from-link">New Image Slider</p>
          </div>
        </div>
        <div className="link-action">
          {/* <Editicon />
          <Deleteicon /> */}
        </div>
      </div>
      {settings.slider_status ? (
        <>
          <div className="drop-img">
            <DropImg
              item={settings}
              config={config}
              uploadType="link"
              onSaveData={() => handleEditData()}
            />
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Description & link</Accordion.Header>
              <Accordion.Body>
                <div className="add-description">
                  <div className="high-header">
                    <p>Add Description</p>
                    <div className="single-item-switch">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="show"
                          checked={
                            settings.description_status === 1 ? true : false
                          }
                          onChange={(e) =>
                            changeDescriptionStatus(e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Formik initialValues={initialValues}>
                    <Form className="">
                      {settings.description_status ? (
                        <>
                          <FormikControl
                            control="input"
                            name="title"
                            label="Title"
                            placeholder="image slider title"
                            value={settings.title}
                            onBlur={(e) => changeTitle(e.target.value)}
                          />
                          <FormikControl
                            control="input"
                            name="description"
                            label="Description"
                            placeholder="image slider Description"
                            value={settings.description}
                            onBlur={(e) => changeDescription(e.target.value)}
                          />
                        </>
                      ) : null}
                    </Form>
                  </Formik>
                </div>
                <div className="add-description">
                  <div className="high-header">
                    <p>Add Link</p>
                    <div className="single-item-switch">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="show"
                          checked={settings.link_status === 1 ? true : false}
                          onChange={(e) => changeLinkStatus(e.target.checked)}
                        />
                      </div>
                    </div>
                  </div>
                  <Formik initialValues={initialValues}>
                    <Form className="">
                      {settings.link_status ? (
                        <>
                          <FormikControl
                            control="input"
                            name="linkText"
                            label="Link Text"
                            placeholder="image slider Link text"
                            value={settings.link_text}
                            onBlur={(e) => changeLinkText(e.target.value)}
                          />
                          <FormikControl
                            control="input"
                            name="linkUrl"
                            label="Link URL"
                            placeholder="image slider Link URL"
                            value={settings.link_url}
                            onBlur={(e) => changeLinkUrl(e.target.value)}
                          />
                        </>
                      ) : null}
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
                  />
                </div>
                <div className="color-div">
                  <p>Title & Button Background color</p>
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                  />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      ) : null}
    </div>
  );
};
export default Images;
