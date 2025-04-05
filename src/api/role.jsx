import axios from "axios";

export const listRole = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/role", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createRole = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/role", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeRole = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/role/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRole = async (token, id, data) => {
  return axios.put("https://cafe-shop-api.vercel.app/role/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readPermission = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/permission/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePermission = async (token, id, data) => {
  return axios.put("https://cafe-shop-api.vercel.app/permission/" + id, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
