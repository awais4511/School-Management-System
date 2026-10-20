import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { announcement, navItems, ROLE_COLORS, ROLES } from "../../../src/mockdata/data";
import {
  MdCampaign,
  MdInbox,
} from "react-icons/md";


export default function Announcements() {
  const [activeRole, setActiveRole] = useState("all");

  const filtered =
    activeRole === "all"
      ? announcement
      : announcement.filter((a) => a.role === activeRole);

  const counts = {
    all:     announcement.length,
    student: announcement.filter((a) => a.role === "student").length,
    teacher: announcement.filter((a) => a.role === "teacher").length,
    parent:  announcement.filter((a) => a.role === "parent").length,
  };

  return (
    <DashboardLayout role="Administrator" navItems={navItems}>
      <div className="bg-white rounded-2xl shadow p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <MdCampaign className="text-blue-500 text-xl" />
            Announcements
          </h2>
          <button className="text-xs text-blue-600 hover:underline font-medium">
            + New Announcement
          </button>
        </div>

        {/* Role filter tabs */}
        <div className="flex gap-1 mb-5 bg-slate-100 rounded-xl p-1">
          {ROLES.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveRole(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                activeRole === key
                  ? "bg-white text-slate-800 shadow"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="text-sm" />
              {label}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeRole === key
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-300">
              <MdInbox className="text-5xl mb-2" />
              <p className="text-sm font-medium text-slate-400">No announcements</p>
              <p className="text-xs text-slate-300 mt-0.5">Nothing to show for this group.</p>
            </div>
          ) : (
            filtered.map((a) => {
              const rc = ROLE_COLORS[a.role];
              return (
                <div
                  key={a.id}
                  className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0 last:pb-0 first:pt-0 hover:bg-slate-50 transition-colors rounded-xl px-2 -mx-2"
                >
                  {/* Icon */}
                  <div className={`mt-0.5 w-9 h-9 rounded-lg ${rc.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <a.Icon className={`text-base ${rc.iconColor}`} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 leading-snug">
                      {a.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <p className="text-xs text-slate-400">{a.time}</p>
                      <span className="text-slate-200 text-xs">·</span>
                      <p className="text-xs text-slate-400">{a.author}</p>
                    </div>
                  </div>

                  {/* Role badge */}
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize flex-shrink-0 mt-0.5 ${rc.badge}`}>
                    {a.role}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}