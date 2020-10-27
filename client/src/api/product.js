import axios from 'axios';
import { api } from '../config';

export const createProduct = async (product, authtoken) =>
  await axios.post(`${api}/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async (count) =>
  await axios.get(`${api}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${api}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) =>
  await axios.get(`${api}/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${api}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });
