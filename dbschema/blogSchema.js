  const mongoose = require("mongoose");

  
  const blogSchema = new mongoose.Schema({
    blogTitle: { type: String, required: true },
    blogDescription: { type: String, required: true },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });

  
  const blogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

  module.exports = blogModel;
