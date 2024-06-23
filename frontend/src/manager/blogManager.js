import { deleteApi, getApi,  postBlog, putApi } from "../utils/apiCall";
import { API_CONSTANTS } from "../utils/contants";

const getBlogInfo = async () => {
  const { token } = JSON.parse(localStorage.getItem("token"));
  const data = await getApi(
    `${API_CONSTANTS.getBlogs}/`,
    token
  );
  return data;
};

const createBlog = async (body) => {
  const { user, token } = JSON.parse(localStorage.getItem("token"));
  const data = await postBlog(
    `${API_CONSTANTS.createBlog}`,
    {...body, author:user._id},
    token,

  );
  return data;
};

const getBlogById = async () => {
  const { user,token } = JSON.parse(localStorage.getItem("token"));
  const data = await getApi(`${API_CONSTANTS.getbBlogByUser}/${user._id}`, token);
  return data;
};

const deleteBlogById = async (blogId) => {
  const { token } = JSON.parse(localStorage.getItem("token"));
  const data = await deleteApi(
    `${API_CONSTANTS.deleteBlogById}/${blogId}`,
    token
  );
  return data;
};

const updateBlogById = async (blogId, body) => {
  const { token } = JSON.parse(localStorage.getItem("token"));
  const data = await putApi(
    `${API_CONSTANTS.updateBlogById}/${blogId}`,
    body,
    token
  );
  return data;
};

export default {
  getBlogInfo: getBlogInfo,
  createBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};