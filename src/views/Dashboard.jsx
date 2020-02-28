import React, { useState, useContext } from "react";
import Header from "../components/Header";

export default function Dashboard({ toggleUploadModal }) {
  return (
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} />
      <div className="row">
        <div className="col-2" style={{ backgroundColor: "white" }}>
          <h4>Search</h4>
        </div>
        <div className="col-10" style={{ backgroundColor: "white" }}>
          <h4>Asset List</h4>
        </div>
      </div>
    </div>
  );
}
