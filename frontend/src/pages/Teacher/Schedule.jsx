import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { navItems_teacher } from "../../mockdata/data";
import { MdSchedule, MdNavigateNext, MdNavigateBefore, MdEvent } from "react-icons/md";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const scheduleData = {
  Monday: [
    { time: "08:00", subject: "Mathematics", class: "Grade 9-A", room: "Room 101", duration: "45 min" },
    { time: "08:50", subject: "Mathematics", class: "Grade 10-B", room: "Room 101", duration: "45 min" },
    { time: "10:00", subject: "Statistics", class: "Grade 11-C", room: "Lab 1", duration: "45 min" },
    { time: "12:15", subject: "Calculus", class: "Grade 9-B", room: "Room 102", duration: "45 min" },
  ],
  Tuesday: [
    { time: "08:00", subject: "Algebra", class: "Grade 8-A", room: "Room 103", duration: "45 min" },
    { time: "09:35", subject: "Geometry", class: "Grade 9-C", room: "Room 104", duration: "45 min" },
    { time: "10:50", subject: "Mathematics", class: "Grade 10-A", room: "Room 101", duration: "45 min" },
    { time: "13:05", subject: "Trigonometry", class: "Grade 11-A", room: "Lab 2", duration: "45 min" },
  ],
  Wednesday: [
    { time: "08:00", subject: "Mathematics", class: "Grade 9-D", room: "Room 105", duration: "45 min" },
    { time: "09:35", subject: "Statistics", class: "Grade 10-C", room: "Lab 3", duration: "45 min" },
    { time: "10:50", subject: "Calculus", class: "Grade 11-B", room: "Room 101", duration: "45 min" },
  ],
  Thursday: [
    { time: "08:00", subject: "Algebra", class: "Grade 9-A", room: "Room 106", duration: "45 min" },
    { time: "09:35", subject: "Mathematics", class: "Grade 10-D", room: "Room 107", duration: "45 min" },
    { time: "10:50", subject: "Geometry", class: "Grade 8-B", room: "Lab 1", duration: "45 min" },
    { time: "12:15", subject: "Advanced Math", class: "Grade 11-C", room: "Room 108", duration: "45 min" },
  ],
  Friday: [
    { time: "08:00", subject: "Mathematics", class: "Grade 9-E", room: "Room 109", duration: "45 min" },
    { time: "09:35", subject: "Statistics", class: "Grade 10-E", room: "Lab 2", duration: "45 min" },
    { time: "13:05", subject: "Calculus", class: "Grade 11-D", room: "Room 110", duration: "45 min" },
  ],
  Saturday: [
    { time: "08:00", subject: "Mathematics Workshop", class: "All Grades", room: "Hall A", duration: "2 hours" },
  ],
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [weekOffset, setWeekOffset] = useState(0);

  const getTodaySchedule = () => {
    return scheduleData[selectedDay] || [];
  };

  const getStatus = (time) => {
    const [hours] = time.split(":").map(Number);
    const now = new Date().getHours();
    if (hours < now) return "done";
    if (hours === now) return "now";
    return "upcoming";
  };

  const statusColor = (status) => {
    if (status === "done") return "bg-slate-50 border-l-4 border-slate-400";
    if (status === "now") return "bg-green-50 border-l-4 border-green-400";
    return "bg-blue-50 border-l-4 border-blue-400";
  };

  const statusBadge = (status) => {
    if (status === "done") return "bg-slate-100 text-slate-700";
    if (status === "now") return "bg-green-100 text-green-700 font-semibold";
    return "bg-blue-100 text-blue-700";
  };

  const todaySchedule = getTodaySchedule();

  return (
    <DashboardLayout role="Teacher" navItems={navItems_teacher}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MdSchedule className="text-teal-500 text-2xl" /> Class Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            View and manage your teaching schedule
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Previous Week"
          >
            <MdNavigateBefore className="text-xl text-slate-600" />
          </button>
          <span className="text-sm font-semibold text-slate-600 px-3">Week {weekOffset + 1}</span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Next Week"
          >
            <MdNavigateNext className="text-xl text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl p-5 text-white shadow">
          <p className="text-white/80 text-sm">Total Classes Today</p>
          <p className="text-4xl font-bold mt-2">{todaySchedule.length}</p>
          <p className="text-white/80 text-xs mt-3">Classes scheduled</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow">
          <p className="text-white/80 text-sm">Current Class</p>
          <p className="text-2xl font-bold mt-2">
            {todaySchedule.find((s) => getStatus(s.time) === "now")?.subject || "None"}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow">
          <p className="text-white/80 text-sm">Upcoming</p>
          <p className="text-2xl font-bold mt-2">
            {todaySchedule.filter((s) => getStatus(s.time) === "upcoming").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 mb-6">
        <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
          <MdEvent className="text-teal-500" /> Select Day
        </h2>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedDay === day
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="font-bold text-slate-800 text-base mb-4">
          {selectedDay} Schedule - Week {weekOffset + 1}
        </h2>

        {todaySchedule.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <MdSchedule className="text-5xl mx-auto mb-3 opacity-30" />
            <p>No classes scheduled for {selectedDay}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {todaySchedule.map((schedule, index) => {
              const status = getStatus(schedule.time);
              return (
                <div
                  key={index}
                  className={`p-5 rounded-xl flex items-start justify-between gap-4 ${statusColor(status)}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-right min-w-fit">
                        <p className="font-bold text-lg text-slate-800">{schedule.time}</p>
                        <p className="text-xs text-slate-500">{schedule.duration}</p>
                      </div>
                      <div className="flex-1 border-l-2 border-slate-300 pl-4">
                        <h3 className="font-bold text-slate-800 text-base">{schedule.subject}</h3>
                        <p className="text-sm text-slate-600">{schedule.class}</p>
                        <p className="text-xs text-slate-500 mt-1">Room: {schedule.room}</p>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusBadge(status)}`}>
                    {status === "done" && "Completed"}
                    {status === "now" && "In Progress"}
                    {status === "upcoming" && "Upcoming"}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-200">
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl transition-all">
            Request Schedule Change
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
