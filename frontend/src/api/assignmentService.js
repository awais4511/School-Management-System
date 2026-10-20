/**
 * Assignment API Service
 * Handles all assignment-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getAssignments = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.ASSIGNMENTS.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.assignments } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAssignment = async (token, assignmentId) => {
  try {
    const response = await fetch(ENDPOINTS.ASSIGNMENTS.GET(assignmentId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.assignment } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyAssignments = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.ASSIGNMENTS.MY_ASSIGNMENTS, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.assignments } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createAssignment = async (token, assignmentData) => {
  try {
    const response = await fetch(ENDPOINTS.ASSIGNMENTS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(assignmentData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.assignment } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAssignment = async (token, assignmentId, assignmentData) => {
  try {
    const response = await fetch(ENDPOINTS.ASSIGNMENTS.UPDATE(assignmentId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(assignmentData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.assignment } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteAssignment = async (token, assignmentId) => {
  try {
    const response = await fetch(ENDPOINTS.ASSIGNMENTS.DELETE(assignmentId), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, message: data.message } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const submitAssignment = async (token, assignmentId, submissionData) => {
  try {
    const response = await fetch(ENDPOINTS.ASSIGNMENTS.SUBMIT(assignmentId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(submissionData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.submission } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  getAssignments,
  getAssignment,
  getMyAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
};
