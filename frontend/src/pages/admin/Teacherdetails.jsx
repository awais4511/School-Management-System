import { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  MdAdd,
  MdClose,
  MdWarning,
  MdDownload,
  MdSearch,
  MdFilterList,
} from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import {
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiBook,
  FiCalendar,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { AVATAR_COLORS, EMPTY_FORM, INITIAL_TEACHERS, navItems } from "../../mockdata/data";


export default function Teachers() {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [confirmDel, setConfirmDel] = useState(null);
  const [toast, setToast] = useState(null);

  const total = teachers.length;
  const active = teachers.filter((t) => t.status === "Active").length;
  const inactive = total - active;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return teachers.filter((t) => {
      const matchQ =
        !q ||
        [t.first, t.last, t.email, t.subject, t.id].some((v) =>
          v.toLowerCase().includes(q),
        );
      const matchS = statusFilter === "All" || t.status === statusFilter;
      return matchQ && matchS;
    });
  }, [teachers, search, statusFilter]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (id) => {
    const t = teachers.find((x) => x.id === id);
    setEditingId(id);
    setForm({ ...t });
    setFormError("");
    setShowForm(true);
  };

  const setField = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const saveTeacher = () => {
    if (!form.first.trim() || !form.last.trim() || !form.email.trim()) {
      setFormError("First name, last name and email are required.");
      return;
    }

    if (editingId) {
      setTeachers((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...form } : t)),
      );
      showToast("Teacher updated successfully");
    } else {
      const newTeacher = {
        id: "T" + String(Math.floor(Math.random() * 900) + 100),
        ...form,
        subject: form.subject || "General",
      };
      setTeachers((prev) => [newTeacher, ...prev]);
      showToast("Teacher added successfully");
    }
    setShowForm(false);
  };

  const handleDelete = () => {
    setTeachers((prev) => prev.filter((t) => t.id !== confirmDel));
    setConfirmDel(null);
    showToast("Teacher removed", "error");
  };

  const exportCSV = () => {
    const rows = [
      ["ID", "Name", "Subject", "Email", "Phone", "Joined", "Status"],
      ...teachers.map((t) => [
        t.id,
        `${t.first} ${t.last}`,
        t.subject,
        t.email,
        t.phone,
        t.joined,
        t.status,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv," + encodeURIComponent(csv);
    a.download = "teachers.csv";
    a.click();
    showToast("CSV exported!");
  };

  const delTarget = teachers.find((x) => x.id === confirmDel);

  const getAvatarColor = (name) => {
    let h = 0;
    for (const c of name) h = (h * 31 + c.charCodeAt(0)) % AVATAR_COLORS.length;
    return AVATAR_COLORS[h];
  };

  const initials = (t) => (t.first[0] + t.last[0]).toUpperCase();
  const fmtDate = (d) => (d ? d.split("-").reverse().join("/") : "—");

  return (
    <DashboardLayout role="Administrator" navItems={navItems}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <FaChalkboardTeacher className="text-3xl" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              All Staff
            </span>
          </div>
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-white/80 text-sm mt-1">Total Teachers</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <FiCheck className="text-3xl" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {total ? Math.round((active / total) * 100) : 0}%
            </span>
          </div>
          <p className="text-3xl font-bold">{active}</p>
          <p className="text-white/80 text-sm mt-1">Active Teachers</p>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <FiX className="text-3xl" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {total ? Math.round((inactive / total) * 100) : 0}%
            </span>
          </div>
          <p className="text-3xl font-bold">{inactive}</p>
          <p className="text-white/80 text-sm mt-1">Inactive Teachers</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <FaChalkboardTeacher className="text-blue-500 text-xl" /> All
            Teachers
          </h2>

          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, subject, email…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-slate-50"
            />
          </div>

          <div className="relative">
            <MdFilterList className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 bg-slate-50 cursor-pointer"
            >
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">
              {filtered.length} teacher{filtered.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600 px-3 py-2 rounded-xl bg-slate-50"
            >
              <MdDownload /> Export
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-blue-950 hover:bg-blue-900 px-3 py-2 rounded-xl active:scale-95"
            >
              <MdAdd /> Add Teacher
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <FaChalkboardTeacher className="text-4xl mx-auto mb-3 opacity-20" />
            <p>No teachers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs uppercase border-b">
                  <th className="pb-2">Teacher</th>
                  <th className="pb-2">Subject</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Phone</th>
                  <th className="pb-2">Joined</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-slate-50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(t.first + t.last)} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {initials(t)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700">
                            {t.first} {t.last}
                          </p>
                          <p className="text-xs text-slate-400 font-mono">
                            {t.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        <FiBook /> {t.subject}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <FiMail />
                        {t.email}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <FiPhone />
                        {t.phone}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <FiCalendar />
                        {fmtDate(t.joined)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${t.status === "Active" ? "bg-green-100 text-green-700" : "bg-rose-100 text-rose-600"}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(t.id)}
                          className="p-1.5 hover:bg-blue-50 rounded-lg hover:text-blue-600"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => setConfirmDel(t.id)}
                          className="p-1.5 hover:bg-rose-50 rounded-lg hover:text-rose-600"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[92%] max-w-xl max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-5">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                {editingId ? (
                  <FiEdit2 className="text-blue-500" />
                ) : (
                  <MdAdd className="text-emerald-500" />
                )}
                {editingId ? "Edit Teacher" : "Add New Teacher"}
              </h3>
              <button onClick={() => setShowForm(false)}>
                <MdClose className="text-xl text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  First Name
                </label>
                <input
                  className="inputCls"
                  value={form.first}
                  onChange={setField("first")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Last Name
                </label>
                <input
                  className="inputCls"
                  value={form.last}
                  onChange={setField("last")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Email
                </label>
                <input
                  className="inputCls"
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Phone
                </label>
                <input
                  className="inputCls"
                  value={form.phone}
                  onChange={setField("phone")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Subject
                </label>
                <input
                  className="inputCls"
                  value={form.subject}
                  onChange={setField("subject")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Qualification
                </label>
                <input
                  className="inputCls"
                  value={form.qual}
                  onChange={setField("qual")}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Status
                </label>
                <select
                  className="inputCls"
                  value={form.status}
                  onChange={setField("status")}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">
                  Join Date
                </label>
                <input
                  className="inputCls"
                  type="date"
                  value={form.joined}
                  onChange={setField("joined")}
                />
              </div>
            </div>

            {formError && (
              <div className="mt-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3 text-sm flex items-center gap-2">
                <MdWarning />
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-semibold border rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={saveTeacher}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-950 hover:bg-blue-900 rounded-xl"
              >
                Save Teacher
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setConfirmDel(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-[92%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center">
                <FiTrash2 className="text-2xl text-rose-500" />
              </div>
              <p className="font-semibold">
                Remove {delTarget?.first} {delTarget?.last}?
              </p>
              <p className="text-sm text-slate-400 mt-1">
                This action cannot be undone.
              </p>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setConfirmDel(null)}
                  className="flex-1 py-2 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 bg-rose-500 text-white rounded-xl"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white ${toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
        >
          {toast.type === "success" ? <FiCheck /> : <FiX />} {toast.msg}
        </div>
      )}
    </DashboardLayout>
  );
}
