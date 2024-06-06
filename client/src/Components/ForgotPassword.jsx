import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/forgot-password", {
      email,
    })
      .then((response) => {
        if (response.data.status) {
          alert("check your email for reset password link");
          navigate("/login");
        }
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
