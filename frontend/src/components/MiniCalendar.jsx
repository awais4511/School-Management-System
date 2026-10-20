import { useState } from "react";
import { DAY_LABELS, MONTH_NAMES } from "../mockdata/data";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";

function MiniCalendar({ today, selected, onSelect }) {
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstDay = new Date(view.year, view.month, 1).getDay();
  const cells = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const prevMonth = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 });
  const nextMonth = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 });

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <CalendarHeader
        monthName={MONTH_NAMES[view.month]} 
        year={view.year} 
        onPrev={prevMonth} 
        onNext={nextMonth} 
      />

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          const isToday = day === today.getDate() && 
                         view.month === today.getMonth() && 
                         view.year === today.getFullYear();
          
          const isSelected = selected && 
                            day === selected.getDate() && 
                            view.month === selected.getMonth() && 
                            view.year === selected.getFullYear();

          return (
            <CalendarDay
              key={i}
              day={day}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => onSelect(new Date(view.year, view.month, day))}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MiniCalendar;