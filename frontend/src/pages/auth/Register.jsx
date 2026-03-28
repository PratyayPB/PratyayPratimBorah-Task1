import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage({ onNavigate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email address.";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    if (!form.role) e.role = "Please select a role.";
    if (!form.terms) e.terms = "You must agree to the Terms of Service.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      // Dummy backend URL - replace with your actual backend URL
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          agreeToTerms: form.terms,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Handle success response
      console.log("Registration successful:", response.data);
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Backend returned error response
        const backendError =
          error.response.data?.message || "Registration failed";
        setApiError(backendError);
        console.error("Registration error:", error.response.data);
      } else if (error.request) {
        // Request made but no response
        setApiError("No response from server. Please try again.");
        console.error("No response:", error.request);
      } else {
        // Error in request setup
        setApiError("An error occurred. Please try again.");
        console.error("Error:", error.message);
      }
    }
  };

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
          <Link to="/signin" className="cursor-pointer">
            <button
              onClick={() => onNavigate?.("signin")}
              className="mt-2 w-full py-3 rounded-lg text-white font-semibold text-sm font-[Inter,sans-serif] transition-all active:scale-95"
              style={{
                background: "linear-gradient(180deg,#005bbf 0%,#1a73e8 100%)",
              }}
            >
              Sign In Now
            </button>
          </Link>
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
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-[11px] font-semibold text-[#414754] uppercase tracking-wider font-[Inter,sans-serif]"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                className={`w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-[#191c1d] placeholder-[#727785]/50
                  outline-none transition-all font-[Inter,sans-serif]
                  focus:bg-white focus:ring-2 focus:ring-[#005bbf]/20 ${
                    errors.name ? "ring-2 ring-red-400/60" : ""
                  }`}
                style={{ border: "none" }}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-[Inter,sans-serif] mt-0.5">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-[11px] font-semibold text-[#414754] uppercase tracking-wider font-[Inter,sans-serif]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@university.edu"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
                className={`w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-[#191c1d] placeholder-[#727785]/50
                  outline-none transition-all font-[Inter,sans-serif]
                  focus:bg-white focus:ring-2 focus:ring-[#005bbf]/20 ${
                    errors.email ? "ring-2 ring-red-400/60" : ""
                  }`}
                style={{ border: "none" }}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-[Inter,sans-serif] mt-0.5">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-[#414754] uppercase tracking-wider font-[Inter,sans-serif]">
                Role
              </label>
              <div className="flex items-center space-x-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={(e) => {
                      setForm({ ...form, role: e.target.value });
                      setErrors({ ...errors, role: "" });
                    }}
                    className="w-4 h-4 text-[#005bbf] focus:ring-[#005bbf] cursor-pointer"
                  />
                  <span className="text-sm text-[#414754] font-[Inter,sans-serif]">
                    Student
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={form.role === "admin"}
                    onChange={(e) => {
                      setForm({ ...form, role: e.target.value });
                      setErrors({ ...errors, role: "" });
                    }}
                    className="w-4 h-4 text-[#005bbf] focus:ring-[#005bbf] cursor-pointer"
                  />
                  <span className="text-sm text-[#414754] font-[Inter,sans-serif]">
                    Admin
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="text-xs text-red-500 font-[Inter,sans-serif] mt-0.5">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Password grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-semibold text-[#414754] uppercase tracking-wider font-[Inter,sans-serif]"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  className={`w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-[#191c1d] placeholder-[#727785]/50
                    outline-none transition-all font-[Inter,sans-serif]
                    focus:bg-white focus:ring-2 focus:ring-[#005bbf]/20 ${
                      errors.password ? "ring-2 ring-red-400/60" : ""
                    }`}
                  style={{ border: "none" }}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 font-[Inter,sans-serif] mt-0.5">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirm_password"
                  className="block text-[11px] font-semibold text-[#414754] uppercase tracking-wider font-[Inter,sans-serif]"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => {
                    setForm({ ...form, confirmPassword: e.target.value });
                    setErrors({ ...errors, confirmPassword: "" });
                  }}
                  className={`w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-[#191c1d] placeholder-[#727785]/50
                    outline-none transition-all font-[Inter,sans-serif]
                    focus:bg-white focus:ring-2 focus:ring-[#005bbf]/20 ${
                      errors.confirmPassword ? "ring-2 ring-red-400/60" : ""
                    }`}
                  style={{ border: "none" }}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 font-[Inter,sans-serif] mt-0.5">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
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

            {/* API Error Display */}
            {apiError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-xs text-red-600 font-[Inter,sans-serif]">
                  {apiError}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-white font-semibold text-sm font-[Inter,sans-serif] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(180deg,#005bbf 0%,#1a73e8 100%)",
                boxShadow: "0 4px 16px rgba(0,91,191,0.25)",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Sign in link */}
          <div className="text-center mt-8">
            <p className="text-sm text-[#414754] font-[Inter,sans-serif]">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#005bbf] font-bold hover:underline ml-1"
              >
                <button
                  onClick={() => onNavigate?.("signin")}
                  className="text-[#005bbf] font-bold hover:underline ml-1"
                >
                  Sign in
                </button>
              </Link>
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
