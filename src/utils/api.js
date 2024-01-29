import axios from "axios";
import { EVENTS_ENDPOINT } from "./config";

export const fetchEvents = async () => {
  try {
    const response = await axios.get(EVENTS_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const addEvent = async (newEvent) => {
  try {
    const response = await axios.post(EVENTS_ENDPOINT, newEvent);
    console.log("Event added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${EVENTS_ENDPOINT}/${eventId}`);
    console.log("Event deleted successfully.");
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

export const updateEvent = async (updatedEvent) => {
  try {
    await axios.put(`${EVENTS_ENDPOINT}/${updatedEvent.id}`, updatedEvent);
    console.log("Event updated successfully.");
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const completeEvent = async (eventId) => {
  try {
    const response = await axios.patch(`${EVENTS_ENDPOINT}/${eventId}`, {
      completed: true,
    });
    console.log("Event completed successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error completing event:", error);
    throw error;
  }
};
