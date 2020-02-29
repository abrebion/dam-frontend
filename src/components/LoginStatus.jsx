import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import api from "../api/apiHandler";
import UserContext from "../authentication/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default withRouter(function LoginStatus(props) {
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;

  const handleLogout = e => {
    e.preventDefault();
    api.post("/logout").finally(() => {
      console.log("You've been logged out");
      setCurrentUser(null);
      props.history.push("/login");
    });
  };

  return (
    <div className="text-muted mb-2">
      <small>
        <FontAwesomeIcon icon="user" />
        <span className="mx-2">
          Logged in as {currentUser.firstname} {currentUser.lastname} &nbsp;&nbsp;|
        </span>
        <a href="/" onClick={handleLogout}>
          Logout
        </a>
      </small>
    </div>
  );
});
