const Product = require("../models/Product");
const path = require("path");

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


const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, inStock, isFeatured, tags } = req.body;
    const images = req.files.map(file => ({
      url: file.filename, // Store only the filename
      description: file.originalname,
    }));

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      inStock,
      isFeatured,
      tags: tags.split(',').map(tag => tag.trim()), // assuming tags are comma-separated
      images,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Return the saved product
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};


// Update a product
const updateProduct = async (req, res) => {
  const { name, description, price, category, inStock, isFeatured, tags } =
    req.body;

  let images = [];
  if (req.files) {
    images = req.files.map((file) => ({
      url: file.path,
      description: file.originalname,
    }));
  }

  try {
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

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
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
