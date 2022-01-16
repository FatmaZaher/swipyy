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
  const changeMsg_phone_status = (value) => {
    const msg_phone_status = value === true ? 1 : 0;

    apiChange({ msg_phone_status });
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
        <p className="your-links-header mb-3">Messages</p>
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
            <span>Turn ON / OFF Message</span>
          </div>
          {settings.message_status ? (
            <>
              <p className="your-links-header my-3">Apperance</p>
              <div className="highlights">
                <Formik>
                  <Form className="">
                    <div className="high-title">
                      <FormikControl
                        control="input"
                        type="text"
                        name="messageText"
                        placeholder="Message Text"
                        label="Message Text"
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
                        placeholder="Succes Message Text"
                        label="Succes Message Text"
                        value={settings.message_success}
                        onChange={(e) =>
                          settingsChange("message_success", e.target.value)
                        }
                        onBlur={(e) => changeMessage_success(e.target.value)}
                      />
                    </div>
                    <p className="your-links-header my-3">Input Field Text</p>
                    <div className="high-title with-border">
                      <FormikControl
                        control="input"
                        type="text"
                        name="yourName"
                        placeholder="Your name"
                        disabled
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
                        name="yourPhone"
                        placeholder="Your phone number"
                        disabled
                      />
                      <div className="single-item-switch">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="msg_phone_status"
                            checked={
                              settings.msg_phone_status === 1 ? true : null
                            }
                            onChange={(e) =>
                              changeMsg_phone_status(e.target.checked)
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
          <p className="your-links-header mb-3">Index</p>
          <LinkButton
            type=""
            buttontext="Export to CSV"
            exportIcon="true"
            onClick={() => exportCSV()}
          />
        </div>
        <div className="index-content">
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr>
                  <td>{message.enail}</td>
                  <td>{message.name}</td>
                  <td>{message.phone}</td>
                  <td>{message.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Table responsive className="index-table mt-5">
            <thead>
              <tr>
                <th></th>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <td>1</td>
              </tr>
              <tr>
                <td>2</td>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <td>1</td>
              </tr>
              <tr>
                <td>3</td>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <td>1</td>
              </tr>
            </tbody>
          </Table> */}
        </div>
      </div>
    </>
  );
};
export default Messages;
