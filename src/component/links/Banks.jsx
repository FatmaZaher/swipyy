import React from "react";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import Select from "../../component/form/Select";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import bank from "../../assets/images/bank.png";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";

import Modal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../form/FormikControl";
import LinkButton from "../form/LinkButton";
import Swal from "sweetalert2";
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

const banksList = [
  { key: "Select your Banks", value: "" },
  { key: "Bank1", value: "Bank1" },
  { key: "Bank2", value: "Bank2" },
];
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
 const Banks = () => {
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
    <div className="banks-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="form-page">
            <FormikControl
              control="select"
              name="yourBanks"
              options={banksList}
              error="true"
            />
            <LinkButton
              type="submit"
              buttontext="Add Bank Account"
              icon="yes"
            />
          </Form>
        )}
      </Formik>
      <div className="your-links pt-4">
        <p className="your-links-header mb-3 mb-m-5">Bank Account</p>
        <div className="single-item mb-3">
          <div className="link-and-icon">
            <div className="single-item-img">
              <img src={bank} alt="" />
            </div>
            <div className="single-item-info">
              <p className="name-from-link">NCB Bank</p>
              <span className="the-link">https://sewarsa.com/</span>
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
                style={customStyles}
              >
                <div>
                  <h4 ref={(_subtitle) => (subtitle = _subtitle)}>Bank Information</h4>
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
                          name="accountNumber"
                          placeholder="type your bank account number here..."
                          error="true"
                          label="Account Bank Number"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          name="iban"
                          placeholder="type IBAN number here..."
                          error="true"
                          label="IBAN"
                        />
                        <div className="login-btn">
                          <LinkButton
                            type="submit"
                            buttontext="Save"
                            onClick={sucesesEdit}
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Modal>
            </div>
            <Deleteicon />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Banks;