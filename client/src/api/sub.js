import axios from 'axios';
import { api } from '../config';

export const getSubs = async () => await axios.get(`${api}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${api}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${api}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${api}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`${api}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
