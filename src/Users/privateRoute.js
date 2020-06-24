import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const now = new Date();
        if (
          localStorage.getItem("expiry") > now.getTime() &&
          localStorage.getItem("usertoken") != null
        ) {
          return <Component {...props} />;
        } else {
          localStorage.removeItem("usertoken");
          localStorage.removeItem("expiry");
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};
