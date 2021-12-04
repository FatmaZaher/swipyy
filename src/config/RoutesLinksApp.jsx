import React from "react";
import { Route, Switch } from "react-router-dom";
import Link from "../pages/links/Link";
import Social from "../pages/links/Social";

const RoutesApp = () => {
  return (
    <Switch>
      <Route path="/" component={Link} />
      <Route path="/social" component={Social} />
    </Switch>
  );
};

export default RoutesApp;
