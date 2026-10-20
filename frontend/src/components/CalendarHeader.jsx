import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function CalendarHeader({ monthName, year, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <button onClick={onPrev} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
        <MdChevronLeft className="text-lg" />
      </button>
      <span className="font-bold text-slate-800 text-sm">
        {monthName} {year}
      </span>
      <button onClick={onNext} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
        <MdChevronRight className="text-lg" />
      </button>
    </div>
  );
}

export default CalendarHeader;