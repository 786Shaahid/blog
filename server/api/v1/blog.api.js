import express from "express";
import { validate } from "express-validation";
import {
  createBlog,
   getBlogs,
  getBlogByUserId,
  destroyBlogById,
  updateBlogById,
} from "../../controllers/blog.controller.js";
import {
  createValidBlog,
  deleteValidBlog,
  
  fetchBlogByUserId,
  updateValidBlogById,
} from "../../validations/blog.validation.js";
import { verifyToken } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/** GET ALL BlogS Of A USER
 */
router.get(
  "/user/:userId",
  validate(fetchBlogByUserId, {}, {}),
  verifyToken,
  getBlogByUserId
);

/** GET all Blog
 */
router.get(
  "/getAll",
    verifyToken,
  getBlogs
);
/** GET AN Blog
 */
router.put(
  "/update/:blogId",
  validate(updateValidBlogById, {}, {}),
  verifyToken,
  updateBlogById
);

/** CREATE AN Blog
 */
router.post(
  "/create",
  validate(createValidBlog, {}, {}),
   verifyToken,
  createBlog
);

/** DELETE AN Blog
 */

router.delete(
  "/delete/:blogId",
  validate(deleteValidBlog, {}, {}),
  verifyToken,
  destroyBlogById
);

export default router;