import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container text-center my-5">
      <h1 className="mb-4">This is the Home Page</h1>
      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
        <Link to="/dashboard" className="btn btn-primary me-md-2">
          Dashboard
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
