/** @format */

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import "./AppDesktop.css";
import "./AppIpad.css";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Pages
import home from "./pages/home";
import start from "./components/infocomponents/start";

import info from "./components/infocomponents/info";
import intro from "./components/infocomponents/intro";
import verify from "./components/profile/verify";

import impressum from "./components/infocomponents/legal/impressum";
import datenschutz from "./components/infocomponents/legal/datenschutz";
import agb from "./components/infocomponents/legal/agb";
import cookieConfigurator from "./components/infocomponents/legal/cookieConfigurator";

import filter from "./components/map/Geofilter";

import monitoring from "./pages/monitoring";

import ReactGA from "react-ga";

import axios from "axios";

import { isTablet } from "react-device-detect";
import Cookies from "universal-cookie";
const cookies = new Cookies();

require("intersection-observer");

axios.defaults.baseURL = process.env.REACT_APP_DB_BASE_URL;

const theme = createMuiTheme(themeFile);

function get_local_storage_status() {
  let test = "test";
  try {
    // try setting an item
    localStorage.setItem("test", test);
    localStorage.removeItem("test");
  } catch (e) {
    // browser specific checks if local storage was exceeded
    if (
      e.name === "QUATA_EXCEEDED_ERR" || // Chrome
      e.name === "NS_ERROR_DOM_QUATA_REACHED" //Firefox/Safari
    ) {
      // local storage is full
      return "full";
    } else {
      try {
        if (localStorage.remainingSpace === 0) {
          // IE
          // local storage is full
          return "full";
        }
      } catch (e) {
        // localStorage.remainingSpace doesn't exist
      }

      // local storage might not be available
      return "unavailable";
    }
  }
  return "available";
}
if (get_local_storage_status() === "unavailable") {
  alert(
    "Um Senf zu öffnen, musst du Cookies in deinen Smartphone-Settings erlauben."
  );
}

const token = localStorage.FBIdToken;

const refreshToken = localStorage.FBIdToken_refresh;

console.log(localStorage);

if (token) {
  const decodedToken = jwtDecode(token);
  const expirationDuration = decodedToken.exp * 1000;

  if (expirationDuration < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
} else {
  store.dispatch(logoutUser());
}

if (cookies.get("Cookie_settings") === "all") {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
  ReactGA.pageview(window.location.pathname + window.location.search);
  ReactGA.ga("require", "displayfeatures");
  ReactGA.ga("set", "allowAdFeatures", true);
}
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
class App extends Component {
  componentDidMount() {
    let name = "Senf.koeln";
    let version = "1.0.0";
    console.log(`${name} v${version}`);
    const last_version = localStorage.getItem(`${name}-Version`);
    if (last_version !== version) {
      console.log("New Version Available!");
      localStorage.setItem(`${name}-Version`, version);
      window.location.reload(true);
    }
  }
  render() {
    const tabletNote = isTablet ? (
      <div className="tabletLandscapeNote">Bitte rotiere dein Tablet</div>
    ) : null;
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            {/* <Topbar/> */}
            {tabletNote}
            <div className="landscapeNote">Bitte rotiere dein Smartphone</div>

            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/start" component={start} />

                <Route exact path="/filter" component={filter} />

                <Route exact path="/info" component={info} />

                <Route exact path="/intro" component={intro} />

                <Route exact path="/datenschutz" component={datenschutz} />

                <Route exact path="/agb" component={agb} />

                <Route exact path="/monitoring" component={monitoring} />

                <Route exact path="/verify" component={verify} />

                <Route
                  exact
                  path="/cookieConfigurator"
                  component={cookieConfigurator}
                />

                <Route exact path="/impressum" component={impressum} />

                <Route exact path="/:screamId" component={home} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
