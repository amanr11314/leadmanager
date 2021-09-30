import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import GlobalContext from "../../context/lead-context";
import { useForm } from "../../hooks/useForm";
export default function Register() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };
  const [values, handleChange, resetForm] = useForm(initialValues);
  const context = useContext(GlobalContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = values;
    if (password !== password2) {
      context.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        password,
        email,
      };
      context.register(newUser);
    }
  };
  if (context.auth.isAuthenticated) return <Redirect to="/" />;
  return (
    <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
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
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={values.email}
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
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              onChange={handleChange}
              value={values.password2}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
