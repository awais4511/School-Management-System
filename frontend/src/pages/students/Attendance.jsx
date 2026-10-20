import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdMenuBook, MdAssignment, MdBarChart, MdCheckCircle, MdSchedule, MdNotifications } from "react-icons/md";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/student" },
  { icon: <MdMenuBook />, label: "My Subjects", path: "/dashboard/student/subjects" },
  { icon: <MdAssignment />, label: "Assignments", path: "/dashboard/student/assignments" },
  { icon: <MdBarChart />, label: "Results", path: "/dashboard/student/results" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/student/attendance" },
  { icon: <MdSchedule />, label: "Timetable", path: "/dashboard/student/timetable" },
  { icon: <MdNotifications />, label: "Notices", path: "/dashboard/student/notices" },
];

const attendanceData = {
  January: { present: 20, total: 22, percentage: 91 },
  February: { present: 21, total: 21, percentage: 100 },
  March: { present: 19, total: 22, percentage: 86 },
  April: { present: 22, total: 22, percentage: 100 },
  May: { present: 10, total: 11, percentage: 91 },
};

export default function StudentAttendance() {
  const [selectedMonth, setSelectedMonth] = useState("May");

  const months = Object.keys(attendanceData);
  const current = attendanceData[selectedMonth];
  const totalPresent = Object.values(attendanceData).reduce((sum, m) => sum + m.present, 0);
  const totalDays = Object.values(attendanceData).reduce((sum, m) => sum + m.total, 0);
  const overallPercentage = ((totalPresent / totalDays) * 100).toFixed(1);

  return (
    <DashboardLayout role="Student" navItems={navItems}>
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-600 rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow">
        <div>
          <h2 className="text-3xl font-bold drop-shadow-md">My Attendance</h2>
          <p className="text-emerald-100 text-sm mt-1 font-medium">Track your daily attendance record</p>
        </div>
        <MdCheckCircle className="text-6xl opacity-30 drop-shadow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
          <p className="text-blue-100 text-xs font-bold uppercase">Overall Attendance</p>
          <p className="text-5xl font-bold mt-3 drop-shadow-md">{overallPercentage}%</p>
          <p className="text-blue-200 text-xs mt-2 font-medium">{totalPresent}/{totalDays} days</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
          <p className="text-emerald-100 text-xs font-bold uppercase">Present Days</p>
          <p className="text-5xl font-bold mt-3 drop-shadow-md">{current.present}</p>
          <p className="text-emerald-200 text-xs mt-2 font-medium">{selectedMonth}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
          <p className="text-amber-100 text-xs font-bold uppercase">Total Days</p>
          <p className="text-5xl font-bold mt-3 drop-shadow-md">{current.total}</p>
          <p className="text-amber-200 text-xs mt-2 font-medium">{selectedMonth}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
            <MdCheckCircle className="text-white text-xl" />
          </div>
          Monthly Attendance
        </h3>
        <div className="flex flex-wrap gap-2 mb-7">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                selectedMonth === month
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-100"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {months.map((month) => (
            <div key={month}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-800">{month}</span>
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  {attendanceData[month].present}/{attendanceData[month].total} days ({attendanceData[month].percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-sm">
                <div
                  className={`h-3 rounded-full transition-all ${
                    attendanceData[month].percentage >= 90
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : attendanceData[month].percentage >= 75
                      ? "bg-gradient-to-r from-amber-500 to-orange-600"
                      : "bg-gradient-to-r from-red-500 to-rose-600"
                  }`}
                  style={{ width: `${attendanceData[month].percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
