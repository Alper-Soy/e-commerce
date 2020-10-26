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
