import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { navItems_teacher } from "../../mockdata/data";
import { MdAssignment, MdAdd } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import assignmentStore from "../../store/assignmentStore";
import AssignmentForm from "../../components/Assignments/AssignmentForm";
import AssignmentCard from "../../components/Assignments/AssignmentCard";
import DeleteConfirmationModal from "../../components/Assignments/DeleteConfirmationModal";

export default function Assignments() {
  const assignments = assignmentStore((state) => state.assignments);
  const addAssignment = assignmentStore((state) => state.addAssignment);
  const updateAssignment = assignmentStore((state) => state.updateAssignment);
  const deleteAssignment = assignmentStore((state) => state.deleteAssignment);

  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = assignments.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase()) ||
      a.class.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddAssignment = (formData) => {
    addAssignment(formData);
    setShowForm(false);
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleUpdateAssignment = (formData) => {
    updateAssignment(editingAssignment.id, formData);
    setEditingAssignment(null);
    setShowForm(false);
  };

  const handleDeleteAssignment = (assignmentId) => {
    const assignment = assignments.find((a) => a.id === assignmentId);
    setDeleteConfirm(assignment);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteAssignment(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  return (
    <DashboardLayout role="Teacher" navItems={navItems_teacher}>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MdAssignment className="text-teal-500 text-2xl" /> Assignments
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {assignments.length} total · visible to students
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAssignment(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
        >
          <MdAdd className="text-lg" /> New Assignment
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, subject or class…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <FaBookOpen className="text-5xl mb-3 opacity-30" />
          <p className="text-sm">
            {assignments.length === 0
              ? "No assignments yet. Create one to get started!"
              : "No assignments found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onEdit={handleEditAssignment}
              onDelete={handleDeleteAssignment}
            />
          ))}
        </div>
      )}

      {showForm && (
        <AssignmentForm
          initialData={editingAssignment}
          onClose={() => {
            setShowForm(false);
            setEditingAssignment(null);
          }}
          onSubmit={editingAssignment ? handleUpdateAssignment : handleAddAssignment}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirmationModal
          assignmentTitle={deleteConfirm.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </DashboardLayout>
  );
}