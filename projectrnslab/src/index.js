import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const meta = document.createElement("meta");
meta.name = "google";
meta.content = "notranslate";
document.getElementsByTagName("head")[0].appendChild(meta);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
