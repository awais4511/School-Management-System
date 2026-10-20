import { useState } from "react";
import Register from "./RegisterForm";

const ROLES = ["Administrator", "Teacher", "Student", "Parent / Guardian"];

const ID_LABELS = {
  Administrator: { label: "Admin ID", placeholder: "e.g. ADM-2024-001" },
  Teacher:       { label: "Staff ID", placeholder: "e.g. TCH-2024-042" },
  Student:       { label: "Enrollment No.", placeholder: "e.g. STU-2024-099" },
};

export default function SchoolAuth() {
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState("Administrator");

  const switchTab = (t) => setTab(t);
  const changeRole = (newRole) => setRole(newRole);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl">

        <div className="relative h-44 bg-blue-950 flex flex-col items-center justify-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=60"
            alt="School"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative flex flex-col items-center gap-2 z-10">
            <div className="w-14 h-14 rounded-full bg-amber-400 border-2 border-amber-200 flex items-center justify-center text-3xl shadow">
              🎓
            </div>
            <h1 className="text-white text-lg font-bold tracking-wide">Greenfield Academy</h1>
            <p className="text-blue-200 text-xs italic">School Management System</p>
          </div>
        </div>

        <div className="flex gap-1 px-5 pt-5">
          {ROLES.map(r => (
            <button
              key={r}
              onClick={() => changeRole(r)}
              className={`flex-1 text-xs py-1.5 rounded-full border transition-all font-medium
                ${role === r
                  ? "bg-blue-950 text-white border-blue-950"
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                }`}
            >
              {r === "Parent / Guardian" ? "Parent" : r}
            </button>
          ))}
        </div>

        <div className="flex mt-4 border-b border-slate-200 px-5">
          {["login", "signup"].map(t => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 pb-2.5 text-sm font-semibold border-b-2 transition-all
                ${tab === t
                  ? "border-amber-400 text-blue-950"
                  : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
            >
              {t === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <div className="px-6 py-5">
          <Register
            tab={tab}
            role={role}
            ID_LABELS={ID_LABELS}
          />
        </div>
      </div>
    </div>
  );
}