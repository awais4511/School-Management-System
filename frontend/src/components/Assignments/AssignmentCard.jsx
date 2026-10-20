import { MdEdit, MdDelete } from "react-icons/md";

export default function AssignmentCard({ assignment, onEdit, onDelete }) {
  const priorityColor = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (diff <= 1) return "bg-red-100 text-red-700";
    if (diff <= 3) return "bg-amber-100 text-amber-700";
    return "bg-emerald-100 text-emerald-700";
  };

  const daysLabel = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (diff < 0) return "Overdue";
    if (diff === 0) return "Due today";
    if (diff === 1) return "Due tomorrow";
    return `${diff} days left`;
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full">
            {assignment.subject}
          </span>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
            {assignment.class}
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${priorityColor(
            assignment.dueDate
          )}`}
        >
          {daysLabel(assignment.dueDate)}
        </span>
      </div>

      <p className="font-semibold text-slate-800 text-sm leading-snug">{assignment.title}</p>

      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
        {assignment.description}
      </p>

      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3 mt-auto">
        <span>
          Due: <span className="font-medium text-slate-600">{assignment.dueDate}</span>
        </span>
        <span>
          Marks: <span className="font-medium text-slate-600">{assignment.maxMarks}</span>
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(assignment)}
          className="flex-1 flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold py-2 rounded-xl transition-all"
        >
          <MdEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(assignment.id)}
          className="flex-1 flex items-center justify-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold py-2 rounded-xl transition-all"
        >
          <MdDelete /> Delete
        </button>
      </div>
    </div>
  );
}
