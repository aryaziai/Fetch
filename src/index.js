import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import "./App-min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router } from "react-router-dom";
// require('dotenv').config()
// console.log(process.env.API_KEY)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
// serviceWorker.unregister();
