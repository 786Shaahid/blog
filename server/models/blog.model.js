import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
  },
    {
      timestamps: true,
    }
  );
  

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;