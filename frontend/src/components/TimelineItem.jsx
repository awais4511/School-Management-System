function TimelineItem({ period, isActive }) {
  if (period.isBreak) {
    return (
      <div className="flex items-center gap-3 py-1">
        <div className="w-16 text-right text-xs text-slate-400 font-mono">{period.start}</div>
        <div className="flex-1 border-t-2 border-dashed border-slate-200 relative">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-100 text-slate-400 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
            {period.label} · {period.end}
          </span>
        </div>
      </div>
    );
  }

  const toMin = (t) => t.split(":").map(Number).reduce((h, m) => h * 60 + m, 0);
  const duration = toMin(period.end) - toMin(period.start);

  return (
    <div className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${isActive ? "border-blue-400 bg-blue-50 shadow-sm" : "border-slate-100 hover:bg-slate-50"}`}>
      <div className="w-16 shrink-0 text-right">
        <p className="text-xs font-mono font-bold text-slate-700">{period.start}</p>
        <p className="text-xs font-mono text-slate-400">{period.end}</p>
      </div>

      <div className="flex flex-col items-center self-stretch shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full mt-1 ${isActive ? "bg-blue-500" : "bg-slate-300"}`} />
        <div className="flex-1 w-px bg-slate-200 my-1" />
      </div>

      <div>
        <p className={`text-xs font-semibold ${isActive ? "text-blue-700" : "text-slate-600"}`}>
          {period.label}
          {isActive && <span className="ml-2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">Now</span>}
        </p>
        <p className="text-[11px] text-slate-400">{duration} min</p>
      </div>
    </div>
  );
}

export default TimelineItem;