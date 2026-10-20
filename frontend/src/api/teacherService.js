/**
 * Teacher API Service
 * Handles all teacher-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getTeachers = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.TEACHERS.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.teachers } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getTeacher = async (token, teacherId) => {
  try {
    const response = await fetch(ENDPOINTS.TEACHERS.GET(teacherId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.teacher } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyTeacherProfile = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.TEACHERS.MY_PROFILE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.teacher } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createTeacher = async (token, teacherData) => {
  try {
    const response = await fetch(ENDPOINTS.TEACHERS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(teacherData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.teacher } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateTeacher = async (token, teacherId, teacherData) => {
  try {
    const response = await fetch(ENDPOINTS.TEACHERS.UPDATE(teacherId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(teacherData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.teacher } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteTeacher = async (token, teacherId) => {
  try {
    const response = await fetch(ENDPOINTS.TEACHERS.DELETE(teacherId), {
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
  getTeachers,
  getTeacher,
  getMyTeacherProfile,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
