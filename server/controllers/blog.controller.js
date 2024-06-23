

import env from "../config/environment.js";
import path from "path";

import BlogDao from "../dao/blogDao.js";

const blogDao = new BlogDao();

export const createBlog = async (req, res) => {

    try {
 const data=  await blogDao.createBlog(req.body);
    return res
      .status(200)
      .json({ success: true, message: "Post created", data });
  } catch (err) {
    console.error("Error in create blogs:", err);
    return res.status(500).send("Error in creating blog",error);
  }
};

export const getBlogByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await blogDao.getBlogsByUserId(userId);
    return res.status(200).json({
      success: true,
      message: "fetched all user specifice available blogs",
      data,
    });
  } catch (err) {
    return res.status(err?.status || 500).json({
      success: false,
      message: "failed to fetch blog",
      error: err?.message ?? err.err ?? "something went wrong",
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const data = await blogDao.getBlogs();
    return res.status(200).json({
      success: true,
      message: `${
        !data ? "no blog " : "fetched all blogs succesfully"
      }`,
      data,
    });
  } catch (err) {
    return res.status(err?.status || 500).json({
      success: false,
      message: "failed to fetch blog",
      error: err?.message ?? err.err ?? "something went wrong",
    });
  }
};

export const destroyBlogById = async (req, res) => {
  try {
    const {blogId } = req.params;
    const data = await blogDao.destryBlogsByAssetId(blogId);
    return res.status(200).json({
      success: true,
      message: "blog deleted",
      data,
    });
  } catch (err) {
    return res.status(err?.status || 500).json({
      success: false,
      message: "failed to fetch blog",
      error: err?.message ?? err.err ?? "something went wrong",
    });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
     
    const data = await blogDao.updateBlogsByBlogId(blogId, req.body);
    return res.status(200).json({
      success: true,
      message: "Blog updated",
      data,
    });
  } catch (err) {
    return res.status(err?.status || 500).json({
      success: false,
      message: "failed to update blog",
      error: err?.message ?? err.err ?? "something went wrong",
    });
  }
};