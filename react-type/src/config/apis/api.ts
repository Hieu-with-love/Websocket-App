import axios from "axios";

const baseURL = "http://localhost:8888/api/v1";

export const api = axios.create({
  baseURL: baseURL,
});
