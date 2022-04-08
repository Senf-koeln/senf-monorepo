/** @format */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
//import { registerSW } from "virtual:pwa-register";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

/* registerSW({
  onOfflineReady() {
    console.log("ready for offline use");
  },
});
 */
