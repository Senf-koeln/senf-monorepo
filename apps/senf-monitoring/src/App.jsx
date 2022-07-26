/** @format */

import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { theme, GlobalStyle } from "senf-atomic-design-system";
import { ThemeProvider } from "styled-components";
import store from "./redux/store";
import Dashboard from "./pages/Dashboard";
import "./util/i18n";
import PrivateRoute from "./context/PrivateRoute";
import { AuthProvider } from "./context/auth";
import AuthPage from "./pages/AuthPage";
import InviteMember from "./pages/InviteMember";
import MemberBoard from "./pages/MemberBoard";
import { AcceptInvitation } from "./pages/AcceptInvitation";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {import.meta.env.VITE_NO_CRAWL && (
        /* disable google crawling for senf-client-test.netlify.app */
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
      )}

      <Provider store={store}>
        <AuthProvider>
          <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route
                  exact
                  path="/register"
                  element={<AuthPage variant="register" />}
                />

                <Route
                  exact
                  path="/login"
                  element={<AuthPage variant="login" />}
                />
                {/* <Route exact path="/" element={<PrivateRoute />}>
                  <Route exact path="/" component={Dashboard} />
                </Route> */}
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/members" element={<MemberBoard />} />

                <Route exact path="/invite" element={<InviteMember />} />
                <Route
                  exact
                  path="invitation/:invitationDocId"
                  element={<AcceptInvitation />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </React.Suspense>
          </Router>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
