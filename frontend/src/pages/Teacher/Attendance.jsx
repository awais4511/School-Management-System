import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { navItems_teacher } from "../../mockdata/data";
import { MdCheckCircle, MdClose, MdPerson, MdCalendarToday, MdTrendingUp } from "react-icons/md";

const CLASS_LIST = ["Grade 9-A", "Grade 9-B", "Grade 10-A", "Grade 10-B", "Grade 11-A", "Grade 11-B"];

const attendanceData = {
  "Grade 9-A": [
    { id: 1, name: "Ali Ahmed", rollNo: "901", status: "present" },
    { id: 2, name: "Ayesha Khan", rollNo: "902", status: "present" },
    { id: 3, name: "Bilal Hassan", rollNo: "903", status: "absent" },
    { id: 4, name: "Fatima Noor", rollNo: "904", status: "present" },
    { id: 5, name: "Hassan Ali", rollNo: "905", status: "late" },
    { id: 6, name: "Sara Ahmed", rollNo: "906", status: "present" },
    { id: 7, name: "Zainab Khan", rollNo: "907", status: "absent" },
    { id: 8, name: "Omar Hassan", rollNo: "908", status: "present" },
  ],
  "Grade 9-B": [
    { id: 9, name: "Amina Ali", rollNo: "909", status: "present" },
    { id: 10, name: "Tariq Khan", rollNo: "910", status: "present" },
    { id: 11, name: "Hira Ahmed", rollNo: "911", status: "absent" },
    { id: 12, name: "Kamran Hassan", rollNo: "912", status: "present" },
  ],
  "Grade 10-A": [
    { id: 13, name: "Muhammad Ali", rollNo: "1001", status: "present" },
    { id: 14, name: "Sophia Khan", rollNo: "1002", status: "present" },
    { id: 15, name: "Ahmed Hassan", rollNo: "1003", status: "late" },
    { id: 16, name: "Noor Fatima", rollNo: "1004", status: "present" },
  ],
};

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState("Grade 9-A");
  const [attendanceList, setAttendanceList] = useState(attendanceData[selectedClass] || []);

  const toggleAttendance = (id, newStatus) => {
    setAttendanceList(
      attendanceList.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setAttendanceList(attendanceData[className] || []);
  };

  const presentCount = attendanceList.filter((s) => s.status === "present").length;
  const absentCount = attendanceList.filter((s) => s.status === "absent").length;
  const lateCount = attendanceList.filter((s) => s.status === "late").length;
  const attendancePercentage = Math.round(
    ((presentCount + lateCount) / attendanceList.length) * 100
  );

  const statusColor = (status) => {
    if (status === "present") return "bg-green-50 border-l-4 border-green-400";
    if (status === "absent") return "bg-red-50 border-l-4 border-red-400";
    return "bg-amber-50 border-l-4 border-amber-400";
  };

  const statusBadge = (status) => {
    if (status === "present")
      return "bg-green-100 text-green-700 inline-flex items-center gap-1";
    if (status === "absent")
      return "bg-red-100 text-red-700 inline-flex items-center gap-1";
    return "bg-amber-100 text-amber-700 inline-flex items-center gap-1";
  };

  return (
    <DashboardLayout role="Teacher" navItems={navItems_teacher}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MdCheckCircle className="text-teal-500 text-2xl" /> Attendance
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track student attendance for your classes
          </p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs">Present</p>
              <p className="text-2xl font-bold mt-1">{presentCount}</p>
            </div>
            <MdCheckCircle className="text-3xl opacity-40" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-4 text-white shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs">Absent</p>
              <p className="text-2xl font-bold mt-1">{absentCount}</p>
            </div>
            <MdClose className="text-3xl opacity-40" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 text-white shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs">Late</p>
              <p className="text-2xl font-bold mt-1">{lateCount}</p>
            </div>
            <MdCalendarToday className="text-3xl opacity-40" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs">Percentage</p>
              <p className="text-2xl font-bold mt-1">{attendancePercentage}%</p>
            </div>
            <MdTrendingUp className="text-3xl opacity-40" />
          </div>
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

      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
          <MdPerson className="text-teal-500" /> {selectedClass} - Attendance (Today)
        </h2>
        <div className="flex flex-col gap-2">
          {attendanceList.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p>No students found for this class</p>
            </div>
          ) : (
            attendanceList.map((student) => (
              <div
                key={student.id}
                className={`p-4 rounded-xl flex items-center justify-between ${statusColor(student.status)}`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{student.name}</p>
                  <p className="text-xs text-slate-500">Roll No: {student.rollNo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(student.status)}`}>
                    {student.status === "present" && <MdCheckCircle className="text-base" />}
                    {student.status === "absent" && <MdClose className="text-base" />}
                    {student.status === "late" && <MdCalendarToday className="text-base" />}
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleAttendance(student.id, "present")}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        student.status === "present"
                          ? "bg-green-600 text-white"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      P
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, "absent")}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        student.status === "absent"
                          ? "bg-red-600 text-white"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => toggleAttendance(student.id, "late")}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        student.status === "late"
                          ? "bg-amber-600 text-white"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      L
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 flex gap-3">
          <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition-all">
            Save Attendance
          </button>
          <button className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-2.5 rounded-xl transition-all">
            Clear All
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
