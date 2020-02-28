import React, { useContext, useEffect } from "react";
import UserContext from "../authentication/UserContext";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Register(props) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  useEffect(() => {
    if (currentUser) props.history.push("/dashboard");
  });

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 border shadow p-5 bg-white rounded">
          <Logo />
          <h1 className="h5 text-center">Digital Asset Management</h1>
          <h2 className="h2 mt-4 text-center">Register</h2>
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
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
