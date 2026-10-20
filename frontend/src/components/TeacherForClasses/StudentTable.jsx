import React from "react";
import { MdSearch, MdPersonAdd } from "react-icons/md";
import StudentCard from "./StudentCard";

function StudentTable({ students, selectedClass, search, setSearch, onAdd, onPromote, onEdit, onDelete }) {
  const filtered = students.filter(
    (s) =>
      s.currentClass === selectedClass &&
      (s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search))
  );

  return (
    <div className="xl:col-span-2 bg-white rounded-2xl shadow p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          Students · {selectedClass}
        </h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          <MdPersonAdd className="text-base" /> Add Student
        </button>
      </div>

      <div className="relative mb-4">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
        <input
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Search by name or roll no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-100">
              <th className="text-left pb-2 font-semibold">Student</th>
              <th className="text-left pb-2 font-semibold">Roll</th>
              <th className="text-left pb-2 font-semibold">Grade</th>
              <th className="text-left pb-2 font-semibold">Attend.</th>
              <th className="text-right pb-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-400 text-xs">
                  No students found in {selectedClass}.
                </td>
              </tr>
            ) : (
              filtered.map((s, i) => (
                <StudentCard
                  key={s.id}
                  student={s}
                  index={i}
                  onPromote={onPromote}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;