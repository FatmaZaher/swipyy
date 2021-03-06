import React, { useState, useEffect } from "react";
// import SwitchButton from "../../component/SwitchButton";
// import  Form from "react-bootstrap";
import { useSelector } from "react-redux";

import Editicon from "../icons/Editicon";
import Deleteicon from "../icons/Deleteicon";

import DropImg from "../form/DropImg";
import { Accordion } from "react-bootstrap";
import FormikControl from "../form/FormikControl";
import { Formik, Form } from "formik";
import SwitchButton from "../SwitchButton";
import axios from "axios";
import UploadLoading from "../../assets/images/UploadLoading.svg";
import LockModal from "../LockModal";
import LinkButton from "../form/LinkButton";

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
  const { t } = props;

  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }

  const [color1, setColor1] = useState("#8055f0");
  const [color2, setColor2] = useState("#163152");
  const [color3, setColor3] = useState("#8055f0");
  const [linkUrl, setlinkUrl] = useState("");
  const [linkText, setlinkText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [settings, setSettings] = useState({});
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  const apiChange = async (values) => {
    props.onStartRequest(false);

    try {
      axios
        .post("https://swipyy.com/api/user/slider/update", values, config)
        .then((res) => {
          getAllSlider();
        });
    } catch (error) {}
  };
  // const settingsChange = (property, value) => {
  //   let oldSettings = { ...settings };
  //   oldSettings[property] = value;
  //   let newSettings = oldSettings;
  //   setSettings(newSettings);
  // };
  const settingsChange = (property, value) => {
    let oldSettings = { ...settings };
    oldSettings[property] = value;
    let newSettings = oldSettings;
    setSettings(newSettings);
  };
  const onClick = (value) => {};
  const checkIsPro = (value) => {
    if (value == 1) {
      if (currentUser.is_pro == false) {
        setIsLockModalOpen(true);
        return false;
      }
    }
  };
  const handleCloseLockModal = () => {
    setIsLockModalOpen(false);
  };
  const changeSliderStatus = (value) => {
    // settingsChange("slider_status", value);
    // if (checkIsPro(1) == false) return;

    const slider_status = value == true ? 1 : 0;

    apiChange({ slider_status });
  };
  const changeDescriptionStatus = (value) => {
    const description_status = value == true ? 1 : 0;
    apiChange({ description_status });
  };
  const changeLinkStatus = (value) => {
    const link_status = value == true ? 1 : 0;
    apiChange({ link_status });
  };

  const changeTitleDescription = () => {
    apiChange({ description: settings.description, title: settings.title });
  };
  const changeLinkUrl = (link_url) => {
    apiChange({ link_url: settings.link_url, link_text: settings.link_text });
  };

  const getAllSlider = async () => {
    try {
      axios.get("https://swipyy.com/api/user/slider", config).then((res) => {
        setSettings(res.data.data.Settings);
        props.onFinishRequest(false);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getAllSlider();
  }, []);
  const handleEditData = (key, e) => {
    props.onStartRequest(true);

    getAllSlider();
  };
  return (
    <div className="images">
      <p className="your-links-header mb-3 mb-m-5">
        {t("links.images.image-sliders")}
      </p>
      <div className="single-item mb-3">
        <div className="link-and-icon">
          <div className="single-item-switch">
            <div className="checkbox">
              <input
                type="checkbox"
                name="show"
                checked={settings.slider_status == 1 ? true : false}
                onChange={(e) => changeSliderStatus(e.target.checked)}
              />
            </div>
          </div>
          <div className="single-item-info">
            <p className="name-from-link">
              {t("links.images.new-image-slider")}
            </p>
          </div>
        </div>
        <div className="link-action">
          {/* <Editicon />
          <Deleteicon /> */}
        </div>
      </div>
      {settings.slider_status == 1 ? (
        <>
          <div className="drop-img">
            <DropImg
              item={settings}
              config={config}
              uploadType="link"
              onSaveData={() => handleEditData()}
              t={t}
            />
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                {t("links.images.description-link")}
              </Accordion.Header>
              <Accordion.Body>
                <div className="add-description">
                  <div className="high-header">
                    <p>{t("links.images.add-description")}</p>
                    <div className="single-item-switch">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="show"
                          checked={
                            settings.description_status == 1 ? true : false
                          }
                          onChange={(e) =>
                            changeDescriptionStatus(e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Formik initialValues={initialValues}>
                    <Form className="mb-3">
                      {settings.description_status ? (
                        <>
                          <FormikControl
                            control="input"
                            name="title"
                            label={t("links.images.title")}
                            placeholder="image slider title"
                            value={settings.title}
                            onChange={(e) =>
                              settingsChange("title", e.target.value)
                            }
                            // onBlur={(e) => changeTitle(e.target.value)}
                          />
                          <FormikControl
                            control="input"
                            name="description"
                            label={t("links.images.description")}
                            placeholder="image slider Description"
                            value={settings.description}
                            onChange={(e) =>
                              settingsChange("description", e.target.value)
                            }
                            // onBlur={(e) => changeDescription(e.target.value)}
                          />
                          <LinkButton
                            type="submit"
                            buttontext={t("modal-edit.save-edit")}
                            onClick={() => {
                              changeTitleDescription();
                            }}
                            // icon="yes"
                            // disabled={formik.values.url == "" ? true : false}
                          />
                        </>
                      ) : null}
                    </Form>
                  </Formik>
                </div>
                <div className="add-description">
                  <div className="high-header">
                    <p>{t("links.images.add-link")}</p>
                    <div className="single-item-switch">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="show"
                          checked={settings.link_status == 1 ? true : false}
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
                            onChange={(e) =>
                              settingsChange("link_text", e.target.value)
                            }
                            // onBlur={(e) => changeLinkText(e.target.value)}
                          />
                          <FormikControl
                            control="input"
                            name="linkUrl"
                            label="Link URL"
                            placeholder="image slider Link URL"
                            value={settings.link_url}
                            onChange={(e) =>
                              settingsChange("link_url", e.target.value)
                            }
                            // onBlur={(e) => changeLinkUrl(e.target.value)}
                          />
                          <LinkButton
                            type="submit"
                            buttontext={t("modal-edit.save-edit")}
                            onClick={() => {
                              changeLinkUrl();
                            }}
                            // icon="yes"
                            // disabled={formik.values.url == "" ? true : false}
                          />
                        </>
                      ) : null}
                    </Form>
                  </Formik>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item eventKey="1">
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
            </Accordion.Item> */}
          </Accordion>
        </>
      ) : null}
      <LockModal
        modalIsOpen={isLockModalOpen}
        onCloseLockModal={() => handleCloseLockModal()}
      />
    </div>
  );
};
export default Images;
