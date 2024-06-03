const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("../Controllers/userController");
const { verifyUser, logout } = require("../Controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify", verifyUser);
router.get("/logout", logout);
module.exports = router;
