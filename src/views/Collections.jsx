import React, { useContext } from "react";
import UserContext from "../authentication/UserContext";
import Header from "../components/Header";

export default function Collections({ toggleUploadModal }) {
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;

  return (
    <div className="container-fluid">
      <Header toggleUploadModal={toggleUploadModal} />
      <div className="row">
        <div className="col-12" style={{ backgroundColor: "white" }}>
          <h4>My Collections</h4>
        </div>
      </div>
    </div>
  );
}
