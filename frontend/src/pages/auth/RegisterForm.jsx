import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "../../lib/validationSchemas";
import { useAuthStore } from "../../store/authStore";

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full px-3 py-2.5 text-sm rounded-lg border bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all";
const inputCls  = `${inputBase} border-slate-200 focus:border-amber-400 focus:ring-amber-100`;
const inputErr  = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-100`;
const btnCls    =
  "w-full py-2.5 mt-1 rounded-lg text-sm font-bold bg-blue-950 text-white hover:bg-blue-900 active:scale-[0.985] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed";

export default function RegisterForm({ tab, role, ID_LABELS }) {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const { login, signup, isLoading, error, successMessage, clearMessages } =
    useAuthStore();

  const {
    register: regLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: regSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    clearMessages();
    resetLogin();
    resetSignup();
  }, [tab, role]); 

  const onLogin = async (data) => {
    const result = await login({ ...data, role });
    if (result.ok) setTimeout(() => navigate(result.redirect), 800);
  };

  const onSignup = async (data) => {
    const result = await signup({ ...data, role });
    if (result.ok) setTimeout(() => navigate(result.redirect), 800);
  };

  const banner = error
    ? { text: error, cls: "bg-red-50 border border-red-200 text-red-700" }
    : successMessage
    ? { text: successMessage, cls: "bg-green-50 border border-green-200 text-green-700" }
    : null;

  return (
    <>
      {banner && (
        <div className={`text-sm px-3 py-2.5 rounded-lg mb-4 ${banner.cls}`}>
          {banner.text}
        </div>
      )}

      {tab === "login" && (
        <form onSubmit={handleLoginSubmit(onLogin)} className="flex flex-col gap-3" noValidate>
          <div>
            <p className="text-base font-semibold text-slate-800">Welcome back</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Sign in as <span className="font-medium text-blue-800">{role}</span>
            </p>
          </div>

          <Field label="Email address" error={loginErrors.email?.message}>
            <input
              type="email"
              placeholder="you@school.edu"
              className={loginErrors.email ? inputErr : inputCls}
              {...regLogin("email")}
            />
          </Field>

          <Field label="Password" error={loginErrors.password?.message}>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className={`${loginErrors.password ? inputErr : inputCls} pr-10`}
                {...regLogin("password")}
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </Field>

          <div className="text-right -mt-1">
            <span className="text-xs text-amber-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          <button type="submit" className={btnCls} disabled={isLoading}>
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      )}

      {tab === "signup" && (
        <form onSubmit={handleSignupSubmit(onSignup)} className="flex flex-col gap-3" noValidate>
          <div>
            <p className="text-base font-semibold text-slate-800">Create account</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Register as <span className="font-medium text-blue-800">{role}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="First name" error={signupErrors.firstName?.message}>
              <input
                type="text"
                placeholder="Ali"
                className={signupErrors.firstName ? inputErr : inputCls}
                {...regSignup("firstName")}
              />
            </Field>
            <Field label="Last name" error={signupErrors.lastName?.message}>
              <input
                type="text"
                placeholder="Ahmed"
                className={signupErrors.lastName ? inputErr : inputCls}
                {...regSignup("lastName")}
              />
            </Field>
          </div>

          <Field label="Email address" error={signupErrors.email?.message}>
            <input
              type="email"
              placeholder="you@school.edu"
              className={signupErrors.email ? inputErr : inputCls}
              {...regSignup("email")}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Password" error={signupErrors.password?.message}>
              <input
                type="password"
                placeholder="Min 8 chars"
                className={signupErrors.password ? inputErr : inputCls}
                {...regSignup("password")}
              />
            </Field>
            <Field label="Confirm" error={signupErrors.confirmPassword?.message}>
              <input
                type="password"
                placeholder="Repeat"
                className={signupErrors.confirmPassword ? inputErr : inputCls}
                {...regSignup("confirmPassword")}
              />
            </Field>
          </div>

          {role !== "Parent / Guardian" && (
            <Field
              label={ID_LABELS[role]?.label || "ID Number"}
              error={signupErrors.idNumber?.message}
            >
              <input
                type="text"
                placeholder={ID_LABELS[role]?.placeholder}
                className={signupErrors.idNumber ? inputErr : inputCls}
                {...regSignup("idNumber")}
              />
            </Field>
          )}

          <button type="submit" className={btnCls} disabled={isLoading}>
            {isLoading ? "Creating account…" : "Create Account"}
          </button>
        </form>
      )}
    </>
  );
}