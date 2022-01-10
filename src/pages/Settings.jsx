import React, { useState, useEffect } from "react";
import Editicon from "../component/icons/Editicon";
import EditIcon from "@mui/icons-material/Edit";

import SwitchButton from "../component/SwitchButton";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../component/form/FormikControl";
import LinkButton from "../component/form/LinkButton";
import Swal from "sweetalert2";
import Modal from "react-modal";
import axios from "axios";

import withReactContent from "sweetalert2-react-content";
import Success from "../component/icons/Success";
const MySwal = withReactContent(Swal);
const config = JSON.parse(localStorage.getItem("headers"));

const Settings = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [settings, setSettings] = useState({});
  const initialValues = {
    password: "",
    new_password: "",
    new_password_confirmation: "",
  };
  function sucesesEdit() {
    Swal.fire("Good job!", "Edited successfully!", "success");
    // Swal.fire({
    //   title: 'Image icon',
    //   iconHtml: '<img src="https://www.linkpicture.com/q/Icon-2_1.png">',
    //   customClass: {
    //     icon: 'no-border'
    //   }
    // })
    setIsOpen(false);
  }
  const onSubmit = (values) => {
    axios
      .post("https://test-place.site/api/user/settings/update", values, config)
      .then((res) => {
        getAllSettings();
        sucesesEdit();
      });
  };

  const validationSchema = Yup.object({
    // accountNumber: Yup.string().required("Select Your Bank*"),
    // iban: Yup.string().required("Select Your Bank*"),
  });
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const getAllSettings = async () => {
    try {
      axios
        .get("https://test-place.site/api/user/settings", config)
        .then((res) => {
          setSettings(res.data.data.Settings);
        });
    } catch (error) {}
  };
  const handleEditData = (key, e) => {
    getAllSettings();
  };

  useEffect(() => {
    getAllSettings();
  }, []);
  return (
    <div className="settings">
      <p className="your-links-header mb-3 mb-m-5">PASSWORD & SECURITY</p>{" "}
      <div className="single-item mb-3">
        <div className="link-and-icon">
          <div className="single-item-info">
            <p className="name-from-link">Current Email</p>
            <span className="the-link">{settings.email}</span>
          </div>
        </div>
        <div className="link-action">
          <Editicon
            item={settings}
            config={config}
            onSaveData={() => handleEditData()}
            api="user/settings/update"
          />
        </div>
      </div>
      <div className="single-item mb-3 mb-md-5">
        <div className="link-and-icon">
          <div className="single-item-info">
            <p className="name-from-link">Paswword</p>
            <span className="the-link">{settings.password}</span>
          </div>
        </div>
        <div className="link-action">
          <div>
            <div className="edit-icon" onClick={openModal}>
              <EditIcon />
            </div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <div>
                <h4 ref={(_subtitle) => (subtitle = _subtitle)}>
                  Change Password
                </h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                  className="modal-form"
                >
                  {(formik) => (
                    <Form className="login-form">
                      <FormikControl
                        control="input"
                        type="password"
                        name="password"
                        placeholder="type current password here.."
                        error="true"
                        label="Current Password*"
                      />
                      <FormikControl
                        control="input"
                        type="password"
                        name="new_password"
                        placeholder="type the new password here.."
                        error="true"
                        label="New password*"
                      />
                      <FormikControl
                        control="input"
                        type="password"
                        name="new_password_confirmation"
                        placeholder="type the new password here.."
                        error="true"
                        label="Repeat New password*"
                      />
                      <div className="login-btn">
                        <LinkButton
                          type="submit"
                          buttontext="Change password"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className="high-header">
        <p>
          Turn On / Off email notifications and promotional materials from
          HeyLink.me
        </p>
        <SwitchButton />
      </div>
    </div>
  );
};
export default Settings;
