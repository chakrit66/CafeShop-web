import axios from "axios";

export const getSalesReport = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getSalesReport`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const salesOverTime = async (token, startDate, endDate, groupBy) => {
  return axios.get(`https://cafe-shop-api.vercel.app/salesOverTime`, {
    params: { startDate, endDate, groupBy },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductSell = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getProductSell`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSalesList = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getSalesList`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};