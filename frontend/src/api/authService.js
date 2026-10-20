/**
 * Authentication API Service
 * Handles all auth-related API calls
 */

import { ENDPOINTS, getAuthHeader } from './config.js';

/**
 * Login API
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response from backend
 */
export const loginAPI = async (email, password) => {
  try {
    const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Login failed. Please try again.',
    };
  }
};

/**
 * Signup API
 * @param {object} userData - User data {firstName, lastName, email, password, confirmPassword, role}
 * @returns {Promise} Response from backend
 */
export const signupAPI = async (userData) => {
  try {
    const response = await fetch(ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        role: userData.role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Signup failed. Please try again.',
    };
  }
};

/**
 * Get Profile API
 * @param {string} token - JWT token
 * @returns {Promise} User profile data
 */
export const getProfileAPI = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.AUTH.PROFILE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(token),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to fetch profile',
    };
  }
};

/**
 * Update Profile API
 * @param {string} token - JWT token
 * @param {object} userData - Updated user data
 * @returns {Promise} Updated user profile
 */
export const updateProfileAPI = async (token, userData) => {
  try {
    const response = await fetch(ENDPOINTS.AUTH.PROFILE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(token),
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return {
      success: true,
      user: data.user,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to update profile',
    };
  }
};

/**
 * Logout API
 * @param {string} token - JWT token
 * @returns {Promise} Logout response
 */
export const logoutAPI = async (token) => {
  try {
    const response = await fetch(ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(token),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Logout failed',
    };
  }
};

export default {
  loginAPI,
  signupAPI,
  getProfileAPI,
  updateProfileAPI,
  logoutAPI,
};
