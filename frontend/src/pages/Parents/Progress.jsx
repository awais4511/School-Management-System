import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdBarChart, MdCheckCircle, MdAssignment, MdAttachMoney, MdEvent, MdMessage, MdSchool } from "react-icons/md";
import { parentChildren, parentProgressDetails } from "../../mockdata/parentProgressData";

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
  { id: 1, name: "Ali Ahmed", class: "Grade 9-A", rollNo: "901", progress: 92, grade: "A+" },
  { id: 2, name: "Aisha Ahmed", class: "Grade 7-B", rollNo: "701", progress: 88, grade: "A" },
];

const progressDetails = {
  1: {
    name: "Ali Ahmed",
    class: "Grade 9-A",
    overall: 92,
    mathematics: 94,
    physics: 88,
    chemistry: 85,
    english: 92,
    computerSc: 96,
    biology: 90,
    classRank: "#3",
    totalSubjects: 8,
  },
  2: {
    name: "Aisha Ahmed",
    class: "Grade 7-B",
    overall: 88,
    mathematics: 90,
    physics: 85,
    chemistry: 82,
    english: 88,
    computerSc: 92,
    biology: 88,
    classRank: "#5",
    totalSubjects: 8,
  },
};

export default function Progress() {
  const [selectedChild, setSelectedChild] = useState(1);
  const progress = parentProgressDetails[selectedChild];

  return (
    <DashboardLayout role="Parent" navItems={navItems}>
      <div className="bg-gradient-to-r from-violet-700 to-purple-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Child's Progress</h2>
          <p className="text-violet-200 text-sm mt-1">Track academic performance</p>
        </div>
        <MdBarChart className="text-6xl opacity-20" />
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
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {child.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow">
          <p className="text-blue-200 text-xs">Overall Progress</p>
          <p className="text-4xl font-bold mt-2">{progress.overall}%</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow">
          <p className="text-emerald-200 text-xs">Class Rank</p>
          <p className="text-4xl font-bold mt-2">{progress.classRank}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow">
          <p className="text-amber-200 text-xs">Subjects</p>
          <p className="text-4xl font-bold mt-2">{progress.totalSubjects}</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-4 text-white shadow">
          <p className="text-pink-200 text-xs">Grade</p>
          <p className="text-3xl font-bold mt-2">A+</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <h3 className="font-bold text-slate-800 text-base mb-4">Subject-wise Performance</h3>
        <div className="space-y-4">
          {[
            { subject: "Mathematics", score: progress.mathematics },
            { subject: "Physics", score: progress.physics },
            { subject: "Chemistry", score: progress.chemistry },
            { subject: "English", score: progress.english },
            { subject: "Computer Science", score: progress.computerSc },
            { subject: "Biology", score: progress.biology },
          ].map((item) => (
            <div key={item.subject}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{item.subject}</span>
                <span className="text-sm font-bold text-slate-800">{item.score}/100</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
