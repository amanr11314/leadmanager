import React, { Fragment } from "react";
import { render } from "react-dom";
import Dashboard from "./leads/Dashboard";
import Header from "./layouts/Header";
import GlobalState from "../context/GlobalState";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alert from "./layouts/Alert";
export default function App() {
  return (
    <GlobalState>
      <AlertProvider template={AlertTemplate}>
        <Fragment>
          <Header />
          <Alert />
          <Dashboard />
        </Fragment>
      </AlertProvider>
    </GlobalState>
  );
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);
