import React, { useState, useContext } from "react";
import Header from "../components/navigation/Header";
import CollectionToolbar from "../components/collections/CollectionToolbar";
import CollectionList from "../components/collections/CollectionList";
import UserContext from "../authentication/UserContext";
import api from "../api/apiHandler";
import { generateArchive } from "../helpers/cloudinary";

export default function Collections({ toggleUploadModal }) {
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;
  const [userFeedback, setUserFeedback] = useState("");

  const handleDelete = async id => {
    try {
      // console.log("You are about to delete the collection:", id);
      await api.delete("/collections/" + id);
      setCurrentUser({ ...currentUser, collections: currentUser.collections.filter(el => el._id !== id) });
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
      const activeCollection = currentUser.collections.find(el => el._id === id);
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
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} userFeedback={userFeedback} setUserFeedback={setUserFeedback} />
      <div className="row">
        <div className="col-12">
          <CollectionToolbar />
        </div>
        <div className="col-12">
          <CollectionList collections={currentUser && currentUser.collections ? currentUser.collections : []} handleDelete={handleDelete} handleShare={handleShare} />
        </div>
      </div>
    </div>
  );
}
