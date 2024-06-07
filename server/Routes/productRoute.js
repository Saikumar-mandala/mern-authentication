const express = require("express");
const upload = require("../utils/multerUploadImage")
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");

const router = express.Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.array("images", 10), createProduct);
router.put("/:id", upload.array("images", 10), updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
 