import api, { handleResponse, handleError } from "@/services/api.client";

export const getDashboardData = async () => {
  try {
    const res = await api.get("/dashboard");
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};
