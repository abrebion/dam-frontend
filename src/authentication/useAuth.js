import { useState, useEffect, useContext } from "react";
import api from "../api/apiHandler";
import UserContext from "./UserContext";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;

  useEffect(() => {
    api
      .get("/is-logged-in")
      .then(res => {
        setIsLoggedIn(true);
        setIsLoading(false);
        const currentUser = res.data.currentUser;
        api
          .get("/users/" + currentUser._id + "/collections")
          .then(res => {
            currentUser.collections = res.data.data;
            setCurrentUser(currentUser);
          })
          .catch(err => console.error("Could not fetch user collections"));
      })
      .catch(() => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, [setCurrentUser]);

  return { isLoggedIn, isLoading, currentUser };
};
