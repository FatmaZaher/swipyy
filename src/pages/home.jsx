import React from "react";
import HomeHeader from "../component/HomeHeader";
// import RoutesApp from "../config/RoutesApp";
import { Route, Switch } from "react-router-dom";
import Links from "../pages/links";
import Appearance from "../pages/appearance";
import MobileSide from "../component/MobileSide";


const home = () => {
  return (
    <div className="home-page">
      <HomeHeader />
      <Switch>
        <Route path="/" exact component={Links} />
        <Route path="/appearance" component={Appearance} />
      </Switch>
      <MobileSide />
    </div>
  );
};
export default home;
