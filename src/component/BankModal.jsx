import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "./form/FormikControl";
import LinkButton from "./form/LinkButton";
import Modal from "react-modal";
import Swal from "sweetalert2";
import * as Yup from "yup";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const MySwal = withReactContent(Swal);

const BankModal = (props) => {
  const { t } = props;


  const { bank, banksList, config } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  let subtitle;
  const validationSchema = Yup.object({
    account_number: Yup.string().required("Select Your Bank*"),
    iban: Yup.string().required("Select Your Bank*"),
  });

  const initialValues = {
    account_number: bank.name,

    account_number: bank.account_number,
    iban: bank.iban,
    bank_id: bank.bank_id,
  };
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
  const onSubmit = async (values) => {
    try {
      await axios
        .put(
          `https://swipyy.com/api/user/bankUser/${bank.id}`,
          values,
          config
        )
        .then((res) => {
          props.onSaveData();

          sucesesEdit();
        });
    } catch (error) {}
  };
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
    Swal.fire(
      t("edit-success.good-job"),
      t("edit-success.edited-success"),
      t("edit-success.success")
    );
    setIsOpen(false);
  }
  return (
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
                  control="select"
                  name="bank_id"
                  options={banksList}
                  error="true"
                  value={formik.values.bank_id}
                  onChange={(e) =>
                    formik.setFieldValue("bank_id", e.target.value)
                  }
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="name"
                  placeholder="type your bank name here..."
                  error="true"
                  label="Account name"
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="account_number"
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
                  <LinkButton type="submit" buttontext="Save" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default BankModal;
