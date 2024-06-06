import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts, fetchProducts } from "../features/productSlice";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (searchData) {
      dispatch(searchProducts(searchData));
    }
  }, [dispatch, searchData]);

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          RTK
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/create-product"
                className="nav-link"
                aria-label="Create Product"
              >
                Create Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products-list"
                className="nav-link"
                aria-label="All Products"
              >
                All Products ({allProducts.length})
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </form>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
