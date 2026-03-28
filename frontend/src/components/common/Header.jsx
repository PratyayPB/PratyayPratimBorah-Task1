import { useState } from "react";
import { Link } from "react-router-dom";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f8f9fa] sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}

        <Link to="/" className="cursor-pointer">
          <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#005bbf] font-[Manrope,sans-serif]">
            Joineazy
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="#"
            className="text-[#005bbf] font-semibold border-b-2 border-[#005bbf] text-sm py-1 font-[Inter,sans-serif] cursor-pointer"
          >
            Features
          </Link>
          <Link
            to="#"
            className="text-slate-600 hover:text-[#005bbf] text-sm py-1 transition-colors duration-200 font-[Inter,sans-serif] cursor-pointer"
          >
            Methodology
          </Link>
          <Link
            to="#"
            className="text-slate-600 hover:text-[#005bbf] text-sm py-1 transition-colors duration-200 font-[Inter,sans-serif] cursor-pointer"
          >
            About
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/signin" className="cursor-pointer">
            <button className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-[#005bbf] transition-all duration-300 font-[Inter,sans-serif]">
              Login
            </button>
          </Link>
          <Link to="/signup" className="cursor-pointer">
            <button className="px-6 py-2.5 bg-[#005bbf] text-white rounded-lg text-sm font-semibold shadow-md active:scale-[0.98] transition-all duration-200 font-[Inter,sans-serif]">
              Register
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col px-6 pb-4 space-y-3 bg-[#f8f9fa] border-t border-[#e7e8e9]">
          <Link
            to="#"
            className="text-[#005bbf] font-semibold text-sm py-2 font-[Inter,sans-serif] cursor-pointer"
          >
            Features
          </Link>
          <Link
            to="#"
            className="text-slate-600 text-sm py-2 font-[Inter,sans-serif] cursor-pointer"
          >
            Methodology
          </Link>
          <Link
            to="#"
            className="text-slate-600 text-sm py-2 font-[Inter,sans-serif] cursor-pointer"
          >
            About
          </Link>
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-2 text-sm text-slate-600 border border-[#e7e8e9] rounded-lg font-[Inter,sans-serif]">
              Login
            </button>
            <button className="flex-1 py-2 bg-[#005bbf] text-white rounded-lg text-sm font-semibold font-[Inter,sans-serif]">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
