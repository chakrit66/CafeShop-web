import axios from "axios";

export const createIng = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/ingredients", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listIng = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/ingredients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeIng = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/ingredients/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateIng = async (token, id, data) => {
  return axios.put("https://cafe-shop-api.vercel.app/ingredients/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};