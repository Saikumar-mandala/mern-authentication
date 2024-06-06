


<div className="mb-3">
<img
  src={`http://localhost:5000/images/uploads/${product.images[0].url}`}
  alt={product.description}
  width="50"
/>
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
</div>