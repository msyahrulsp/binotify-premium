import Axios from 'axios';
import { IAPI } from '../@types/api';

export const getDataAPI = async (
  path: string,
  { params, authorization }: IAPI
) => {
  if (authorization) {
    const { data } = await Axios.get(
      `${import.meta.env.VITE_BASE_REST_URL}${path}`,
      {
        headers: {
          Authorization: `${authorization}`
        },
        params
      }
    );
    return data;
  }
  const { data } = await Axios.get(
    `${import.meta.env.VITE_BASE_REST_URL}${path}`,
    {
      params
    }
  );
  return data;
};

export const postDataAPI = async (
  path: string,
  { payload, authorization }: IAPI
) => {
  if (authorization) {
    const { data } = await Axios.post(
      `${import.meta.env.VITE_BASE_REST_URL}${path}`,
      payload,
      {
        headers: {
          Authorization: `${authorization}`
        }
      }
    );
    return data;
  } else {
    const { data } = await Axios.post(
      `${import.meta.env.VITE_BASE_REST_URL}${path}`,
      payload
    );
    return data;
  }
};
