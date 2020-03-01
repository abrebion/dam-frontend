import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatBytes from "../helpers/formatBytes";
import AssetCardMenu from "./AssetCardMenu";

export default function AssetCard({ data, isSelected, updateUserSelection, handleTogglePanel }) {
  const [toggleSelect, setToggleSelect] = useState(isSelected);
  const [toggleEditMenu, setToggleEditMenu] = useState(false);
  const handleToggleSelect = () => {
    setToggleSelect(!toggleSelect);
    console.log("Item", data._id);

    updateUserSelection(data);
  };
  const handleToggleEditMenu = () => {
    setToggleEditMenu(!toggleEditMenu);
  };

  useEffect(() => {
    setToggleSelect(isSelected);
    // if (isSelected) updateUserSelection(id);
    return () => {
      // handleToggleSelect();
    };
  }, [isSelected]);
  return (
    <>
      <div className="col mb-4">
        <div className="card">
          <div className="card-select-btn">
            {toggleSelect === false ? (
              <FontAwesomeIcon icon={["far", "square"]} onClick={handleToggleSelect} />
            ) : (
              <FontAwesomeIcon icon={["fa", "check-square"]} onClick={handleToggleSelect} className="card-select-on" />
            )}
          </div>
          <div className="card-menu-btn">
            <FontAwesomeIcon icon="ellipsis-v" onClick={handleToggleEditMenu} />
          </div>
          <div className="card-image">
            <img src={data.secure_url} className="card-img-top" alt="..." />
          </div>
          <div className="card-body">
            <small className="d-block text-truncate">{data.name}</small>
            <div className="small text-muted">
              <span className="small">EAN: {data.meta_ean13}</span>
              <div className="d-flex justify-content-between small">
                <span>{data.type}</span>
                <span>.{data.meta_file_extension}</span>
                <span>
                  {data.meta_file_width}x{data.meta_file_height}{" "}
                </span>
                <span>{formatBytes(data.meta_file_bytes)} </span>
              </div>
            </div>
          </div>
        </div>
        {toggleEditMenu === true && <AssetCardMenu handleToggleEditMenu={handleToggleEditMenu} handleTogglePanel={handleTogglePanel} />}
      </div>
    </>
  );
}
