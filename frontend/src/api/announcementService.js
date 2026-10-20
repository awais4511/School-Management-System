/**
 * Announcement API Service
 * Handles all announcement-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getAnnouncements = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.ANNOUNCEMENTS.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.announcements } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAnnouncement = async (token, announcementId) => {
  try {
    const response = await fetch(ENDPOINTS.ANNOUNCEMENTS.GET(announcementId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.announcement } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createAnnouncement = async (token, announcementData) => {
  try {
    const response = await fetch(ENDPOINTS.ANNOUNCEMENTS.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(announcementData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.announcement } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAnnouncement = async (token, announcementId, announcementData) => {
  try {
    const response = await fetch(ENDPOINTS.ANNOUNCEMENTS.UPDATE(announcementId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(announcementData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.announcement } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteAnnouncement = async (token, announcementId) => {
  try {
    const response = await fetch(ENDPOINTS.ANNOUNCEMENTS.DELETE(announcementId), {
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
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
