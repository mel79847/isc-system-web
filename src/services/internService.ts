import axios from "axios";
import apiClient from "./apiInstance";

export const getInternService = async (intern_id: number) => {
  try {
    const response = await apiClient.get(`/interns/${intern_id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to get intern" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const getInternEvents = async (intern_id: number) => {
  try {
    const response = await apiClient.get(`/interns/${intern_id}/my-events`);
    if (response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to get intern events" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
