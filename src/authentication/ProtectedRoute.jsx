import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ component: Component, toggleUploadModal, ...rest }) => {
  const { isLoggedIn, isLoading } = useAuth();
  // Return default template while performing async authentication task
  if (isLoading) return <div>Loading...</div>;
  return isLoggedIn ? (
    // If logged in, return a regular Route component with any passed (...rested) props in a literal object
    <Route {...rest} render={props => <Component {...props} toggleUploadModal={toggleUploadModal} />} />
  ) : (
    // If not logged in, redirect to login page
    <Redirect to="/login" />
  );
};
