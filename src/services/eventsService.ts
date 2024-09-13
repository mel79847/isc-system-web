import axios from "axios";
import apiClient from "./apiInstance";
import { Event } from "../models/eventInterface";

export const getEventsService = async () => {
  try {
    const response = await apiClient.get("/events");
    if (response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to get events" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const getEventsInformationsService = async () => {
  try {
    const response = await apiClient.get("/events/register-information");
    if (response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to get events" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const registerInternEventService = async (
  id_event: number,
  id_intern: number
) => {
  try {
    const response = await apiClient.post(`events/${id_event}/register`, {
      id_becario: id_intern,
    });
    if (response.status === 201) {
      return response.data;
    } else {
      return { error: "Failed to register intern on event" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const createEventService = async (event: Event) => {
  try {
    const response = await apiClient.post(`events`, event);
    if (response.status === 201) {
      return response.data;
    } else {
      return { error: "Failed to create event" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const deleteInternFromEventService = async (
  id_event: number,
  id_intern: number
) => {
  try {
    const response = await apiClient.delete(
      `events/${id_event}/registrations/${id_intern}`
    );
    if (response.status == 200) {
      return response.data;
    } else {
      return { error: "Failed to register intern on event" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};

export const getFullEventInformationService = async (id: string) => {
  try {
    const response = await apiClient.get(`events/${id}/registrations`);
    if (response.status === 200) {
      return response.data;
    } else {
      return { error: "Failed to fetch full event info" };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data.message || "Network error" };
    } else {
      return { error: "An unexpected error occurred" };
    }
  }
};
