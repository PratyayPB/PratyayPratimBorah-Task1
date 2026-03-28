import { Link, useNavigate } from "react-router-dom";

// ── Icons (inline SVG, no external deps) ─────────────────────────────────────
const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M3 3h8v8H3zm0 10h8v8H3zm10-10h8v8h-8zm0 10h8v8h-8z" />
    </svg>
  ),
  groups: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  assignment: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  ),
  task_alt: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10.01L22 5.18zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44A9.9 9.9 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.4l-1.61 1.62z" />
    </svg>
  ),
  help: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
    </svg>
  ),
};

const NAV = [
  { key: "dashboard", label: "Dashboard" },

  { key: "assignment", label: "Assignments" },
  { key: "task_alt", label: "Submissions" },
];

/**
 * Sidebar
 * Props:
 *   activePage  — "student" | "admin"
 *   onSwitch    — fn(page) to navigate between dashboards
 */

//student= dynamic user id
const ROUTES = {
  dashboard: "/admin",
  submission: "/admin/submissions",
  assignment: "/admin/assignments",
};

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Client-side cleanup
    localStorage.clear();
    sessionStorage.clear();
    // If you have a custom token storage, clear that too
    // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

    navigate("/");
  };

  return (
    <aside
      className="h-screen w-60 fixed left-0 top-0 z-40 flex flex-col p-4"
      style={{ background: "#f3f4f5" }}
    >
      {/* Brand */}
      <div className="px-3 pt-5 pb-7">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
            style={{ background: "linear-gradient(135deg,#005bbf,#1a73e8)" }}
          >
            {icons.book}
          </div>
          <div>
            <p
              className="text-base font-extrabold leading-tight text-[#005bbf]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Editorial Lab
            </p>
            <p
              className="text-[10px] font-semibold text-[#414754] uppercase tracking-widest opacity-70"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Academic Management
            </p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-0.5">
        {NAV.map(({ key, label }) => (
          <Link
            key={key}
            to={ROUTES[key] || "/"}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#5f6368",
            }}
          >
            <span style={{ color: "#727785" }}>{icons[key]}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#e7e8e9] pt-3 space-y-0.5">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors"
          style={{ fontFamily: "Inter, sans-serif", color: "#5f6368" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e7e8e9")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span>{icons.help}</span>
          Help
        </a>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors"
          style={{ fontFamily: "Inter, sans-serif", color: "#5f6368" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e7e8e9")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span>{icons.logout}</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
