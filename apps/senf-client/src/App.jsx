/** @format */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Provider, useDispatch, useSelector } from "react-redux";
import { isTablet } from "react-device-detect";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";
import {
  theme,
  GlobalStyle,
  // i18n,
  MainLoader,
  Cookiebanner,
} from "senf-atomic-design-system";
import { ThemeProvider } from "styled-components";
import { auth } from "./firebase";

import "./styles/mapbox-gl.css";
import "./styles/App.css";
import "./styles/AppDesktop.css";
import "./styles/AppIpad.css";
import "./styles/mapbox.css";
import "./styles/Animations.css";

// Redux
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";
import { setCookies } from "./redux/actions/cookiesActions";
import { setInfoPageOpen } from "./redux/actions/UiActions";

import { getOrganizations } from "./redux/actions/organizationActions";
import { getProjects } from "./redux/actions/projectActions";
import { getScreams } from "./redux/actions/screamActions";

// Pages
import impressum from "./components/infocomponents/legal/impressum";
import datenschutz from "./components/infocomponents/legal/datenschutz";
import agb from "./components/infocomponents/legal/agb";
import cookieConfigurator from "./components/infocomponents/legal/cookieConfigurator";
import blank from "./pages/Blank";

import { isMobileCustom } from "./util/customDeviceDetect";

import packageJson from "../package.json";
import { getBuildDate } from "./util/helpers";
import { setViewport } from "./util/helpers-map-animations";

import "./util/i18n";

// import Main from "./pages/Main";

const Main = React.lazy(() =>
  Promise.all([
    import("./pages/Main"),
    new Promise((resolve) => setTimeout(resolve, 3300)),
  ]).then(([moduleExports]) => moduleExports)
); // i18n configuration

// detectLocation(); // detect location and set i18n language
const cookies = new Cookies();
// require("intersection-observer");

window.store = store;

if (cookies.get("cookie_settings") === "all") {
  store.dispatch(setCookies("all"));
} else if (cookies.get("cookie_settings") === "minimum") {
  store.dispatch(setCookies("minimum"));
} else {
  store.dispatch(setInfoPageOpen());
}
const vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

const App = () => {
  const { t } = useTranslation();

  const { cookie_settings } = store.getState().data;
  const [openCookiebanner, setOpenCookiebanner] = useState(true);

  useEffect(() => {
    if (cookie_settings === "all" || cookie_settings === "minimum") {
      setOpenCookiebanner(false);
    }
  }, [cookie_settings]);

  const handleOpenCookiePreferences = () => {
    window.open("/cookieConfigurator", "_blank");
  };

  const handleCookies = (cookie_settings) => {
    store.dispatch(setCookies(cookie_settings));
    setOpenCookiebanner(false);
  };

  const userState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid && user.emailVerified) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(user.uid));
      } else if (
        (user &&
          user.uid &&
          user.providerData[0].providerId === "google.com") ||
        (user && user.uid && user.providerData[0].providerId === "facebook.com")
      ) {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(user.uid));
      } else if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
      } else {
        // User is signed out
        // ...
      }
    });
  };
  useEffect(() => {
    setViewport();
    const { initialMapViewport } = store.getState().data;
    store.dispatch(getScreams(initialMapViewport));
    store.dispatch(getOrganizations(initialMapViewport));
    store.dispatch(getProjects(initialMapViewport));
  }, []);
  useEffect(() => {
    userState();
  }, []);

  const tabletNote = isTablet ? (
    <div className="tabletLandscapeNote">{t("rotate_tablet")} </div>
  ) : null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {import.meta.env.VITE_NO_CRAWL && (
        /* disable google crawling for senf-client-test.netlify.app */
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
      )}
      {import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE && (
        <Helmet>
          <meta
            name="google-site-verification"
            content="u0WUtD1BF5Kr__nOsq-jAnnCgXixSJO-0mpsW2W3uGg"
          />
        </Helmet>
      )}

      {import.meta.env.VITE_STATS && (
        <Helmet>
          <script
            async
            defer
            data-website-id="17c8a5a3-76cb-43c6-971a-04dbd6a7a325"
            src="https://umami-xi-nine.vercel.app/senf-stat.js"
          ></script>
        </Helmet>
      )}

      <Provider store={store}>
        <Router>
          {openCookiebanner && (
            <Cookiebanner
              handleCookies={handleCookies}
              handleOpenCookiePreferences={handleOpenCookiePreferences}
            />
          )}
          {tabletNote}

          {isMobileCustom && (
            <div className="landscapeNote">{t("rotate_phone")}</div>
          )}

          <div className="container">
            <React.Suspense fallback={<MainLoader />}>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/projectRooms" component={Main} />
                <Route exact path="/organizations" component={Main} />

                <Route exact path="/datenschutz" component={datenschutz} />
                <Route exact path="/agb" component={agb} />

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
            </React.Suspense>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};
console.log(getBuildDate(packageJson.buildDate));

export default App;
