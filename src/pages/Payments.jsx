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

  function openModal() {
    setIsOpen(true);
  }

  const getAllPackageMonthly = async () => {
    try {
      axios
        .get("https://test-place.site/api/user/package/monthly", config)
        .then((res) => {
          setPackageMonthly(res.data.data.data[0]);
          // setSettings(res.data.data.Settings);
        });
    } catch (error) {}
  };
  const getAllPackageYearly = async () => {
    try {
      axios
        .get("https://test-place.site/api/user/package/yearly", config)
        .then((res) => {
          setPackageYearly(res.data.data.data[0]);

          // setSettings(res.data.data.Settings);
        });
    } catch (error) {}
  };
  const submitPay = async (packageId) => {
    try {
      axios
        .post(
          "https://test-place.site/api/user/payment/" + packageId,
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
  }, []);
  return (
    <div className="payments">
      <Tabs
        defaultActiveKey="PRO"
        id="uncontrolled-tab-example"
        className="mb-5"
      >
        <Tab eventKey="PRO" title={t("payments.time-turn")}>
          <p className="your-links-header mb-3 mb-m-5">
            {" "}
            {t("payments.mobile-devieces")}
          </p>
          <p className="p-payment">{t("payments.pargraphe")}</p>
          <div className="packages">
            <Tabs
              defaultActiveKey="yearly"
              id="uncontrolled-tab-example"
              className="my-3"
            >
              <Tab eventKey="yearly" title={t("payments.yearly")}>
                <div className="payment-cards mt-5">
                  <div className="single-pay-card">
                    <p className="title-card">{t("payments.starter")}</p>
                    <p className="price-card">
                      $00.00 <span>\{t("payments.forever")}</span>
                    </p>
                    <ul className="list-card">
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
                    </ul>
                    <LinkButton
                      type=""
                      buttontext={t("payments.currnet-plan")}
                    />
                  </div>
                  <div className="single-pay-card">
                    <p className="title-card">pro</p>
                    <p className="price-card">${packageYearly.amount}</p>
                    <ul className="list-card">
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
                    </ul>
                    <LinkButton
                      buttontext={t("payments.update")}
                      onClick={() => submitPay(packageYearly.id)}
                    />
                    <span className="the-best">{t("payments.best-sell")}</span>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="monthlly" title={t("payments.monthly")}>
                <div className="payment-cards mt-5">
                  <div className="single-pay-card">
                    <p className="title-card">pro</p>
                    <p className="price-card">${packageMonthly.amount}</p>
                    <ul className="list-card">
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
                    </ul>
                    <LinkButton
                      buttontext={t("payments.update")}
                      onClick={() => submitPay(packageMonthly.id)}
                    />
                    <span className="the-best">{t("payments.best-sell")}</span>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
export default Payments;
