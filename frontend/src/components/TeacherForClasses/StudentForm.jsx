import React, { useState } from "react";
import { CLASS_LIST } from "../../mockdata/data";


function StudentForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial || { name: "", roll: "", grade: "A", attendance: 90, currentClass: "Class 3" }
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Full Name</label>
        <input
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Student name"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Roll No.</label>
          <input
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={form.roll}
            onChange={(e) => set("roll", e.target.value)}
            placeholder="001"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Grade</label>
          <select
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={form.grade}
            onChange={(e) => set("grade", e.target.value)}
          >
            {["A+", "A", "B+", "B", "C", "D"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 mb-1 block">
          Attendance: <span className="text-teal-600 font-bold">{form.attendance}%</span>
        </label>
        <input
          type="range" min={0} max={100}
          className="w-full accent-teal-500"
          value={form.attendance}
          onChange={(e) => set("attendance", Number(e.target.value))}
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Class</label>
        <select
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={form.currentClass}
          onChange={(e) => set("currentClass", e.target.value)}
        >
          {CLASS_LIST.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={onCancel}
          className="flex-1 border border-slate-200 text-slate-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => form.name.trim() && onSave(form)}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
        >
          Save Student
        </button>
      </div>
    </div>
  );
}

export default StudentForm;