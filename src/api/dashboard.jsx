import axios from "axios";

export const getCustomerPurchases = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/customer-purchases`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getProfitLoss = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/profit-loss`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBestSellingByType = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/bestsellers/type`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBestSellingByCategory = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/bestsellers/category`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfit = async (token, startDate, endDate, groupBy) => {
  return axios.get(`https://cafe-shop-api.vercel.app/profit-report`, {
    params: { startDate, endDate, groupBy },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBestSellers = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/best-sellers`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
