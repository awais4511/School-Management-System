/**
 * Grade API Service
 * Handles all grade-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getGrades = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.GRADES.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.grades } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getGrade = async (token, gradeId) => {
  try {
    const response = await fetch(ENDPOINTS.GRADES.GET(gradeId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.grade } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyGrades = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.GRADES.MY_GRADES, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.grades } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createGrade = async (token, gradeData) => {
  try {
    const response = await fetch(ENDPOINTS.GRADES.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(gradeData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.grade } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateGrade = async (token, gradeId, gradeData) => {
  try {
    const response = await fetch(ENDPOINTS.GRADES.UPDATE(gradeId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(gradeData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.grade } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteGrade = async (token, gradeId) => {
  try {
    const response = await fetch(ENDPOINTS.GRADES.DELETE(gradeId), {
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
  getGrades,
  getGrade,
  getMyGrades,
  createGrade,
  updateGrade,
  deleteGrade,
};
