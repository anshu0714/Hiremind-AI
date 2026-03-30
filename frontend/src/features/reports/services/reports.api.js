import api, { handleResponse, handleError } from "@/services/api.client";

export const getReports = async (params) => {
  try {
    const res = await api.get("/interview", { params });
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};

export const deleteReport = async (id) => {
  try {
    const res = await api.delete(`/interview/${id}`);
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};

export const regenerateReport = async (id) => {
  try {
    const res = await api.post(`/interview/${id}/regenerate`);
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};
