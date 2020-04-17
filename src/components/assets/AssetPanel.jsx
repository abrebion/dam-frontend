import React, { useContext } from "react";
import UserContext from "../../authentication/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { searchAssets } from "../../redux/actions/search";
import AssetUploader from "./AssetUploader";
import AddEditMetaData from "./AddEditMetaData";

const AssetPanel = ({ mode, asset, handleSearch, handleTogglePanel }) => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const handleUpload = (e) => {
    console.log("Upload new file");
  };
  return (
    <div className="asset-metadata">
      <FontAwesomeIcon icon={["fas", "times"]} className="asset-panel-close" onClick={handleTogglePanel} />
      {mode === "edit" ? (
        <div className="asset-panel-preview">
          <img src={asset.secure_url} alt="" />
        </div>
      ) : (
        <div className="asset-panel-upload">
          <AssetUploader handleSearch={handleSearch} mode="edit" />
        </div>
      )}

      <div className="asset-panel-actions">
        {currentUser && currentUser.role !== "user" && <FontAwesomeIcon icon="upload" className="action" title="Replace asset with new file" onClick={handleUpload} />}
        <FontAwesomeIcon icon="download" className="action" title="Download file to your desktop" />
        <FontAwesomeIcon icon="external-link-alt" className="action" title="Open file in a new tab" />
        <FontAwesomeIcon icon="link" className="action" title="Copy link to your clipboard" />
      </div>

      <AddEditMetaData mode="edit" asset={asset} handleTogglePanel={handleTogglePanel} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  asset: state.assets.currentAsset,
});

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (url) => dispatch(searchAssets(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetPanel);
