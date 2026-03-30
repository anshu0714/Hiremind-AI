import api, { handleResponse, handleError } from "@/services/api.client";

export const generateInterviewReport = async (formData) => {
  try {
    const res = await api.post("/interview", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const getAllInterviewReports = async (params = {}) => {
  try {
    const res = await api.get("/interview", { params });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const getInterviewReportById = async (id) => {
  try {
    const res = await api.get(`/interview/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const deleteInterviewReport = async (id) => {
  try {
    const res = await api.delete(`/interview/${id}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const regenerateInterviewReport = async (id) => {
  try {
    const res = await api.post(`/interview/${id}/regenerate`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
  }
};

export const downloadInterviewReport = async (id) => {
  try {
    const res = await api.get(`/interview/${id}/download`, {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};