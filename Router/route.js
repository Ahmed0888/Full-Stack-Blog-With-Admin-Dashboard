// Router/route.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { createBlog, getAllBlogs } = require("../Controller/blog");
const { signupUser, loginUser, logoutUser } = require("../Controller/userAuth");
const authMiddleware = require("../middleware/authorization"); // we'll create this next

dotenv.config();

//  Middleware: Verify JWT Token
function authenticateToken(req, res, next) {
  const token =
    req.cookies?.jwtToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

//  Middleware: Role-Based Authorization
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this route.",
      });
    }
    next();
  };
}

//  Public Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/blogs", getAllBlogs);

//  Protected Routes
router.post("/blogs", authenticateToken, createBlog);

//  Role Related  Dashboards
router.get("/admin", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin! You have access to admin dashboard.",
  });
});

router.get("/user", authenticateToken, authorizeRoles("user", "admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome User! You have access to user dashboard.",
  });
});


router.get("/dashboard", authMiddleware, (req, res) => {
  if (req.user.role === "admin") {
    return res.json({ success: true, message: "Welcome Admin Dashboard" });
  } else {
    return res.json({ success: true, message: "Welcome User Dashboard" });
  }
});


// Logout
router.get("/logout", logoutUser);

module.exports = router;
