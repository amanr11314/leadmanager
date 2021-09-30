import React, { useReducer } from "react";
import axios from "axios";

import {
  GET_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  GET_ERRORS,
  RESET_ERRORS,
  CREATE_MESSAGE,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";
import GlobalContext from "./lead-context";
import { leadreducer } from "../reducers/lead_reducer";
import { errorreducer } from "../reducers/errors";
import { messagereducer } from "../reducers/messages";
import { auth_reducer } from "../reducers/auth_reducers";

const GlobalState = (props) => {
  //LEADS
  const initialLeads = {
    leads: [],
  };
  const [leadState, dispatch] = useReducer(leadreducer, initialLeads);
  const getLeads = () => {
    axios
      .get("/api/leads/", tokenConfig(authState))
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
      .delete(`/api/leads/${id}/`, tokenConfig(authState))
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
      .post("/api/leads/", lead, tokenConfig(authState))
      .then((res) => {
        createMessage({ addLead: "Lead Added" });
        dispatch({
          type: ADD_LEAD,
          payload: res.data,
        });
      })
      .catch((err) => returnError(err));
  };

  //ERRORS
  const initialError = {
    msg: {},
    status: null,
  };
  const [errorState, dispatchError] = useReducer(errorreducer, initialError);
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

  //MESSAGES
  const initialMessage = {};

  const [messageState, dispatchMessage] = useReducer(
    messagereducer,
    initialMessage
  );

  const createMessage = (msg) => {
    dispatchMessage({
      type: CREATE_MESSAGE,
      payload: msg,
    });
  };

  //AUTHENTICATION
  const initialAuthState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  };
  const [authState, dispatchAuth] = useReducer(auth_reducer, initialAuthState);

  //CHECK TOKEN & LOAD USER
  const loadUser = () => {
    //User Loading
    dispatchAuth({
      type: USER_LOADING,
    });

    axios
      .get("/api/auth/user", tokenConfig(authState))
      .then((res) => {
        dispatchAuth({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        returnError(err);
        dispatchAuth({
          type: AUTH_ERROR,
        });
      });
  };

  //LOGIN USER
  const login = (username, password) => {
    dispatchAuth({
      type: USER_LOADING,
    });

    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Request Body
    const body = JSON.stringify({
      username,
      password,
    });

    axios
      .post("/api/auth/login", body, config)
      .then((res) => {
        dispatchAuth({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        returnError(err);
        dispatchAuth({
          type: LOGIN_FAIL,
        });
      });
  };

  //LOGOUT USER
  const logout = () => {
    axios
      .post("/api/auth/logout/", null, tokenConfig(authState))
      .then((res) => {
        dispatchAuth({
          type: LOGOUT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        returnError(err);
      });
  };

  //REGISTER USER
  const register = ({ username, password, email }) => {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Request Body
    const body = JSON.stringify({
      username,
      password,
      email,
    });

    axios
      .post("/api/auth/register", body, config)
      .then((res) => {
        dispatchAuth({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        returnError(err);
        dispatchAuth({
          type: REGISTER_FAIL,
        });
      });
  };

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
        auth: authState,
        loadUser: loadUser,
        login: login,
        logout: logout,
        register: register,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
//SetUp config with token - Helper Function
export const tokenConfig = (getState) => {
  //Get token from state
  const token = getState.token;

  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //If token add to headers config
  if (token) {
    config.headers["Authorization"] = "Token " + token;
  }
  return config;
};
