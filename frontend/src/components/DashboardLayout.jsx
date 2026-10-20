import { useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { ROLE_COLORS } from "../config/roleColors";

export const RoleColorContext = createContext(ROLE_COLORS.Administrator);
export const useRoleColors = () => useContext(RoleColorContext);

export default function DashboardLayout({ role, navItems, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const c = ROLE_COLORS[role] ?? ROLE_COLORS.Administrator;
  const RoleIcon = c.Icon;

  return (
    <RoleColorContext.Provider value={c}>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        {/* ── Sidebar ── */}
        <aside
          className={`${c.bg} flex flex-col transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-16"
          } min-h-screen shadow-2xl z-20 border-r border-white/10`}
        >
          {/* Brand / role header */}
          <div className="flex items-center gap-3 px-4 py-5 border-b border-white/20 bg-black/20 backdrop-blur-sm">
            <RoleIcon className="text-2xl text-white flex-shrink-0 drop-shadow-md" />
            {sidebarOpen && (
              <div>
                <p className="text-white font-bold text-sm leading-tight drop-shadow">Greenfield</p>
                <p className={`${c.text} text-xs font-medium drop-shadow-sm`}>{role} Portal</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ml-auto text-white/70 hover:text-white leading-none transition-colors hover:bg-white/10 p-1.5 rounded-lg"
            >
              {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 py-4 flex flex-col gap-1.5 px-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left
                    ${isActive
                      ? `${c.active} text-white shadow-lg`
                      : `text-white/70 ${c.hover} hover:text-white hover:bg-white/10`
                    }`}
                >
                  <span className="text-lg w-5 text-center flex-shrink-0 flex items-center justify-center">
                    {item.icon}
                  </span>
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-2 pb-4 border-t border-white/20 pt-3">
            <button
              onClick={() => navigate("/login")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 ${c.hover} transition-all w-full text-left`}
            >
              <FaSignOutAlt className="text-lg w-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="bg-white border-b-2 border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm backdrop-blur-sm">
            <div>
              <h1 className="text-slate-800 font-bold text-xl drop-shadow-sm">
                {navItems.find((n) => location.pathname === n.path)?.label || "Dashboard"}
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
                <FaBell className="text-slate-400 text-lg hover:text-slate-600 transition-colors" />
              </div>
              <div className="p-1 rounded-xl hover:bg-slate-100 transition-colors">
                <FaUserCircle className={`text-3xl ${c.text} drop-shadow`} />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </RoleColorContext.Provider>
  );
}
