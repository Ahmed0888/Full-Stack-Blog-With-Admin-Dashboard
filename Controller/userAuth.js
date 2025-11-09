// Controller/userAuth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../dbschema/schema");
dotenv.config();

//  Signup Controller
const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashed,
      role: role || "user", // default role is user
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during signup.",
    });
  }
};

//  Login 
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWTSECRETKEY,
      { expiresIn: "1d" }
    );

    // Store JWT in cookie
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: false, //  https ko use kernay kay liye true kerna hay 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};

//  Logout 
const logoutUser = async (req, res) => {
  res.clearCookie("jwtToken");
  return res.json({ success: true, message: "Logged out successfully." });
};

module.exports = { signupUser, loginUser, logoutUser };
