import React from 'react'
import { Route } from "react-router-dom";

const AppLayout = ({ children, ...rest }) => {
    return (
        <div>
            {children}
        </div>
    )
}
const AppLayoutRout = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
          <AppLayout>
            <Component {...props} />
          </AppLayout>
        )}
      />
    );
  };
export default AppLayoutRout;