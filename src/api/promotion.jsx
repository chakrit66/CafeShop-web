import axios from "axios";

export const listPromotion = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/promotion", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPromotion = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/promotion", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removePromotion = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/promotion/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};