import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../features/productSlice";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";
// import LoadingSpinner from "./LoadingSpinner";
// import ErrorAlert from "./ErrorAlert";

const ProductList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [inStockFilter, setInStockFilter] = useState(false);
  const [featuredFilter, setFeaturedFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleViewProduct = (id) => {
    setSelectedProductId(id);
    setShowPopup(true);
  };

  const handleUpdateProduct = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const filteredProducts = products.filter((product) => {
    if (inStockFilter && !product.inStock) return false;
    if (featuredFilter && !product.isFeatured) return false;
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="my-4">Product List</h1>
      {/* {loading && <LoadingSpinner />} 
      {error && <ErrorAlert message={error} />}  */}
      {/* Filter options */}
      <div className="mb-3">
        <input
          type="checkbox"
          checked={inStockFilter}
          onChange={(e) => setInStockFilter(e.target.checked)}
        />
        <label className="form-check-label">In Stock</label>
      </div>
      <div className="mb-3">
        <input
          type="checkbox"
          checked={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.checked)}
        />
        <label className="form-check-label">Featured</label>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Product table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>In Stock</th>
            <th>Featured</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.inStock ? "Yes" : "No"}</td>
              <td>{product.isFeatured ? "Yes" : "No"}</td>
              <td>
        {product.images && product.images.length > 0 && (
          <img
            src={`http://localhost:5000/images/uploads/${product.images[0].url}`}
            alt={product.description}
            width="50"
          />
        )}
      </td>
              <td>
                <button
                  className="btn btn-primary me-1"
                  onClick={() => handleViewProduct(product._id)}
                >
                  View
                </button>
                <button
                  className="btn btn-warning me-1"
                  onClick={() => handleUpdateProduct(product._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({
            length: Math.ceil(filteredProducts.length / productsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* Product modal */}
      {showPopup && (
        <ProductModal
          id={selectedProductId}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
};

export default ProductList;
