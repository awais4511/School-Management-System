/**
 * Parent API Service
 * Handles all parent-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getParents = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.PARENTS.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.parents } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getParent = async (token, parentId) => {
  try {
    const response = await fetch(ENDPOINTS.PARENTS.GET(parentId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.parent } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyParentProfile = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.PARENTS.MY_PROFILE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.parent } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createParent = async (token, parentData) => {
  try {
    const response = await fetch(ENDPOINTS.PARENTS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(parentData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.parent } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateParent = async (token, parentId, parentData) => {
  try {
    const response = await fetch(ENDPOINTS.PARENTS.UPDATE(parentId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(parentData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.parent } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteParent = async (token, parentId) => {
  try {
    const response = await fetch(ENDPOINTS.PARENTS.DELETE(parentId), {
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
  getParents,
  getParent,
  getMyParentProfile,
  createParent,
  updateParent,
  deleteParent,
};
