import React, { useContext } from "react";
import UserContext from "../../authentication/UserContext";
import CroppedLogo from "./CroppedLogo";
import LoginStatus from "./LoginStatus";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@github/clipboard-copy-element";

export default function Header({ userFeedback, setUserFeedback, toggleUploadModal }) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const closeUserFeebackAlert = e => {
    e.preventDefault();
    setUserFeedback("");
  };

  return (
    currentUser && (
      <header className="row my-3 align-items-center">
        <div className="col-xs-12 col-sm-4 col-lg-3 text-center text-sm-left">
          <CroppedLogo width="200px" mb="0px" />
        </div>
        <div className="col-xs-12 col-sm-8 col-lg-4 order-lg-4 d-flex flex-column text-center text-sm-right">
          <LoginStatus />
          <Navigation toggleUploadModal={toggleUploadModal} />
        </div>
        <div className="col-xs-12 col-lg-5 order-lg-2 align-self-end text-center">
          {userFeedback && (
            <div className="alert alert-success alert-dismissible mb-0 mt-3 mt-lg-0 small" role="alert">
              A link to access this archive has been generated. It's valid for 7 days.
              <br />
              <a href="/" onClick={closeUserFeebackAlert}>
                <FontAwesomeIcon icon="copy" />
                &nbsp;<clipboard-copy value={userFeedback}>Copy to clipboard.</clipboard-copy>
              </a>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeUserFeebackAlert}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </div>
      </header>
    )
  );
}
