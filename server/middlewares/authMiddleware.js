const isAdmin = (req, res, next) => {
  // Simulating admin check based on some condition (e.g., role)
  const isAdmin = req.user && req.user.role === "admin";
  if (!isAdmin) {
    return res
      .status(403)
      .json({ success: false, message: "You are not an admin" });
  }
  next();
};

module.exports = { isAdmin };
