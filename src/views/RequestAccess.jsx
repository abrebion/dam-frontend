import React, { useState, useContext, useEffect } from "react";
import UserContext from "../authentication/UserContext";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function RequestAccess(props) {
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
          <h2 className="h2 my-4 text-center">Request Access</h2>
          <p>
            <small className="d-inline-block">
              After submitting this form, an administrator will be notified of your request. Once your account has been validated, you'll receive an email to finalize your account
              setup.
            </small>
          </p>
          <form className="my-4">
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input type="text" name="firstname" className="form-control" id="firstname" />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input type="text" name="lastname" className="form-control" id="lastname" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" />
              <small id="emailHelp" className="form-text text-muted">
                A Suntory email address is mandatory.
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Request
            </button>
            <div className="alert alert-success mt-3" role="alert">
              You're request is on its way... You'll soon receive an email to finalize your account setup.
            </div>
          </form>
          <p className="text-muted my-0">
            <small>
              Forget your password? <Link to="/reset-password">Get a new one.</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
