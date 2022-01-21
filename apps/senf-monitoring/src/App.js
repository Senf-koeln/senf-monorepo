/** @format */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "./AppDesktop.css";
import "./AppIpad.css";

import firebaseConfig from "./util/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useTranslation } from "react-i18next";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles/";

import themeFile from "./util/theme";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Pages

import Verification from "./pages/Verification";
import datenschutz from "./components/organisms/infocomponents/legal/datenschutz";
import agb from "./components/organisms/infocomponents/legal/agb";
import MonitoringBoard from "./pages/MonitoringBoard";

import axios from "axios";

import { isTablet } from "react-device-detect";

import packageJson from "../package.json";
import { getBuildDate } from "./util/utils";
//import withClearCache from "./util/ClearCache";

import detectLocation from "./util/detectLocation";

import "./util/i18n";
detectLocation(); // detect location and set i18n language

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

console.log(process.env.REACT_APP_STAGE);

// if (process.env.REACT_APP_STAGE === "development") {
//   const whyDidYouRender = require("@welldone-software/why-did-you-render");
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

window.store = store;

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
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
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
              <Route exact path="/" component={MonitoringBoard} />
              <Route exact path="/datenschutz" component={datenschutz} />
              <Route exact path="/agb" component={agb} />
              <Route exact path="/verify" component={Verification} />
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
