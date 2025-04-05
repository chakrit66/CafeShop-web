import axios from "axios";

export const checkOut = async (token, cart) => {
  return axios.post("https://cafe-shop-api.vercel.app/checkOut", cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const generateQr = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/generate-qr", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};