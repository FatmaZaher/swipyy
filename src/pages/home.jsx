import React from "react";
import { Route } from "react-router-dom";
import  Sidebar  from "../component/Sidebar";
import HomeHeader from "../component/HomeHeader";
import MobileSide from "../component/MobileSide";

const Dashboardlayout = ({ children, ...rest }) => {
  return <div>{children}</div>;
};
const Home = ({ component: Component, ...rest }) => {
return (
    <Route
      {...rest}
      render={(props) => (
        <Dashboardlayout>
          <Sidebar />
          <div className="home-page">
            <HomeHeader />
            <Component {...props} />
          </div>
          <MobileSide />
        </Dashboardlayout>
      )}
    />
  );
};
export default Home;