import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { CLASS_LIST, initialStudents, navItems_teacher } from "../../mockdata/data";
import { MdSchool } from "react-icons/md";
import { FaUserGraduate, FaChalkboardTeacher, FaStar } from "react-icons/fa";
import Modal from "../../components/TeacherForClasses/Modal";
import StudentForm from "../../components/TeacherForClasses/StudentForm";
import StudentTable from "../../components/TeacherForClasses/StudentTable";
import ClassSidebar from "../../components/TeacherForClasses/ClassSidebar";

function Classes() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedClass, setSelectedClass] = useState("Class 3");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = "teal") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = students.filter(
    (s) =>
      s.currentClass === selectedClass &&
      (s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search))
  );

  const classCounts = CLASS_LIST.reduce((acc, c) => {
    acc[c] = students.filter((s) => s.currentClass === c).length;
    return acc;
  }, {});

  const avgAttendance = filtered.length
    ? Math.round(filtered.reduce((a, s) => a + s.attendance, 0) / filtered.length)
    : 0;

  const topGrade = filtered.length
    ? [...filtered].sort((a, b) => b.grade.localeCompare(a.grade))[0]?.grade
    : "—";

  const handleAdd = (form) => {
    const initials = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    setStudents((prev) => [...prev, { ...form, id: Date.now(), avatar: initials }]);
    setModal(null);
    showToast(`${form.name} added to ${form.currentClass}`);
  };

  const handleEdit = (form) => {
    const initials = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    setStudents((prev) =>
      prev.map((s) => (s.id === modal.student.id ? { ...s, ...form, avatar: initials } : s))
    );
    setModal(null);
    showToast(`${form.name} updated`);
  };

  const handleDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== modal.student.id));
    showToast(`${modal.student.name} removed`, "rose");
    setModal(null);
  };

  const handlePromote = () => {
    const student = modal.student;
    const idx = CLASS_LIST.indexOf(student.currentClass);
    if (idx >= CLASS_LIST.length - 1) {
      showToast(`${student.name} is already in the highest class`, "amber");
      setModal(null);
      return;
    }
    const nextClass = CLASS_LIST[idx + 1];
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, currentClass: nextClass } : s))
    );
    showToast(`${student.name} promoted to ${nextClass} 🎉`);
    setModal(null);
  };

  return (
    <DashboardLayout role="Teacher" navItems={navItems_teacher}>
      <div className="font-sans">
        {toast && (
          <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-semibold
            ${toast.color === "rose" ? "bg-rose-500" : toast.color === "amber" ? "bg-amber-500" : "bg-teal-500"}`}>
            {toast.msg}
          </div>
        )}

        {modal?.type === "add" && (
          <Modal title="Add New Student" onClose={() => setModal(null)}>
            <StudentForm onSave={handleAdd} onCancel={() => setModal(null)} />
          </Modal>
        )}

        {modal?.type === "edit" && (
          <Modal title="Edit Student" onClose={() => setModal(null)}>
            <StudentForm initial={modal.student} onSave={handleEdit} onCancel={() => setModal(null)} />
          </Modal>
        )}

        {modal?.type === "delete" && (
          <Modal title="Remove Student" onClose={() => setModal(null)}>
            <p className="text-sm text-slate-600 mb-5">
              Are you sure you want to remove <span className="font-bold text-slate-800">{modal.student.name}</span> from the system? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button onClick={handleDelete} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all">
                Yes, Remove
              </button>
            </div>
          </Modal>
        )}

        {modal?.type === "promote" && (
          <Modal title="Promote to Next Class" onClose={() => setModal(null)}>
            <div className="flex items-center gap-4 mb-5 p-4 bg-teal-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                {modal.student.avatar}
              </div>
              <div>
                <p className="font-bold text-slate-800">{modal.student.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-slate-500">{modal.student.currentClass}</span>
                  <MdSchool className="text-teal-500" />
                  <span className="text-sm font-semibold text-teal-600">
                    {CLASS_LIST[CLASS_LIST.indexOf(modal.student.currentClass) + 1] ?? "—"}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-5">
              This will move the student to the next class level. You can always edit their class manually later.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button onClick={handlePromote} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
                Promote
              </button>
            </div>
          </Modal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Students", value: students.length, color: "from-teal-500 to-emerald-500", Icon: FaUserGraduate },
            { label: "Total Classes", value: CLASS_LIST.length, color: "from-violet-500 to-purple-600", Icon: FaChalkboardTeacher },
            { label: "Current Class", value: selectedClass, color: "from-sky-500 to-blue-600", Icon: MdSchool },
            { label: "In This Class", value: filtered.length, color: "from-rose-500 to-pink-500", Icon: FaStar },
          ].map((s) => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white shadow-lg`}>
              <s.Icon className="text-3xl" />
              <p className="text-3xl font-bold mt-2">{s.value}</p>
              <p className="text-white/80 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <StudentTable
            students={students}
            selectedClass={selectedClass}
            search={search}
            setSearch={setSearch}
            onAdd={() => setModal({ type: "add" })}
            onPromote={(s) => setModal({ type: "promote", student: s })}
            onEdit={(s) => setModal({ type: "edit", student: s })}
            onDelete={(s) => setModal({ type: "delete", student: s })}
          />

          <ClassSidebar
            classes={CLASS_LIST}
            selectedClass={selectedClass}
            classCounts={classCounts}
            filteredCount={filtered.length}
            avgAttendance={avgAttendance}
            topGrade={topGrade}
            onClassSelect={(cls) => { setSelectedClass(cls); setSearch(""); }}
            onAddStudent={() => setModal({ type: "add" })}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Classes;