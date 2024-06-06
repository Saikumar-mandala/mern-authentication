import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../features/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [updateData, setUpdateData] = useState({});
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (id && products.length > 0) {
      const singleProduct = products.find((product) => product._id === id);
      if (singleProduct) {
        setUpdateData(singleProduct);
      }
    }
  }, [id, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUpdateData({ ...updateData, [name]: checked });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      imagesArray.push({ url: URL.createObjectURL(file), description: file.name });
    }
    setUpdateData({ ...updateData, images: imagesArray });
  };
  

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, ...updateData })).then(() => {
      navigate("/products-list");
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updateData.name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={updateData.description || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={updateData.price || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={updateData.category || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="inStock"
            checked={updateData.inStock || false}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label">In Stock</label>
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="isFeatured"
            checked={updateData.isFeatured || false}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label">Featured</label>
        </div>

        {/* Other form inputs */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image Upload
          </label>
          <input
            type="file"
            name="images"
            className="form-control"
            onChange={handleImageChange}
            multiple
          />
          {updateData.images && updateData.images.length > 0 && (
            <img
              src={`http://localhost:5000/images/uploads/${updateData.images[0].url}`}
              alt={updateData.description}
              width="50"
            />
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
