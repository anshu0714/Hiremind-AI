import api, { handleResponse, handleError } from "@/services/api.client";

export const register = async (payload) => {
  try {
    const res = await api.post("/auth/register", payload);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const login = async (payload) => {
  try {
    const res = await api.post("/auth/login", payload);
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};

export const getUser = async () => {
  try {
    const res = await api.get("/auth/user");
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
};
