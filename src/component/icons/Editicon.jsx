import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../form/FormikControl";
import LinkButton from "../form/LinkButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
const initialValues = {
  theLink: "",
};
const onSubmit = (values) => {};
const validationSchema = Yup.object({
  theLink: Yup.string().required("Add You Edit*"),
});

const Editicon = () => {
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
    <>
      <div className="edit-icon" onClick={openModal}>
        <EditIcon />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
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
                name="theLink"
                placeholder=""
                error="true"
              />
              <div className="login-btn">
                <LinkButton
                  type="submit"
                  buttontext="Save Edit"
                  onClick={sucesesEdit}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default Editicon;
