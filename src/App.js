/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./AppDesktop.css";
import "./AppIpad.css";

import firebaseConfig from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import {createTheme } from "@material-ui/core/styles/";
import themeFile from "./util/theme";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { setCookies } from "./redux/actions/cookiesActions";
import { setInfoPageOpen } from "./redux/actions/UiActions";
import Loader from './components/atoms/Animations/Loader'





import ReactGA from "react-ga";

import axios from "axios";

import { isTablet } from "react-device-detect";
import Cookies from "universal-cookie";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import translationEN from "./util/translations/english.json";
import translationDE from "./util/translations/german.json";
import { isMobileCustom } from "./util/customDeviceDetect";

import packageJson from "../package.json";
import { getBuildDate } from "./util/utils";
import withClearCache from "./ClearCache";

//Pages
const Main = React.lazy(() => import("./components/templates/Main"));
const IntroductionInformation = React.lazy(() => import("./components/organisms/infocomponents/IntroductionInformation"));
const Welcome = React.lazy(() => import("./components/organisms/infocomponents/Welcome"));
const Verification = React.lazy(() => import("./pages/Verification"));
const impressum = React.lazy(() => import("./components/organisms/infocomponents/legal/impressum"));
const datenschutz = React.lazy(() => import("./components/organisms/infocomponents/legal/datenschutz"));
const agb = React.lazy(() => import("./components/organisms/infocomponents/legal/agb"));
const cookieConfigurator = React.lazy(() => import("./components/organisms/infocomponents/legal/cookieConfigurator"));
const monitoring = React.lazy(() => import("./pages/monitoring"));

const ClearCacheComponent = withClearCache(MainApp);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translationEN,
      },
      de: {
        translation: translationDE,
      },
    },
    lng: navigator.language === "de-DE" ? "de" : "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "de",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const cookies = new Cookies();
require("intersection-observer");

if (firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

axios.defaults.baseURL = process.env.REACT_APP_DB_BASE_URL;

const theme = createTheme(themeFile);

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

console.log(process.env.REACT_APP_STAGE);

// if (process.env.REACT_APP_STAGE === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

window.store = store;

if (cookies.get("Cookie_settings") === "all") {
  store.dispatch(setCookies("all"));
} else if (cookies.get("Cookie_settings") === "minimum") {
  store.dispatch(setCookies("minimum"));
} else {
  if (!isMobileCustom) {
    store.dispatch(setInfoPageOpen());
  }
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
const App = () => {
  const { t } = useTranslation();

  const [isAuthed, setIsAuthed] = useState(false);

  const userState = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(user.uid));
        setIsAuthed(true);
      } else if (user) {
        //a new user is registrating
      } else {
        store.dispatch(logoutUser());
      }
    });
  };

  useEffect(() => {
    userState();
  }, [isAuthed]);

  const tabletNote = isTablet ? (
    <div className="tabletLandscapeNote">{t("rotate_tablet")} </div>
  ) : null;
  return (
    <React.StrictMode>
      <React.Suspense fallback={<Loader/>}>
        <MuiThemeProvider theme={theme}>
          {process.env.REACT_APP_STAGE !== "development" && <ClearCacheComponent />}

          <Provider store={store}>
            <Router>
              {/* <Topbar/> */}
              {tabletNote}
              <div className="landscapeNote">{t("rotate_phone")}</div>

              <div className="container">
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route exact path="/start" component={IntroductionInformation} />

                  <Route exact path="/intro" component={Welcome} />

                  <Route exact path="/datenschutz" component={datenschutz} />

                  <Route exact path="/agb" component={agb} />

                  <Route exact path="/monitoring" component={monitoring} />

                  <Route exact path="/verify" component={Verification} />

                  <Route
                    exact
                    path="/cookieConfigurator"
                    component={cookieConfigurator}
                  />

                  <Route exact path="/impressum" component={impressum} />

                  <Route exact path="/:screamId" component={Main} />
                </Switch>
              </div>
            </Router>
          </Provider>
        </MuiThemeProvider>
      </React.Suspense>
    </React.StrictMode>
  );
};
console.log(getBuildDate(packageJson.buildDate));

function MainApp(props) {
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
