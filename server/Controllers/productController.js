const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, category, inStock, isFeatured, tags } =
    req.body;

  const images = req.files.map((file) => ({
    url: file.filename,
    description: file.originalname,
  }));

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    inStock,
    isFeatured,
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    images,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
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
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.inStock = inStock;
    existingProduct.isFeatured = isFeatured;
    existingProduct.tags = tags ? tags.split(",").map((tag) => tag.trim()) : [];
    if (images.length > 0) {
      existingProduct.images = images;
    }

    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: error.message });
  }
};



// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from the filesystem
    if (product.images && product.images.length > 0) {
      product.images.forEach((image) => {
        const imagePath = path.join(__dirname, '../public/images/uploads', image.url);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image file: ${image.url}`, err);
          }
        });
      });
    }

    res.status(200).json({ message: "Product and associated images deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
