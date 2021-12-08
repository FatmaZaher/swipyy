import React from 'react'
import { Route } from "react-router-dom";

const View = ({ children, ...rest }) => {
    return (
        <div>
            {children}
        </div>
    )
}
const ViewLayout = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => (
          <View>
            <Component {...props} />
          </View>
        )}
      />
    );
  };
export default ViewLayout;