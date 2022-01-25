import React, { useState, useEffect } from "react";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import Select from "../../component/form/Select";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import bank from "../../assets/images/bank.png";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";

import Modal from "react-modal";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../form/FormikControl";
import LinkButton from "../form/LinkButton";
import withReactContent from "sweetalert2-react-content";
import BankModal from "../BankModal";
import axios from "axios";
const config = JSON.parse(localStorage.getItem("headers"));

const Banks = (props) => {
  const { t } = props;

  const [banksList, setBanksList] = useState([]);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const initialValues = {
    bank_id: "",
  };
  const getBankList = async () => {
    try {
      await axios
        .get("https://test-place.site/api/user/bank/get", config)
        .then((res) => {
          setBanksList(res.data.data);
        });
    } catch (error) {}
  };
  const onSubmit = (values) => {
    props.onStartRequest(false);

    axios
      .post("https://test-place.site/api/user/bankUser", values, config)
      .then((res) => {
        getBanks();
      });
      setOpen(true);
  };

  const validationSchema = Yup.object({
    bank_id: Yup.string().required(t("links.banks.add-your-bank")),
  });
  const getBanks = () => {
    axios
      .get("https://test-place.site/api/user/bankUser", config)
      .then((res) => {
        setItems(res.data.data);
        props.onFinishRequest(false);
      });
  };
  useEffect(() => {
    getBanks();
    getBankList();
  }, []);
  const handleEditData = (key, e) => {
    props.onStartRequest(true);

    getBanks();
  };
  const handleChangeSwitch = (id, value) => {
    const newValue = value === true ? "active" : "inactive";
    axios
      .patch(
        "https://test-place.site/api/user/bankUser/" + id,
        { status: newValue },
        config
      )
      .then((res) => {
        getBanks();
      });
  };

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
              name="bank_id"
              options={banksList}
              error="true"
            />
            <LinkButton
              type="submit"
              buttontext={t("links.banks.button")}
              icon="yes"
              disabled={formik.values.bank_id === "" ? true : false}
            />
          </Form>
        )}
      </Formik>
      <div className="your-links pt-4">
        <p className="your-links-header mb-3 mb-m-5">
          {t("links.banks.location-header")}
        </p>
        {items.map((bank, index) => (
          <div className="single-item mb-3">
            <div className="link-and-icon">
              <div className="single-item-img">
                <img src={bank.img} alt="" />
              </div>
              <div className="single-item-info">
                <p className="name-from-link">{bank.bank}</p>
                <span className="the-link">{bank.account_number}</span>
              </div>
            </div>
            <div className="link-action">
              <BankModal
                bank={bank}
                banksList={banksList}
                config={config}
                onSaveData={() => handleEditData()}
                t={t}

              />
              <Deleteicon
                item={bank}
                onSaveData={() => handleEditData()}
                config={config}
                api="user/bankUser"
                t={t}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Banks;
