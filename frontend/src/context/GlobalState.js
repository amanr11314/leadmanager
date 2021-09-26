import React, { useReducer } from "react";
import axios from "axios";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types";
import GlobalContext from "./lead-context";
import { leadreducer } from "../reducers/lead_reducer";

const GlobalState = (props) => {
  const initialLeads = {
    leads: [],
  };
  const [leadState, dispatch] = useReducer(leadreducer, initialLeads);

  const getLeads = () => {
    axios
      .get("/api/leads/")
      .then((res) => {
        dispatch({
          type: GET_LEADS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteLead = (id) => {
    axios
      .delete(`/api/leads/${id}/`)
      .then((res) => {
        dispatch({
          type: DELETE_LEAD,
          payload: id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addLead = (lead) => {
    axios
      .post("/api/leads/", lead)
      .then((res) => {
        dispatch({
          type: ADD_LEAD,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        leads: leadState.leads,
        getLeads: getLeads,
        deleteLead: deleteLead,
        addLead: addLead,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
