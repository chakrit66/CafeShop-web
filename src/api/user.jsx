import axios from "axios";

export const listUsers = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/user", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeUser = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/user/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readUser = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/user/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (token, id, form) => {
  return axios.put("https://cafe-shop-api.vercel.app/user/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeRole = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/change-role", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeStatus = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/change-status", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
