/**
 * API Configuration
 * Central configuration for all API endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Get authorization header with token
 */
export const getAuthHeader = (token) => {
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * API Endpoints
 */
export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  
  // Students
  STUDENTS: {
    LIST: `${API_BASE_URL}/students`,
    GET: (id) => `${API_BASE_URL}/students/${id}`,
    CREATE: `${API_BASE_URL}/students`,
    UPDATE: (id) => `${API_BASE_URL}/students/${id}`,
    DELETE: (id) => `${API_BASE_URL}/students/${id}`,
    MY_PROFILE: `${API_BASE_URL}/students/me`,
    STATS: `${API_BASE_URL}/students/stats`,
  },
  
  // Teachers
  TEACHERS: {
    LIST: `${API_BASE_URL}/teachers`,
    GET: (id) => `${API_BASE_URL}/teachers/${id}`,
    CREATE: `${API_BASE_URL}/teachers`,
    UPDATE: (id) => `${API_BASE_URL}/teachers/${id}`,
    DELETE: (id) => `${API_BASE_URL}/teachers/${id}`,
    MY_PROFILE: `${API_BASE_URL}/teachers/me`,
  },
  
  // Classes
  CLASSES: {
    LIST: `${API_BASE_URL}/classes`,
    GET: (id) => `${API_BASE_URL}/classes/${id}`,
    CREATE: `${API_BASE_URL}/classes`,
    UPDATE: (id) => `${API_BASE_URL}/classes/${id}`,
    DELETE: (id) => `${API_BASE_URL}/classes/${id}`,
  },
  
  // Assignments
  ASSIGNMENTS: {
    LIST: `${API_BASE_URL}/assignments`,
    GET: (id) => `${API_BASE_URL}/assignments/${id}`,
    CREATE: `${API_BASE_URL}/assignments`,
    UPDATE: (id) => `${API_BASE_URL}/assignments/${id}`,
    DELETE: (id) => `${API_BASE_URL}/assignments/${id}`,
    MY_ASSIGNMENTS: `${API_BASE_URL}/assignments/my-assignments`,
    SUBMIT: (id) => `${API_BASE_URL}/assignments/${id}/submit`,
  },
  
  // Attendance
  ATTENDANCE: {
    LIST: `${API_BASE_URL}/attendance`,
    GET: (id) => `${API_BASE_URL}/attendance/${id}`,
    CREATE: `${API_BASE_URL}/attendance`,
    UPDATE: (id) => `${API_BASE_URL}/attendance/${id}`,
    DELETE: (id) => `${API_BASE_URL}/attendance/${id}`,
    MY_ATTENDANCE: `${API_BASE_URL}/attendance/my-attendance`,
  },
  
  // Grades
  GRADES: {
    LIST: `${API_BASE_URL}/grades`,
    GET: (id) => `${API_BASE_URL}/grades/${id}`,
    CREATE: `${API_BASE_URL}/grades`,
    UPDATE: (id) => `${API_BASE_URL}/grades/${id}`,
    DELETE: (id) => `${API_BASE_URL}/grades/${id}`,
    MY_GRADES: `${API_BASE_URL}/grades/my-grades`,
  },
  
  // Announcements
  ANNOUNCEMENTS: {
    LIST: `${API_BASE_URL}/announcements`,
    GET: (id) => `${API_BASE_URL}/announcements/${id}`,
    CREATE: `${API_BASE_URL}/announcements`,
    UPDATE: (id) => `${API_BASE_URL}/announcements/${id}`,
    DELETE: (id) => `${API_BASE_URL}/announcements/${id}`,
  },
  
  // Messages
  MESSAGES: {
    LIST: `${API_BASE_URL}/messages`,
    GET: (id) => `${API_BASE_URL}/messages/${id}`,
    CREATE: `${API_BASE_URL}/messages`,
    UPDATE: (id) => `${API_BASE_URL}/messages/${id}`,
    DELETE: (id) => `${API_BASE_URL}/messages/${id}`,
  },
  
  // Fees
  FEES: {
    LIST: `${API_BASE_URL}/fees`,
    GET: (id) => `${API_BASE_URL}/fees/${id}`,
    CREATE: `${API_BASE_URL}/fees`,
    UPDATE: (id) => `${API_BASE_URL}/fees/${id}`,
    DELETE: (id) => `${API_BASE_URL}/fees/${id}`,
    MY_FEES: `${API_BASE_URL}/fees/my-fees`,
    PAY: (id) => `${API_BASE_URL}/fees/${id}/pay`,
  },
  
  // Timetable
  TIMETABLE: {
    LIST: `${API_BASE_URL}/timetable`,
    GET: (id) => `${API_BASE_URL}/timetable/${id}`,
    CREATE: `${API_BASE_URL}/timetable`,
    UPDATE: (id) => `${API_BASE_URL}/timetable/${id}`,
    DELETE: (id) => `${API_BASE_URL}/timetable/${id}`,
  },
  
  // Events
  EVENTS: {
    LIST: `${API_BASE_URL}/events`,
    GET: (id) => `${API_BASE_URL}/events/${id}`,
    CREATE: `${API_BASE_URL}/events`,
    UPDATE: (id) => `${API_BASE_URL}/events/${id}`,
    DELETE: (id) => `${API_BASE_URL}/events/${id}`,
  },
  
  // Parents
  PARENTS: {
    LIST: `${API_BASE_URL}/parents`,
    GET: (id) => `${API_BASE_URL}/parents/${id}`,
    CREATE: `${API_BASE_URL}/parents`,
    UPDATE: (id) => `${API_BASE_URL}/parents/${id}`,
    DELETE: (id) => `${API_BASE_URL}/parents/${id}`,
    MY_PROFILE: `${API_BASE_URL}/parents/me`,
  },
};

export default API_CONFIG;
