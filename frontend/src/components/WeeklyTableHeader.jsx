import { SHORT_DAYS } from "../mockdata/data";

function WeeklyTableHeader({ weekDates }) {
  const today = new Date();
  return (
    <thead>
      <tr>
        <th className="w-20 pb-2 text-left text-slate-400 font-semibold uppercase tracking-wide pr-2">Period</th>
        {weekDates.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          return (
            <th key={i} className="pb-2 text-center px-1">
              <div className={`inline-flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl ${isToday ? "bg-blue-950 text-white" : "text-slate-500"}`}>
                <span className="font-semibold">{SHORT_DAYS[i]}</span>
                <span className={`text-[11px] ${isToday ? "text-blue-200" : "text-slate-400"}`}>
                  {d.getDate()}
                </span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default WeeklyTableHeader;