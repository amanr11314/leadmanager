import React, { useContext, useEffect, Fragment } from "react";
import GlobalContext from "../../context/lead-context";
// export default function
const Leads = () => {
  const context = useContext(GlobalContext);
  useEffect(() => {
    context.getLeads();
  }, []);
  return (
    <Fragment>
      <h2>Leads</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {context.leads.map((lead) => (
            <tr>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.message}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={context.deleteLead.bind(this, lead.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};
export default Leads;
