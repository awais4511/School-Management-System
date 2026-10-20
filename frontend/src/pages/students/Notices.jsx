import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdMenuBook, MdAssignment, MdBarChart, MdCheckCircle, MdSchedule, MdNotifications } from "react-icons/md";
import { MdCampaign } from "react-icons/md";
import { noticesData } from "../../mockdata/noticesData";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/student" },
  { icon: <MdMenuBook />, label: "My Subjects", path: "/dashboard/student/subjects" },
  { icon: <MdAssignment />, label: "Assignments", path: "/dashboard/student/assignments" },
  { icon: <MdBarChart />, label: "Results", path: "/dashboard/student/results" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/student/attendance" },
  { icon: <MdSchedule />, label: "Timetable", path: "/dashboard/student/timetable" },
  { icon: <MdNotifications />, label: "Notices", path: "/dashboard/student/notices" },
];

const priorityColor = (priority) => {
  if (priority === "high") return "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-l-4 border-red-500";
  if (priority === "medium") return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-l-4 border-amber-500";
  return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-l-4 border-green-500";
};

export default function Notices() {
  return (
    <DashboardLayout role="Student" navItems={navItems}>
      <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-red-600 rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow">
        <div>
          <h2 className="text-3xl font-bold drop-shadow-md">Notices & Announcements</h2>
          <p className="text-rose-100 text-sm mt-1 font-medium">Stay updated with latest announcements</p>
        </div>
        <MdCampaign className="text-6xl opacity-30 drop-shadow" />
      </div>

      <div className="space-y-4">
        {noticesData.map((notice) => (
          <div key={notice.id} className={`rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 ${priorityColor(notice.priority)}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-bold text-base text-slate-800">{notice.title}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/70 ${
                    notice.priority === "high" ? "text-red-700" :
                    notice.priority === "medium" ? "text-amber-700" :
                    "text-green-700"
                  }`}>
                    {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-3 font-medium">{notice.content}</p>
                <p className="text-xs text-slate-600 font-medium">{notice.date}</p>
              </div>
              <button className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-xs transition-all hover:shadow-md active:scale-95 flex-shrink-0">
                Read
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
