import React, { useState } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import HomeHeader from "../component/HomeHeader";
import MobileSide from "../component/MobileSide";

const Dashboardlayout = ({ children, ...rest }) => {
  return <div>{children}</div>;
};
const Home = ({ component: Component, ...rest }) => {
  const [isRender, setIsRender] = useState(false);
  const startRequest = (key, e) => {
    setIsRender(true);
  };
  const finishRequest = (key, e) => {
    setIsRender(false);
  };
  setTimeout(() => {
    setIsRender(false);

  }, 3000);
  // const showMobile = () => {
  //   console.log("iframe");

  //   console.log(iframe);
  //   console.log("iframe");
  //   if (iframe === true) {
  //     return <MobileSide />;
  //   } else {
  //     return null;
  //   }
  // };
  return (
    <Route
      {...rest}
      render={(props) => (
        <Dashboardlayout>
          <Sidebar />
          <div className="home-page">
            <HomeHeader />
            <Component
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              {...props}
            />
          </div>
          <MobileSide isRender={isRender} />
        </Dashboardlayout>
      )}
    />
  );
};
export default Home;
