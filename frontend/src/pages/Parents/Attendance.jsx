import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdBarChart, MdCheckCircle, MdAssignment, MdAttachMoney, MdEvent, MdMessage } from "react-icons/md";
import { parentChildren, parentAttendanceData } from "../../mockdata/parentAttendanceData";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/parent" },
  { icon: <MdBarChart />, label: "Progress", path: "/dashboard/parent/progress" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/parent/attendance" },
  { icon: <MdAssignment />, label: "Results", path: "/dashboard/parent/results" },
  { icon: <MdAttachMoney />, label: "Fees", path: "/dashboard/parent/fees" },
  { icon: <MdEvent />, label: "Events", path: "/dashboard/parent/events" },
  { icon: <MdMessage />, label: "Messages", path: "/dashboard/parent/messages" },
];

const children = [
  { id: 1, name: "Ali Ahmed", class: "Grade 9-A" },
  { id: 2, name: "Aisha Ahmed", class: "Grade 7-B" },
];

const attendanceData = {
  1: {
    name: "Ali Ahmed",
    currentMonth: { present: 22, total: 22, percentage: 100 },
    months: {
      January: { present: 20, total: 22, percentage: 91 },
      February: { present: 21, total: 21, percentage: 100 },
      March: { present: 19, total: 22, percentage: 86 },
      April: { present: 22, total: 22, percentage: 100 },
      May: { present: 22, total: 22, percentage: 100 },
    },
  },
  2: {
    name: "Aisha Ahmed",
    currentMonth: { present: 20, total: 21, percentage: 95 },
    months: {
      January: { present: 21, total: 22, percentage: 95 },
      February: { present: 20, total: 21, percentage: 95 },
      March: { present: 22, total: 22, percentage: 100 },
      April: { present: 20, total: 22, percentage: 91 },
      May: { present: 20, total: 21, percentage: 95 },
    },
  },
};

export default function ParentAttendance() {
  const [selectedChild, setSelectedChild] = useState(1);
  const data = parentAttendanceData[selectedChild];

  const totalPresent = Object.values(data.months).reduce((sum, m) => sum + m.present, 0);
  const totalDays = Object.values(data.months).reduce((sum, m) => sum + m.total, 0);
  const overallPercentage = ((totalPresent / totalDays) * 100).toFixed(1);

  return (
    <DashboardLayout role="Parent" navItems={navItems}>
      <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Attendance Record</h2>
          <p className="text-green-200 text-sm mt-1">Monitor your child's attendance</p>
        </div>
        <MdCheckCircle className="text-6xl opacity-20" />
      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <h3 className="font-bold text-slate-800 text-base mb-3">Select Child</h3>
        <div className="flex flex-wrap gap-2">
          {parentChildren.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedChild === child.id
                  ? "bg-green-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {child.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow">
          <p className="text-blue-200 text-xs">Overall Attendance</p>
          <p className="text-4xl font-bold mt-2">{overallPercentage}%</p>
          <p className="text-blue-200 text-xs mt-2">{totalPresent}/{totalDays} days</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow">
          <p className="text-emerald-200 text-xs">Current Month</p>
          <p className="text-4xl font-bold mt-2">{data.currentMonth.percentage}%</p>
          <p className="text-emerald-200 text-xs mt-2">{data.currentMonth.present}/{data.currentMonth.total} days</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow">
          <p className="text-amber-200 text-xs">Status</p>
          <p className="text-2xl font-bold mt-2">Good</p>
          <p className="text-amber-200 text-xs mt-2">Keep it up!</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="font-bold text-slate-800 text-base mb-4">Monthly Attendance</h3>
        <div className="space-y-4">
          {Object.entries(data.months).map(([month, stats]) => (
            <div key={month}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{month}</span>
                <span className="text-sm font-bold text-slate-800">
                  {stats.present}/{stats.total} ({stats.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    stats.percentage >= 90 ? "bg-green-500" : stats.percentage >= 75 ? "bg-amber-400" : "bg-red-500"
                  }`}
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
