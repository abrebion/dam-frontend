import React, { useState, useEffect, useContext } from "react";
import Header from "../components/navigation/Header";
import Search from "../components/assets/Search";
import AssetToolbar from "../components/assets/AssetToolbar";
import AssetList from "../components/assets/AssetList";
import UserContext from "../authentication/UserContext";
import api from "../api/apiHandler";
import { generateArchive } from "../helpers/cloudinary";

export default function Dashboard({ toggleUploadModal, history, match }) {
  const [searchResults, setSearchResults] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [userFeedback, setUserFeedback] = useState("");
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;

  const activeCollection = match.params.id;
  // console.log("Active Collection", activeCollection);

  useEffect(() => {
    api
      .get("/collections/" + match.params.id + "/assets")
      .then(res => {
        setSearchResults(res.data.assets);
      })
      .catch(err => {
        console.error(err);
      });
  }, [match.params.id]);

  const handleSearch = async url => {
    try {
      if (url) {
        // console.log("You performed a search to: ", url);
        const results = await api.get(url);
        setSearchResults(results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} userFeedback={userFeedback} setUserFeedback={setUserFeedback} />
      <div className="row">
        <div className="col-3">
          <Search handleSearch={handleSearch} />
        </div>
        <div className="col-9">
          <AssetToolbar userSelection={userSelection} selectAll={selectAll} clearAll={clearAll} shareSelection={shareSelection} />
          <AssetList assets={searchResults} userSelection={userSelection} updateUserSelection={updateUserSelection} handleAssetDelete={handleAssetDelete} />
        </div>
      </div>
    </div>
  );
}
