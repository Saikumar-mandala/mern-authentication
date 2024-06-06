import Axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/reset-password/" + token, {
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
