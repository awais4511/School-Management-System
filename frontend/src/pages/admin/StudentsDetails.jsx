import DashboardLayout from "../../components/DashboardLayout";
import { useState } from "react";
import {
  MdAdd,
  MdClose,
  MdCheckCircle,
  MdCancel,
  MdPeople,
} from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { initialClasses, navItems } from "../../mockdata/data";

export default function StudentsDetails() {
  const [classes, setClasses] = useState(initialClasses);
  const [selectedClass, setSelectedClass] = useState(initialClasses[0].id);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", rollNo: "" });
  const [newClassName, setNewClassName] = useState("");

  const activeClass = classes.find((c) => c.id === selectedClass);

  const toggleAttendance = (studentId) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === selectedClass
          ? {
              ...cls,
              students: cls.students.map((s) =>
                s.id === studentId
                  ? {
                      ...s,
                      status: s.status === "present" ? "absent" : "present",
                    }
                  : s,
              ),
            }
          : cls,
      ),
    );
  };

  const addStudent = () => {
    if (!newStudent.name.trim() || !newStudent.rollNo.trim()) return;
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === selectedClass
          ? {
              ...cls,
              students: [
                ...cls.students,
                {
                  id: Date.now(),
                  name: newStudent.name.trim(),
                  rollNo: newStudent.rollNo.trim(),
                  status: "present",
                },
              ],
            }
          : cls,
      ),
    );
    setNewStudent({ name: "", rollNo: "" });
    setShowAddStudent(false);
  };

  const addClass = () => {
    if (!newClassName.trim()) return;
    const newClass = {
      id: Date.now(),
      name: newClassName.trim(),
      students: [],
    };
    setClasses((prev) => [...prev, newClass]);
    setSelectedClass(newClass.id);
    setNewClassName("");
    setShowAddClass(false);
  };

  const removeStudent = (studentId) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === selectedClass
          ? { ...cls, students: cls.students.filter((s) => s.id !== studentId) }
          : cls,
      ),
    );
  };

  const presentCount =
    activeClass?.students.filter((s) => s.status === "present").length || 0;
  const absentCount =
    activeClass?.students.filter((s) => s.status === "absent").length || 0;
  const total = activeClass?.students.length || 0;

  return (
    <DashboardLayout role="Administrator" navItems={navItems}>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Students Details
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage students class-wise and track attendance
          </p>
        </div>
        <button
          onClick={() => setShowAddClass(true)}
          className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95"
        >
          <MdAdd className="text-lg" /> Add Class
        </button>
      </div>

      {showAddClass && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-base">New Class</h2>
              <button
                onClick={() => setShowAddClass(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Class name (e.g. Grade 6-A)"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddClass(false)}
                className="flex-1 border border-slate-200 text-slate-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={addClass}
                className="flex-1 bg-blue-950 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-900"
              >
                Add Class
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStudent && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-base">
                Add Student to {activeClass?.name}
              </h2>
              <button
                onClick={() => setShowAddStudent(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                placeholder="Student name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Roll number"
                value={newStudent.rollNo}
                onChange={(e) =>
                  setNewStudent((p) => ({ ...p, rollNo: e.target.value }))
                }
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddStudent(false)}
                className="flex-1 border border-slate-200 text-slate-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={addStudent}
                className="flex-1 bg-blue-950 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-900"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-5 flex-col xl:flex-row">
        <div className="xl:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Classes
            </p>
            <div className="flex flex-col gap-1">
              {classes.map((cls) => {
                const present = cls.students.filter(
                  (s) => s.status === "present",
                ).length;
                const tot = cls.students.length;
                return (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClass(cls.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                      selectedClass === cls.id
                        ? "bg-blue-950 text-white"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <p className="text-sm font-semibold">{cls.name}</p>
                    <p
                      className={`text-xs mt-0.5 ${selectedClass === cls.id ? "text-blue-200" : "text-slate-400"}`}
                    >
                      {tot} students · {present} present
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white rounded-2xl shadow p-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <MdPeople className="text-blue-500 text-2xl" />
              </div>
              <p className="text-2xl font-bold text-slate-800">{total}</p>
              <p className="text-xs text-slate-400 mt-0.5">Total</p>
            </div>
            <div className="bg-green-50 rounded-2xl shadow p-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <MdCheckCircle className="text-green-500 text-2xl" />
              </div>
              <p className="text-2xl font-bold text-green-700">
                {presentCount}
              </p>
              <p className="text-xs text-green-500 mt-0.5">Present</p>
            </div>
            <div className="bg-red-50 rounded-2xl shadow p-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <MdCancel className="text-red-400 text-2xl" />
              </div>
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              <p className="text-xs text-red-400 mt-0.5">Absent</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-bold text-slate-800 text-base">
                {activeClass?.name} — Students
              </h2>
              <button
                onClick={() => setShowAddStudent(true)}
                className="flex items-center gap-1.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all active:scale-95"
              >
                <MdAdd className="text-base" /> Add Student
              </button>
            </div>

            {activeClass?.students.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <FaUserGraduate className="text-4xl mx-auto mb-3 opacity-30" />
                <p className="text-sm">No students in this class yet.</p>
                <button
                  onClick={() => setShowAddStudent(true)}
                  className="mt-3 text-blue-600 text-sm font-medium hover:underline"
                >
                  + Add first student
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 text-xs uppercase border-b border-slate-100">
                      <th className="pb-2 font-semibold">Roll #</th>
                      <th className="pb-2 font-semibold">Name</th>
                      <th className="pb-2 font-semibold">Attendance</th>
                      <th className="pb-2 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeClass.students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3 text-slate-400 font-mono text-xs">
                          {student.rollNo}
                        </td>
                        <td className="py-3 font-medium text-slate-700">
                          {student.name}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => toggleAttendance(student.id)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                              student.status === "present"
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                          >
                            {student.status === "present" ? (
                              <MdCheckCircle className="text-sm" />
                            ) : (
                              <MdCancel className="text-sm" />
                            )}
                            {student.status === "present"
                              ? "Present"
                              : "Absent"}
                          </button>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => removeStudent(student.id)}
                            className="text-slate-300 hover:text-red-400 transition-colors"
                            title="Remove student"
                          >
                            <MdClose className="text-lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {total > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Attendance rate</span>
                  <span>{Math.round((presentCount / total) * 100)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${(presentCount / total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
