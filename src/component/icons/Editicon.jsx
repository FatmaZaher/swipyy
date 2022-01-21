import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Editticons from "../icons/Editticons";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../form/FormikControl";
import LinkButton from "../form/LinkButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const MySwal = withReactContent(Swal);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Editicon = (props) => {
  const { t } = props;

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isName, setIsName] = React.useState(false);
  const { item, config, api, settingName } = props;
  function openModal() {
    setIsOpen(true);
  }
  if (props.openModal === true) {
    console.log(props.openModalItem);
    if ((item.id = props.openModalItem.id)) {
      console.log(item);
    }
  }
  const initialValues = {};
  let inputName;
  let labelName = "";
  let newItemId = item ? `/${item.id}` : "";
  let method = axios.patch;
  if (api === "user/link") {
    initialValues.url = item ? item.url : null;
    initialValues.name = item ? item.name : null;
    inputName = "url";
    labelName = t("modal-edit.url");
  } else if (api === "user/socialUser") {
    initialValues.url = item ? item.url : null;
    inputName = "url";
  } else if (api === "user/files/update") {
    initialValues.name = item ? item.name : null;
    inputName = "name";
    method = axios.post;
  } else if (api === "user/location") {
    initialValues.name = item ? item.location : null;
    inputName = "name";
  } else if (api === "user/appearance/update") {
    newItemId = "";
    method = axios.post;
    if (settingName === "username") {
      initialValues.username = item ? item.username : null;
      inputName = "username";
    }
    if (settingName === "short_name") {
      initialValues.short_name = item ? item.short_name : null;
      inputName = "short_name";
    }
    if (settingName === "title") {
      initialValues.title = item ? item.title : null;
      inputName = "title";
    }
  } else if (api === "user/settings/update") {
    initialValues.email = item ? item.email : null;
    inputName = "email";
  }

  const validationSchema = Yup.object({});
  const onSubmit = async (values) => {
    try {
      await method(
        `https://test-place.site/api/${api}${newItemId}`,
        values,
        config
      ).then((res) => {
        props.onSaveData();

        sucesesEdit();
        if (settingName === "username") {
          window.location.reload();
        }
      });
    } catch (error) {}
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  function sucesesEdit() {
    Swal.fire(
      t("modal-edit.good-job"),
      t("modal-edit.edited-success"),
      t("modal-edit.success")
    );
    setIsOpen(false);
  }

  useEffect(() => {
    if (api === "user/link") {
      setIsName(true);
    }
  }, []);
  return (
    <>
      <div className="edit-icon" onClick={openModal}>
        <Editticons />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          <h4 ref={(_subtitle) => (subtitle = _subtitle)}>
            {t("modal-edit.edit")}
          </h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            className="modal-form"
          >
            {(formik) => (
              <Form className="login-form">
                {isName ? (
                  <FormikControl
                    control="input"
                    type="text"
                    name="name"
                    placeholder=""
                    error="true"
                    label={t("modal-edit.name")}
                  />
                ) : null}
                <FormikControl
                  control="input"
                  type="text"
                  name={inputName}
                  placeholder=""
                  error="true"
                  label={labelName}
                />
                <div className="edit-btn">
                  <div className="login-btn">
                    <LinkButton
                      type="submit"
                      buttontext={t("modal-edit.save-edit")}
                    />
                  </div>
                  <div className="login-btn">
                    <LinkButton
                      type="button"
                      buttontext={t("modal-edit.cancel")}
                      onClick={closeModal}
                      className="cancel-btn"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
export default Editicon;
