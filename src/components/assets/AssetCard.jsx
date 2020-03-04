import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatBytes from "../../helpers/formatBytes";
import AssetCardMenu from "./AssetCardMenu";

export default function AssetCard({ asset, isSelected, updateUserSelection, handleTogglePanel, handleAssetDelete }) {
  const [toggleSelect, setToggleSelect] = useState(isSelected);
  const [toggleEditMenu, setToggleEditMenu] = useState(false);
  const handleToggleSelect = () => {
    setToggleSelect(!toggleSelect);
    updateUserSelection(asset);
  };
  const handleToggleEditMenu = asset => {
    setToggleEditMenu(!toggleEditMenu);
  };

  const setAspectRatioClass = (width, height) => {
    if (width > height) return "landscape";
    return "portrait";
  };

  useEffect(() => {
    setToggleSelect(isSelected);
  }, [isSelected]);

  useEffect(() => {
    setToggleEditMenu(toggleEditMenu);
  }, [toggleEditMenu]);

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
            <img src={asset.secure_url} className={"card-img-top " + setAspectRatioClass(asset.meta_file_width, asset.meta_file_height)} alt="..." />
          </div>
          <div className="card-body">
            <small className="d-block text-truncate">{asset.name}</small>
            <div className="small text-muted">
              <span className="small">EAN: {asset.meta_ean13}</span>
              <div className="d-flex justify-content-between small">
                <span>{asset.type}</span>
                <span>.{asset.meta_file_extension}</span>
                <span>
                  {asset.meta_file_width}x{asset.meta_file_height}{" "}
                </span>
                <span>{formatBytes(asset.meta_file_bytes)} </span>
              </div>
            </div>
          </div>
        </div>
        {toggleEditMenu === true && (
          <AssetCardMenu asset={asset} handleToggleEditMenu={handleToggleEditMenu} handleTogglePanel={handleTogglePanel} handleAssetDelete={handleAssetDelete} />
        )}
      </div>
    </>
  );
}
