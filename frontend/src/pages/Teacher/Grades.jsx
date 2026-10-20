import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { navItems_teacher } from "../../mockdata/data";
import { MdBarChart, MdEdit, MdSave, MdClose } from "react-icons/md";

const CLASS_LIST = ["Grade 9-A", "Grade 9-B", "Grade 10-A", "Grade 10-B", "Grade 11-A", "Grade 11-B"];

const gradesData = {
  "Grade 9-A": [
    { id: 1, name: "Ali Ahmed", rollNo: "901", midterm: 85, final: 88, grades: "A", average: 86.5 },
    { id: 2, name: "Ayesha Khan", rollNo: "902", midterm: 92, final: 95, grades: "A+", average: 93.5 },
    { id: 3, name: "Bilal Hassan", rollNo: "903", midterm: 78, final: 82, grades: "B+", average: 80 },
    { id: 4, name: "Fatima Noor", rollNo: "904", midterm: 88, final: 90, grades: "A", average: 89 },
    { id: 5, name: "Hassan Ali", rollNo: "905", midterm: 75, final: 80, grades: "B", average: 77.5 },
  ],
  "Grade 9-B": [
    { id: 6, name: "Amina Ali", rollNo: "909", midterm: 90, final: 92, grades: "A+", average: 91 },
    { id: 7, name: "Tariq Khan", rollNo: "910", midterm: 82, final: 85, grades: "A", average: 83.5 },
    { id: 8, name: "Hira Ahmed", rollNo: "911", midterm: 73, final: 76, grades: "B", average: 74.5 },
  ],
  "Grade 10-A": [
    { id: 9, name: "Muhammad Ali", rollNo: "1001", midterm: 87, final: 89, grades: "A", average: 88 },
    { id: 10, name: "Sophia Khan", rollNo: "1002", midterm: 94, final: 96, grades: "A+", average: 95 },
  ],
};

export default function Grades() {
  const [selectedClass, setSelectedClass] = useState("Grade 9-A");
  const [gradesList, setGradesList] = useState(gradesData[selectedClass] || []);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setGradesList(gradesData[className] || []);
    setEditingId(null);
  };

  const getGradeColor = (grade) => {
    if (grade === "A+") return "bg-green-100 text-green-700";
    if (grade === "A") return "bg-green-100 text-green-700";
    if (grade === "B+") return "bg-blue-100 text-blue-700";
    if (grade === "B") return "bg-blue-100 text-blue-700";
    return "bg-amber-100 text-amber-700";
  };

  const calculateGrade = (midterm, final) => {
    const average = (midterm + final) / 2;
    if (average >= 90) return "A+";
    if (average >= 80) return "A";
    if (average >= 70) return "B+";
    if (average >= 60) return "B";
    return "C";
  };

  const startEditing = (student) => {
    setEditingId(student.id);
    setEditData({
      midterm: student.midterm,
      final: student.final,
    });
  };

  const saveGrades = (id) => {
    const average = (parseFloat(editData.midterm) + parseFloat(editData.final)) / 2;
    const grade = calculateGrade(parseFloat(editData.midterm), parseFloat(editData.final));

    setGradesList(
      gradesList.map((s) =>
        s.id === id
          ? {
              ...s,
              midterm: parseFloat(editData.midterm),
              final: parseFloat(editData.final),
              grades: grade,
              average: average,
            }
          : s
      )
    );
    setEditingId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const classAverage =
    gradesList.length > 0
      ? (
          gradesList.reduce((sum, s) => sum + s.average, 0) / gradesList.length
        ).toFixed(2)
      : 0;

  const topPerformers = [...gradesList].sort((a, b) => b.average - a.average).slice(0, 3);

  return (
    <DashboardLayout role="Teacher" navItems={navItems_teacher}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MdBarChart className="text-teal-500 text-2xl" /> Grades & Marks
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage student grades and academic performance
          </p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-4 text-white shadow">
          <p className="text-white/80 text-xs">Class Average</p>
          <p className="text-3xl font-bold mt-1">{classAverage}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow">
          <p className="text-white/80 text-xs">Total Students</p>
          <p className="text-3xl font-bold mt-1">{gradesList.length}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow">
          <p className="text-white/80 text-xs">Top Performer</p>
          <p className="text-lg font-bold mt-1">{topPerformers[0]?.name?.split(" ")[0] || "N/A"}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <h2 className="font-bold text-slate-800 text-base mb-3">Select Class</h2>
        <div className="flex flex-wrap gap-2">
          {CLASS_LIST.map((className) => (
            <button
              key={className}
              onClick={() => handleClassChange(className)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedClass === className
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {className}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="font-bold text-slate-800 text-base">{selectedClass} - Grades</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600">Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600">Roll No</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600">Midterm</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600">Final</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600">Average</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600">Grade</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {gradesList.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{student.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{student.rollNo}</td>
                  <td className="px-5 py-4 text-center">
                    {editingId === student.id ? (
                      <input
                        type="number"
                        value={editData.midterm}
                        onChange={(e) =>
                          setEditData({ ...editData, midterm: e.target.value })
                        }
                        className="w-12 px-2 py-1 border border-slate-200 rounded text-sm text-center"
                        min="0"
                        max="100"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-800">{student.midterm}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    {editingId === student.id ? (
                      <input
                        type="number"
                        value={editData.final}
                        onChange={(e) =>
                          setEditData({ ...editData, final: e.target.value })
                        }
                        className="w-12 px-2 py-1 border border-slate-200 rounded text-sm text-center"
                        min="0"
                        max="100"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-800">{student.final}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="text-sm font-semibold text-slate-800">{student.average.toFixed(1)}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${getGradeColor(
                        student.grades
                      )}`}
                    >
                      {student.grades}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {editingId === student.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => saveGrades(student.id)}
                          className="text-green-600 hover:text-green-700 transition-colors"
                          title="Save"
                        >
                          <MdSave className="text-lg" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-red-600 hover:text-red-700 transition-colors"
                          title="Cancel"
                        >
                          <MdClose className="text-lg" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(student)}
                        className="text-teal-600 hover:text-teal-700 transition-colors"
                        title="Edit"
                      >
                        <MdEdit className="text-lg" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {gradesList.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p>No grades found for this class</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
