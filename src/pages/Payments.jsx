import React from "react";
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
              className="mb-3"
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
                    <p className="price-card">$25.00</p>
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
                    <LinkButton type="" buttontext="Update" />
                    <span className="the-best">Best Sell</span>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="monthlly" title="Monthly">
                <div className="payment-cards mt-5">
                  <div className="single-pay-card">
                    <p className="title-card">pro</p>
                    <p className="price-card">$25.00</p>
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
                    <LinkButton type="" buttontext="Update" />
                    <span className="the-best">Best Sell</span>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Tab>
        <Tab eventKey="paymentMetod" title="Payment Method">
          <p className="your-links-header mb-3">Payment Method</p>
          <div className="pay-card paypal">
            <div className="input-paypal">
              <input
                type="radio"
                id="PayPal"
                name="drone"
                value="PayPal"
                checked
              />
              <label for="PayPal">PayPal</label>
            </div>

            <p className="p-payment">
              You will be redirected to the PayPal website after submitting your
              order
            </p>
            <img src={paypal} alt="" />
          </div>

          <div className="pay-card credit">
            <div className="mb-4">
              <input type="radio" id="dewey" name="drone" value="dewey" />
              <label for="dewey">Pay with Credit Card</label>
            </div>
            <img src={creditCard} alt="" />
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
                    name="crdNumber"
                    placeholder="type the Card Number here.."
                    error="true"
                    label="Card Number*"
                  />
                  <div className="form-control">
                    <label className="label">Expire Date</label>
                    <Datepicker />
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
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
export default Payments;
