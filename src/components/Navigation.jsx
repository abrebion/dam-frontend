import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../authentication/UserContext";

export default function Navigation({ toggleUploadModal }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  return (
    <div>
      <Link to="/dashboard">
        <button type="button" className="btn btn-outline-primary">
          Search Assets
        </button>
      </Link>
      <Link to="/collections">
        <button type="button" className="btn btn-outline-primary ml-2">
          My Collections
        </button>
      </Link>
      {currentUser.role !== "user" && (
        <button type="button" className="btn btn-primary ml-2" onClick={toggleUploadModal}>
          Upload Asset
        </button>
      )}
    </div>
  );
}
