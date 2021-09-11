import React, { Fragment } from "react";
import { render } from "react-dom";
import Dashboard from "./leads/Dashboard";
import Header from "./layouts/Header";

export default function App() {
  return (
    <Fragment>
      <Header />
      <Dashboard />
    </Fragment>
  );
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);
