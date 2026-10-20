import { subjectColors } from "../mockdata/data";


function DailyPeriodCard({ period, cell }) {
  if (period.isBreak) {
    return (
      <div className="rounded-xl bg-slate-50 border border-dashed border-slate-200 p-3 flex items-center gap-2">
        <span className="text-slate-300 text-lg">☕</span>
        <div>
          <p className="text-xs font-semibold text-slate-400">{period.label}</p>
          <p className="text-[11px] text-slate-300 font-mono">{period.start} – {period.end}</p>
        </div>
      </div>
    );
  }

  if (!cell) {
    return (
      <div className="rounded-xl bg-slate-50 border border-dashed border-slate-200 p-3">
        <p className="text-xs font-semibold text-slate-400">{period.label}</p>
        <p className="text-[11px] text-slate-300 font-mono">{period.start} – {period.end}</p>
        <p className="text-xs text-slate-300 mt-1">Free</p>
      </div>
    );
  }

  const colorClass = subjectColors[cell.subject] || "bg-slate-100 text-slate-700 border-slate-300";

  return (
    <div className={`rounded-xl border p-3 flex flex-col gap-1.5 ${colorClass}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold opacity-60 uppercase tracking-wide">{period.label}</span>
        <span className="text-[10px] font-mono opacity-50">{period.start}</span>
      </div>
      <p className="font-bold text-sm leading-tight">{cell.subject}</p>
      <p className="text-[11px] opacity-70">{cell.teacher}</p>
      <p className="text-[11px] opacity-60 font-mono">{cell.room} · {period.end}</p>
    </div>
  );
}


export default DailyPeriodCard;