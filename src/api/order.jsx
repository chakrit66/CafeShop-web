import axios from "axios";

export const createOrder = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/order", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listOrder = async (token, page = 1, limit = 15) => {
  return axios.get(`https://cafe-shop-api.vercel.app/order?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readOrder= async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/order/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const receiptData= async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/receiptData/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeOrder = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/order/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchOrder = async (token, arg) => {
  return axios.post("https://cafe-shop-api.vercel.app/search/order", arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};