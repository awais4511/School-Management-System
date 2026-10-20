/**
 * Student API Service
 * Handles all student-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getStudents = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.STUDENTS.LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(token),
      },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.students } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getStudent = async (token, studentId) => {
  try {
    const response = await fetch(ENDPOINTS.STUDENTS.GET(studentId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.student } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyProfile = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.STUDENTS.MY_PROFILE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.student } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createStudent = async (token, studentData) => {
  try {
    const response = await fetch(ENDPOINTS.STUDENTS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(studentData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.student } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateStudent = async (token, studentId, studentData) => {
  try {
    const response = await fetch(ENDPOINTS.STUDENTS.UPDATE(studentId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(studentData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.student } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteStudent = async (token, studentId) => {
  try {
    const response = await fetch(ENDPOINTS.STUDENTS.DELETE(studentId), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, message: data.message } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getStudentStats = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.STUDENTS.STATS, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.stats } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  getStudents,
  getStudent,
  getMyProfile,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats,
};
