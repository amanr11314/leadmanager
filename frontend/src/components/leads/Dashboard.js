import React, { Fragment } from "react";
import MyLeadForm from "./Form";
import Leads from "./Leads";

export default function Dashboard() {
  return (
    <Fragment>
      <MyLeadForm />
      <Leads />
    </Fragment>
  );
}
