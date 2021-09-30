import React, { Fragment, useContext } from "react";
import { render } from "react-dom";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./leads/Dashboard";
import Header from "./layouts/Header";
import GlobalState from "../context/GlobalState";
import { Provider as AlertProvider } from "react-alert";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./accounts/Login";
import Register from "./accounts/register";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./layouts/Alert";
import { debugContextDevtool } from "react-context-devtool";
// import GlobalContext from "../context/lead-context";
export default function App() {
  // const context = useContext(GlobalContext);

  // useEffect(() => {
  //   context
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  return (
    <GlobalState>
      <AlertProvider template={AlertTemplate}>
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
      </AlertProvider>
    </GlobalState>
  );
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);

//Attach contextDevtool
debugContextDevtool(appDiv);
