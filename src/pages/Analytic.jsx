import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../component/form/FormikControl";
import LinkButton from "../component/form/LinkButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupsIcon from "@mui/icons-material/Groups";
import MouseIcon from "@mui/icons-material/Mouse";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import Chart from 'react-apexcharts'

const initialValues = {
  theDate: "",
};
const validationSchema = Yup.object({});
const allDate = [
  { key: "Last Week", value: "lastWeek" },
  { key: "Last Month", value: "lastmonth" },
];

const Analytic = () => {
  const analyticInfoData = [
    {
      title: "Views",
      icon: <RemoveRedEyeIcon />,
      number: "156",
    },
    {
      title: "Unique Visitors",
      icon: <GroupsIcon />,
      number: "16",
    },
    {
      title: "Clicks",
      icon: <MouseIcon />,
      number: "1",
    },
    {
      title: "CTR",
      icon: <AutoGraphIcon />,
      number: "0.64%",
    },
  ];

  const chartOneOptons = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  };
  return (
    <div className="analytic">
      <div className="analytic-header">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className="link-form">
              <FormikControl
                control="select"
                name="theDate"
                options={allDate}
              />
            </Form>
          )}
        </Formik>
        <LinkButton type="" buttontext="Export to CSV" exportIcon="true" />
      </div>
      <div className="analytic-info">
        <ul className="analytic-info-list">
          {analyticInfoData.map((val, key) => {
            return (
              <li key={key} className="list-item">
                <div className="icon">{val.icon}</div>
                <div className="info">
                  <div className="title">{val.title}</div>
                  <div className="number">{val.number}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="analytic-charts">
        <div id="chart">
          <Chart 
            options={chartOneOptons.options}
            series={chartOneOptons.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};
export default Analytic;
