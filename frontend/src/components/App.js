import React, { Fragment } from "react";
import { render } from "react-dom";
import Dashboard from "./leads/Dashboard";
import Header from "./layouts/Header";
import GlobalState from "../context/GlobalState";

export default function App() {
  return (
    <GlobalState>
      <Fragment>
        <Header />
        <Dashboard />
      </Fragment>
    </GlobalState>
  );
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);
