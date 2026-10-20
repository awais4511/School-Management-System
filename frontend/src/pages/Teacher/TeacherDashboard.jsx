import DashboardLayout, { useRoleColors } from "../../components/DashboardLayout";
import { MdSchedule, MdPushPin } from "react-icons/md";
import { FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import {
  navItems_teacher,
  pendingWork_teacher,
  schedule_teacher,
  stats_teacher,
} from "../../mockdata/data";

function TeacherDashboardContent() {
  const c = useRoleColors();

  return (
    <>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats_teacher.map((s, idx) => (
          <div
            key={s.label}
            className={`bg-gradient-to-br ${
              c.statsGradients[idx % c.statsGradients.length]
            } rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-3">
              <s.Icon className="text-4xl group-hover:scale-110 transition-transform" />
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm"></div>
            </div>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-white/80 text-sm mt-2 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${c.statsGradients[0]} rounded-lg`}>
              <MdSchedule className="text-white text-xl" />
            </div>
            Today's Schedule
          </h2>
          <div className="flex flex-col gap-3">
            {schedule_teacher.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-md
                  ${
                    s.status === "now"
                      ? `border-teal-400 bg-gradient-to-r from-teal-50 to-teal-100/50`
                      : s.status === "done"
                      ? "border-slate-200 bg-slate-100/50 opacity-70"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
              >
                <div className="text-center w-14 flex-shrink-0">
                  <p className="text-xs font-bold text-slate-600">{s.time}</p>
                  {s.status === "now" && (
                    <span className={`text-xs ${c.accent} text-white px-2 py-1 rounded-full font-bold inline-block mt-1`}>
                      NOW
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-sm">{s.subject}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {s.class} · {s.room}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {s.status === "done" && <FaCheckCircle className="text-green-500 text-xl" />}
                  {s.status === "upcoming" && <FaHourglassHalf className="text-slate-300 text-lg" />}
                  {s.status === "now" && <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg`}>
              <MdPushPin className="text-white text-xl" />
            </div>
            Pending Tasks
          </h2>
          <div className="flex flex-col gap-3">
            {pendingWork_teacher.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-l-3 transition-all pl-3 py-2 hover:pl-4 hover:bg-slate-50 rounded-r"
                style={{
                  borderLeftColor:
                    p.priority === "high"
                      ? "#ef4444"
                      : p.priority === "medium"
                      ? "#f59e0b"
                      : "#10b981",
                }}
              >
                <div className="mt-0.5">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      p.priority === "high"
                        ? "bg-red-500"
                        : p.priority === "medium"
                        ? "bg-amber-400"
                        : "bg-green-400"
                    } shadow-md`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{p.task}</p>
                  <p className="text-xs text-slate-500 font-medium">Due: {p.due}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`w-full mt-5 ${c.primaryBtn} text-white text-xs font-bold py-3 rounded-xl transition-all hover:shadow-lg active:scale-95`}
          >
            View All Tasks
          </button>
        </div>
      </div>
    </>
  );
}

export default function TeacherDashboard() {
  return (
    <DashboardLayout role="Teacher" navItems={navItems_teacher}>
      <TeacherDashboardContent />
    </DashboardLayout>
  );
}
