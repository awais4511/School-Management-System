import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdMenuBook, MdAssignment, MdBarChart, MdCheckCircle, MdSchedule, MdNotifications } from "react-icons/md";
import { resultsData } from "../../mockdata/resultsData";

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

export default function Results() {
  return (
    <DashboardLayout role="Student" navItems={navItems}>
      <div className="bg-gradient-to-r from-purple-700 via-violet-700 to-fuchsia-600 rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow">
        <div>
          <h2 className="text-3xl font-bold drop-shadow-md">My Results</h2>
          <p className="text-purple-100 text-sm mt-1 font-medium">View all exam results and scores</p>
        </div>
        <MdBarChart className="text-6xl opacity-30 drop-shadow" />
      </div>

      <div className="space-y-5">
        {resultsData.map((result, idx) => (
          <div key={result.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 border-transparent hover:border-violet-500">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-violet-50">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{result.exam}</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">{result.date}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">{result.average.toFixed(1)}</p>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${gradeColor(result.grade)} inline-block mt-2`}>
                  {result.grade}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md transition-all">
                  <p className="text-xs text-blue-700 font-bold">Mathematics</p>
                  <p className="text-2xl font-bold text-blue-900 mt-2">{result.mathematics}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-md transition-all">
                  <p className="text-xs text-green-700 font-bold">Physics</p>
                  <p className="text-2xl font-bold text-green-900 mt-2">{result.physics || "-"}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md transition-all">
                  <p className="text-xs text-purple-700 font-bold">Chemistry</p>
                  <p className="text-2xl font-bold text-purple-900 mt-2">{result.chemistry || "-"}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-pink-50 to-rose-100 hover:shadow-md transition-all">
                  <p className="text-xs text-pink-700 font-bold">English</p>
                  <p className="text-2xl font-bold text-pink-900 mt-2">{result.english || "-"}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-50 to-amber-100 hover:shadow-md transition-all">
                  <p className="text-xs text-orange-700 font-bold">Comp. Sci</p>
                  <p className="text-2xl font-bold text-orange-900 mt-2">{result.computerSc || "-"}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-cyan-50 to-teal-100 hover:shadow-md transition-all">
                  <p className="text-xs text-teal-700 font-bold">Biology</p>
                  <p className="text-2xl font-bold text-teal-900 mt-2">{result.biology || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
