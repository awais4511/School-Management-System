import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdBarChart, MdCheckCircle, MdAssignment, MdAttachMoney, MdEvent, MdMessage } from "react-icons/md";
import { eventsData } from "../../mockdata/parentEventsData";

const navItems = [
  { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard/parent" },
  { icon: <MdBarChart />, label: "Progress", path: "/dashboard/parent/progress" },
  { icon: <MdCheckCircle />, label: "Attendance", path: "/dashboard/parent/attendance" },
  { icon: <MdAssignment />, label: "Results", path: "/dashboard/parent/results" },
  { icon: <MdAttachMoney />, label: "Fees", path: "/dashboard/parent/fees" },
  { icon: <MdEvent />, label: "Events", path: "/dashboard/parent/events" },
  { icon: <MdMessage />, label: "Messages", path: "/dashboard/parent/messages" },
];

const events = [
  { id: 1, title: "Mid-Term Exams", date: "May 20-28, 2026", type: "exam", description: "Mid-term examination for all grades", location: "School Campus" },
  { id: 2, title: "Parent-Teacher Meeting", date: "May 16, 2026", type: "meeting", description: "Meet with teachers to discuss child's progress", location: "School Hall" },
  { id: 3, title: "Annual Sports Day", date: "May 24, 2026", type: "sports", description: "Annual sports competition for all students", location: "Sports Ground" },
  { id: 4, title: "Science Exhibition", date: "May 15, 2026", type: "activity", description: "Annual science and technology exhibition", location: "Science Block" },
  { id: 5, title: "Prize Distribution", date: "May 30, 2026", type: "ceremony", description: "Annual prize distribution ceremony", location: "Main Hall" },
  { id: 6, title: "Summer Vacation Starts", date: "June 1, 2026", type: "holiday", description: "Beginning of summer holidays", location: "School" },
];

const eventTypeColor = (type) => {
  const colors = {
    exam: "bg-red-100 text-red-700",
    meeting: "bg-blue-100 text-blue-700",
    sports: "bg-green-100 text-green-700",
    activity: "bg-amber-100 text-amber-700",
    ceremony: "bg-purple-100 text-purple-700",
    holiday: "bg-pink-100 text-pink-700",
  };
  return colors[type] || "bg-slate-100 text-slate-700";
};

export default function Events() {
  return (
    <DashboardLayout role="Parent" navItems={navItems}>
      <div className="bg-gradient-to-r from-indigo-700 to-purple-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">School Events</h2>
          <p className="text-indigo-200 text-sm mt-1">Upcoming events and important dates</p>
        </div>
        <MdEvent className="text-6xl opacity-20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventsData.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow p-5 border-l-4 border-indigo-500 hover:shadow-md transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-bold text-slate-800 text-base flex-1">{event.title}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${eventTypeColor(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
            </div>

            <p className="text-sm text-slate-600 mb-3">{event.description}</p>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
            </div>

            <button className="w-full mt-3 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-sm rounded-lg transition-colors">
              More Details
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
