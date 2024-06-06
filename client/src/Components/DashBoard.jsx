import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const DashBoard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/verify")
      .then((res) => {
        if (!res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
      <h1>this is my dashboard</h1>
    </>
  );
};

export default DashBoard;
