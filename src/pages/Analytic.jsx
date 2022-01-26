import React, { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../component/form/FormikControl";
import LinkButton from "../component/form/LinkButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupsIcon from "@mui/icons-material/Groups";
import MouseIcon from "@mui/icons-material/Mouse";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useTable } from "react-table";

import Chart from "react-apexcharts";
import MapChart from "../component/MapChart";
import axios from "axios";

const initialValues = {
  theDate: "",
};

const validationSchema = Yup.object({});
const allDate = [
  { key: "Last Week", value: "lastWeek" },
  { key: "Last Month", value: "lastmonth" },
];

const Analytic = (props) => {
  const { t } = props;

  const [settings, setSettings] = useState({});
  const [viewsGlobal, setViewsGlobal] = useState(null);
  const [uniqueChart, setUniqueChart] = useState(null);
  const [globalMarket, setGlobalMarket] = useState(null);
  const [viewsChart, setViewsChart] = useState(null);
  const [clicksChart, setClicksChart] = useState(null);
  const [countryTable, setCountryTable] = useState([]);
  const [cityTable, setCityTable] = useState([]);
  const [deviceTable, setDeviceTable] = useState([]);
  const [linkTable, setLinkTable] = useState([]);
  const [devicesChart, setDevicesChart] = useState(null);


  
  const [referrer, setReferrer] = useState([]);

  const analyticInfoData = [
    {
      title: t("analytic.views"),
      icon: <RemoveRedEyeIcon />,
      number: settings.views_count,
    },
    {
      title: t("analytic.unique-visitors"),
      icon: <GroupsIcon />,
      number: settings.unique_visitor_count,
    },
    {
      title: t("analytic.clicks"),
      icon: <MouseIcon />,
      number: settings.clicks,
    },
    {
      title: t("analytic.ctr"),
      icon: <AutoGraphIcon />,
      number: Math.round(settings.ctr),
    },
  ];

  const clicksOption = {
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
        text: t("analytic.clicks"),
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
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
        ],
      },
    },
  };

  const ctrOption = {
    series: [
      {
        name: "Desktops",
        data: [10, 71, 35, 51, 149, 62, 69, 191, 148],
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
        text: t("analytic.ctr"),
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
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
          "2021-11-06",
        ],
      },
    },
  };

  const data = React.useMemo(
    () => [
      {
        id: "1",
        device: "Apple iPhone	",
        views: "3 (90%)",
      },
      {
        id: "2",
        device: "Androied",
        views: "1 (10%)",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Device",
        accessor: "device",
      },
      {
        Header: "Views",
        accessor: "views",
      },
    ],
    []
  );
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
          text,
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
        chart: {
          type: "donut",
        },
        labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
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

  const getAllSettings = async () => {
    try {
      axios
        .get("https://test-place.site/api/user/analytics", config)
        .then((res) => {
          const data = res.data.data;
          setSettings(res.data.data);
          setViewsChart(handleViewsChart(data.views_chart, "Views"));
          setUniqueChart(handleViewsChart(data.unique_chart, "unique Views"));
          setClicksChart(handleViewsChart(data.clicks_chart, "Clicks"));

          setCountryTable(handleTable(data.country_table));
          setCityTable(handleTable(data.city_table));
          setDeviceTable(handleTable(data.city_table));

          setReferrer(handleTable(data.referrer));
          setLinkTable(data.link);
           setDevicesChart(handleDevicesChart(data.device_category));
          setGlobalMarket(handleGlobalMarket(data.views_global));
        });
    } catch (error) {}
  };

  useEffect(() => {
    getAllSettings();
  }, []);
  return (
    <div className="analytic">
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
                options={allDate}
              />
            </Form>
          )}
        </Formik>
        <LinkButton
          type=""
          buttontext={t("analytic.export")}
          exportIcon="true"
        />
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
              </li>
            );
          })}
        </ul>
      </div>
      <div className="link-performance-charts mb-3">
        <p className="your-links-header mb-3 mb-m-5">
          {t("analytic.link-date")}
        </p>
        <div className="charts">
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
            <Chart
              options={ctrOption.options}
              series={ctrOption.series}
              type="line"
              height={350}
            />
          </div>
        </div>
      </div>
      <div className="mobile-device final mb-3">
        <p className="your-links-header mb-3 mb-m-5">{t("analytic.links")}</p>
        <table class="table">
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
                    <td>{item.url}</td>
                    <td>{item.type}</td>
                    <td>{item.count}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className="row-2">
        {" "}
        <div className="device-category-charts mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.link-date")}
          </p>
          <Chart
            options={devicesChart.options}
            series={devicesChart.series}
            type="donut"
          />
        </div>
        <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.mobile-devieces")}
          </p>
          <table class="table">
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
      <div className="row-2">
        {" "}
        <div className="device-category-charts mb-3">
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
        <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.views-country-map")}
          </p>
          <MapChart />
        </div>
      </div>
      <div className="row-2">
        <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.views-country")}
          </p>
          <table class="table">
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
          <p className="your-links-header mb-3 mb-m-5">
            {t("analytic.views-city")}
          </p>
          <table class="table">
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
        <p className="your-links-header mb-3 mb-m-5">
          {t("analytic.views-referre")}
        </p>
        <table class="table">
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
      </div>
    </div>
  );
};
export default Analytic;
