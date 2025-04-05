import axios from "axios";

export const createUnit = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/unit", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUnit = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/unit", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeUnit = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/unit/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateUnit = async (token, id, data) => {
  return axios.put("https://cafe-shop-api.vercel.app/unit/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};