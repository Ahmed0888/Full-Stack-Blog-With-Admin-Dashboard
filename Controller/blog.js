// Controller/blogController.js

const blogModel = require("../dbschema/blogSchema.js");


async function createBlog(req, res) {
  try {
    const { blogTitle, blogDescription, authorName } = req.body;
    if (!blogTitle || !blogDescription || !authorName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const newBlog = new blogModel({ blogTitle, blogDescription, authorName });
    await newBlog.save();
    return res
      .status(201)
      .json({ success: true, message: "Blog created.", blog: newBlog });
  } catch (err) {
    console.error("createBlog error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

async function getAllBlogs(req, res) {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("getAllBlogs error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { createBlog, getAllBlogs };
