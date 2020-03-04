import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../../authentication/UserContext";
import api from "../../api/apiHandler";

export default function CollectionToolbar() {
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;
  const [collectionForm, setCollectionForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("My New Collection");

  const handleNewCollection = async e => {
    e.preventDefault();
    try {
      const response = await api.post("/collections", {
        name: newCollectionName,
        user: currentUser._id
      });
      console.log("Response:", response.data);
      setCurrentUser({ ...currentUser, collections: [...currentUser.collections, response.data] });
      cancelNewCollection();
    } catch (error) {
      console.error(error);
    }
  };

  const cancelNewCollection = () => {
    setNewCollectionName("");
    setCollectionForm(false);
  };

  return (
    <div className="collection-toolbar mb-4 text-muted" style={{ backgroundColor: "white" }}>
      <ul>
        <li onClick={() => setCollectionForm(true)}>
          <FontAwesomeIcon icon={["far", "plus-square"]} />
          <span>Create New Collection</span>
        </li>
      </ul>
      {collectionForm && (
        <form>
          <div className="form-row">
            <div className="col-auto">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Type your new collection name..."
                value={newCollectionName}
                onChange={e => setNewCollectionName(e.target.value)}
                style={{ width: "250px" }}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary btn-sm" onClick={handleNewCollection}>
                Create
              </button>
            </div>
            <div className="col-auto">
              <button className="btn btn-light btn-sm" onClick={cancelNewCollection}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
