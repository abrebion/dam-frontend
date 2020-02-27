import React, { useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/apiHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../authentication/useAuth";
import UserContext from "../authentication/UserContext";

export default function Dasboard(props) {
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;
  console.log("Current User:", currentUser);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    api.post("/logout").finally(() => {
      console.log("You've been logged out");
      // setIsLoggedIn(false);
      setCurrentUser(null);
      props.history.push("/login");
    });
  };
  // console.log("Is logged in?", isLoggedIn);

  return (
    <div>
      <h1>Dashboard</h1>
      <FontAwesomeIcon icon="sync-alt" />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
