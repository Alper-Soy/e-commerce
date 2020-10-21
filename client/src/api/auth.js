import axios from 'axios';
import { api } from '../config';

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${api}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${api}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${api}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
