import axios from 'axios';
import { api } from "../config";

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