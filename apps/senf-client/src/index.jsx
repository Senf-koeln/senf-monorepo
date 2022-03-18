/** @format */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import { registerSW } from "virtual:pwa-register";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

/* registerSW({
  onOfflineReady() {
    console.log("ready for offline use");
  },
});
 */
