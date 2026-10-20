import DashboardLayout, { useRoleColors } from "../../components/DashboardLayout";
import {
  MdDashboard,
  MdBarChart,
  MdCheckCircle,
  MdAssignment,
  MdAttachMoney,
  MdEvent,
  MdMessage,
  MdHandshake,
  MdSportsBasketball,
  MdCreditCard,
} from "react-icons/md";
import { FaTrophy, FaMedal, FaCheckCircle } from "react-icons/fa";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/parent" },
  { icon: <MdBarChart />, label: "Child's Progress", path: "/dashboard/parent/progress" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/parent/attendance" },
  { icon: <MdAssignment />, label: "Results", path: "/dashboard/parent/results" },
  { icon: <MdAttachMoney />, label: "Fee Status", path: "/dashboard/parent/fees" },
  { icon: <MdEvent />, label: "Events", path: "/dashboard/parent/events" },
  { icon: <MdMessage />, label: "Messages", path: "/dashboard/parent/messages" },
];

const stats = [
  { label: "Overall Grade", value: "A", Icon: FaTrophy },
  { label: "Attendance", value: "91%", Icon: FaCheckCircle },
  { label: "Rank in Class", value: "#5", Icon: FaMedal },
  { label: "Fee Status", value: "Paid", Icon: MdAttachMoney },
];

const recentGrades = [
  { subject: "Mathematics", marks: "88/100", grade: "A", date: "May 10" },
  { subject: "Physics", marks: "82/100", grade: "A", date: "May 9" },
  { subject: "English", marks: "91/100", grade: "A+", date: "May 8" },
  { subject: "Chemistry", marks: "74/100", grade: "B+", date: "May 7" },
];

const attendanceSummary = [
  { month: "February", present: 20, total: 22, pct: 91 },
  { month: "March", present: 23, total: 25, pct: 92 },
  { month: "April", present: 19, total: 22, pct: 86 },
  { month: "May", present: 10, total: 11, pct: 91 },
];

const upcomingEvents = [
  { event: "Parent-Teacher Meeting", date: "Fri, May 16", Icon: MdHandshake },
  { event: "Mid-Term Exams", date: "Tue, May 20", Icon: MdAssignment },
  { event: "Annual Sports Day", date: "Sat, May 24", Icon: MdSportsBasketball },
  { event: "Fee Due Date", date: "Jun 1", Icon: MdCreditCard },
];

const gradeColor = (g) => {
  if (g === "A+" || g === "A") return "text-green-600 bg-green-100";
  if (g === "B+" || g === "B") return "text-blue-600 bg-blue-100";
  return "text-amber-600 bg-amber-100";
};

function ParentDashboardContent() {
  const c = useRoleColors();

  return (
    <>
      {/* Child hero banner */}
      <div
        className={`bg-gradient-to-r ${c.heroBanner} rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow duration-300`}
      >
        <div>
          <p className={`${c.heroSubtext} text-sm font-medium`}>Your Child</p>
          <h2 className="text-3xl font-bold mt-0.5">Zara Ahmed</h2>
          <p className={`${c.heroSubtext} text-sm mt-1`}>
            Grade 11-A · Roll No. 14 · Section Morning
          </p>
        </div>
        <div className="text-right">
          <p className={`${c.heroSubtext} text-xs font-medium`}>Class Teacher</p>
          <p className="text-white font-bold text-sm">Mr. Bilal Hassan</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            className={`bg-gradient-to-br ${
              c.statsGradients[idx % c.statsGradients.length]
            } rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-2">
              <s.Icon className="text-3xl group-hover:scale-110 transition-transform" />
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm"></div>
            </div>
            <p className="text-3xl font-bold mt-2">{s.value}</p>
            <p className="text-white/80 text-xs mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Results */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${c.statsGradients[0]} rounded-lg`}>
              <MdBarChart className="text-white text-xl" />
            </div>
            Recent Results
          </h2>
          <div className="flex flex-col gap-3">
            {recentGrades.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between hover:bg-slate-50 p-3 rounded-lg transition-colors duration-200"
              >
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{r.subject}</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {r.date} · {r.marks}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${gradeColor(r.grade)}`}
                >
                  {r.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg`}>
              <FaCheckCircle className="text-white text-lg" />
            </div>
            Attendance History
          </h2>
          <div className="flex flex-col gap-4">
            {attendanceSummary.map((a, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-800">{a.month}</span>
                  <span className="text-xs font-bold text-slate-600">
                    {a.present}/{a.total} ({a.pct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-sm">
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      a.pct >= 90
                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                        : a.pct >= 75
                        ? "bg-gradient-to-r from-amber-400 to-orange-500"
                        : "bg-gradient-to-r from-red-400 to-rose-500"
                    }`}
                    style={{ width: `${a.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${c.statsGradients[2]} rounded-lg`}>
              <MdEvent className="text-white text-xl" />
            </div>
            Upcoming Events
          </h2>
          <div className="flex flex-col gap-3">
            {upcomingEvents.map((e, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-l-3 border-slate-200 hover:border-slate-400 pl-3 py-2 hover:bg-slate-50 rounded-r transition-all duration-200"
              >
                <div className={`p-2 rounded-lg bg-slate-100`}>
                  <e.Icon className={`text-lg text-slate-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{e.event}</p>
                  <p className="text-xs text-slate-500 font-medium">{e.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`w-full mt-5 ${c.primaryBtn} text-white text-xs font-bold py-3 rounded-xl transition-all hover:shadow-lg active:scale-95`}
          >
            Contact Teacher
          </button>
        </div>
      </div>
    </>
  );
}

export default function ParentDashboard() {
  return (
    <DashboardLayout role="Parent" navItems={navItems}>
      <ParentDashboardContent />
    </DashboardLayout>
  );
}
