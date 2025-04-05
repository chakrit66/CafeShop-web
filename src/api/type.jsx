import axios from "axios";

export const createType = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/type", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listType = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/type", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeType = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/type/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateType = async (token, id, data) => {
  return axios.put("https://cafe-shop-api.vercel.app/type/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};