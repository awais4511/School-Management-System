import { MdAccessTime } from "react-icons/md";
import { periods } from "../mockdata/data";
import TimelineItem from "./TimelineItem";

function PeriodTimeline({ selectedDate }) {
  const now = new Date();
  const isToday = selectedDate.toDateString() === now.toDateString();
  const nowMinutes = isToday ? now.getHours() * 60 + now.getMinutes() : -1;

  const toMin = (t) => t.split(":").map(Number).reduce((h, m) => h * 60 + m, 0);

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
        <MdAccessTime className="text-blue-500 text-xl" /> Period Timeline
      </h2>
      <div className="flex flex-col gap-2">
        {periods.map((p) => {
          const startMin = toMin(p.start);
          const isActive = isToday && nowMinutes >= startMin && nowMinutes < toMin(p.end);
          return <TimelineItem key={p.id} period={p} isActive={isActive} />;
        })}
      </div>
    </div>
  );
}

export default PeriodTimeline;