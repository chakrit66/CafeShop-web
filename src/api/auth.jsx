import axios from "axios";

export const checkLogin = (data) => {
  return axios.post("https://cafe-shop-api.vercel.app/login", data);
};

export const currentUser = async (token) => {
    await axios.post(
      "https://cafe-shop-api.vercel.app/current-user",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };