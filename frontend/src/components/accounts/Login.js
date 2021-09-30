import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import GlobalContext from "../../context/lead-context";
import { useForm } from "../../hooks/useForm";
export default function Login() {
  const initialValues = {
    username: "",
    password: "",
  };
  const [values, handleChange, resetForm] = useForm(initialValues);
  const context = useContext(GlobalContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { username, password } = values;
    context.login(username, password);
  };
  if (context.auth.isAuthenticated) return <Redirect to="/" />;
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={handleChange}
              value={values.username}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
