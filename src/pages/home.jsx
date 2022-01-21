import React, { useState } from "react";
import { Route } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import HomeHeader from "../component/HomeHeader";
import MobileSide from "../component/MobileSide";
import { useTranslation } from "react-i18next";

const Dashboardlayout = ({ children, ...rest }) => {
  return <div>{children}</div>;
};
const Home = ({ component: Component, ...rest }) => {
  const { t } = useTranslation();

  const [isRender, setIsRender] = useState(false);
  const startRequest = (key, e) => {
    setIsRender(true);
  };
  const finishRequest = (key, e) => {
    setIsRender(false);
  };

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
          <Sidebar t={t} />
          <div className="home-page">
            <HomeHeader t={t} />
            <Component
              onStartRequest={() => startRequest()}
              onFinishRequest={() => finishRequest()}
              {...props}
              t={t}
            />
          </div>
          <MobileSide isRender={isRender} t={t} />
        </Dashboardlayout>
      )}
    />
  );
};
export default Home;
