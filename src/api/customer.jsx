import axios from "axios";

export const createCus = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/customer", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCus = async (token) => {
  return axios.get("https://cafe-shop-api.vercel.app/customer", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeCus = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/customer/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateCus= async (token, id, form) => {
  return axios.put("https://cafe-shop-api.vercel.app/customer/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readCus = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/customer/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchTel = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/searchTel", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const HistoryBuyCus = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/purchaseHistory/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
