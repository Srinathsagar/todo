// src/index.js or src/App.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Importing the global CSS file
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
