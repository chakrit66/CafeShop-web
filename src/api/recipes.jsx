import axios from "axios";

export const createRecipes = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/recipes", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readRecipes = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/recipes/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
