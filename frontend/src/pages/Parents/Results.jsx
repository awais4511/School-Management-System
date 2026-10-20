import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { MdDashboard, MdBarChart, MdCheckCircle, MdAssignment, MdAttachMoney, MdEvent, MdMessage } from "react-icons/md";
import { parentChildren, parentResultsData } from "../../mockdata/parentResultsData";

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

const resultsData = {
  1: [
    { exam: "Midterm", date: "May 10, 2026", average: 88, grade: "A", subjects: { mathematics: 90, physics: 85, chemistry: 82, english: 88, computerSc: 92, biology: 88 } },
    { exam: "Quiz 1", date: "May 5, 2026", average: 92, grade: "A+", subjects: { mathematics: 94, physics: 90, chemistry: 88, english: 92, computerSc: 95, biology: 90 } },
  ],
  2: [
    { exam: "Midterm", date: "May 10, 2026", average: 86, grade: "A", subjects: { mathematics: 88, physics: 83, chemistry: 80, english: 86, computerSc: 90, biology: 86 } },
    { exam: "Quiz 1", date: "May 5, 2026", average: 90, grade: "A+", subjects: { mathematics: 92, physics: 88, chemistry: 85, english: 90, computerSc: 93, biology: 88 } },
  ],
};

const gradeColor = (g) => {
  if (g === "A+" || g === "A") return "text-green-600 bg-green-100";
  if (g === "B+" || g === "B") return "text-blue-600 bg-blue-100";
  return "text-amber-600 bg-amber-100";
};

export default function ParentResults() {
  const [selectedChild, setSelectedChild] = useState(1);
  const results = parentResultsData[selectedChild];

  return (
    <DashboardLayout role="Parent" navItems={navItems}>
      <div className="bg-gradient-to-r from-blue-700 to-cyan-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold">Exam Results</h2>
          <p className="text-blue-200 text-sm mt-1">View your child's exam performance</p>
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
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {child.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base">{result.exam}</h3>
                <p className="text-xs text-slate-500 mt-1">{result.date}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-800">{result.average}</p>
                <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${gradeColor(result.grade)}`}>
                  {result.grade}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(result.subjects).map(([subject, score]) => (
                  <div key={subject} className="text-center">
                    <p className="text-xs text-slate-600 font-semibold capitalize">{subject.replace(/([A-Z])/g, " $1").trim()}</p>
                    <p className="text-lg font-bold text-slate-800 mt-2">{score}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
