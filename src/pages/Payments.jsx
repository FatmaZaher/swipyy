import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LinkButton from "../component/form/LinkButton";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormikControl from "../component/form/FormikControl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import paypal from "../assets/images/paypal.png";
import creditCard from "../assets/images/creditCard.png";
import Datepicker from "../component/form/Datepicker";
import ImgCrop from "../component/ImgCrop";

import clock from "../assets/images/clock.png";
import axios from "axios";

import MaskedInput from "react-text-mask";
const config = JSON.parse(localStorage.getItem("headers"));

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

const Payments = (props) => {
  const { t } = props;

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [packageMonthly, setPackageMonthly] = useState({});
  const [packageYearly, setPackageYearly] = useState({});
  const [packageHalf, setPackageHalf] = useState({});
  const [packageDetails, setPackageDetails] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  const getAllPackageMonthly = async () => {
    try {
      axios
        .get("https://swipyy.com/api/user/package/monthly", config)
        .then((res) => {
          setPackageMonthly(res.data.data.data[0]);
          setPackageDetails(res.data.data.membership);
          // setSettings(res.data.data.Settings);
        });
    } catch (error) {}
  };
  const getAllPackageHalf = async () => {
    try {
      axios
        .get("https://swipyy.com/api/user/package/half", config)
        .then((res) => {
          setPackageHalf(res.data.data.data[0]);
          // setSettings(res.data.data.Settings);
        });
    } catch (error) {}
  };
  const getAllPackageYearly = async () => {
    try {
      axios
        .get("https://swipyy.com/api/user/package/yearly", config)
        .then((res) => {
          setPackageYearly(res.data.data.data[0]);

          // setSettings(res.data.data.Settings);
        });
    } catch (error) {}
  };
  const submitPay = async (packageId) => {
    // await window.open('https://swipyy.store/%D8%A8%D8%A7%D9%82%D8%A9-pro/p489955748', "_blank").focus();

    try {
      axios
        .post(
          "https://swipyy.com/api/user/myfatoorah/payment/" + packageId,
          {},
          config
        )
        .then((res) => {
          window.location.replace(res.data.data.url);

          // setPackageMonthly(res.data.data.data[0]);
          // setSettings(res.data.data.Settings);
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
      t("edit-success.good-job"),
      t("edit-success.payment-success"),
      t("edit-success.success")
    );
    setIsOpen(false);
  }
  useEffect(() => {
    props.onFinishRequest(true);

    getAllPackageMonthly();
    getAllPackageYearly();
    getAllPackageHalf();
  }, []);
  return (
    <div className="payments">
      <ImgCrop t={t} />
      <Tabs
        defaultActiveKey="PRO"
        id="uncontrolled-tab-example"
        className="mb-5"
      >
        <Tab eventKey="PRO" title={t("payments.time-turn")}>
          <div className="packages">
            <div className="payment-cards mt-5">
              <div className="single-pay-card">
                <p className="title-card">{t("payments.starter")}</p>
                <p className="price-card">
                  00.00 {t("payments.sar")}{" "}
                  <span>\{t("payments.forever")}</span>
                </p>
                {/* <ul className="list-card">
                      <li className="list-card-item">
                        <span>
                          <CheckCircleOutlineIcon />
                        </span>
                        Lorem ipsum dolor{" "}
                      </li>
                      <li className="list-card-item">
                        <span>
                          <CheckCircleOutlineIcon />
                        </span>
                        Lorem ipsum dolor{" "}
                      </li>
                      <li className="list-card-item">
                        <span>
                          <CheckCircleOutlineIcon />
                        </span>
                        Lorem ipsum dolor{" "}
                      </li>
                      <li className="list-card-item">
                        <span>
                          <CheckCircleOutlineIcon />
                        </span>
                        Lorem ipsum dolor{" "}
                      </li>
                    </ul> */}
                <LinkButton type="" buttontext={t("payments.currnet-plan")} />
              </div>
              <div className="single-pay-card">
                <p className="title-card">{t("payments.monthly")}</p>
                <p className="price-card">
                  {packageMonthly.amount} {t("payments.sar")}
                </p>
                {/* <ul className="list-card">
                      {packageMonthly.dtails
                        ? packageMonthly.dtails.map((item, index) => (
                            <li className="list-card-item">
                              <span>
                                <CheckCircleOutlineIcon />
                              </span>
                              {item.text}
                            </li>
                          ))
                        : null}
                    </ul> */}
                <LinkButton
                  buttontext={t("payments.update")}
                  onClick={() => submitPay(packageMonthly.id)}
                />
              </div>
              <div className="single-pay-card">
                <p className="title-card">{t("payments.6-months")}</p>
                <p className="price-card">
                  {packageHalf.amount} {t("payments.sar")}
                </p>
                {/* <ul className="list-card">
                      {packageMonthly.dtails
                        ? packageMonthly.dtails.map((item, index) => (
                            <li className="list-card-item">
                              <span>
                                <CheckCircleOutlineIcon />
                              </span>
                              {item.text}
                            </li>
                          ))
                        : null}
                    </ul> */}
                <LinkButton
                  buttontext={t("payments.update")}
                  onClick={() => submitPay(packageHalf.id)}
                />
              </div>

              <div className="single-pay-card">
                <p className="title-card">{t("payments.yearly")}</p>
                <p className="price-card">
                  {packageYearly.amount} {t("payments.sar")}
                </p>
                {/* <ul className="list-card">
                      {packageYearly.dtails
                        ? packageYearly.dtails.map((item, index) => (
                            <li className="list-card-item">
                              <span>
                                <CheckCircleOutlineIcon />
                              </span>
                              {item.text}
                            </li>
                          ))
                        : null}
                    </ul> */}
                <LinkButton
                  buttontext={t("payments.update")}
                  onClick={() => submitPay(packageYearly.id)}
                />
                <span className="the-best">{t("payments.best-sell")}</span>
              </div>
            </div>
          </div>
        </Tab>
        {packageDetails ? (
          <Tab eventKey="details" title={t("payments.membership_details")}>
            <div className="success-page">
              <div className="container">
                <div className="success-list ">
                  <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                    <div className="row">
                      <div className="col-sm text-muted font-weight-bold">
                        {t("payments.start_date")}
                      </div>
                      <div className="col-sm text-sm-right font-weight-600">
                        {packageDetails.start_date}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm text-muted font-weight-bold">
                        {t("payments.end_date")}
                      </div>
                      <div className="col-sm text-sm-right font-weight-600">
                        {packageDetails.end_date}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm text-muted font-weight-bold">
                        {t("payments.payment_method")}
                      </div>
                      <div className="col-sm text-sm-right font-weight-600">
                        Credit Card
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-sm text-muted font-weight-bold">
                        {t("payments.payment_amout")}
                      </div>
                      <div className="col-sm text-sm-right text-6 font-weight-500">
                        <span className="room-single-price">
                          {" "}
                          {t("payments.sar")} {packageDetails.amount}
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="text-center"></div>
                </div>
              </div>
            </div>
          </Tab>
        ) : null}
      </Tabs>
    </div>
  );
};
export default Payments;
