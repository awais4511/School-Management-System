import React from "react";
import { MdFilterList, MdPersonAdd } from "react-icons/md";

function ClassSidebar({
  classes,
  selectedClass,
  classCounts,
  filteredCount,
  avgAttendance,
  topGrade,
  onClassSelect,
  onAddStudent,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
        <MdFilterList className="text-violet-500 text-xl" /> All Classes
      </h2>

      <div className="flex flex-col gap-2">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => onClassSelect(cls)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left
              ${selectedClass === cls
                ? "border-teal-400 bg-teal-50 text-teal-700"
                : "border-slate-100 bg-white hover:bg-slate-50 text-slate-700"}`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${selectedClass === cls ? "bg-teal-400" : "bg-slate-200"}`} />
              <span className="text-sm font-semibold">{cls}</span>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${selectedClass === cls ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"}`}>
              {classCounts[cls]} students
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 p-4 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl text-white">
        <p className="text-xs font-semibold text-white/80 mb-1">Selected Class</p>
        <p className="text-xl font-bold">{selectedClass}</p>
        <div className="mt-3 flex flex-col gap-1.5 text-xs text-white/90">
          <div className="flex justify-between">
            <span>Students</span>
            <span className="font-bold">{filteredCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg. Attendance</span>
            <span className="font-bold">{avgAttendance}%</span>
          </div>
          <div className="flex justify-between">
            <span>Top Grade</span>
            <span className="font-bold">{topGrade}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onAddStudent}
        className="w-full mt-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <MdPersonAdd /> Add Student to {selectedClass}
      </button>
    </div>
  );
}

export default ClassSidebar;