/**
 * Message API Service
 * Handles all message-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getMessages = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.MESSAGES.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.messages } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMessage = async (token, messageId) => {
  try {
    const response = await fetch(ENDPOINTS.MESSAGES.GET(messageId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.message } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createMessage = async (token, messageData) => {
  try {
    const response = await fetch(ENDPOINTS.MESSAGES.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(messageData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.message } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateMessage = async (token, messageId, messageData) => {
  try {
    const response = await fetch(ENDPOINTS.MESSAGES.UPDATE(messageId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(messageData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.message } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteMessage = async (token, messageId) => {
  try {
    const response = await fetch(ENDPOINTS.MESSAGES.DELETE(messageId), {
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
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
