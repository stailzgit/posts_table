import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <HashRouter>
    <CssBaseline />
    <App />
  </HashRouter>,
  document.getElementById("root")
);
