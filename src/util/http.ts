import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_REST_URL,
});

export default http;
