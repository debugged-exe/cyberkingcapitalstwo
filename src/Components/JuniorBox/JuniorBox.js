import React, { useState } from "react";
import "./JuniorBox.css";

const JuniorBox = () => {
  const [newFetchVisibility, setNewFetchVisibility] = useState(true);

  const [table, setTable] = useState("0");

  const onClick = (event) => {
    setTable(event.target.id);
    console.log(event.target.id);
  };

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
            <label className="boxName">{table}</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default JuniorBox;
