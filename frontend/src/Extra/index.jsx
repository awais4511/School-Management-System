export function GetInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-xl border text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 bg-white transition-colors ${
          error
            ? "border-rose-300 focus:ring-rose-200"
            : "border-slate-200 focus:ring-blue-200"
        }`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

export function GetDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
export function GetFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay(); 
}