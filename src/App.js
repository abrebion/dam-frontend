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
import api from "./api/apiHandler";

export default function App() {
  const { isLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState({});
  const UserContextValue = {
    currentUser,
    setCurrentUser
  };
  const [searchResults, setSearchResults] = useState([]);
  const [showUploader, setUploaderVisibility] = useState(false);

  const handleSearch = async (url = "/assets/search?sort=-createdAt") => {
    try {
      if (url) {
        const results = await api.get(url);
        setSearchResults(results.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUploadModal = e => {
    return setUploaderVisibility(!showUploader);
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
          <ProtectedRoute
            exact
            path="/dashboard"
            component={Dashboard}
            toggleUploadModal={toggleUploadModal}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            handleSearch={handleSearch}
          />
          <ProtectedRoute
            path="/dashboard/:id"
            component={Dashboard}
            toggleUploadModal={toggleUploadModal}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            handleSearch={handleSearch}
          />
          <ProtectedRoute
            exact
            path="/collections"
            component={Collections}
            toggleUploadModal={toggleUploadModal}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </Switch>
      )}
      {showUploader && <NewAssetModal toggleUploadModal={toggleUploadModal} handleSearch={handleSearch} searchResults={searchResults} setSearchResults={setSearchResults} />}
    </UserContext.Provider>
  );
}
