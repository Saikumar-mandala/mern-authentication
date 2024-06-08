const express = require("express");
const upload = require("../utils/multerUploadImage");
const { isAdmin } = require("../middlewares/authMiddleware");
// const {
//   uploadPhoto,
//   productImgResize,
// } = require("../middlewares/uploadImageMiddleware");

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
router.post("/", upload.array("images", 10), isAdmin, createProduct);
router.put("/:id", upload.array("images", 10), isAdmin, updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;
