import React, { useState, useContext, useEffect } from "react";
import UserContext from "../authentication/UserContext";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function ResetPassword(props) {
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;

  useEffect(() => {
    if (currentUser) props.history.push("/dashboard");
  }, [currentUser]);

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 border shadow p-5 bg-white rounded">
          <Logo />
          <h1 className="h5 text-center">Digital Asset Management</h1>
          <h2 className="h2 my-4 text-center">Reset Password</h2>
          <form className="my-4">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input type="password" name="current-password" className="form-control" id="current-password" />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input type="password" name="new-password" className="form-control" id="new-password" />
            </div>
            <div className="form-group">
              <label htmlFor="new-password-confirmation">Retype New Password</label>
              <input type="password" name="new-password-confirmation" className="form-control" id="new-password-confirmation" />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
            <div className="alert alert-success mt-3" role="alert">
              Your password has been successfully updated. You'll be automatically redirected to the login page in 5 seconds.
            </div>
          </form>
          <p className="text-muted my-0">
            <small>
              Go back to the <Link to="/login">login page.</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
