import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Links from "../pages/links";
import Appearance from "../pages/appearance";

const RoutesApp = () => {
  return (
    <Switch>
      <Route exact path="/"><Redirect to="/Links" /></Route>
      <Route path="/Links" exact component={Links} />
      <Route path="/appearance" component={Appearance} />
    </Switch>
  );
};

export default RoutesApp;
