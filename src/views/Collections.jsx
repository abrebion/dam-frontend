import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import CollectionToolbar from "../components/CollectionToolbar";
import CollectionList from "../components/CollectionList";
import UserContext from "../authentication/UserContext";
import api from "../api/apiHandler";
import { generateArchive } from "../helpers/cloudinary";

export default function Collections() {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const [userCollections, setUserCollections] = useState([]);
  const [userFeedback, setUserFeedback] = useState("");

  useEffect(() => {
    if (currentUser._id) {
      async function fetchCollections() {
        try {
          const response = await api.get("/users/" + currentUser._id + "/collections");
          const fetchedCollections = response.data.data;
          console.log("Fetched Collections", fetchedCollections);
          setUserCollections(fetchedCollections);
        } catch (error) {
          console.log(error);
        }
      }
      fetchCollections();
    }
  }, [currentUser._id]);

  const handleDelete = async id => {
    try {
      // console.log("You are about to delete the collection:", id);
      await api.delete("/collections/" + id);
      setUserCollections(userCollections.filter(el => el._id !== id));
    } catch (error) {
      console.log(error);
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

  const handleShare = async (id, mode) => {
    try {
      const activeCollection = userCollections.find(el => el._id === id);
      // console.log("Selected Collection", activeCollection);
      const assets = await api.get("/collections/" + activeCollection._id + "/assets");
      // console.log("Assets in selected collection", response.data.assets);
      const public_ids = assets.data.assets.map(el => el.public_id);
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
    currentUser && (
      <div className="container-fluid">
        <Header userFeedback={userFeedback} setUserFeedback={setUserFeedback} />
        <div className="row">
          <div className="col-12">
            <CollectionToolbar userCollections={userCollections} setUserCollections={setUserCollections} />
          </div>
          <div className="col-12">
            <CollectionList collections={userCollections} handleDelete={handleDelete} handleShare={handleShare} />
          </div>
        </div>
      </div>
    )
  );
}
