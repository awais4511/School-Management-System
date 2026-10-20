export const TIMETABLE_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const TIMETABLE_PERIODS = ["08:00-08:45", "08:50-09:35", "10:00-10:45", "10:50-11:35", "12:15-13:00", "13:05-13:50"];

export const timetableData = {
  Monday: ["Mathematics", "Physics", "Break", "English", "Lunch", "Chemistry"],
  Tuesday: ["Chemistry", "English", "Biology", "Mathematics", "Lunch", "Physics"],
  Wednesday: ["Physics", "Mathematics", "Chemistry", "English", "Lunch", "Biology"],
  Thursday: ["Biology", "Chemistry", "Physics", "Lunch", "Mathematics", "English"],
  Friday: ["English", "Biology", "Mathematics", "Chemistry", "Lunch", "Physics"],
  Saturday: ["Sports", "Assembly", "Optional Lab", "-", "-", "-"],
};

export const subjectColors = {
  Mathematics: "bg-violet-100 text-violet-800",
  Physics: "bg-blue-100 text-blue-800",
  Chemistry: "bg-emerald-100 text-emerald-800",
  Biology: "bg-green-100 text-green-800",
  English: "bg-amber-100 text-amber-800",
  Break: "bg-slate-100 text-slate-800",
  Lunch: "bg-orange-100 text-orange-800",
  Sports: "bg-pink-100 text-pink-800",
  Assembly: "bg-indigo-100 text-indigo-800",
  "Optional Lab": "bg-cyan-100 text-cyan-800",
};
