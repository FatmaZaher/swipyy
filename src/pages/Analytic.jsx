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
  const viewsOption = {
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
        text: "Views",
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
  const uniqueOption = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 101, 489, 62, 69, 91, 188],
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
        text: "Unique Visitors",
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
        text: "Clicks",
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
        text: "CTR",
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
  const deviceCatOption = {
    series: [100, 1000],
    options: {
      chart: {
        type: "donut",
      },
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
  const globalMarket = {
    series: [
      {
        data: [0, 0, 0, 0, 300, 0],
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
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Asia",
          "France",
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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
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
        <LinkButton type="" buttontext="Export to CSV" exportIcon="true" />
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
          Link Performance by Date
        </p>
        <div className="charts">
          <div id="views">
            <Chart
              options={viewsOption.options}
              series={viewsOption.series}
              type="line"
              height={350}
            />
          </div>
          <div id="uniqueVisitors">
            <Chart
              options={uniqueOption.options}
              series={uniqueOption.series}
              type="line"
              height={350}
            />
          </div>
          <div id="clicks">
            <Chart
              options={clicksOption.options}
              series={clicksOption.series}
              type="line"
              height={350}
            />
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
      <div className="row-2">
        {" "}
        <div className="device-category-charts mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            Link Performance by Date
          </p>
          <Chart
            options={deviceCatOption.options}
            series={deviceCatOption.series}
            type="donut"
          />
        </div>
        <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">Mobile Devieces</p>
          <table
            {...getTableProps()}
            style={{
              fontSize: "14px",
              margin: "30px 0 0 0",
              width: "100%",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 1px #dee3ed8a",
                        padding: "15px 0",
                        color: "#bfbfbf",
                        fontWeight: "400",
                        minWidth: "30px",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            borderBottom: "solid 1px #dee3ed8a",
                            padding: "15px 0",
                            color: "#163152",
                            fontWeight: "400",
                            width: "30px",
                            fontSize: "10px",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row-2">
        {" "}
        <div className="device-category-charts mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            Views by Global Market
          </p>
          <Chart
            options={globalMarket.options}
            series={globalMarket.series}
            type="bar"
            height={150}
          />
        </div>
        <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">
            Views by Country (map)
          </p>
          <MapChart />
        </div>
      </div>
      <div className="row-2">
        <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">Views by Country</p>
          <table
            {...getTableProps()}
            style={{
              fontSize: "14px",
              margin: "30px 0 0 0",
              width: "100%",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 1px #dee3ed8a",
                        padding: "15px 0",
                        color: "#bfbfbf",
                        fontWeight: "400",
                        minWidth: "30px",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            borderBottom: "solid 1px #dee3ed8a",
                            padding: "15px 0",
                            color: "#163152",
                            fontWeight: "400",
                            width: "30px",
                            fontSize: "10px",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mobile-device mb-3">
          <p className="your-links-header mb-3 mb-m-5">Views by City</p>
          <table
            {...getTableProps()}
            style={{
              fontSize: "14px",
              margin: "30px 0 0 0",
              width: "100%",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        borderBottom: "solid 1px #dee3ed8a",
                        padding: "15px 0",
                        color: "#bfbfbf",
                        fontWeight: "400",
                        minWidth: "30px",
                      }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            borderBottom: "solid 1px #dee3ed8a",
                            padding: "15px 0",
                            color: "#163152",
                            fontWeight: "400",
                            width: "30px",
                            fontSize: "10px",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mobile-device final mb-3">
        <p className="your-links-header mb-3 mb-m-5">Views by Referrer</p>
        <table
          {...getTableProps()}
          style={{
            fontSize: "14px",
            margin: "30px 0 0 0",
            width: "100%",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      borderBottom: "solid 1px #dee3ed8a",
                      padding: "15px 0",
                      color: "#bfbfbf",
                      fontWeight: "400",
                      minWidth: "30px",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          borderBottom: "solid 1px #dee3ed8a",
                          padding: "15px 0",
                          color: "#163152",
                          fontWeight: "400",
                          width: "30px",
                          fontSize: "10px",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Analytic;
