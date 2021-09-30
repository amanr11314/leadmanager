import React, { useReducer } from "react";
import axios from "axios";

import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types";
import ErrorContext from "./error-context";
import { errorreducer } from "../reducers/errors";

const ErrorState = (props) => {
  const initialState = {
    msg: {},
    status: null,
  };
  const [errorState, dispatch] = useReducer(errorreducer, initialState);

  return (
    <ErrorContext.Provider value={{}}>{props.children}</ErrorContext.Provider>
  );
};

export default ErrorState;
