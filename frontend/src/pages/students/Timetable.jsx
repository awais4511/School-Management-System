import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdMenuBook, MdAssignment, MdBarChart, MdCheckCircle, MdSchedule, MdNotifications } from "react-icons/md";
import { TIMETABLE_DAYS, TIMETABLE_PERIODS, timetableData, subjectColors } from "../../mockdata/timetableData";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/student" },
  { icon: <MdMenuBook />, label: "My Subjects", path: "/dashboard/student/subjects" },
  { icon: <MdAssignment />, label: "Assignments", path: "/dashboard/student/assignments" },
  { icon: <MdBarChart />, label: "Results", path: "/dashboard/student/results" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/student/attendance" },
  { icon: <MdSchedule />, label: "Timetable", path: "/dashboard/student/timetable" },
  { icon: <MdNotifications />, label: "Notices", path: "/dashboard/student/notices" },
];

export default function Timetable() {
  return (
    <DashboardLayout role="Student" navItems={navItems}>
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow">
        <div>
          <h2 className="text-3xl font-bold drop-shadow-md">My Timetable</h2>
          <p className="text-indigo-100 text-sm mt-1 font-medium">Weekly class schedule</p>
        </div>
        <MdSchedule className="text-6xl opacity-30 drop-shadow" />
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-transparent border-indigo-500">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-b-2 border-indigo-200">
                <th className="px-6 py-4 text-left text-xs font-bold text-indigo-900 bg-gradient-to-r from-indigo-100 to-purple-100">Time</th>
                {TIMETABLE_DAYS.map((day) => (
                  <th key={day} className="px-6 py-4 text-center text-xs font-bold text-indigo-900 bg-gradient-to-b from-indigo-50 to-transparent">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIMETABLE_PERIODS.map((period, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-xs font-bold text-slate-800 bg-gradient-to-r from-slate-50 to-slate-100 whitespace-nowrap">
                    {period}
                  </td>
                  {TIMETABLE_DAYS.map((day) => {
                    const subject = timetableData[day][idx];
                    const colors = subjectColors[subject] || "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800";
                    return (
                      <td key={day} className="px-6 py-4 text-center">
                        <span className={`text-xs font-bold px-4 py-2.5 rounded-lg block shadow-md hover:shadow-lg transition-all ${colors}`}>
                          {subject}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
