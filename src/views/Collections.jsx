import React from "react";
import Header from "../components/Header";

export default function Collections({ toggleUploadModal }) {
  return (
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} />
      <div className="row">
        <div className="col-12" style={{ backgroundColor: "white" }}>
          <h4>My Collections</h4>
        </div>
      </div>
    </div>
  );
}
