import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Email and password are required");
      return;
    }

    console.log("Submitting login with", { email, password });

    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data.status) {
          navigate("/products-list");
        } else {
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="text-center mt-2">
                <p>
                  Don't have an account? <Link to="/signup">Signup</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
