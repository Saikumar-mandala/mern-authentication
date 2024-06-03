import axios from "axios";
import React from "react";
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
    <>
      <h1>This is the home page</h1>
      <button>
        <Link to="/dashboard">Dashboard</Link>
      </button>
      <br />
      <button type="button" onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
