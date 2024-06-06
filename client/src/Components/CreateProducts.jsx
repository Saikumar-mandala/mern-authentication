import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/productSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    inStock: true,
    isFeatured: false,
    tags: "",
    images: [],
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("inStock", product.inStock);
    formData.append("isFeatured", product.isFeatured);
    formData.append("tags", product.tags);

    for (let i = 0; i < product.images.length; i++) {
      formData.append("images", product.images[i]);
    }

    dispatch(addProduct(formData));
  };

  return (
    <div className="container">
      <h2 className="mb-4">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name="name" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" name="description" className="form-control" onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" name="price" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" name="category" className="form-control" onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="inStock" name="inStock" checked={product.inStock} onChange={(e) => setProduct({ ...product, inStock: e.target.checked })} />
              <label className="form-check-label" htmlFor="inStock">In Stock</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="isFeatured" name="isFeatured" checked={product.isFeatured} onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })} />
              <label className="form-check-label" htmlFor="isFeatured">Featured</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags (comma-separated)</label>
          <input type="text" name="tags" className="form-control" onChange={handleChange} />
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="image" className="form-label">Image Upload</label>
            <input type="file" name="image" className="form-control" onChange={handleImageChange} multiple />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateProduct;
