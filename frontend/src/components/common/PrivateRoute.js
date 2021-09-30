import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import GlobalContext from "../../context/lead-context";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const context = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (context.auth.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!context.auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
