import React, { useState } from "react";
import AssetCard from "./AssetCard";
import AssetPanel from "../components/AssetPanel";

export default function AssetList({ data, userSelection, updateUserSelection }) {
  console.log("User Selection", userSelection);
  const isSelected = asset => !!userSelection.filter(el => el._id === asset._id).length;
  const [togglePanel, setTogglePanel] = useState(false);

  const handleTogglePanel = () => {
    setTogglePanel(!togglePanel);
  };

  return (
    <div className="position-relative">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-5">
        {data.map((asset, i) => (
          <AssetCard key={i} data={asset} isSelected={isSelected(asset)} updateUserSelection={updateUserSelection} handleTogglePanel={handleTogglePanel} />
        ))}
      </div>
      {togglePanel && <AssetPanel activeCard={0} handleTogglePanel={handleTogglePanel} />}
    </div>
  );
}
