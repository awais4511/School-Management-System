/**
 * Event API Service
 * Handles all event-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getEvents = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.EVENTS.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.events } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getEvent = async (token, eventId) => {
  try {
    const response = await fetch(ENDPOINTS.EVENTS.GET(eventId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.event } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createEvent = async (token, eventData) => {
  try {
    const response = await fetch(ENDPOINTS.EVENTS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.event } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (token, eventId, eventData) => {
  try {
    const response = await fetch(ENDPOINTS.EVENTS.UPDATE(eventId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.event } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (token, eventId) => {
  try {
    const response = await fetch(ENDPOINTS.EVENTS.DELETE(eventId), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, message: data.message } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
