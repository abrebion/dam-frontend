import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../authentication/UserContext";
import api from "../api/apiHandler";
import Logo from "../components/Logo";

export default function Login(props) {
  const [email, setEmail] = useState("abrebion@gmail.com");
  const [password, setPassword] = useState("12345");
  const [userFeedback, setUserFeedback] = useState("");
  const userContext = useContext(UserContext);
  const { currentUser, setCurrentUser } = userContext;

  useEffect(() => {
    if (currentUser) props.history.push("/dashboard");
  }, [currentUser]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      console.log(res);
      if (res.data.status === "success") {
        setCurrentUser(res.data.user);
        props.history.push("/dashboard");
      } else {
        setUserFeedback("Your credentials are invalid. Try again...");
      }
    } catch (err) {
      setCurrentUser(null);
    }
  };
  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6 border shadow p-5 bg-white rounded">
          <Logo />
          <h1 className="h5 text-center">Digital Asset Management</h1>
          <h2 className="h2 mt-4 text-center">Login</h2>
          <form className="my-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" required aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
              <small id="emailHelp" className="form-text text-muted">
                A Suntory email address is mandatory.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" id="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {userFeedback && (
              <div className="alert alert-danger mt-3" role="alert">
                {userFeedback}
              </div>
            )}
          </form>
          <p className="text-muted my-0">
            <small>
              {" "}
              Don't have an account? <Link to="/request-access">Ask for one.</Link>
            </small>
          </p>
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
