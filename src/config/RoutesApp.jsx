import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/auth/login";
import Links from "../pages/links";
import Appearance from "../pages/appearance";
import Link from "../pages/links/Link";

const RoutesApp = () => {
  return (
    <Switch>
      <Route path="/" exact component={Links} />
      <Route path="/appearance" component={Appearance} />
    </Switch>
  );
};

export default RoutesApp;
