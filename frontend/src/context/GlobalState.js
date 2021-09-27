import React, { useReducer } from "react";
import axios from "axios";

import {
  GET_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  GET_ERRORS,
  RESET_ERRORS,
  CREATE_MESSAGE,
} from "../actions/types";
import GlobalContext from "./lead-context";
import { leadreducer } from "../reducers/lead_reducer";
import { errorreducer } from "../reducers/errors";
import { messagereducer } from "../reducers/messages";

const GlobalState = (props) => {
  const initialLeads = {
    leads: [],
  };
  const [leadState, dispatch] = useReducer(leadreducer, initialLeads);

  const initialError = {
    msg: {},
    status: null,
  };
  const [errorState, dispatchError] = useReducer(errorreducer, initialError);

  const initialMessage = {};

  const [messageState, dispatchMessage] = useReducer(
    messagereducer,
    initialMessage
  );

  const getLeads = () => {
    axios
      .get("/api/leads/")
      .then((res) => {
        dispatch({
          type: GET_LEADS,
          payload: res.data,
        });
      })
      .catch((err) => returnError(err));
  };

  const deleteLead = (id) => {
    axios
      .delete(`/api/leads/${id}/`)
      .then((res) => {
        createMessage({ deleteLead: "Lead Deleted" });
        dispatch({
          type: DELETE_LEAD,
          payload: id,
        });
      })
      .catch((err) => returnError(err));
  };

  const addLead = (lead) => {
    axios
      .post("/api/leads/", lead)
      .then((res) => {
        createMessage({ addLead: "Lead Added" });
        dispatch({
          type: ADD_LEAD,
          payload: res.data,
        });
      })
      .catch((err) => returnError(err));
  };
  const resetError = () => {
    dispatchError({
      type: RESET_ERRORS,
      payload: initialError,
    });
  };

  const returnError = (err) => {
    const errors = {
      msg: err.response.data,
      status: err.response.status,
    };
    dispatchError({
      type: GET_ERRORS,
      payload: errors,
    });
  };

  const createMessage = (msg) => {
    dispatchMessage({
      type: CREATE_MESSAGE,
      payload: msg,
    });
  };

  // const getMessages = () => {
  //   dispatchMessage({
  //     type: GET_MESSAGES,
  //     payload: messageState,
  //   });
  // };

  return (
    <GlobalContext.Provider
      value={{
        leads: leadState.leads,
        getLeads: getLeads,
        deleteLead: deleteLead,
        addLead: addLead,
        errors: errorState,
        resetError: resetError,
        messageState: messageState,
        createMessage: createMessage,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
