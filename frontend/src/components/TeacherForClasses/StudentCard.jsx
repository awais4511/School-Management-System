import React from "react";
import { MdArrowForward, MdEdit, MdDelete } from "react-icons/md";

const avatarColors = [
  "from-teal-400 to-emerald-500",
  "from-violet-400 to-purple-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-fuchsia-400 to-pink-400",
];

const gradeColor = (g) => {
  if (g.startsWith("A")) return "bg-emerald-100 text-emerald-700";
  if (g.startsWith("B")) return "bg-teal-100 text-teal-700";
  if (g.startsWith("C")) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
};

function StudentCard({ student, index, onPromote, onEdit, onDelete }) {
  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
      <td className="py-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {student.avatar}
          </div>
          <span className="font-medium text-slate-800">{student.name}</span>
        </div>
      </td>
      <td className="py-3 text-slate-500">{student.roll}</td>
      <td className="py-3">
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${gradeColor(student.grade)}`}>
          {student.grade}
        </span>
      </td>
      <td className="py-3">
        <div className="flex items-center gap-2">
          <div className="w-16 bg-slate-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${student.attendance >= 90 ? "bg-emerald-400" : student.attendance >= 75 ? "bg-amber-400" : "bg-rose-400"}`}
              style={{ width: `${student.attendance}%` }}
            />
          </div>
          <span className="text-xs text-slate-500">{student.attendance}%</span>
        </div>
      </td>
      <td className="py-3">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            title="Promote to next class"
            onClick={() => onPromote(student)}
            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
          >
            <MdArrowForward className="text-sm" />
          </button>
          <button
            title="Edit student"
            onClick={() => onEdit(student)}
            className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-600 transition-colors"
          >
            <MdEdit className="text-sm" />
          </button>
          <button
            title="Remove student"
            onClick={() => onDelete(student)}
            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 transition-colors"
          >
            <MdDelete className="text-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentCard;