import React, { useState, useContext, useEffect } from "react";
import UserContext from "../authentication/UserContext";
import api from "../api/apiHandler";
import { Link } from "react-router-dom";
import Logo from "../components/navigation/Logo";

export default function RequestAccess(props) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const [{ firstname, lastname, email }, setUserRequest] = useState({ firstname: "Anthony", lastname: "Brebion", email: "anthony.brebion@suntory.com" });
  const [userFeedback, setUserFeedback] = useState("");

  useEffect(() => {
    if (currentUser) props.history.push("/dashboard");
  });

  const handleInput = e => {
    setUserRequest({ firstname, lastname, email, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUserFeedback(`${firstname}, you're request is on its way... You'll soon receive an email to finalize your account setup.`);
    try {
      await api.post("/users/request-access", { firstname, lastname, email });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 border shadow p-5 bg-white rounded">
          <Logo />
          <h1 className="h5 text-center">Digital Asset Management</h1>
          <h2 className="h2 my-4 text-center">Request Access</h2>
          <p>
            <small className="d-inline-block">
              After submitting this form, an administrator will be notified. Once your account has been validated, you'll receive an email to finalize your account setup.
            </small>
          </p>
          <form className="my-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input type="text" name="firstname" className="form-control" id="firstname" required value={firstname} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input type="text" name="lastname" className="form-control" id="lastname" required value={lastname} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" required aria-describedby="emailHelp" value={email} onChange={handleInput} />
              <small id="emailHelp" className="form-text text-muted">
                A Suntory email address is mandatory.
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Request
            </button>
            {userFeedback && (
              <div className="alert alert-success mt-3" role="alert">
                {userFeedback}
              </div>
            )}
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
