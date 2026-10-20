import { MdClass } from "react-icons/md";
import { periods } from "../mockdata/data";
import WeeklyTableHeader from "./WeeklyTableHeader";
import WeeklyTableRow from "./WeeklyTableRow";

function WeeklyGrid({ selectedDate, timetable }) {
  const dow = selectedDate.getDay();
  const mondayOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(selectedDate);
  monday.setDate(monday.getDate() + mondayOffset);

  const weekDates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const classPeriods = periods.filter((p) => !p.isBreak);

  return (
    <div className="bg-white rounded-2xl shadow p-5 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
          <MdClass className="text-violet-500 text-xl" /> Weekly Timetable
        </h2>
        <span className="text-xs text-slate-400 font-medium">
          {monday.toLocaleDateString("en-PK", { month: "short", day: "numeric" })} –{" "}
          {weekDates[5].toLocaleDateString("en-PK", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>

      <table className="w-full text-xs border-collapse min-w-[640px]">
        <WeeklyTableHeader weekDates={weekDates} />
        <tbody>
          {classPeriods.map((p) => (
            <WeeklyTableRow
              key={p.id} 
              period={p} 
              weekDates={weekDates} 
              timetable={timetable} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyGrid;