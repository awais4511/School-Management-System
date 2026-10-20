function CalendarDay({ day, isToday, isSelected, onClick }) {
  if (!day) return <div />;

  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 mx-auto text-xs font-medium rounded-full transition-all
        ${isSelected ? "bg-blue-950 text-white" : ""}
        ${isToday && !isSelected ? "bg-blue-100 text-blue-700 font-bold" : ""}
        ${!isSelected && !isToday ? "text-slate-700 hover:bg-slate-100" : ""}
      `}
    >
      {day}
    </button>
  );
}

export default CalendarDay;