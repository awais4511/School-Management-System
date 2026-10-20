/**
 * Attendance API Service
 * Handles all attendance-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getAttendance = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.ATTENDANCE.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.attendance } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAttendanceRecord = async (token, attendanceId) => {
  try {
    const response = await fetch(ENDPOINTS.ATTENDANCE.GET(attendanceId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.attendance } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyAttendance = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.ATTENDANCE.MY_ATTENDANCE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.attendance } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createAttendance = async (token, attendanceData) => {
  try {
    const response = await fetch(ENDPOINTS.ATTENDANCE.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(attendanceData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.attendance } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAttendance = async (token, attendanceId, attendanceData) => {
  try {
    const response = await fetch(ENDPOINTS.ATTENDANCE.UPDATE(attendanceId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(attendanceData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.attendance } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteAttendance = async (token, attendanceId) => {
  try {
    const response = await fetch(ENDPOINTS.ATTENDANCE.DELETE(attendanceId), {
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
  getAttendance,
  getAttendanceRecord,
  getMyAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
