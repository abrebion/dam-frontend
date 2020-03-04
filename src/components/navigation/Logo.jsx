import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="Orangina Suntory France - DAM" className="logo img-fluid mb-5" />
      </Link>
    </div>
  );
}
