import React, { useState } from "react";
import "./JuniorBox.css";
import { AiOutlineSearch } from "react-icons/ai";
// import { usePagination } from "@mui/material/Pagination";

import FormInput from "../FormInput/FormInput";

const JuniorBox = () => {
  const [newFetchVisibility, setNewFetchVisibility] = useState(true);

  const [table, setTable] = useState("0");

  const onClick = (event) => {
    setTable(event.target.id);
    console.log(event.target.id);
  };

  const Data = [
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Kundan Surve",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Angel broking",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
    {
      leadId: 597,
      assigned: "JR01",
      leadName: "Dipam Patle",
      leadCont: 1122334455,
      whNumber: 1122334455,
      openNum: "inwna314",
      openName: "Nova",
      city: "Jaipur",
      tradingKnow: "yes",
      preLang: "English",
      sta1: null,
      sta2: null,
      handStat: null,
      coded: null,
      brokerName: "Zerodha",
    },
  ];

  return (
    <>
      <div className="JuniorBox">
        <div
          style={{
            width: "100%",
            padding: "1em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="btn">New Fetch</button>
        </div>
        <div
          className="buttons"
          style={{
            display: "flex",
            width: "100%",
            padding: "1em",
            justifyContent: "space-around",
          }}
        >
          <button className="btn" onClick={onClick} id="0">
            A
          </button>
          <button className="btn" onClick={onClick} id="1">
            B
          </button>
          <button className="btn" onClick={onClick} id="2">
            C
          </button>
        </div>

        <div className="junior-tables">
          <div className="table-1 table-box">
            <div className="search_section">
              <div
                style={{ paddingRight: "1em" }}
                className={"flex justify-end items-center center mt4 mb4"}
              >
                <label className={"b f3 ml1-ns mr3 "}>
                  Universal Search by :{" "}
                </label>
                <select
                  name="searchFilter"
                  // value={uFilter}
                  className={"f4 ml1 search_select "}
                  // onChange={(event) => handleUniversalChange(event)}
                >
                  <option value="*">--select--</option>
                  <option value="lead_id">Lead ID</option>
                  <option value="lead_name">Lead Name</option>
                  <option value="lead_phone_no">Lead Contact</option>
                  <option value="full_table">Full Table</option>
                </select>
              </div>
              <div
                style={{ paddingRight: "1em" }}
                className={"flex justify-center items-center center"}
              >
                {/* <label className={"b f3 ml1-ns mr3 mb0 uniSearch pa0"}>
                  Enter value :{" "}
                </label> */}
                <FormInput
                  type="text"
                  name="filter_value"
                  placeholder={"Enter Text"}
                  // value={universalFilter}
                  // onChange={(event) => handleUniSearch(event)}
                  // label={uFilter !== "*" ? `Enter ${uFilter}` : "Choose filter"}
                  style={{ marginTop: "0px", marginBottom: "0px" }}
                  // disabled={uFilter === "*" ? true : null}
                  required
                />

                <AiOutlineSearch
                  style={{ marginLeft: "0" }}
                  // onClick={(event) => handleUniversalFilter(event)}
                >
                  Filter
                </AiOutlineSearch>
              </div>
            </div>

            <table>
              <tr
                className="table-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <td>Lead Id</td>
                <td>Assigned to</td>
                <td>Lead Name</td>
                <td>Lead Contact</td>
                <td>Whatsapp Number</td>
                <td>Acc Opening Number</td>
                <td>Acc Opening Name</td>
                <td>City</td>
                <td>Trading Knowledge</td>
                <td>Preffered Language</td>
                <td>Status 1</td>
                <td>Status 2</td>
                <td>Handover Status</td>
                <td>Coded </td>
                <td>Broker Name</td>
                <td
                  style={{ border: "none", boxShadow: "none" }}
                  className="table_buttons"
                >
                  <button
                    style={{ border: "1px solid white", boxShadow: "none" }}
                    // style={{ backgroundColor: "#36A8AD" }}
                    // className="selector"
                  >
                    Controls
                  </button>
                  {/* <button
                    style={{ backgroundColor: "#FF4742" }}
                    className="selector"
                  >
                    Delete
                  </button>
                  <button
                    style={{ backgroundColor: "#2C974B" }}
                    className="selector"
                  >
                    Request
                  </button> */}
                </td>
              </tr>

              {Data.map((item, index) => {
                return (
                  <tr
                    className="table-value"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <td>{Data[index].leadId}</td>
                    <td>{Data[index].assigned}</td>
                    <td>{Data[index].leadName}</td>
                    <td>{Data[index].leadCont}</td>
                    <td>{Data[index].whNumber}</td>
                    <td>{Data[index].openNum}</td>
                    <td>{Data[index].openName}</td>
                    <td>{Data[index].city}</td>
                    <td>{Data[index].tradingKnow}</td>
                    <td>{Data[index].preLang}</td>
                    <td>{Data[index].sta1}</td>
                    <td>{Data[index].sta2}</td>
                    <td>{Data[index].handStat}</td>
                    <td>{Data[index].coded}</td>
                    <td>{Data[index].brokerName}</td>
                    <td
                      style={{ borderRight: "none" }}
                      className="table_buttons"
                    >
                      <button
                        style={{ backgroundColor: "#36A8AD" }}
                        className="selector"
                      >
                        Update
                      </button>
                      <button
                        style={{ backgroundColor: "#FF4742" }}
                        className="selector"
                      >
                        Delete
                      </button>
                      <button
                        style={{ backgroundColor: "#2C974B" }}
                        className="selector"
                      >
                        Request
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
            {/* <label className="boxName">{table}</label> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default JuniorBox;
