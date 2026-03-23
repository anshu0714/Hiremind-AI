import axios from "axios";
import { log, logError } from "../utils/logger.util";

/* AXIOS INSTANCE */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

/* RESPONSE HANDLER */
export const handleResponse = (response) => {
  log("API Response:", response.data);
  return response.data;
};

/* ERROR HANDLER */
export const handleError = (error) => {
  const message =
    error?.response?.data?.message || error?.message || "Something went wrong";

  logError("API Error:", message);

  throw new Error(message);
};

export default api;
