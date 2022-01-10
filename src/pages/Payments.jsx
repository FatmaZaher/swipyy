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

const Payments = () => {
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
      "Good job!",
      "The payment done successfully, enjoy your pro plan!",
      "success"
    );
    setIsOpen(false);
  }
  useEffect(() => {
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
        <Tab eventKey="PRO" title="It's time to turn PRO">
          <p className="your-links-header mb-3 mb-m-5">Mobile Devieces</p>
          <p className="p-payment">
            Get even more out of your bio link! Advanced analytics,unlimited
            customisations, dedicated support and much more. Upgrade or
            downgrade at any time.
          </p>
          <div className="packages">
            <Tabs
              defaultActiveKey="yearly"
              id="uncontrolled-tab-example"
              className="my-3"
            >
              <Tab eventKey="yearly" title="Yearly">
                <div className="payment-cards mt-5">
                  <div className="single-pay-card">
                    <p className="title-card">starter</p>
                    <p className="price-card">
                      $00.00 <span>\Forever</span>
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
                    <LinkButton type="" buttontext="your currnet plan" />
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
                      buttontext="Update"
                      onClick={() => submitPay(packageYearly.id)}
                    />
                    <span className="the-best">Best Sell</span>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="monthlly" title="Monthly">
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
                      buttontext="Update"
                      onClick={() => submitPay(packageMonthly.id)}
                    />
                    <span className="the-best">Best Sell</span>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Tab>
        <Tab eventKey="paymentMetod" title="Payment Method">
          <p className="your-links-header mb-3">Payment Method</p>

          <div className="input-payment-box">
            <input
              type="radio"
              id="PayPal"
              name="drone"
              value="PayPal"
              checked
            />
            <label htmlFor="PayPal" className="pay-card paypal">
              <div className="input-paypal">
                <span>PayPal</span>
              </div>

              <p className="p-payment">
                You will be redirected to the PayPal website after submitting
                your order
              </p>
              <img src={paypal} alt="" />
            </label>
          </div>
          <div className="input-payment-box">
            <input type="radio" id="dewey" name="drone" value="dewey" />

            <label htmlFor="dewey" className="pay-card credit">
              <div>
                <span>Pay with Credit Card</span>
              </div>
              <img src={creditCard} alt="" />
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                className="modal-form mt-3"
              >
                {(formik) => (
                  <Form className="login-form">
                    {/* <FormikControl
                    control="input"
                    type="text"
                    name="crdNumber"
                    placeholder="type the Card Number here.."
                    error="true"
                    label="Card Number*"
                  /> */}
                    <div className="form-control">
                      <label className="label">Card Number*</label>
                      <MaskedInput
                        mask={[
                          /[1-9]/,
                          /[1-9]/,
                          /[1-9]/,
                          /[1-9]/,
                          " ",
                          /[1-9]/,
                          /[1-9]/,
                          /[1-9]/,
                          /[1-9]/,
                          " ",
                          /[1-9]/,
                          /[1-9]/,
                          /[1-9]/,
                          /[1-9]/,
                          " ",
                        ]}
                        className="form-input mb-4"
                        placeholder="type the Card Number here.."
                        guide={false}
                        id="my-input-id"
                        onBlur={() => {}}
                        onChange={() => {}}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">Expire Date</label>
                      <MaskedInput
                        mask={[/[1-9]/, /[1-9]/, "/", /[1-9]/, /[1-9]/]}
                        className="form-input mb-4"
                        placeholder="mm / yy"
                        guide={false}
                        id="my-input-id"
                        onBlur={() => {}}
                        onChange={() => {}}
                      />
                    </div>

                    <FormikControl
                      control="input"
                      type="password"
                      name="securityCode"
                      placeholder="type the Card Security Code here.."
                      error="true"
                      label="Card Security Code*"
                    />
                    <div className="login-btn">
                      <LinkButton
                        type="submit"
                        buttontext="Pay"
                        onClick={sucesesEdit}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </label>
          </div>

          <p className="p-payment">
            <img src={clock} alt="" />
            We protect your payment information using encryption to provide
            bank-level security.
          </p>
        </Tab>
      </Tabs>
    </div>
  );
};
export default Payments;
