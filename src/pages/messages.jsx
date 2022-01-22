import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
// import { Table } from "react-bootstrap";
import SwitchButton from "../component/SwitchButton";
import FormikControl from "../component/form/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LinkButton from "../component/form/LinkButton";
import axios from "axios";

const initialValues = {
  messageText: "",
  succesMessageText: "",
};
const validationSchema = Yup.object({});
const Messages = (props) => {
  const { t } = props;

  const [settings, setSettings] = useState({});
  const [messages, setMessages] = useState([]);

  const config = JSON.parse(localStorage.getItem("headers"));

  const getAllSettings = async () => {
    props.onStartRequest(true);

    try {
      axios
        .get("https://test-place.site/api/user/message", config)
        .then((res) => {
          setSettings(res.data.data.Settings);
          setMessages(res.data.data.table);
          props.onFinishRequest(true);
        });
    } catch (error) {}
  };
  const settingsChange = (property, value) => {
    console.log({ property, value });
    let oldSettings = { ...settings };
    oldSettings[property] = value;
    let newSettings = oldSettings;
    setSettings(newSettings);
  };
  const apiChange = async (values) => {
    props.onStartRequest(true);

    try {
      axios
        .post("https://test-place.site/api/user/message/update", values, config)
        .then((res) => {
          getAllSettings();
        });
    } catch (error) {}
  };
  const changeMessageStatus = (value) => {
    const message_status = value === true ? 1 : 0;
    apiChange({ message_status });
  };
  const changMessage_text = (message_text) => {
    apiChange({ message_text });
  };
  const changeMessage_success = (message_success) => {
    apiChange({ message_success });
  };
  const changeMsg_name_status = (value) => {
    console.log(value);
    const msg_name_status = value === true ? 1 : 0;

    apiChange({ msg_name_status });
  };
  const changeMsg_email_status = (value) => {
    const msg_email_status = value === true ? 1 : 0;

    apiChange({ msg_email_status });
  };
  const changeEmailLabel = (email_label) => {
    apiChange({ email_label });
  };
  const changeNameLabel = (name_label) => {
    apiChange({ name_label });
  };
  useEffect(() => {
    getAllSettings();
  }, []);
  const exportCSV = async () => {
    try {
      axios
        .get("https://test-place.site/api/user/message/export", {
          ...config,
          responseType: "blob",
        })

        .then((blob) => {
          const href = window.URL.createObjectURL(blob.data);
          const a = document.createElement("a");
          a.download = "messages.csv";
          a.href = href;
          a.click();
          a.href = "";
        });
    } catch (error) {}
  };

  return (
    <>
      <div className="messages mb-3">
        <p className="your-links-header mb-3">{t("messages.title")}</p>
        <div className="messages-content">
          <div className="switch">
            <div className="single-item-switch">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="show"
                  checked={settings.message_status === 1 ? true : null}
                  onChange={(e) => changeMessageStatus(e.target.checked)}
                />
              </div>
            </div>
            <span>{t("messages.turn-on-of")}</span>
          </div>
          {settings.message_status ? (
            <>
              <p className="your-links-header my-3">
                {t("messages.apperance")}
              </p>
              <div className="highlights">
                <Formik>
                  <Form className="">
                    <div className="high-title">
                      <FormikControl
                        control="input"
                        type="text"
                        name="messageText"
                        placeholder={t("messages.message-text")}
                        label={t("messages.message-text")}
                        value={settings.message_text}
                        onChange={(e) =>
                          settingsChange("message_text", e.target.value)
                        }
                        onBlur={(e) => changMessage_text(e.target.value)}
                      />
                    </div>
                    <div className="high-title">
                      <FormikControl
                        control="input"
                        type="text"
                        name="succesMessageText"
                        placeholder={t("messages.success")}
                        label={t("messages.success")}
                        value={settings.message_success}
                        onChange={(e) =>
                          settingsChange("message_success", e.target.value)
                        }
                        onBlur={(e) => changeMessage_success(e.target.value)}
                      />
                    </div>
                    <p className="your-links-header my-3">
                      {t("messages.input-text")}
                    </p>
                    <div className="high-title with-border">
                      <FormikControl
                        control="input"
                        type="text"
                        name="yourName"
                        placeholder={t("messages.your-name")}
                        value={settings.name_label}
                        onBlur={(e) => changeNameLabel(e.target.value)}
                        onChange={(e) =>
                          settingsChange("name_label", e.target.value)
                        }
                      />
                      <div className="single-item-switch">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="msg_name_status"
                            value={1}
                            checked={
                              settings.msg_name_status === 1 ? true : null
                            }
                            onChange={(e) =>
                              changeMsg_name_status(e.target.checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="high-title with-border">
                    <FormikControl
                      control="input"
                      type="email"
                      name="yourEmail"
                      placeholder="Your email"
                    />
                    <div className="single-item-switch">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="show"
                          checked={settings.message_status === 1 ? true : null}
                          onChange={(e) =>
                            changeMessageStatus(e.target.checked)
                          }
                        />
                      </div>
                    </div>
                  </div> */}
                    <div className="high-title with-border">
                      <FormikControl
                        control="input"
                        type="nubmer"
                        name="yourEmail"
                        placeholder={t("messages.your-email")}
                        value={settings.email_label}
                        onBlur={(e) => changeEmailLabel(e.target.value)}
                        onChange={(e) =>
                          settingsChange("email_label", e.target.value)
                        }
                      />
                      <div className="single-item-switch">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="msg_email_status"
                            checked={
                              settings.msg_email_status === 1 ? true : null
                            }
                            onChange={(e) =>
                              changeMsg_email_status(e.target.checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="index">
        <div className="index-header">
          <p className="your-links-header mb-3">{t("messages.index")}</p>
          <LinkButton
            type=""
            buttontext={t("messages.export")}
            exportIcon="true"
            onClick={() => exportCSV()}
          />
        </div>
        <div className="index-content">
          <table className="table">
            <thead>
              <tr>
                <th>{t("messages.name")}</th>

                <th>{t("messages.email")}</th>
                <th>{t("messages.phone")}</th>
                <th>{t("messages.text")}</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr>
                  <td>{message.name}</td>

                  <td>{message.email}</td>
                  <td>{message.phone}</td>
                  <td>{message.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Messages;
