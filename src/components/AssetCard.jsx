import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatBytes from "../helpers/formatBytes";
import AssetCardMenu from "./AssetCardMenu";

export default function AssetCard({ img, name, ean, extension, bytes, width, height, type }) {
  const [toggleSelect, setToggleSelect] = useState(false);
  const [toggleEditMenu, setToggleEditMenu] = useState(false);
  const handleToggleSelect = () => {
    setToggleSelect(!toggleSelect);
  };
  const handleToggleEditMenu = () => {
    setToggleEditMenu(!toggleEditMenu);
  };
  return (
    <>
      <div className="col mb-4">
        <div className="card">
          <div className="card-select-btn">
            {toggleSelect === false ? (
              <FontAwesomeIcon icon={["far", "square"]} onClick={handleToggleSelect} />
            ) : (
              <FontAwesomeIcon icon={["far", "check-square"]} onClick={handleToggleSelect} className="card-select-on" />
            )}
          </div>
          <div className="card-menu-btn">
            <FontAwesomeIcon icon="ellipsis-v" onClick={handleToggleEditMenu} />
          </div>
          <div className="card-image">
            <img src={img} className="card-img-top" alt="..." />
          </div>
          <div className="card-body">
            <small className="d-block text-truncate">{name}</small>
            <div className="small text-muted">
              <span className="small">EAN: {ean}</span>
              <div className="d-flex justify-content-between small">
                <span>{type}</span>
                <span>
                  {width}x{height}{" "}
                </span>
                <span>{formatBytes(bytes)} </span>
              </div>
            </div>
          </div>
        </div>
        {toggleEditMenu === true && <AssetCardMenu handleToggleEditMenu={handleToggleEditMenu} />}
      </div>
    </>
  );
}
