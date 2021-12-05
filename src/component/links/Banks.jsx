import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import Select from "../../component/form/Select";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import bank from "../../assets/images/bank.png";
import LinkButton from "../../component/form/LinkButton";
import FormikControl from "../../component/form/FormikControl";
import Deleteicon from "../../component/icons/Deleteicon";
import Editicon from "../../component/icons/Editicon";

const initialValues = {
  yourBanks: "",
};
const onSubmit = (values) => {
  console.log("values", values);
};
const validationSchema = Yup.object({
  yourBanks: Yup.string().required("Select Your Bank*"),
});
const banksList = [
  { key: "Select your Banks", value: "" },
  { key: "Bank1", value: "Bank1" },
  { key: "Bank2", value: "Bank2" },
];
export default function Banks(){
  return (
    <div className="banks-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="link-form">
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
        <div className="single-link mb-3">
          <div className="link-and-icon">
            <div className="single-link-img">
              <img src={bank} alt="" />
            </div>
            <div className="single-link-info">
              <p className="name-from-link">NCB Bank</p>
              <span className="the-link">https://sewarsa.com/</span>
            </div>
          </div>
          <div className="link-action">
            <Editicon/>
            <Deleteicon />
          </div>
        </div>
      </div>
    </div>
  );
};
