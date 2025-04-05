import axios from "axios";

export const getCusBuy = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getCusBuy`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPurchase = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getPurchase`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
