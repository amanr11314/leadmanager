import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import GlobalContext from "../../context/lead-context";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
