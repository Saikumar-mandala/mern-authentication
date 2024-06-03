const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    req.user = decoded; // Set the user in the request object
    return res.status(200).json({ status: true, user: decoded });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logged out successfully" });
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
};

module.exports = { logout, verifyUser, generateToken };
