import axios from "axios";

export const createProduct = async (token, form) => {
  return axios.post("https://cafe-shop-api.vercel.app/products", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (token, count = 20) => {
  return axios.get("https://cafe-shop-api.vercel.app/products/" + count, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readProduct = async (token, id) => {
  return axios.get("https://cafe-shop-api.vercel.app/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeProduct = async (token, id) => {
  return axios.delete("https://cafe-shop-api.vercel.app/product/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return axios.put("https://cafe-shop-api.vercel.app/product/" + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const upLoadFiles = async (token, form) => {
  return axios.post(
    "https://cafe-shop-api.vercel.app/images",
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFile = async (token, public_id) => {
  return axios.post(
    "https://cafe-shop-api.vercel.app/remoeImage",
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchProduct = async (token, arg) => {
  return axios.post("https://cafe-shop-api.vercel.app/search/filters", arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeStatusProduct = async (token, data) => {
  return axios.post("https://cafe-shop-api.vercel.app/change-status-product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
