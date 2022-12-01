import Axios from 'axios';
import { IAPI } from '../@types/api';

export const getDataAPI = async (path: string, { params }: IAPI) => {
  const { data } = await Axios.get(
    `${import.meta.env.VITE_BASE_REST_URL}${path}`,
    {
      params
    }
  );
  return data;
};

export const postDataAPI = async (path: string, { payload }: IAPI) => {
  const { data } = await Axios.post(
    `${import.meta.env.VITE_BASE_REST_URL}${path}`,
    payload
  );
  return data;
};

export const putDataAPI = async (path: string, { payload }: IAPI) => {
  const { data } = await Axios.put(
    `${import.meta.env.VITE_BASE_REST_URL}${path}`,
    payload
  );
  return data;
};
