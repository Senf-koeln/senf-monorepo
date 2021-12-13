/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/mapbox-gl.css";
import "./App.css";
import "./AppDesktop.css";
import "./AppIpad.css";

import firebaseConfig from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles/";

import themeFile from "./util/theme";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { setCookies } from "./redux/actions/cookiesActions";
import { setInfoPageOpen } from "./redux/actions/UiActions";

//Pages
import Main from "./components/templates/Main";
import IntroductionInformation from "./components/organisms/infocomponents/IntroductionInformation";

import Welcome from "./components/organisms/infocomponents/Welcome";
import Verification from "./pages/Verification";

import impressum from "./components/organisms/infocomponents/legal/impressum";
import datenschutz from "./components/organisms/infocomponents/legal/datenschutz";
import agb from "./components/organisms/infocomponents/legal/agb";
import cookieConfigurator from "./components/organisms/infocomponents/legal/cookieConfigurator";

import MonitoringBoard from "./components/templates/MonitoringBoard";
import blank from "./pages/Blank";
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
//import withClearCache from "./ClearCache";
import Cookiebanner from "./components/organisms/Cookiebanner/Cookiebanner";
import { setViewport } from "./MapAnimations";
import detectLocation from "./util/detectLocation";

i18n
  //.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: false,
    supportedLngs: ["de", "en"],
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
    //lng: localStorage.getItem("lang"), // if you're using a language detector, do not define the lng option

    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
detectLocation(); // detect location and set i18n language
const cookies = new Cookies();
require("intersection-observer");

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase
    .firestore()
    .enablePersistence()
    .then(() => firebase.firestore())
    .catch((err) => {
      console.log(err);
      return firebase.firestore();
    });
} else {
  firebase.app(); // if already initialized, use that one
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
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

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

  useEffect(() => {
    setViewport();
  }, []);

  const tabletNote = isTablet ? (
    <div className="tabletLandscapeNote">{t("rotate_tablet")} </div>
  ) : null;

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Cookiebanner />

          {tabletNote}
          {/* {isTablet && (
            <div className="switchDevice">
              Bitte öffne Senf.koeln auf deinem Smartphone oder
              Desktop-Computer. Die Tablet-Version kommt bald wieder :)
            </div>
          )} */}

          <div className="landscapeNote">{t("rotate_phone")}</div>

          <div className="container">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/projects" component={Main} />
              <Route exact path="/start" component={IntroductionInformation} />
              <Route exact path="/intro" component={Welcome} />
              <Route exact path="/datenschutz" component={datenschutz} />
              <Route exact path="/agb" component={agb} />
              <Route exact path="/monitoring" component={MonitoringBoard} />

              <Route exact path="/verify" component={Verification} />

              <Route
                exact
                path="/cookieConfigurator"
                component={cookieConfigurator}
              />

              <Route exact path="/impressum" component={impressum} />

              <Route exact path="/blank" component={blank} />

              <Route exact path="/:screamId" component={Main} />
              <Route path="*" component={Main} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};
console.log(getBuildDate(packageJson.buildDate));

export default App;
/* export default withClearCache(MainApp); */
