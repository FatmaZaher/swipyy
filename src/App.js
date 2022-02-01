import "./App.scss";
import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./pages/home";
import { user } from "./actions/auth";

import SignUp from "./pages/auth/signUp";
import ChangePassword from "./pages/auth/changePassword";
import Reset from "./pages/auth/reset";

import Login from "./pages/auth/login";
import Verify from "./pages/auth/verify";
import LoginLayoutRoute from "./layouts/LoginLayoutRoute ";
import Links from "./pages/links";
import Appearance from "./pages/appearance";
import Messages from "./pages/messages";
import Analytic from "./pages/Analytic";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import ViewLayout from "./layouts/ViewLayout";
import View from "./pages/View";
const postcss = require("postcss");
const rtl = require("postcss-rtl");

postcss([rtl()]);
const token = localStorage.getItem("user_token");

function App() {
  const location = Router;

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(user(token)).then((res) => {
        if (res.status.code == 200) {
          <Redirect to="/links" />;
        } else {
          localStorage.removeItem("user_token");
          window.location.replace("/login");
        }
      });
    } else {
      const url = window.location.pathname;
      if (
        url === "/login" ||
        url === "signUp" ||
        url === "/changePassword" ||
        url === "/reset" ||
        url === "/confirm"
      ) {
      } else {
        window.location.replace("/login");
      }
    }
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect from="/" to="/links" />
          </Route>
          <LoginLayoutRoute path="/login" component={Login} />
          <LoginLayoutRoute path="/signUp" component={SignUp} />
          <LoginLayoutRoute path="/verify" component={Verify} />
          <LoginLayoutRoute path="/changePassword" component={ChangePassword} />
          <LoginLayoutRoute path="/reset" component={Reset} />

          <Home path="/links" component={Links} />
          <Home path="/appearance" component={Appearance} />
          <Home path="/messages" component={Messages} />
          <Home path="/analytic" component={Analytic} />
          <Home path="/payments" component={Payments} />
          <Home path="/settings" component={Settings} />
          <ViewLayout path="/view" component={View} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
