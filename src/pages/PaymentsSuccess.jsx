import React, { useState, useEffect } from "react";
var qs = require("qs");

const Payments = (props) => {
  const { t } = props;
  const [payment, setPayment] = useState({});
  useEffect(() => {
    props.onFinishRequest(true);

    const queryString = window.location.search;
    const query = decodeURIComponent(queryString).replace("?", "");
    var str = qs.parse(query);
    setPayment(str);
  }, []);
  return (
    <div className="success-page">
      {payment.status === "success" ? (
        <div className="container">
          <div className="success-img">
            <img
              src="https://www.halatrips.net/img/success-invoice.svg"
              alt=""
            />
          </div>
          <div className="success-title  mb-4">
            <h2 className="text-8">{t("payments.success_title")}</h2>
            <p className="lead">{t("payments.success_desc")} </p>
          </div>
          <div className="success-list">
            <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
              <div className="row">
                <div className="col-sm text-muted font-weight-bold">
                  {t("payments.transaction_id")}
                </div>
                <div className="col-sm text-sm-right font-weight-600" dir="ltr">
                  {payment.TransactionID}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm text-muted font-weight-bold">
                  {t("payments.date")}
                </div>
                <div className="col-sm text-sm-right font-weight-600">
                  {payment.Date}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm text-muted font-weight-bold">
                  {t("payments.success_title")}
                </div>
                <div className="col-sm text-sm-right font-weight-600">
                  Credit Card
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm text-muted font-weight-bold">
                  {t("payments.transaction_status")}
                </div>
                <div className="col-sm text-sm-right font-weight-600">
                  <span className="field-status bg-success">
                    {t("payments.status_success")}
                  </span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm text-muted font-weight-bold">
                  {t("payments.customer_name")}
                </div>
                <div className="col-sm text-sm-right font-weight-600">
                  {payment.customer_name}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm text-muted font-weight-bold">
                  {t("payments.payment_amount")}
                </div>
                <div className="col-sm text-sm-right text-6 font-weight-500">
                  <span className="room-single-price">
                    
                    {payment.amount} {t("payments.sar")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="success-img">
            <img src="https://www.halatrips.net/images/warning.svg" alt="" />
          </div>
          <div className="success-title mb-4">
            <h4 className="text-8 mb-4">{t("payments.failed_title")}</h4>
            <div className="alert alert-danger" role="alert">
              <h4 className=" m-0">{payment.response_message}</h4>
            </div>
          </div>
          <div className="success-list">
            <div className="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
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
                  {t("payments.transaction_status")}
                </div>
                <div className="col-sm text-sm-right font-weight-600">
                  <span className="field-status bg-danger">
                    {t("payments.status_failed")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Payments;
