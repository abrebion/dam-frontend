import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
// Authentication
import { useAuth } from "./authentication/useAuth";
import UserContext from "./authentication/UserContext";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
// Fontawesome Library
import "./helpers/fontAwesomeLibrary";
// Views
import Login from "./views/Login";
import RequestAccess from "./views/RequestAccess";
import ResetPassword from "./views/ResetPassword";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Collections from "./views/Collections";
import NewAssetModal from "./components/assets/NewAssetModal";
// Redux Store
import { connect } from "react-redux";

const App = ({ uploaderIsVisible }) => {
  const { isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const UserContextValue = {
    currentUser,
    setCurrentUser,
  };
  return (
    <UserContext.Provider value={UserContextValue}>
      {isLoading ? null : (
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/request-access" component={RequestAccess} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/first-connection" render={(props) => <ResetPassword {...props} firstConnection={true} />} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/dashboard/:id" component={Dashboard} />
          <ProtectedRoute exact path="/collections" component={Collections} />
        </Switch>
      )}
      {uploaderIsVisible && <NewAssetModal />}
    </UserContext.Provider>
  );
};

const mapStateToProps = (state) => {
  return {
    uploaderIsVisible: state.assets.uploaderIsVisible,
  };
};

export default connect(mapStateToProps)(App);
