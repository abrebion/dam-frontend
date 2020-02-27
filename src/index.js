import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ReactRouter } from "react-router-dom";
import "../src/assets/styles/index.scss";
import App from "./App";

ReactDOM.render(
  <ReactRouter>
    <App />
  </ReactRouter>,
  document.getElementById("root")
);
