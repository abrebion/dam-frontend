import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// Authentication
import { useAuth } from "./authentication/useAuth";
import UserContext from "./authentication/UserContext";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
// Fontawesome Library
import fontAwesomeLibrary from "./fontAwesomeLibrary";
// Views
import Login from "./views/Login";
import RequestAccess from "./views/RequestAccess";
import ResetPassword from "./views/ResetPassword";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const UserContextValue = {
    currentUser,
    setCurrentUser
  };

  return (
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/request-access" component={RequestAccess} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/first-connection" render={props => <ResetPassword {...props} firstConnection={true} />} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      )}
    </UserContext.Provider>
  );
}
