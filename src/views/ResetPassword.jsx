import React, { useState, useContext, useEffect } from "react";
import UserContext from "../authentication/UserContext";
import api from "../api/apiHandler";
import { Link } from "react-router-dom";
import Logo from "../components/navigation/Logo";

export default function ResetPassword(props) {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;
  const [{ email, currentPassword, newPassword, newPasswordConfirmation }, setChangePassword] = useState({
    email: "abrebion@gmail.com",
    currentPassword: "12345",
    newPassword: "12345",
    newPasswordConfirmation: "12345"
  });
  const [userFeedback, setUserFeedback] = useState({ status: "", message: "" });

  useEffect(() => {
    if (currentUser) props.history.push("/dashboard");
  });

  const handleInput = e => {
    setChangePassword({ email, currentPassword, newPassword, newPasswordConfirmation, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.patch("/users/update-password", { email, currentPassword, newPassword, newPasswordConfirmation });
      if (res.data.status === "success") {
        setUserFeedback({ status: "success", message: `Your password has been successfully updated. You'll be automatically redirected to the login page in 3 seconds.` });
        setTimeout(() => {
          props.history.push("/login");
        }, 5000);
      } else {
        setUserFeedback({ status: "error", message: res.data.message });
      }
    } catch (error) {}
  };

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 border shadow p-5 bg-white rounded">
          <Logo />
          <h1 className="h5 text-center">Digital Asset Management</h1>
          <h2 className="h2 my-4 text-center">Reset Password</h2>
          <form className="my-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" required value={email} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input type="password" name="currentPassword" className="form-control" id="current-password" required value={currentPassword} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input type="password" name="newPassword" className="form-control" id="new-password" required value={newPassword} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="newPasswordConfirmation">Retype New Password</label>
              <input
                type="password"
                name="newPasswordConfirmation"
                className="form-control"
                id="new-password-confirmation"
                required
                value={newPasswordConfirmation}
                onChange={handleInput}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
            {userFeedback && userFeedback.status === "success" && (
              <div className="alert alert-success mt-3" role="alert">
                {userFeedback.message}
              </div>
            )}
            {userFeedback && userFeedback.status === "error" && (
              <div className="alert alert-danger mt-3" role="alert">
                {userFeedback.message}
              </div>
            )}
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
