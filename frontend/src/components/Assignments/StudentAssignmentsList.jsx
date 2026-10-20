import { MdAssignment, MdCheckCircle, MdSchedule } from "react-icons/md";
import assignmentStore from "../../store/assignmentStore";

export default function StudentAssignmentsList({ className }) {
  const assignments = assignmentStore((state) =>
    state.getAssignmentsByClass(className)
  );

  const daysLabel = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (diff < 0) return "Overdue";
    if (diff === 0) return "Due today";
    if (diff === 1) return "Due tomorrow";
    return `${diff} days left`;
  };

  const priorityColor = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (diff <= 1) return "bg-red-50 border-l-4 border-red-400";
    if (diff <= 3) return "bg-amber-50 border-l-4 border-amber-400";
    return "bg-emerald-50 border-l-4 border-emerald-400";
  };

  const priorityBadgeColor = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / 86400000);
    if (diff <= 1) return "bg-red-100 text-red-700";
    if (diff <= 3) return "bg-amber-100 text-amber-700";
    return "bg-emerald-100 text-emerald-700";
  };

  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
          <MdAssignment className="text-teal-500 text-xl" /> Your Assignments
        </h2>
        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
          <MdAssignment className="text-4xl mb-2 opacity-30" />
          <p className="text-sm">No assignments assigned yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
        <MdAssignment className="text-teal-500 text-xl" /> Your Assignments ({assignments.length})
      </h2>
      <div className="flex flex-col gap-3">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className={`p-4 rounded-xl flex items-start justify-between gap-4 ${priorityColor(
              assignment.dueDate
            )}`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-slate-800 text-sm">{assignment.title}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityBadgeColor(assignment.dueDate)}`}>
                  {daysLabel(assignment.dueDate)}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-2">{assignment.subject}</p>
              <p className="text-xs text-slate-500 line-clamp-2">{assignment.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <MdSchedule className="text-sm" />
                {assignment.dueDate}
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-white/60 px-2 py-1 rounded">
                {assignment.maxMarks} marks
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
