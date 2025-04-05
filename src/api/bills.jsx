import axios from "axios";

export const listBills = async (token, page = 1, limit = 15) => {
  return axios.get(`https://cafe-shop-api.vercel.app/bills?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createBill = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/bills", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeBill = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/bills/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readBill = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/bill/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchBill = async (token, arg) => {
  return axios.post("https://cafe-shop-api.vercel.app/search/bill", arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};