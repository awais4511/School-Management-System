import { periods, subjectColors } from "../mockdata/data";

function WeeklyTableRow({ period, weekDates, timetable }) {
  const periodIdx = periods.indexOf(period);

  return (
    <tr className="border-t border-slate-100">
      <td className="py-2 pr-2 align-top">
        <p className="font-bold text-slate-700">{period.label}</p>
        <p className="text-slate-400 font-mono text-[10px]">{period.start}–{period.end}</p>
      </td>
      {weekDates.map((_, di) => {
        const cell = timetable[di]?.[periodIdx];
        if (!cell) {
          return (
            <td key={di} className="py-2 px-1 align-top">
              <div className="rounded-lg bg-slate-50 border border-dashed border-slate-200 h-14 flex items-center justify-center text-slate-300 text-lg">—</div>
            </td>
          );
        }
        const colorClass = subjectColors[cell.subject] || "bg-slate-100 text-slate-700 border-slate-300";
        return (
          <td key={di} className="py-2 px-1 align-top">
            <div className={`rounded-lg border p-1.5 h-14 flex flex-col justify-between ${colorClass}`}>
              <p className="font-semibold leading-tight line-clamp-1">{cell.subject}</p>
              <div>
                <p className="text-[10px] opacity-70 truncate">{cell.teacher}</p>
                <p className="text-[10px] opacity-60">{cell.room}</p>
              </div>
            </div>
          </td>
        );
      })}
    </tr>
  );
}

export default WeeklyTableRow;