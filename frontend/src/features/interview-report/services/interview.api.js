import api, { handleResponse, handleError } from "@/services/api.client";

export const generateInterviewReport = async (formData) => {
  try {
    const res = await api.post("/interview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return handleResponse(res);
  } catch (error) {
    handleError(error);
    return;
  }
};

export const getAllInterviewReports = async (params = {}) => {
  try {
    const res = await api.get("/interview", { params });
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    return;
  }
};

export const getInterviewReportById = async (reportId) => {
  try {
    const res = await api.get(`/interview/${reportId}`);
    return handleResponse(res);
  } catch (error) {
    handleError(error);
    return;
  }
};
