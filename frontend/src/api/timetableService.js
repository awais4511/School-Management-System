/**
 * Timetable API Service
 * Handles all timetable-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getTimetables = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.TIMETABLE.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.timetables } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getTimetable = async (token, timetableId) => {
  try {
    const response = await fetch(ENDPOINTS.TIMETABLE.GET(timetableId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.timetable } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createTimetable = async (token, timetableData) => {
  try {
    const response = await fetch(ENDPOINTS.TIMETABLE.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(timetableData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.timetable } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateTimetable = async (token, timetableId, timetableData) => {
  try {
    const response = await fetch(ENDPOINTS.TIMETABLE.UPDATE(timetableId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(timetableData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.timetable } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteTimetable = async (token, timetableId) => {
  try {
    const response = await fetch(ENDPOINTS.TIMETABLE.DELETE(timetableId), {
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
  getTimetables,
  getTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,
};
