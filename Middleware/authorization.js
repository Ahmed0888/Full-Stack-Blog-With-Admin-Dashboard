const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  try {
    // Try to get token from cookie or header
    const token =
      req.cookies?.jwtToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided, access denied." });
    }

    jwt.verify(token, process.env.JWTSECRETKEY, (err, decoded) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: "Invalid or expired token." });

      req.user = decoded; // store user data from token
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = authMiddleware;
