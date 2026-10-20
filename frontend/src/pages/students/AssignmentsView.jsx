import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { MdAssignment, MdFilterList } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import assignmentStore from "../../store/assignmentStore";

const navItems = [
  { icon: <MdAssignment />, label: "Assignments", path: "/dashboard/student/assignments" },
];

const SUBJECTS = [
  "Mathematics",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Urdu",
  "Islamic Studies",
];

export default function StudentAssignments() {
  const assignments = assignmentStore((state) => state.assignments);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const studentClass = "10-A";

  const classAssignments = assignments.filter((a) => a.class === studentClass);

  const filtered = classAssignments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === "all" || a.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const daysLabel = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (diff < 0) return "Overdue";
    if (diff === 0) return "Due today";
    if (diff === 1) return "Due tomorrow";
    return `${diff} days left`;
  };

  const priorityColor = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (diff <= 1) return "bg-gradient-to-r from-red-100 to-rose-100 text-red-700";
    if (diff <= 3) return "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700";
    return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700";
  };

  return (
    <DashboardLayout role="Student" navItems={navItems}>
      <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-600 rounded-2xl p-6 mb-6 text-white flex items-center justify-between shadow-2xl hover:shadow-3xl transition-shadow">
        <div>
          <h2 className="text-3xl font-bold drop-shadow-md">My Assignments</h2>
          <p className="text-violet-100 text-sm mt-1 font-medium">
            {filtered.length} assignment{filtered.length !== 1 ? "s" : ""} to complete
          </p>
        </div>
        <MdAssignment className="text-6xl opacity-30 drop-shadow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3">
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search assignments…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 shadow-md hover:border-slate-300 transition-all"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-2xl shadow-lg">
              <FaBookOpen className="text-5xl mb-3 opacity-30" />
              <p className="text-sm font-medium">No assignments found.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filtered.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border-l-4 border-transparent hover:border-violet-500 p-6 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-violet-600 transition-colors">
                        {assignment.title}
                      </h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-bold bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 px-3 py-1 rounded-full shadow-sm">
                          {assignment.subject}
                        </span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${priorityColor(
                            assignment.dueDate
                          )}`}
                        >
                          {daysLabel(assignment.dueDate)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right bg-gradient-to-br from-violet-50 to-purple-50 p-3 rounded-lg">
                      <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        {assignment.maxMarks}
                      </p>
                      <p className="text-xs text-slate-600 font-bold mt-1">Marks</p>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm mb-4 leading-relaxed font-medium">
                    {assignment.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
                    <span className="text-sm text-slate-600 font-medium">
                      Due Date: <span className="font-bold text-slate-800">{assignment.dueDate}</span>
                    </span>
                    <button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg active:scale-95 shadow-md">
                      Submit Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-white to-violet-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 sticky top-5 border border-violet-100">
            <h3 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600">
                <MdFilterList className="text-white text-lg" />
              </div>
              Filter by Subject
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedSubject("all")}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  selectedSubject === "all"
                    ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All Subjects
              </button>
              {SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedSubject === subject
                      ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 shadow-md"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-slate-200">
              <h3 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wide">Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                  <span className="text-blue-700 font-medium">Total Assignments</span>
                  <span className="font-bold text-blue-900 text-lg">{classAssignments.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-100">
                  <span className="text-amber-700 font-medium">Pending</span>
                  <span className="font-bold text-amber-900 text-lg">{filtered.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                  <span className="text-purple-700 font-medium">Total Marks</span>
                  <span className="font-bold text-purple-900 text-lg">
                    {filtered.reduce((sum, a) => sum + a.maxMarks, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
