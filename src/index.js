import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as ReactRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/configureStore";
import "../src/assets/styles/index.scss";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ReactRouter>
      <App />
    </ReactRouter>
  </Provider>,
  document.getElementById("root")
);
