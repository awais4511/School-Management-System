import { MdSchedule } from "react-icons/md";
import { DAYS, navItems, periods, timetable } from "../../mockdata/data";
import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import MiniCalendar from "../../components/MiniCalendar";
import PeriodTimeline from "../../components/PeriodTimeline";
import WeeklyGrid from "../../components/WeeklyGrid";
import DailyPeriodCard from "../../components/DailyPeriodCard";

export default function TimeTable() {
  const today = new Date();
  const [selected, setSelected] = useState(today);

  const rawDow = selected.getDay();
  const dayIdx = rawDow === 0 ? -1 : rawDow - 1;
  const isSchoolDay = dayIdx >= 0 && dayIdx <= 5;
  const dayPeriods = isSchoolDay ? timetable[dayIdx] || {} : {};

  return (
    <DashboardLayout role="Administrator" navItems={navItems}>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <MdSchedule className="text-blue-500" /> School Timetable
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">
          {selected.toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-1 flex flex-col gap-5">
          <MiniCalendar today={today} selected={selected} onSelect={setSelected} />
          <PeriodTimeline selectedDate={selected} />
        </div>

        <div className="xl:col-span-3 flex flex-col gap-5">
          <WeeklyGrid selectedDate={selected} timetable={timetable} />

          <div className="bg-white rounded-2xl shadow p-5">
            <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
              <MdSchedule className="text-rose-500 text-xl" />
              {isSchoolDay ? `${DAYS[dayIdx]} — Period Details` : "No School Today"}
            </h2>

            {!isSchoolDay && <p className="text-slate-400 text-sm">Select a Monday–Saturday to view periods.</p>}

            {isSchoolDay && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {periods.map((p) => (
                  <DailyPeriodCard key={p.id} period={p} cell={dayPeriods[periods.indexOf(p)]} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}