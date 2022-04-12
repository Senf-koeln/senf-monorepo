/** @format */

import React, { useState, useEffect, useLayoutEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebaseApp from "./firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./styles/mapbox-gl.css";
import "./styles/App.css";
import "./styles/AppDesktop.css";
import "./styles/AppIpad.css";
import "./styles/mapbox.css";
import "./styles/Animations.css";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles/";

import themeFile from "./util/theme";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { setCookies } from "./redux/actions/cookiesActions";
import { setInfoPageOpen } from "./redux/actions/UiActions";

import { getOrganizations } from "../src/redux/actions/organizationActions";
import { getProjects } from "../src/redux/actions/projectActions";
import { getScreams } from "../src/redux/actions/screamActions";

//Pages
import Main from "./components/templates/Main";
import Verification from "./pages/Verification";
import impressum from "./components/organisms/infocomponents/legal/impressum";
import datenschutz from "./components/organisms/infocomponents/legal/datenschutz";
import agb from "./components/organisms/infocomponents/legal/agb";
import cookieConfigurator from "./components/organisms/infocomponents/legal/cookieConfigurator";

import blank from "./pages/Blank";

import { isTablet } from "react-device-detect";
import Cookies from "universal-cookie";

import { useTranslation } from "react-i18next";

import { isMobileCustom } from "./util/customDeviceDetect";

import packageJson from "../package.json";
import { getBuildDate } from "./util/helpers";
//import withClearCache from "./ClearCache";
import Cookiebanner from "./components/organisms/Cookiebanner/Cookiebanner";
import { setViewport } from "./util/helpers-map-animations";
import detectLocation from "./util/detectLocation";
import GlobalStyles from "./styles/GlobalStyles";

import "./util/i18n"; // i18n configuration
detectLocation(); // detect location and set i18n language
const cookies = new Cookies();
//require("intersection-observer");

const auth = getAuth(firebaseApp);

const theme = createTheme(themeFile);

function get_local_storage_status() {
  let test = "test";
  try {
    // try setting an item
    localStorage.setItem("test", test);
    localStorage.removeItem("test");
  } catch (e) {
    //  browser specific checks if local storage was exceeded
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

console.log(import.meta.env.MODE);

// if (import.meta.env.MODE === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

window.store = store;

if (cookies.get("cookie_settings") === "all") {
  store.dispatch(setCookies("all"));
} else if (cookies.get("cookie_settings") === "minimum") {
  store.dispatch(setCookies("minimum"));
} else {
  store.dispatch(setInfoPageOpen());
}
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

const App = () => {
  const { t } = useTranslation();

  const [isAuthed, setIsAuthed] = useState(false);

  const userState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid && user.emailVerified) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(user.uid));
        setIsAuthed(true);
        console.log(user.uid);
      } else if (user) {
        //a new user is registrating
      } else {
        store.dispatch(logoutUser());
      }
    });
  };
  useLayoutEffect(() => {
    setViewport();
    const initialMapViewport = store.getState().data.initialMapViewport;
    store.dispatch(getScreams(initialMapViewport));
    store.dispatch(getOrganizations(initialMapViewport));
    store.dispatch(getProjects(initialMapViewport));
  }, []);
  useLayoutEffect(() => {
    userState();
  }, [isAuthed]);

  const tabletNote = isTablet ? (
    <div className="tabletLandscapeNote">{t("rotate_tablet")} </div>
  ) : null;

  return (
    <>
      {import.meta.env.VITE_NO_CRAWL && (
        /* disable google crawling for senf-client-test.netlify.app */
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
      )}
      {import.meta.env.VITE_STATS && (
        /* Add statistics for senf.koeln
        https://umami-xi-nine.vercel.app/
        */
        <Helmet>
          <script
            async
            defer
            data-website-id="17c8a5a3-76cb-43c6-971a-04dbd6a7a325"
            src="https://umami-xi-nine.vercel.app/senf-stat.js"
          ></script>
        </Helmet>
      )}
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalStyles />
          <Router>
            <Cookiebanner />
            {tabletNote}

            {isMobileCustom && (
              <div className="landscapeNote">{t("rotate_phone")}</div>
            )}

            <div className="container">
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/projectRooms" component={Main} />
                <Route exact path="/organizations" component={Main} />

                <Route exact path="/datenschutz" component={datenschutz} />
                <Route exact path="/agb" component={agb} />

                <Route exact path="/verify" component={Verification} />

                <Route
                  exact
                  path="/cookieConfigurator"
                  component={cookieConfigurator}
                />

                <Route exact path="/impressum" component={impressum} />

                <Route exact path="/blank" component={blank} />

                <Route exact path="/:screamId" component={Main} />
                <Route
                  exact
                  path="/projectRooms/:projectRoomId/:screamId"
                  component={Main}
                />
                <Route
                  exact
                  path="/projectRooms/:projectRoomId"
                  component={Main}
                />
                <Route
                  exact
                  path="/organizations/:organizationId"
                  component={Main}
                />

                <Route path="*" component={Main} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </>
  );
};
console.log(getBuildDate(packageJson.buildDate));

export default App;
