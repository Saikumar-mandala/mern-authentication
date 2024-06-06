const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  images: [],
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;

