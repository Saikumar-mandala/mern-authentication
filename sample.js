<button
className="btn btn-warning me-1"
onClick={() => handleUpdateProduct(product._id)}
>
Update
</button>
when i click this button i am getting data but when i update button click then not update data 


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../features/productSlice";

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
    if (name === "tags") {
      // Split the input value by commas and trim each tag
      setUpdateData({
        ...updateData,
        [name]: value.split(",").map((tag) => tag.trim()),
      });
    } else {
      setUpdateData({ ...updateData, [name]: value });
    }
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
      imagesArray.push(file);
    }
    setUpdateData({ ...updateData, images: imagesArray });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updateData.name);
      formData.append("description", updateData.description);
      formData.append("price", updateData.price);
      formData.append("category", updateData.category);
      formData.append("inStock", updateData.inStock);
      formData.append("isFeatured", updateData.isFeatured);

      if (updateData.tags) {
        formData.append("tags", updateData.tags.join(","));
      }

      if (updateData.images) {
        updateData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }

      await dispatch(updateProduct({ id, formData }));
      navigate("/products-list");
    } catch (error) {
      console.error("Error updating product:", error.message);
      // Handle error here
    }
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

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image Upload
          </label>
          <input
            type="file"
            name="images"
            className="form-control"
            onChange={handleImageChange}
          />
          {updateData.images && updateData.images.length > 0 && (
            <img
              src={`http://localhost:5000/images/uploads/${updateData.images[0].url}`}
              alt={updateData.description}
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
            value={updateData.tags ? updateData.tags.join(", ") : ""}
            onChange={handleInputChange}
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



const updateProduct = async (req, res) => {
  const { name, description, price, category, inStock, isFeatured, tags } =
    req.body;

  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => ({
      url: file.filename,
      description: file.originalname,
    }));
  }

  try {
    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (images.length === 0) {
      images = existingProduct.images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        inStock,
        isFeatured,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        images,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: error.message });
  }
};



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await axios.post(
      "http://localhost:5000/products",
      product
    );
    return response.data;
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const { id, ...updateData } = product;
    const formData = new FormData();
    for (const key in updateData) {
      if (key === "images") {
        updateData.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else {
        formData.append(key, updateData[key]);
      }
    }
    const response = await axios.put(
      `http://localhost:5000/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    return productId;
  }
);

// Search products
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query) => {
    const response = await axios.get(
      `http://localhost:5000/products?search=${query}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

i dont want formData logic because data not update