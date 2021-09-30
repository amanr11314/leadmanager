import React, { Fragment, useContext, useEffect } from "react";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./leads/Dashboard";
import Header from "./layouts/Header";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./accounts/Login";
import Register from "./accounts/register";
import Alert from "./layouts/Alert";
import GlobalContext from "../context/lead-context";

export default function Medium() {
  const context = useContext(GlobalContext);
  useEffect(() => {
    //only load user if has token
    if (context.auth.token) context.loadUser();
  }, []);
  return (
    <Router>
      <Fragment>
        <Header />
        <Alert />
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}
