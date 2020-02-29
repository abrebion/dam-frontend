import React from "react";
import Header from "../components/Header";
import AssetToolbar from "../components/AssetToolbar";
import AssetList from "../components/AssetList";

export default function Dashboard({ toggleUploadModal }) {
  return (
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} />
      <div className="row">
        <div className="col-2" style={{ backgroundColor: "white" }}>
          <h4>Search</h4>
        </div>
        <div className="col-10" style={{ backgroundColor: "white" }}>
          <AssetToolbar />
          <AssetList />
        </div>
      </div>
    </div>
  );
}
