import React from "react";

export default React.createContext({
  leads: [],
  getLeads: () => {},
  deleteLead: (leadID) => {},
  addLead: (lead) => {},
  errors: {
    msg: {},
    status: null,
  },
  resetError: () => {},
  messageState: {},
  createMessage: (msg) => {},
  auth: {
    token: "",
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
  loadUser: () => {},
  login: (username, password) => {},
  logout: () => {},
  register: ({ username, password, email }) => {},
});
