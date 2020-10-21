import axios from 'axios';
import { api } from '../config';

export const getCategories = async () => await axios.get(`${api}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${api}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${api}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${api}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post(`${api}/category`, category, {
    headers: {
      authtoken,
    },
  });
