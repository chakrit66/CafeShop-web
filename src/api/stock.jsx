import axios from "axios";

export const listStock = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/stock", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const update_min = async (token, id, data) => {
  return axios.put("https://cafe-shop-api.vercel.app/stock-min/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const stockWithHistory = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/stock/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const checkStock = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/checkStock", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};