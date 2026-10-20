import DashboardLayout, { useRoleColors } from "../../components/DashboardLayout";
import { MdCampaign, MdFlashOn } from "react-icons/md";
import { announcements, navItems, recentAdmissions, stats } from "../../../src/mockdata/data";

function AdminDashboardContent() {
  const c = useRoleColors();

  return (
    <>
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            className={`bg-gradient-to-br ${
              c.statsGradients[idx % c.statsGradients.length]
            } rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group`}
          >
            <div className="flex items-center justify-between mb-3">
              <s.Icon className="text-4xl group-hover:scale-110 transition-transform" />
              <span className="text-xs bg-white/25 px-3 py-1 rounded-full font-bold backdrop-blur-sm">
                {s.change !== "0" ? `${s.change} this week` : "No change"}
              </span>
            </div>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-white/80 text-sm mt-2 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Admissions table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${c.statsGradients[0]} rounded-lg`}>
                <span className="text-white text-xl">📋</span>
              </div>
              Recent Admissions
            </h2>
            <button className={`text-xs font-bold transition-all hover:underline`}
              style={{ color: c.accent.replace("bg-", "text-") }}>
              View all →
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 text-xs uppercase border-b-2 border-slate-200">
                <th className="pb-3 font-bold">Name</th>
                <th className="pb-3 font-bold">Class</th>
                <th className="pb-3 font-bold">Date</th>
                <th className="pb-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAdmissions.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-200 hover:shadow-sm">
                  <td className="py-4 font-bold text-slate-800">{r.name}</td>
                  <td className="py-4 text-slate-600 font-medium">{r.class}</td>
                  <td className="py-4 text-slate-500">{r.date}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        r.status === "Active"
                          ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 shadow-sm"
                          : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 shadow-sm"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-5">
          {/* Announcements */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
            <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${c.statsGradients[1]} rounded-lg`}>
                <MdCampaign className="text-white text-xl" />
              </div>
              Announcements
            </h2>
            <div className="flex flex-col gap-3">
              {announcements.map((a, i) => (
                <div key={i} className="border-l-3 border-slate-300 hover:border-slate-400 pl-3 py-2 hover:bg-slate-50 rounded-r transition-all duration-200">
                  <p className="text-sm font-bold text-slate-800">{a.title}</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{a.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6">
            <h2 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg`}>
                <MdFlashOn className="text-white text-xl" />
              </div>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {["Add Student", "Add Teacher", "New Class", "Send Notice"].map((action) => (
                <button
                  key={action}
                  className={`${c.primaryBtn} text-white text-xs font-bold py-3 rounded-xl transition-all hover:shadow-lg active:scale-95`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout role="Administrator" navItems={navItems}>
      <AdminDashboardContent />
    </DashboardLayout>
  );
}
