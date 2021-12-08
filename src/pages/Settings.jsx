import React from "react";
import Editicon from "../component/icons/Editicon";
import EditIcon from "@mui/icons-material/Edit";

import SwitchButton from "../component/SwitchButton";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../component/form/FormikControl";
import LinkButton from "../component/form/LinkButton";
import Swal from "sweetalert2";
import Modal from "react-modal";

import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const initialValues = {
  accountNumber: "",
  iban: "",
};

const onSubmit = (values) => {
  console.log("values", values);
};

const validationSchema = Yup.object({
  accountNumber: Yup.string().required("Select Your Bank*"),
  iban: Yup.string().required("Select Your Bank*"),
});

const Settings = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  function sucesesEdit() {
    Swal.fire("Good job!", "Edited successfully!", "success");
    setIsOpen(false);
  }
  return (
    <div className="settings">
      <p className="your-links-header mb-3 mb-m-5">PASSWORD & SECURITY</p>{" "}
      <div className="single-link mb-3">
        <div className="link-and-icon">
          <div className="single-link-info">
            <p className="name-from-link">Current Email</p>
            <span className="the-link">FahadMuhayya_99@gmail.com</span>
          </div>
        </div>
        <div className="link-action">
          <Editicon />
        </div>
      </div>
      <div className="single-link mb-3 mb-md-5">
        <div className="link-and-icon">
          <div className="single-link-info">
            <p className="name-from-link">Paswword</p>
            <span className="the-link">Fahad************</span>
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
                        name="currentPassword"
                        placeholder="type current password here.."
                        error="true"
                        label="Current Password*"
                      />
                      <FormikControl
                        control="input"
                        type="password"
                        name="newPassword"
                        placeholder="type the new password here.."
                        error="true"
                        label="New password*"
                      />
                      <FormikControl
                        control="input"
                        type="password"
                        name="newPassword"
                        placeholder="type the new password here.."
                        error="true"
                        label="Repeat New password*"
                      />
                      <div className="login-btn">
                        <LinkButton
                          type="submit"
                          buttontext="Change password"
                          onClick={sucesesEdit}
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
