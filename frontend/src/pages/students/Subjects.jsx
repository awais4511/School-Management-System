import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdMenuBook, MdAssignment, MdBarChart, MdCheckCircle, MdSchedule, MdNotifications, MdSchool } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { subjectsData } from "../../mockdata/subjectsData";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/student" },
  { icon: <MdMenuBook />, label: "My Subjects", path: "/dashboard/student/subjects" },
  { icon: <MdAssignment />, label: "Assignments", path: "/dashboard/student/assignments" },
  { icon: <MdBarChart />, label: "Results", path: "/dashboard/student/results" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/student/attendance" },
  { icon: <MdSchedule />, label: "Timetable", path: "/dashboard/student/timetable" },
  { icon: <MdNotifications />, label: "Notices", path: "/dashboard/student/notices" },
];

const gradeColor = (g) => {
  if (g === "A+" || g === "A") return "text-green-600 bg-gradient-to-r from-green-100 to-emerald-100";
  if (g === "B+" || g === "B") return "text-blue-600 bg-gradient-to-r from-blue-100 to-cyan-100";
  return "text-amber-600 bg-gradient-to-r from-amber-100 to-orange-100";
};

export default function Subjects() {
  const [selectedSubject, setSelectedSubject] = useState(subjectsData[0]);

  return (
    <DashboardLayout role="Student" navItems={navItems}>
      <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-600 rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow">
        <div>
          <h2 className="text-3xl font-bold drop-shadow-md">My Subjects</h2>
          <p className="text-violet-100 text-sm mt-1 font-medium">{subjectsData.length} subjects enrolled</p>
        </div>
        <MdMenuBook className="text-6xl opacity-30 drop-shadow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 mb-6">
            <h3 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <MdMenuBook className="text-white" />
              </div>
              All Subjects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectsData.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject)}
                  className={`p-5 rounded-2xl border-2 transition-all text-left shadow-md hover:shadow-lg ${
                    selectedSubject.id === subject.id
                      ? "border-violet-500 bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-lg"
                      : "border-slate-200 bg-white hover:border-violet-300 hover:bg-gradient-to-br hover:from-violet-50 to-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-slate-800">{subject.name}</p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${gradeColor(subject.grade)}`}>
                      {subject.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Teacher: {subject.teacher}</p>
                  <div className="mt-4 w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-sm">
                    <div
                      className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 h-2.5 rounded-full shadow-md"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-2 font-semibold">{subject.progress}% completed</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 sticky top-5 border border-violet-100">
            <h3 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                <MdSchool className="text-white" />
              </div>
              Subject Details
            </h3>
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                <p className="text-xs text-blue-700 font-bold uppercase">Subject Name</p>
                <p className="text-lg font-bold text-blue-900 mt-2">{selectedSubject.name}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100">
                <p className="text-xs text-green-700 font-bold uppercase">Instructor</p>
                <p className="text-sm font-bold text-green-900 mt-2">{selectedSubject.teacher}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
                <p className="text-xs text-purple-700 font-bold uppercase">Current Grade</p>
                <p className={`text-3xl font-bold mt-2 ${gradeColor(selectedSubject.grade).split(" ")[0]}`}>
                  {selectedSubject.grade}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100">
                <p className="text-xs text-amber-700 font-bold uppercase">Credits</p>
                <p className="text-lg font-bold text-amber-900 mt-2">{selectedSubject.credits}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-100">
                <p className="text-xs text-pink-700 font-bold uppercase mb-3">Progress</p>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-md">
                  <div
                    className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 h-3 rounded-full"
                    style={{ width: `${selectedSubject.progress}%` }}
                  />
                </div>
                <p className="text-xs text-pink-700 mt-3 font-bold">{selectedSubject.progress}% Complete</p>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-3 rounded-xl transition-all hover:shadow-lg active:scale-95">
                View Materials
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
