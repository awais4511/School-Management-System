/**
 * Class API Service
 * Handles all class-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getClasses = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.CLASSES.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.classes } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getClass = async (token, classId) => {
  try {
    const response = await fetch(ENDPOINTS.CLASSES.GET(classId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.class } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createClass = async (token, classData) => {
  try {
    const response = await fetch(ENDPOINTS.CLASSES.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(classData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.class } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateClass = async (token, classId, classData) => {
  try {
    const response = await fetch(ENDPOINTS.CLASSES.UPDATE(classId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(classData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.class } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteClass = async (token, classId) => {
  try {
    const response = await fetch(ENDPOINTS.CLASSES.DELETE(classId), {
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
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
};
