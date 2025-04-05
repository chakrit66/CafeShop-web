import axios from "axios";

export const getDashProfitLoss = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/dashProfitLoss`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getlineChartProfitLoss = async (
  token,
  startDate,
  endDate,
  groupBy
) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getlineChartProfitLoss`, {
    params: { startDate, endDate, groupBy },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRevenueList = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getRevenueList`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCostList = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getCostList`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};