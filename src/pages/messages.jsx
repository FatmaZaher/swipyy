import React from "react";
import { useTable } from "react-table";
// import { Table } from "react-bootstrap";
import SwitchButton from "../component/SwitchButton";
import FormikControl from "../component/form/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LinkButton from "../component/form/LinkButton";

const initialValues = {
  messageText: "",
  succesMessageText: "",
};
const validationSchema = Yup.object({});
const Messages = () => {
  const data = React.useMemo(
    () => [
      {
        id: "1",
        text: "Thanks",
        name: "fahad",
        email: "fahhalatrips@gmail.comad",
        date: "8 days ago",
        icon: "",
      },
      {
        id: "2",
        text: "Thanks",
        name: "fahad",
        email: "fahhalatrips@gmail.comad",
        date: "8 days ago",
        icon: "",
      },
      {
        id: "3",
        text: "Thanks",
        name: "fahad",
        email: "fahhalatrips@gmail.comad",
        date: "8 days ago",
        icon: "",
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
        Header: "Text",
        accessor: "text",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Date Received	",
        accessor: "date",
      },
      {
        Header: "",
        accessor: "icon",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div className="messages mb-3">
        <p className="your-links-header mb-3">Messages</p>
        <div className="messages-content">
          <div className="switch">
            <SwitchButton />
            <span>Turn ON / OFF Message</span>
          </div>
          <p className="your-links-header my-3">Apperance</p>
          <div className="highlights">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <Form className="">
                <div className="high-title">
                  <FormikControl
                    control="input"
                    type="text"
                    name="messageText"
                    placeholder="Message Text"
                    label="Message Text"
                  />
                </div>
                <div className="high-title">
                  <FormikControl
                    control="input"
                    type="text"
                    name="succesMessageText"
                    placeholder="Succes Message Text"
                    label="Succes Message Text"
                  />
                </div>
                <p className="your-links-header my-3">Input Field Text</p>
                <div className="high-title with-border">
                  <FormikControl
                    control="input"
                    type="text"
                    name="yourName"
                    placeholder="Your name"
                  />
                  <SwitchButton />
                </div>
                <div className="high-title with-border">
                  <FormikControl
                    control="input"
                    type="email"
                    name="yourEmail"
                    placeholder="Your email"
                  />
                  <SwitchButton />
                </div>
                <div className="high-title with-border">
                  <FormikControl
                    control="input"
                    type="nubmer"
                    name="yourPhone"
                    placeholder="Your phone number"
                  />
                  <SwitchButton />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <div className="index">
        <div className="index-header">
          <p className="your-links-header mb-3">Index</p>
          <LinkButton type="" buttontext="Export to CSV" exportIcon="true" />
        </div>
        <div className="index-content">
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
                        minWidth: "90px",
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
                            minWidth: "90px",
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
          {/* <Table responsive className="index-table mt-5">
            <thead>
              <tr>
                <th></th>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <td>1</td>
              </tr>
              <tr>
                <td>2</td>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <td>1</td>
              </tr>
              <tr>
                <td>3</td>
                <th>Text</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Received</th>
                <td>1</td>
              </tr>
            </tbody>
          </Table> */}
        </div>
      </div>
    </>
  );
};
export default Messages;
