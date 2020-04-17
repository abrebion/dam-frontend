import React, { useState } from "react";
import AssetCard from "./AssetCard";
import AssetPanel from "./AssetPanel";
import NoResults from "./NoResults";
import { connect } from "react-redux";

const AssetList = ({ searchResults, currentAsset, userSelection, updateUserSelection }) => {
  const isSelected = (asset) => !!userSelection.filter((el) => el._id === asset._id).length;
  const [togglePanel, setTogglePanel] = useState(false);
  const [activeAsset, setActiveAsset] = useState(null);

  const handleTogglePanel = (asset) => {
    setActiveAsset(asset);
    setTogglePanel(!togglePanel);
  };

  return (
    <div className="position-relative">
      {searchResults && searchResults.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
          {searchResults.map((asset, i) => (
            <AssetCard key={i} asset={asset} isSelected={isSelected(asset)} updateUserSelection={updateUserSelection} handleTogglePanel={handleTogglePanel} />
          ))}
        </div>
      ) : (
        <NoResults />
      )}
      {Object.keys(currentAsset).length !== 0 && (
        <AssetPanel
          asset={activeAsset}
          handleTogglePanel={(e) => {
            e.persist();
            handleTogglePanel();
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.search.results,
    searchLoading: state.search.loading,
    currentAsset: state.assets.currentAsset,
  };
};

export default connect(mapStateToProps)(AssetList);
