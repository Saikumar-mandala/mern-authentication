import React from "react";
import { useSelector } from "react-redux";

const ProductModal = ({ id, showPopup, setShowPopup }) => {
  const allProducts = useSelector((state) => state.products.products);
  const product = allProducts.find((prod) => prod._id === id);

  return (
    <>
      {showPopup && product && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowPopup(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name: {product.name}</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description: {product.description}</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Price: ${product.price}</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Category: {product.category}</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">In Stock: {product.inStock ? 'Yes' : 'No'}</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tags: {product.tags.join(', ')}</label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Featured: {product.isFeatured ? 'Yes' : 'No'}</label>
                </div>
                {product.images.map((image, index) => (
                  <div key={index} className="mb-3">
                    <label className="form-label">Image {index + 1}:</label>
                    <div>
                      <img src={image.url} alt={`Product ${index + 1}`} className="img-thumbnail" />
                      <p>{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
