import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import Editticons from "./Editticons";
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
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { item, config, api } = props;
  function openModal() {
    setIsOpen(true);
  }
  let initialValues;
  let inputName;
  if (api === "user/link") {
    initialValues = {
      url: item ? item.url : null,
    };
    inputName = "url";
  } else if (api === "user/location") {
    initialValues = {
      name: item ? item.name : null,
    };
    inputName = "name";
  }

  const validationSchema = Yup.object({
    url: Yup.string().required("Add You Edit*"),
  });
  const onSubmit = async (values) => {
    try {
      await axios
        .patch(`https://test-place.site/api/${api}/${item.id}`, values, config)
        .then((res) => {
          props.onSaveData();

          sucesesEdit();
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
    Swal.fire("Good job!", "Edited successfully!", "success");
    setIsOpen(false);
  }
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
          <h4 ref={(_subtitle) => (subtitle = _subtitle)}>Edit</h4>
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
                  type="text"
                  name={inputName}
                  placeholder=""
                  error="true"
                />
                <div className="login-btn">
                  <LinkButton
                    type="submit"
                    buttontext="Save Edit"
                    onClick={onSubmit}
                  />
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
