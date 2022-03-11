import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../component/form/FormikControl";
import LinkButton from "../component/form/LinkButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupsIcon from "@mui/icons-material/Groups";
import MouseIcon from "@mui/icons-material/Mouse";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import QuestionIcon from "../component/icons/QuestionIcon";

import Chart from "react-apexcharts";
import MapChart from "../component/MapChart";
import axios from "axios";

const initialValues = {
  theDate: "",
};

const validationSchema = Yup.object({});
const allDate = [
  { id: 7, name: "last Week" },
  { id: 14, name: "Last 2 Weeks" },
  { id: 30, name: "Last Month" },
  { id: 90, name: "Last 3 Months" },
  { id: 180, name: "Last 6 Months" },
];

const Analytic = (props) => {
  const { t } = props;

  const { user } = useSelector((state) => state.auth);
  let currentUser = {};
  if (user) {
    currentUser = user.data;
  }
  const [settings, setSettings] = useState({});
  const [viewsGlobal, setViewsGlobal] = useState(null);
  const [uniqueChart, setUniqueChart] = useState(null);
  const [globalMarket, setGlobalMarket] = useState(null);
  const [viewsChart, setViewsChart] = useState(null);
  const [clicksChart, setClicksChart] = useState(null);
  const [ctrChart, setCtrChart] = useState(null);

  const [countryTable, setCountryTable] = useState([]);
  const [cityTable, setCityTable] = useState([]);
  const [deviceTable, setDeviceTable] = useState([]);
  const [linkTable, setLinkTable] = useState([]);
  const [devicesChart, setDevicesChart] = useState(null);
  const [duration, setDuration] = useState(180);

  const [referrer, setReferrer] = useState([]);

  const analyticInfoData = [
    {
      title: t("analytic.views"),
      icon: <RemoveRedEyeIcon />,
      number: settings.views_count,
      info: "info_box_1",
    },
    {
      title: t("analytic.unique-visitors"),
      icon: <GroupsIcon />,
      number: settings.unique_visitor_count,
      info: "info_box_2",
    },
    {
      title: t("analytic.clicks"),
      icon: <MouseIcon />,
      number: settings.clicks,
      info: "info_box_3",
    },
    {
      title: t("analytic.ctr"),
      icon: <AutoGraphIcon />,
      number: Math.round(settings.ctr),
      info: "info_box_4",
    },
  ];

  const checkIsPro = () => {
    if (currentUser.is_pro === false) {
      console.log(currentUser);

      return (
        <div className="locked-content__component">
          <div className="locked-content-header">
            <div className="locked-content-header-image"></div>
            <div className="locked-content-header-text">
              {t("analytic.pro_1")} <br />
              {t("analytic.pro_2")} <a href="/billing">{t("analytic.pro_3")}</a>
            </div>
          </div>
          <div className="locked-content-wrapper"></div>
        </div>
      );
    }
  };

  const config = JSON.parse(localStorage.getItem("headers"));
  const handleViewsChart = (values, text) => {
    const categories = Object.keys(values);
    const series = Object.values(values);

    const viewsOption = {
      series: [
        {
          data: series,
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
          text: t("analytic." + text),
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories,
        },
      },
    };
    return viewsOption;
  };
  const handleGlobalMarket = (values, text) => {
    const categories = Object.keys(values);
    const series = Object.values(values);

    const globalMarket = {
      series: [
        {
          data: series,
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories,
        },
      },
    };
    return globalMarket;
  };
  const handleDevicesChart = (values) => {
    const labels = Object.keys(values);
    const series = Object.values(values);

    const deviceCatOption = {
      series,
      options: {
        labels,
        chart: {
          type: "donut",
          height: 100,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 150,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
    return deviceCatOption;
  };
  const handleTable = (values, text) => {
    const items = Object.entries(values);
    return items;
  };

  const getAllSettings = async (value) => {
    props.onStartRequest(false);

    try {
      axios
        .get(
          `https://swipyy.com/api/user/analytics/${value || duration}`,
          config
        )
        .then((res) => {
          const data = res.data.data;
          setSettings(res.data.data);
          setViewsChart(handleViewsChart(data.views_chart, "views"));
          setUniqueChart(
            handleViewsChart(data.unique_chart, "unique-visitors")
          );
          setClicksChart(handleViewsChart(data.clicks_chart, "clicks"));
          setCtrChart(handleViewsChart(data.ctr_chart, "ctr"));

          setCountryTable(handleTable(data.country_table));
          setCityTable(handleTable(data.city_table));
          setDeviceTable(handleTable(data.device_table));

          setReferrer(handleTable(data.referrer));
          setLinkTable(data.link);
          setDevicesChart(handleDevicesChart(data.device_category));
          console.log(handleDevicesChart(data.device_category));
          setGlobalMarket(handleGlobalMarket(data.views_global));

          props.onFinishRequest(false);
        });
    } catch (error) {}
  };
  const getNewCharts = (value) => {
    setDuration(value);
    getAllSettings(value);
  };
  const exportCSV = async (path) => {
    try {
      axios
        .get(
          `https://swipyy.com/api/user/analytics/export/${path}/${duration}`,
          {
            ...config,
            responseType: "blob",
          }
        )

        .then((blob) => {
          const href = window.URL.createObjectURL(blob.data);
          const a = document.createElement("a");
          a.download = `${path}.csv`;
          a.href = href;
          a.click();
          a.href = "";
        });
    } catch (error) {}
  };
  const exportLinks = () => {
    exportCSV("links");
  };
  const exportReferrer = () => {
    exportCSV("referrer");
  };
  useEffect(() => {
    getAllSettings();
  }, []);
  return (
    <div
      className={` analytic ${!currentUser.is_pro ? "not-pro-analytic" : null}`}
    >
      <div className="analytic-header">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className="form-page">
              <FormikControl
                control="select"
                name="theDate"
                value={duration}
                options={allDate}
                onChange={(e) => getNewCharts(e.target.value)}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div className="analytic-info mb-3">
        <ul className="analytic-info-list">
          {analyticInfoData.map((val, key) => {
            return (
              <li key={key} className="list-item">
                <div className="icon">{val.icon}</div>
                <div className="info">
                  <div className="title">{val.title}</div>
                  <div className="number">{val.number}</div>
                </div>
                <div className="info-box">
                  <div className="info-box-icon">
                    <QuestionIcon />
                  </div>
                  <div className="info-box-text">
                    <span>{t("analytic." + val.info)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="link-performance-charts mb-3">
        <p className="your-links-header mb-3 mb-m-5">
          {t("analytic.link-date")}
        </p>
        <div className="charts" dir="ltr">
          <div id="views">
            {viewsChart ? (
              <Chart
                options={viewsChart.options}
                series={viewsChart.series}
                type="line"
                height={350}
              />
            ) : null}
          </div>
          <div id="uniqueVisitors">
            {uniqueChart ? (
              <Chart
                options={uniqueChart.options}
                series={uniqueChart.series}
                type="line"
                height={350}
              />
            ) : null}
          </div>
          <div id="clicks">
            {clicksChart ? (
              <Chart
                options={clicksChart.options}
                series={clicksChart.series}
                type="line"
                height={350}
              />
            ) : null}
          </div>
          <div id="ctr">
            {ctrChart ? (
              <Chart
                options={ctrChart.options}
                series={ctrChart.series}
                type="line"
                height={350}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="mobile-device final mb-3">
        {checkIsPro()}
        <p className="your-links-header mb-3 mb-m-5">{t("analytic.links")}</p>
        <Table responsive>
          <thead>
            <tr>
              <th>{t("analytic.url")}</th>
              <th>{t("analytic.type")}</th>
              <th>{t("analytic.count")}</th>
            </tr>
          </thead>
          <tbody>
            {linkTable
              ? linkTable.map((item, index) => (
                  <tr key={index}>
                    <td>
                      
                      <span className="text-truc" dir="ltr">
                        {item.url}
                      </span>
                    </td>
                    <td>{item.type}</td>
                    <td>{item.count}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        {currentUser.is_pro ? (
          <div className="black-btn mt-5">
            <LinkButton
              type=""
              buttontext={t("analytic.export")}
              exportIcon="true"
              onClick={() => exportLinks()}
            />
          </div>
        ) : null}
      </div>
      <div className="row-2">
        <div className="device-category-charts mb-3" dir="ltr">
          {checkIsPro()}

          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.link-date")}
          </p>
          {devicesChart ? (
            <Chart
              options={devicesChart.options}
              series={devicesChart.series}
              type="donut"
            />
          ) : null}
        </div>
        <div className="mobile-device mb-3">
          {checkIsPro()}

          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.mobile-devices")}
          </p>
          <table className="table">
            <thead>
              <tr>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {deviceTable
                ? deviceTable.map((item, index) => (
                    <tr key={index}>
                      {item.map((device, deviceIndex) => (
                        <td key={deviceIndex}>{device}</td>
                      ))}
                    </tr>
                  ))
                : null}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="">
        
        <div className="device-category-charts mb-3">
          {checkIsPro()}

          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.views-global")}
          </p>
          {globalMarket ? (
            <Chart
              options={globalMarket.options}
              series={globalMarket.series}
              type="bar"
              height={150}
            />
          ) : null}
        </div>
        {/* <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.views-country-map")}
          </p>
          <MapChart />
        </div> */}
      </div>
      <div className="row-2">
        <div className="mobile-device mb-3">
          {checkIsPro()}

          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.views-country")}
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>{t("analytic.country")}</th>
                <th>{t("analytic.view")}</th>
              </tr>
            </thead>
            <tbody>
              {countryTable
                ? countryTable.map((item, index) => (
                    <tr key={index}>
                      {item.map((country, countryIndex) => (
                        <td key={countryIndex}>{country}</td>
                      ))}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="mobile-device mb-3">
          {checkIsPro()}

          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.views-city")}
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>Cite</th>

                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {cityTable
                ? cityTable.map((item, index) => (
                    <tr key={index}>
                      {item.map((city, cityIndex) => (
                        <td key={cityIndex}>{city}</td>
                      ))}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mobile-device final mb-3">
        {checkIsPro()}

        <p className="your-links-header mb-3 mb-m-5">
          {t("analytic.views-referre")}
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>{t("analytic.referre")}</th>
              <th>{t("analytic.view")}</th>
            </tr>
          </thead>
          <tbody>
            {referrer
              ? referrer.map((item, index) => (
                  <tr key={index}>
                    {item.map((referrerItem, referrerIndex) => (
                      <td key={referrerIndex}>{referrerItem}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {currentUser.is_pro ? (
          <div className="black-btn mt-5">
            <LinkButton
              type=""
              buttontext={t("analytic.export")}
              exportIcon="true"
              onClick={() => exportReferrer()}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Analytic;
