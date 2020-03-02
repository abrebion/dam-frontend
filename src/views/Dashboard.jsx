import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import AssetToolbar from "../components/AssetToolbar";
import AssetList from "../components/AssetList";
import api from "../api/apiHandler";

export default function Dashboard({ toggleUploadModal }) {
  const [searchResults, setSearchResults] = useState([]);
  const [userSelection, setUserSelection] = useState([]);

  // useEffect(() => {
  //   async function fetchAssets() {
  //     try {
  //       const fetchedAssets = await api.get("/assets/search?sort=-createdAt");
  //       console.log("All fetched assets", fetchedAssets.data);
  //       setSearchResults([...fetchedAssets.data]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchAssets();
  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   handleSearch();
  // }, [searchResults]);

  const handleSearch = async url => {
    try {
      if (url) {
        console.log("You performed a search to: ", url);
        const results = await api.get(url);
        setSearchResults(results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectAll = () => {
    setUserSelection([...searchResults]);
    console.log("All files selected");
  };
  const clearAll = () => {
    setUserSelection([]);
    console.log("All files cleared");
  };

  const updateUserSelection = asset => {
    const j = userSelection.findIndex(el => asset._id === el._id);
    if (j !== -1) {
      // Asset is already in the array, remove it
      userSelection.splice(j, 1);
      setUserSelection([...userSelection]);
    } else {
      setUserSelection([...userSelection, asset]);
    }
  };

  return (
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} />
      <div className="row">
        <div className="col-3">
          <Search handleSearch={handleSearch} />
        </div>
        <div className="col-9">
          <AssetToolbar userSelection={userSelection} selectAll={selectAll} clearAll={clearAll} />
          <AssetList assets={searchResults} userSelection={userSelection} updateUserSelection={updateUserSelection} />
        </div>
      </div>
    </div>
  );
}
