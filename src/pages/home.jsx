import React, { useState } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import HomeHeader from "../component/HomeHeader";
import MobileSide from "../component/MobileSide";

const Dashboardlayout = ({ children, ...rest }) => {
  return <div>{children}</div>;
};
const Home = ({ component: Component, ...rest }) => {
  const [iframe, setIframe] = useState(true);
  const handleEditData = (key, e) => {
    setIframe(false);
    setTimeout(() => {
      setIframe(true);
    }, 500);
  };
  const showMobile = () => {
    console.log("iframe");

    console.log(iframe);
    console.log("iframe");
    if (iframe === true) {
      return <MobileSide />;
    } else {
      return null;
    }
  };
  return (
    <Route
      {...rest}
      render={(props) => (
        <Dashboardlayout>
          <Sidebar />
          <div className="home-page">
            <HomeHeader />
            <Component onSaveData={() => handleEditData()} {...props} />
          </div>
          {showMobile()}
        </Dashboardlayout>
      )}
    />
  );
};
export default Home;
