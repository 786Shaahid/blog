import Blog from "../models/blog.model.js";


class BlogDao {
  createBlog(postData) {
    return new Promise(async (resolve, reject) => {
      try {
        const newBlog = new Blog(
          postData
        );
        const savedBlog = (await newBlog.save()).populate({
          path: "author",
          select: "-password",
        });
        
        resolve(savedBlog);
      } catch (err) {
        reject(err);
      }
    });
  }

  getBlogsByUserId(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const blogs = await Blog.find({
          author: userId
                 })
                    .sort({
            createdAt: -1,
          });
        resolve(blogs);
      } catch (err) {
        reject(err);
      }
    });
  }

  getBlogs() {
    return new Promise(async (resolve, reject) => {
      try {
        const blog= await Blog.find().sort({
            createdAt: -1,
          });
        resolve(blog);
      } catch (err) {
        reject(err);
      }
    });
  }

  destryBlogsByAssetId(blogId) {
    return new Promise(async (resolve, reject) => {
      try {
        const blog = await Blog.findByIdAndDelete(
          {
            _id: blogId
          }
        )
        resolve(blog);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateBlogsByBlogId(blogId, blog) {

    return new Promise(async (resolve, reject) => {
      try {
        const assets = await Blog.findByIdAndUpdate(
          {
            _id: blogId,
          },
          { $set: blog },
         {new:true} 
        )
          
        resolve(assets);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default BlogDao;