import DashboardLayout from "../../components/DashboardLayout";
import { useState } from "react";
import {
  MdFamilyRestroom,
  MdMenuBook,
  MdSearch,
  MdExpandMore,
  MdExpandLess,
  MdPhone,
  MdEmail,
  MdPerson,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";
import { avatarColors, emptyForm, initialClassData, navItems } from "../../mockdata/data";
import { GetInitials, InputField } from "../../Extra";


export default function ParentsDetails() {
  const [classData, setClassData] = useState(initialClassData);
  const [expandedClasses, setExpandedClasses] = useState({ "Grade 9-A": true });
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const toggleClass = (grade) => {
    setExpandedClasses((prev) => ({ ...prev, [grade]: !prev[grade] }));
  };

  const grades = ["All", ...classData.map((c) => c.grade)];

  const filtered = classData
    .filter((cls) => selectedGrade === "All" || cls.grade === selectedGrade)
    .map((cls) => ({
      ...cls,
      students: cls.students.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.fatherName.toLowerCase().includes(search.toLowerCase()) ||
          s.motherName.toLowerCase().includes(search.toLowerCase()) ||
          s.phone.includes(search),
      ),
    }))
    .filter((cls) => cls.students.length > 0);

  const totalParents = classData.reduce((sum, c) => sum + c.students.length, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.studentName.trim())
      newErrors.studentName = "Student name is required";
    if (!form.roll.trim()) newErrors.roll = "Roll number is required";
    if (!form.grade) newErrors.grade = "Please select a class";
    if (!form.fatherName.trim())
      newErrors.fatherName = "Father name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newStudent = {
      name: form.studentName.trim(),
      roll: form.roll.trim(),
      fatherName: form.fatherName.trim(),
      motherName: form.motherName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      relation: form.relation,
    };

    setClassData((prev) =>
      prev.map((cls) =>
        cls.grade === form.grade
          ? { ...cls, students: [...cls.students, newStudent] }
          : cls,
      ),
    );

    setExpandedClasses((prev) => ({ ...prev, [form.grade]: true }));
    setSelectedGrade("All");
    setSuccessMsg(
      `Parent details for "${form.studentName}" added to ${form.grade}!`,
    );
    setForm(emptyForm);
    setErrors({});
    setShowModal(false);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <DashboardLayout role="Administrator" navItems={navItems}>
      {successMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-600 text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-xl">
          <MdCheckCircle className="text-xl flex-shrink-0" />
          {successMsg}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MdFamilyRestroom className="text-rose-500 text-2xl" />
                <h2 className="font-bold text-slate-800 text-lg">
                  Add Parent Details
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Student Information
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <InputField
                      label="Student Name"
                      name="studentName"
                      value={form.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Ayesha Khan"
                      required
                      error={errors.studentName}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Roll Number"
                      name="roll"
                      value={form.roll}
                      onChange={handleChange}
                      placeholder="e.g. 905"
                      required
                      error={errors.roll}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Class / Grade <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="grade"
                      value={form.grade}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-700 focus:outline-none focus:ring-2 bg-white transition-colors ${
                        errors.grade
                          ? "border-rose-300 focus:ring-rose-200"
                          : "border-slate-200 focus:ring-blue-200"
                      }`}
                    >
                      <option value="">-- Select Class --</option>
                      {classData.map((c) => (
                        <option key={c.grade} value={c.grade}>
                          {c.grade}
                        </option>
                      ))}
                    </select>
                    {errors.grade && (
                      <p className="text-xs text-rose-500 mt-1">
                        {errors.grade}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Parent / Guardian Information
                </p>
                <div className="flex flex-col gap-3">
                  <InputField
                    label="Father's Name"
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                    placeholder="e.g. Imran Khan"
                    required
                    error={errors.fatherName}
                  />
                  <InputField
                    label="Mother's Name"
                    name="motherName"
                    value={form.motherName}
                    onChange={handleChange}
                    placeholder="e.g. Sadia Imran"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="Phone Number"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0300-1234567"
                      required
                      error={errors.phone}
                    />
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Primary Contact
                      </label>
                      <select
                        name="relation"
                        value={form.relation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                      </select>
                    </div>
                  </div>
                  <InputField
                    label="Email Address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. parent@email.com"
                    type="email"
                    error={errors.email}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-sm font-semibold transition-all active:scale-95"
              >
                Add Parent
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <MdFamilyRestroom className="text-rose-500 text-3xl" />
              Parents Details
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Class-wise parent & guardian information — {totalParents} families
              registered
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="self-start sm:self-auto bg-blue-950 hover:bg-blue-900 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            + Add Parent
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search by student, parent name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedGrade === g
                    ? "bg-blue-950 text-white border-blue-950"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-slate-400">
            <MdSearch className="text-5xl mx-auto mb-3 text-slate-200" />
            <p className="font-medium">No results found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          filtered.map((cls, ci) => {
            const isOpen = expandedClasses[cls.grade];
            return (
              <div
                key={cls.grade}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                {/* Class Header */}
                <button
                  onClick={() => toggleClass(cls.grade)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColors[ci % avatarColors.length]} flex items-center justify-center`}
                    >
                      <MdMenuBook className="text-white text-lg" />
                    </div>
                    <div className="text-left">
                      <h2 className="font-bold text-slate-800 text-base">
                        {cls.grade}
                      </h2>
                      <p className="text-xs text-slate-400">
                        Class Teacher:{" "}
                        <span className="text-slate-600 font-medium">
                          {cls.classTeacher}
                        </span>
                        &nbsp;·&nbsp;
                        <span className="text-slate-500">
                          {cls.students.length} student
                          {cls.students.length !== 1 ? "s" : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-br ${avatarColors[ci % avatarColors.length]} text-white`}
                    >
                      {cls.students.length} Parents
                    </span>
                    {isOpen ? (
                      <MdExpandLess className="text-slate-400 text-xl" />
                    ) : (
                      <MdExpandMore className="text-slate-400 text-xl" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {cls.students.map((student, si) => (
                        <div
                          key={`${student.roll}-${si}`}
                          className="border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all bg-slate-50/50"
                        >
                          {/* Student Row */}
                          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
                            <div
                              className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[(ci + si) % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                            >
                              {GetInitials(student.name)}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800 text-sm">
                                {student.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                Roll # {student.roll}
                              </p>
                            </div>
                            <span className="ml-auto text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <MdPerson className="text-slate-400 text-base flex-shrink-0" />
                              <span className="font-medium text-slate-700">
                                Father:
                              </span>
                              <span>{student.fatherName || "—"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <MdPerson className="text-slate-400 text-base flex-shrink-0" />
                              <span className="font-medium text-slate-700">
                                Mother:
                              </span>
                              <span>{student.motherName || "—"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <MdPhone className="text-slate-400 text-base flex-shrink-0" />
                              <span>{student.phone}</span>
                              <span className="ml-auto text-slate-400">
                                Contact: {student.relation}
                              </span>
                            </div>
                            {student.email && (
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <MdEmail className="text-slate-400 text-base flex-shrink-0" />
                                <span className="truncate">
                                  {student.email}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 mt-3">
                            <button className="flex-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 py-1.5 rounded-lg transition-colors">
                              View Profile
                            </button>
                            <button className="flex-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 py-1.5 rounded-lg transition-colors">
                              Contact
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}
