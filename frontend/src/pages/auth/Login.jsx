import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignInPage({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    // Simulate sign-in success → navigate home
    onNavigate?.("home");
  };

  const inputBase = (hasError) =>
    `w-full px-4 py-3 bg-[#f3f4f5] rounded-lg text-sm text-[#191c1d] placeholder-[#727785]/50 outline-none transition-all font-[Inter,sans-serif] focus:bg-white focus:ring-2 focus:ring-[#005bbf]/20 ${
      hasError ? "ring-2 ring-red-400/60" : ""
    }`;

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px]">
        {/* Card */}
        <div
          className="bg-white rounded-xl p-8 sm:p-10"
          style={{ boxShadow: "0 12px 32px -4px rgba(25,28,29,0.06)" }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-[Manrope,sans-serif] text-2xl font-bold text-[#191c1d] tracking-tight mb-2">
              Sign In to Joineazy
            </h1>
            <p className="text-sm text-[#414754] font-[Inter,sans-serif]">
              Welcome back to your editorial dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
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
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" });
                }}
                className={inputBase(errors.email)}
                style={{ border: "none" }}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-[Inter,sans-serif]">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-[11px] font-semibold text-[#414754] uppercase tracking-wider font-[Inter,sans-serif]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#005bbf] hover:text-[#1a73e8] transition-colors font-[Inter,sans-serif] cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" });
                  }}
                  className={inputBase(errors.password) + " pr-11"}
                  style={{ border: "none" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#414754] hover:text-[#005bbf] transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-[Inter,sans-serif]">
                  {errors.password}
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
              Sign In
            </button>
          </form>

          {/* Register link */}
          <div className="text-center mt-8">
            <p className="text-sm text-[#414754] font-[Inter,sans-serif]">
              New to Joineazy?{" "}
              <button
                onClick={() => onNavigate?.("register")}
                className="text-[#005bbf] font-bold hover:underline ml-1"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-7 text-center px-4">
          <p className="text-[10px] text-[#414754]/60 leading-relaxed max-w-xs mx-auto font-[Inter,sans-serif]">
            By signing in, you agree to our Editorial Guidelines and Data
            Protection Policy. Joineazy ensures scholarly integrity through
            advanced encryption.
          </p>
        </div>
      </div>
    </main>
  );
}
