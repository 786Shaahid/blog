import { Joi } from "express-validation";
import validationConstant from "./validationContant.js";

export const fetchBlogById = {
  params: Joi.object({
    blogId: Joi.string().regex(validationConstant.OBJECTID_REGEX).required(),
  }),
};

export const fetchBlogByUserId = {
  params: Joi.object({
    userId: Joi.string().regex(validationConstant.OBJECTID_REGEX).required(),
  }),
};

export const createValidBlog = {
  body: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    author: Joi.string().regex(validationConstant.OBJECTID_REGEX).required(),
    timestamp: Joi.date().iso(),
  }),
};

export const updateValidBlogById = {
  params: Joi.object({
    blogId: Joi.string().regex(validationConstant.OBJECTID_REGEX).required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    timestamp: Joi.date().iso(),
  }),
};

export const deleteValidBlog = {
  params: Joi.object({
    blogId: Joi.string().regex(validationConstant.OBJECTID_REGEX).required(),
  }),
};
