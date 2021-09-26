import React from "react";

export default React.createContext({
  leads: [],
  getLeads: () => {},
  deleteLead: (leadID) => {},
  addLead: (lead) => {},
});
