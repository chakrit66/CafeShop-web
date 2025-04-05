import axios from "axios";

export const createCat = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCat = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCat = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/category/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCat = async (token, id, data) => {
  return axios.put("https://cafe-shop-api.vercel.app/category/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};