/**
 * Fee API Service
 * Handles all fee-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

export const getFees = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.FEES.LIST, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.fees } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getFee = async (token, feeId) => {
  try {
    const response = await fetch(ENDPOINTS.FEES.GET(feeId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.fee } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMyFees = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.FEES.MY_FEES, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.fees } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createFee = async (token, feeData) => {
  try {
    const response = await fetch(ENDPOINTS.FEES.CREATE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(feeData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.fee } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateFee = async (token, feeId, feeData) => {
  try {
    const response = await fetch(ENDPOINTS.FEES.UPDATE(feeId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(feeData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.fee } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteFee = async (token, feeId) => {
  try {
    const response = await fetch(ENDPOINTS.FEES.DELETE(feeId), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
    });
    const data = await response.json();
    return response.ok ? { success: true, message: data.message } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const payFee = async (token, feeId, paymentData) => {
  try {
    const response = await fetch(ENDPOINTS.FEES.PAY(feeId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader(token) },
      body: JSON.stringify(paymentData),
    });
    const data = await response.json();
    return response.ok ? { success: true, data: data.payment } : { success: false, error: data.message };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  getFees,
  getFee,
  getMyFees,
  createFee,
  updateFee,
  deleteFee,
  payFee,
};
