import React, { useState, useEffect, useContext } from "react";
import Header from "../components/navigation/Header";
import Search from "../components/assets/Search";
import AssetToolbar from "../components/assets/AssetToolbar";
import AssetList from "../components/assets/AssetList";
import UserContext from "../authentication/UserContext";
import api from "../api/apiHandler";
import { generateArchive } from "../helpers/cloudinary";

export default function Dashboard({ searchResults, setSearchResults, handleSearch, toggleUploadModal, match }) {
  const [userSelection, setUserSelection] = useState([]);
  const [userFeedback, setUserFeedback] = useState("");
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const [activeCollection, setActiveCollection] = useState(null);

  useEffect(() => {
    if (match.params.id && currentUser && currentUser.collections) {
      const activeCollectionDetails = currentUser.collections.find(el => el._id === match.params.id);
      setActiveCollection(activeCollectionDetails);
    }
  }, [match.params.id]);

  const handleAssetDelete = async id => {
    try {
      // console.log("You are about to delete the asset ", id);
      await api.delete("/assets/" + id);
      setSearchResults(searchResults.filter(el => el._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const selectAll = () => {
    setUserSelection([...searchResults]);
    // console.log("All files selected");
  };
  const clearAll = () => {
    setUserSelection([]);
    // console.log("All files cleared");
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

  const downloadArchive = async (url, name) => {
    let blob = await fetch(url).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    const link = document.createElement("a");
    link.download = name;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareSelection = async mode => {
    // console.log("User wants to share the following files: ", userSelection);
    const public_ids = userSelection.map(el => el.public_id);
    try {
      const response = await generateArchive(public_ids, mode);
      if (mode === "create") {
        downloadArchive(response.data.secure_url, "archive.zip");
      } else {
        // console.log(response);
        setUserFeedback(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToActiveCollection = async assets => {
    try {
      const response = await api.post("/collections/" + match.params.id + "/assets/add", assets);
      console.log(response.data);
      setActiveCollection(response.data);
      clearAll();
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromActiveCollection = async assets => {
    try {
      const response = await api.post("/collections/" + match.params.id + "/assets/delete", assets);
      console.log(response.data);
      setActiveCollection(response.data);
      clearAll();
    } catch (error) {
      console.error(error);
    }
  };

  const refreshActiveCollection = async () => {
    try {
      const response = await api.get("/collections/" + match.params.id + "/assets");
      setSearchResults(response.data.assets);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (match.params.id) {
      api
        .get("/collections/" + match.params.id + "/assets")
        .then(res => {
          setSearchResults(res.data.assets);
          // setTimeout(() => {
          //   setSearchResults(res.data.assets);
          // }, 10);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, []);

  return (
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} userFeedback={userFeedback} setUserFeedback={setUserFeedback} />
      <div className="row">
        <div className="col-3">
          <Search handleSearch={handleSearch} />
        </div>
        <div className="col-9">
          <AssetToolbar
            userSelection={userSelection}
            selectAll={selectAll}
            clearAll={clearAll}
            shareSelection={shareSelection}
            activeCollection={activeCollection}
            setActiveCollection={setActiveCollection}
            refreshActiveCollection={refreshActiveCollection}
            addToActiveCollection={addToActiveCollection}
            removeFromActiveCollection={removeFromActiveCollection}
          />
          <AssetList
            assets={searchResults}
            userSelection={userSelection}
            updateUserSelection={updateUserSelection}
            handleAssetDelete={handleAssetDelete}
            handleSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
