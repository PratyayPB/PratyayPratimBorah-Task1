import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage({ onNavigate }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email address.";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    if (!form.terms) e.terms = "You must agree to the Terms of Service.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
  };

  const Field = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    extra,
  }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="block text-[11px] font-semibold text-[#414754] uppercase tracking-wider font-[Inter,sans-serif]"
        >
          {label}
        </label>
        {extra}
      </div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-[#191c1d] placeholder-[#727785]/50
          outline-none transition-all font-[Inter,sans-serif]
          focus:bg-white focus:ring-2 focus:ring-[#005bbf]/20 ${
            error ? "ring-2 ring-red-400/60" : ""
          }`}
        style={{ border: "none" }}
      />
      {error && (
        <p className="text-xs text-red-500 font-[Inter,sans-serif] mt-0.5">
          {error}
        </p>
      )}
    </div>
  );

  if (submitted) {
    return (
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-[480px] bg-white rounded-xl p-8 md:p-10 text-center space-y-4"
          style={{ boxShadow: "0 12px 32px -4px rgba(25,28,29,0.06)" }}
        >
          <div className="w-16 h-16 rounded-full bg-[#006d2a]/10 flex items-center justify-center mx-auto text-[#006d2a]">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold font-[Manrope,sans-serif] text-[#191c1d]">
            Account Created!
          </h2>
          <p className="text-sm text-[#5f6368] font-[Inter,sans-serif] leading-relaxed">
            Welcome to the scholarly community. Check your email to verify your
            account.
          </p>
          <button
            onClick={() => onNavigate?.("signin")}
            className="mt-2 w-full py-3 rounded-lg text-white font-semibold text-sm font-[Inter,sans-serif] transition-all active:scale-95"
            style={{
              background: "linear-gradient(180deg,#005bbf 0%,#1a73e8 100%)",
            }}
          >
            Sign In Now
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-10 sm:py-14 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-tl-[80px] bg-[#f3f4f5] opacity-60 -z-10"
        aria-hidden
      />
      <div
        className="absolute top-1/4 left-0 w-20 h-40 rounded-r-full bg-[#005bbf]/5 blur-2xl -z-10"
        aria-hidden
      />

      <div className="w-full max-w-[480px]">
        {/* Card */}
        <div
          className="bg-white rounded-xl p-7 sm:p-10"
          style={{ boxShadow: "0 12px 32px -4px rgba(25,28,29,0.06)" }}
        >
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <h1 className="font-[Manrope,sans-serif] text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1d] mb-2">
              Join the Scholars
            </h1>
            <p className="text-[#414754] font-[Inter,sans-serif] text-sm">
              Create your editorial management account to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Field
              id="full_name"
              label="Full Name"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={(e) => {
                setForm({ ...form, fullName: e.target.value });
                setErrors({ ...errors, fullName: "" });
              }}
              error={errors.fullName}
            />

            <Field
              id="email"
              label="Email Address"
              type="email"
              placeholder="name@university.edu"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
              error={errors.email}
            />

            {/* Password grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setErrors({ ...errors, password: "" });
                }}
                error={errors.password}
              />
              <Field
                id="confirm_password"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) => {
                  setForm({ ...form, confirmPassword: e.target.value });
                  setErrors({ ...errors, confirmPassword: "" });
                }}
                error={errors.confirmPassword}
              />
            </div>

            {/* TOS */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => {
                    setForm({ ...form, terms: e.target.checked });
                    setErrors({ ...errors, terms: "" });
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-[#c1c6d6] text-[#005bbf] focus:ring-[#005bbf] flex-shrink-0"
                />
                <span className="text-sm text-[#414754] leading-snug font-[Inter,sans-serif]">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-[#005bbf] hover:underline font-medium cursor-pointer"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-[#005bbf] hover:underline font-medium cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 font-[Inter,sans-serif] mt-1 ml-7">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg text-white font-semibold text-sm font-[Inter,sans-serif] hover:opacity-90 active:scale-[0.98] transition-all"
              style={{
                background: "linear-gradient(180deg,#005bbf 0%,#1a73e8 100%)",
                boxShadow: "0 4px 16px rgba(0,91,191,0.25)",
              }}
            >
              Create Account
            </button>
          </form>

          {/* Sign in link */}
          <div className="text-center mt-8">
            <p className="text-sm text-[#414754] font-[Inter,sans-serif]">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate?.("signin")}
                className="text-[#005bbf] font-bold hover:underline ml-1"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Subtle copyright */}
        <div className="mt-7 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em] font-[Inter,sans-serif]">
            © 2024 Joineazy Editorial Management
          </p>
        </div>
      </div>
    </main>
  );
}
