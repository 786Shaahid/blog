import axios from "axios";

export async function getApi(url, token = "") {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function postApi(url, body, token = "") {
  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function postBlog(url, body, token = "") {
  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`
             },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteApi(url, token = "") {
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function putApi(url, body, token = "") {
  try {
    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}