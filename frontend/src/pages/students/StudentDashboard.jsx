import DashboardLayout, { useRoleColors } from "../../components/DashboardLayout";
import {
  MdDashboard,
  MdMenuBook,
  MdAssignment,
  MdBarChart,
  MdCheckCircle,
  MdSchedule,
  MdNotifications,
  MdEvent,
  MdScience,
  MdSchool,
} from "react-icons/md";
import { FaTrophy, FaMedal, FaCheckCircle, FaUserGraduate } from "react-icons/fa";
import {
  studentDashboardStats,
  studentDashboardSubjects,
  studentDashboardUpcoming,
} from "../../mockdata/studentDashboardData";

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
  if (g === "A+" || g === "A") return "text-green-600 bg-green-100";
  if (g === "B+" || g === "B") return "text-blue-600 bg-blue-100";
  return "text-amber-600 bg-amber-100";
};

function StudentDashboardContent() {
  const c = useRoleColors();

  return (
    <>
      {/* Hero banner */}
      <div
        className={`bg-gradient-to-r ${c.heroBanner} rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow duration-300`}
      >
        <div>
          <p className={`${c.heroSubtext} text-sm font-medium flex items-center gap-1`}>
            Good morning <MdSchool className="text-base" />
          </p>
          <h2 className="text-3xl font-bold mt-0.5">Ali Ahmed</h2>
          <p className={`${c.heroSubtext} text-sm mt-1`}>Grade 11-A · Roll No. 14</p>
        </div>
        <FaUserGraduate className="text-6xl opacity-50" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {studentDashboardStats.map((s, idx) => (
          <div
            key={s.label}
            className={`bg-gradient-to-br ${
              c.statsGradients[idx % c.statsGradients.length]
            } rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                {s.label === "Overall Grade" && <FaTrophy className="text-3xl group-hover:scale-110 transition-transform" />}
                {s.label === "Attendance" && <FaCheckCircle className="text-3xl group-hover:scale-110 transition-transform" />}
                {s.label === "Assignments Due" && <MdAssignment className="text-3xl group-hover:scale-110 transition-transform" />}
                {s.label === "Rank in Class" && <FaMedal className="text-3xl group-hover:scale-110 transition-transform" />}
              </div>
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm"></div>
            </div>
            <p className="text-3xl font-bold mt-3">{s.value}</p>
            <p className="text-white/80 text-xs mt-2 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Subjects progress */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${c.statsGradients[0]} rounded-lg`}>
              <MdMenuBook className="text-white text-xl" />
            </div>
            My Subjects
          </h2>
          <div className="flex flex-col gap-4">
            {studentDashboardSubjects.map((s, i) => (
              <div key={i} className="flex items-center gap-4 hover:bg-slate-50 p-3 rounded-xl transition-colors duration-200">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold text-slate-800">{s.name}</span>
                      <span className="text-xs text-slate-500 ml-2">by {s.teacher}</span>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${gradeColor(s.grade)}`}
                    >
                      {s.grade}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className={`bg-gradient-to-r ${c.progressBar ?? c.heroBanner} h-2.5 rounded-full shadow-md transition-all`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{s.progress}% completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${c.statsGradients[1]} rounded-lg`}>
              <MdEvent className="text-white text-xl" />
            </div>
            Upcoming
          </h2>
          <div className="flex flex-col gap-3">
            {studentDashboardUpcoming.map((u, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-l-2 border-slate-200 hover:border-slate-400 pl-3 py-2 transition-colors duration-200"
              >
                <div className={`p-2 rounded-lg ${u.type === "exam" ? "bg-purple-100" : "bg-amber-100"}`}>
                  {u.type === "exam" ? (
                    <MdScience className={`text-lg text-purple-600`} />
                  ) : (
                    <MdAssignment className="text-lg text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{u.event}</p>
                  <p className="text-xs text-slate-500 font-medium">{u.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`w-full mt-5 ${c.primaryBtn} text-white text-xs font-bold py-3 rounded-xl transition-all hover:shadow-lg active:scale-95`}
          >
            View Full Calendar
          </button>
        </div>
      </div>
    </>
  );
}

export default function StudentDashboard() {
  return (
    <DashboardLayout role="Student" navItems={navItems}>
      <StudentDashboardContent />
    </DashboardLayout>
  );
}
