import { useForm } from "../../hooks/useForm";
import GlobalContext from "../../context/lead-context";
import React, { useContext } from "react";

function MyLeadForm() {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const [values, handleChange, resetForm] = useForm(initialValues);
  const context = useContext(GlobalContext);

  const handleClick = (e) => {
    e.preventDefault();
    const { name, email, message } = values;
    const lead = { name, email, message };

    context.addLead(lead);
    resetForm();
  };

  return (
    <div className="card card-body mt-4 mb-4">
      <h1>Add Lead Form</h1>
      <form onSubmit={handleClick}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <input
            className="form-control"
            type="text"
            name="message"
            onChange={handleChange}
            value={values.message}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyLeadForm;
