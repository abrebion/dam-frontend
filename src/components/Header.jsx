import React, { useContext } from "react";
import UserContext from "../authentication/UserContext";
import CroppedLogo from "./CroppedLogo";
import LoginStatus from "./LoginStatus";
import Navigation from "./Navigation";

export default function Header({ toggleUploadModal }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  return (
    currentUser && (
      <header className="row my-3 align-items-center">
        <div className="col-2">
          <CroppedLogo width="200px" mb="0px" />
        </div>
        <div className="col-10 d-flex flex-column text-right">
          <LoginStatus />
          <Navigation toggleUploadModal={toggleUploadModal} />
        </div>
      </header>
    )
  );
}
