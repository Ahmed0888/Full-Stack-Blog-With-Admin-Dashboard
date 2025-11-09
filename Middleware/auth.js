// Middleware/auth.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function authenticateToken(req, res, next) {
  const token = req.cookies?.jwtToken || req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
}
const authMiddleware = (req, res, next) => {
try {
  const token =
    req.cookies.jwtToken || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided, access denied." });
  }

  jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid token." });

    req.user = decoded;
    next();
  });
} catch (error) {
  console.error("Auth Middleware Error:", error);
  return res.status(500).json({ success: false, message: "Server error." });
}
};

module.exports = { authenticateToken, authorizeRoles,authMiddleware };
