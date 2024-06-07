import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../features/productSlice";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products, status } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const productToUpdate = products.find((product) => product._id === id);
    if (productToUpdate) {
      setFormData(productToUpdate);
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      // Ensure formData.tags is handled as an array
      const tagsArray = Array.isArray(value) ? value : [value];
      setFormData({ ...formData, [name]: tagsArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


































  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append("name", formData.name);
      updatedData.append("description", formData.description);
      updatedData.append("price", formData.price);
      updatedData.append("category", formData.category);
      updatedData.append("inStock", formData.inStock);
      updatedData.append("isFeatured", formData.isFeatured);
  
      // Ensure formData.tags is an array before calling join
      const tagsArray = Array.isArray(formData.tags) ? formData.tags : [formData.tags];
      updatedData.append("tags", tagsArray.join(","));
  
      images.forEach((image) => {
        updatedData.append("images", image);
      });
  
      await dispatch(updateProduct({ id, formData: updatedData }));
      navigate("/products-list");
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };
  
  
  















  

  if (status === "loading") {
    return <div>Loading...</div>;
  }


  return (
    <div className="container my-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formData.category || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="inStock"
            checked={formData.inStock || false}
            onChange={handleChange}
          />
          <label className="form-check-label">In Stock</label>
        </div>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured || false}
            onChange={handleChange}
          />
          <label className="form-check-label">Featured</label>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image Upload
          </label>
          <input
            type="file"
            name="images"
            className="form-control"
            onChange={handleChange}
          />
          {formData.images && formData.images.length > 0 && (
            <img
              src={`http://localhost:5000/images/uploads/${formData.images[0].url}`}
              alt={formData.description}
              width="50"
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={formData.tags ? formData.tags.join(", ") : ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
