# API Integration Guide

## Overview
This document describes how to set up and use the API services in the Hospital Management System.

## Backend Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account (connection string in `.env`)
- npm or yarn installed

### Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```
PORT=5000
NODE_ENV=development

# MongoDB Configuration - UPDATE WITH YOUR ATLAS CREDENTIALS
MONGODB_URI=mongodb+srv://admin:admin123@hospital-db.mongodb.net/hospital_db?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=123Awais
JWT_EXPIRE=7d

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

### Running the Backend Server
```bash
cd backend
npm install
node src/server.js
```

The server will start on `http://localhost:5000`

---

## Frontend Setup

### Environment Variables
Create a `.env.local` file in the `frontend/` directory:

```
VITE_API_URL=http://localhost:5000/api
```

### Installing Dependencies
```bash
cd frontend
npm install
```

### Running the Frontend Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Available API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/logout` - User logout (protected)

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get specific student
- `GET /api/students/me` - Get current student's profile (protected)
- `POST /api/students` - Create student (protected, admin only)
- `PUT /api/students/:id` - Update student (protected, admin only)
- `DELETE /api/students/:id` - Delete student (protected, admin only)
- `GET /api/students/stats` - Get student statistics (protected, admin only)

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get specific teacher
- `GET /api/teachers/me` - Get current teacher's profile (protected)
- `POST /api/teachers` - Create teacher (protected, admin only)
- `PUT /api/teachers/:id` - Update teacher (protected, admin only)
- `DELETE /api/teachers/:id` - Delete teacher (protected, admin only)

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get specific class
- `POST /api/classes` - Create class (protected, admin only)
- `PUT /api/classes/:id` - Update class (protected, admin only)
- `DELETE /api/classes/:id` - Delete class (protected, admin only)

### Assignments
- `GET /api/assignments` - Get all assignments
- `GET /api/assignments/:id` - Get specific assignment
- `GET /api/assignments/my-assignments` - Get current user's assignments (protected)
- `POST /api/assignments` - Create assignment (protected, teacher only)
- `PUT /api/assignments/:id` - Update assignment (protected, teacher only)
- `DELETE /api/assignments/:id` - Delete assignment (protected, teacher only)
- `POST /api/assignments/:id/submit` - Submit assignment (protected, student only)

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/:id` - Get specific attendance record
- `GET /api/attendance/my-attendance` - Get current user's attendance (protected)
- `POST /api/attendance` - Create attendance record (protected, teacher/admin only)
- `PUT /api/attendance/:id` - Update attendance record (protected, teacher/admin only)
- `DELETE /api/attendance/:id` - Delete attendance record (protected, admin only)

### Grades
- `GET /api/grades` - Get all grades
- `GET /api/grades/:id` - Get specific grade
- `GET /api/grades/my-grades` - Get current user's grades (protected)
- `POST /api/grades` - Create grade (protected, teacher only)
- `PUT /api/grades/:id` - Update grade (protected, teacher only)
- `DELETE /api/grades/:id` - Delete grade (protected, teacher only)

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get specific announcement
- `POST /api/announcements` - Create announcement (protected, admin/teacher only)
- `PUT /api/announcements/:id` - Update announcement (protected, admin/teacher only)
- `DELETE /api/announcements/:id` - Delete announcement (protected, admin/teacher only)

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/:id` - Get specific message
- `POST /api/messages` - Send message (protected)
- `PUT /api/messages/:id` - Update message (protected)
- `DELETE /api/messages/:id` - Delete message (protected)

### Fees
- `GET /api/fees` - Get all fees
- `GET /api/fees/:id` - Get specific fee
- `GET /api/fees/my-fees` - Get current user's fees (protected)
- `POST /api/fees` - Create fee (protected, admin only)
- `PUT /api/fees/:id` - Update fee (protected, admin only)
- `DELETE /api/fees/:id` - Delete fee (protected, admin only)
- `POST /api/fees/:id/pay` - Pay fee (protected)

### Timetable
- `GET /api/timetable` - Get all timetables
- `GET /api/timetable/:id` - Get specific timetable
- `POST /api/timetable` - Create timetable (protected, admin only)
- `PUT /api/timetable/:id` - Update timetable (protected, admin only)
- `DELETE /api/timetable/:id` - Delete timetable (protected, admin only)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event
- `POST /api/events` - Create event (protected, admin only)
- `PUT /api/events/:id` - Update event (protected, admin only)
- `DELETE /api/events/:id` - Delete event (protected, admin only)

### Parents
- `GET /api/parents` - Get all parents
- `GET /api/parents/:id` - Get specific parent
- `GET /api/parents/me` - Get current parent's profile (protected)
- `POST /api/parents` - Create parent (protected, admin only)
- `PUT /api/parents/:id` - Update parent (protected, admin only)
- `DELETE /api/parents/:id` - Delete parent (protected, admin only)

---

## Frontend API Service Usage

### Using Auth Service

```javascript
import { authService } from '@/api/index.js';

// Login
const response = await authService.loginAPI('user@example.com', 'password123');
if (response.success) {
  console.log('User:', response.user);
  console.log('Token:', response.token);
}

// Signup
const response = await authService.signupAPI({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123',
  role: 'Student'
});
```

### Using Student Service

```javascript
import { studentService } from '@/api/index.js';

// Get all students
const response = await studentService.getStudents(token);

// Get specific student
const response = await studentService.getStudent(token, studentId);

// Get my profile
const response = await studentService.getMyProfile(token);

// Create student
const response = await studentService.createStudent(token, {
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice@school.edu',
  // ... other fields
});
```

### Using Assignment Service

```javascript
import { assignmentService } from '@/api/index.js';

// Get my assignments
const response = await assignmentService.getMyAssignments(token);

// Submit assignment
const response = await assignmentService.submitAssignment(token, assignmentId, {
  submissionText: 'My solution...',
  submissionFile: fileData
});
```

---

## Authentication Flow

1. User enters email and password on the Login page
2. Frontend calls `loginAPI()` with credentials
3. Backend validates credentials and returns JWT token
4. Token is stored in Zustand auth store (persisted to localStorage)
5. All subsequent API requests include `Authorization: Bearer {token}` header
6. Token is automatically added by `getAuthHeader()` function

---

## Error Handling

All API services return a consistent response format:

```javascript
{
  success: true,
  data: { /* response data */ },
  message: 'Success message'
}
```

Or on error:

```javascript
{
  success: false,
  error: 'Error message'
}
```

---

## Notes

- All protected routes require a valid JWT token in the `Authorization` header
- Tokens expire after 7 days (configurable via `JWT_EXPIRE`)
- CORS is enabled for the frontend URL specified in backend `.env`
- MongoDB connection must be active for the backend to work
- All timestamps are in ISO 8601 format

---

## Troubleshooting

### Backend won't connect to MongoDB
- Check your MongoDB Atlas credentials in `.env`
- Ensure your IP address is whitelisted in MongoDB Atlas
- Check network connectivity

### Frontend can't reach backend
- Ensure backend is running on the correct port (5000)
- Check `VITE_API_URL` in frontend `.env.local`
- Check CORS configuration in backend

### Authentication failing
- Verify email and password are correct
- Check if user account exists
- Check if user account is active

### Tokens not working
- Ensure `JWT_SECRET` matches between backend and frontend
- Check token expiration time
- Verify token format in Authorization header
