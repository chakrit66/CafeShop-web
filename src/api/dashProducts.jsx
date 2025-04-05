import axios from "axios";

export const getDashProducts = async (token, startDate, endDate) => {
  return axios.get(`https://cafe-shop-api.vercel.app/getProducts`, {
    params: { startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};