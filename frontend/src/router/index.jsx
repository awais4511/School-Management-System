import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import StudentDashboard from "../pages/students/StudentDashboard";
import ParentDashboard from "../pages/Parents/ParentDashboard";
import Teacherdetails from "../pages/admin/Teacherdetails";
import StudentsDetails from "../pages/admin/StudentsDetails";
import Announcements from "../pages/admin/Announcements";
import TimeTable from "../pages/admin/TimeTable";
import ParentsDetails from "../pages/admin/ParentsDetails";
import Classes from "../pages/Teacher/Classes";
import Assignments from "../pages/Teacher/Assignments";
import Attendance from "../pages/Teacher/Attendance";
import Grades from "../pages/Teacher/Grades";
import Schedule from "../pages/Teacher/Schedule";
import Messages from "../pages/Teacher/Messages";
import Subjects from "../pages/students/Subjects";
import Results from "../pages/students/Results";
import StudentAttendance from "../pages/students/Attendance";
import Timetable from "../pages/students/Timetable";
import Notices from "../pages/students/Notices";
import AssignmentsView from "../pages/students/AssignmentsView";
import Progress from "../pages/Parents/Progress";
import ParentAttendance from "../pages/Parents/Attendance";
import ParentResults from "../pages/Parents/Results";
import Fees from "../pages/Parents/Fees";
import Events from "../pages/Parents/Events";
import ParentMessages from "../pages/Parents/Messages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/teachers" element={<Teacherdetails />} />
        <Route path="/dashboard/admin/students" element={<StudentsDetails />} />
        <Route path="/dashboard/admin/announcements" element={<Announcements />}/>
        <Route path="/dashboard/admin/timetable" element={<TimeTable />} />
        <Route path="/dashboard/admin/parents" element={<ParentsDetails />} />

        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/teacher/classes" element={<Classes />} />
        <Route path="/dashboard/teacher/assignments" element={<Assignments />} />
        <Route path="/dashboard/teacher/attendance" element={<Attendance />} />
        <Route path="/dashboard/teacher/grades" element={<Grades />} />
        <Route path="/dashboard/teacher/schedule" element={<Schedule />} />
        <Route path="/dashboard/teacher/messages" element={<Messages />} />

        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/student/subjects" element={<Subjects />} />
        <Route path="/dashboard/student/assignments" element={<AssignmentsView />} />
        <Route path="/dashboard/student/results" element={<Results />} />
        <Route path="/dashboard/student/attendance" element={<StudentAttendance />} />
        <Route path="/dashboard/student/timetable" element={<Timetable />} />
        <Route path="/dashboard/student/notices" element={<Notices />} />

        <Route path="/dashboard/parent" element={<ParentDashboard />} />
        <Route path="/dashboard/parent/progress" element={<Progress />} />
        <Route path="/dashboard/parent/attendance" element={<ParentAttendance />} />
        <Route path="/dashboard/parent/results" element={<ParentResults />} />
        <Route path="/dashboard/parent/fees" element={<Fees />} />
        <Route path="/dashboard/parent/events" element={<Events />} />
        <Route path="/dashboard/parent/messages" element={<ParentMessages />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
