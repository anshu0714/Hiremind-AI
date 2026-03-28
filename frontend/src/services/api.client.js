import axios from "axios";
import { logger } from "../utils/logger.util";
import { triggerLogout } from "../utils/auth.util";
import { showToast } from "@/utils/toast.util";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const handleResponse = (response) => {
  logger.debug("API_RESPONSE", response.data);
  return response.data;
};

export const handleError = (error) => {
  const status = error?.response?.status;
  const type =
    error?.response?.data?.type ||
    (status === 401 ? "AUTH_ERROR" : "UNKNOWN_ERROR");

  const isNetworkError = !error.response;

  let message;

  if (isNetworkError) {
    message = "Network error. Please check your connection.";
  } else {
    const rawMessage = error?.response?.data?.message;

    message =
      rawMessage && rawMessage.length < 120
        ? rawMessage
        : "Something went wrong";
  }

  if (!(status === 401 && type === "SESSION_EXPIRED")) {
    showToast.error(message);
  }

  const customError = new Error(message);
  customError.status = status;
  customError.type = type;
  customError.endpoint = error?.config?.url;

  throw customError;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const type = error?.response?.data?.type;

    if (status === 401 && type === "SESSION_EXPIRED") {
      triggerLogout();
    }

    return Promise.reject(error);
  },
);

export default api;
