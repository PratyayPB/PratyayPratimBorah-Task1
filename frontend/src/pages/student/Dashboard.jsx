import { useState } from "react";
import StudentDashboardLayout from "./StudentDashboardLayout";
// ── Avatar URLs ──────────────────────────────────────────────────────────────
const AVATARS = {
  crispr: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBWdLp7t6tZKYyIMwZFJwwcntTa3IUlDFTGBzz9cvGpmcmfPW2wjmPOIUExULHN8lu9OSi0mnQsjYGgfshd7NyNMgL5QQz5ye-NkJQ9vou2Yto-vp_IWRjhex8HXpbs3CPBqlF-cKtAuoDzxEHO613w2Bhmivx3c9_lAImOGlm_UGzkldKlyoMNLeTIwJoZG6PiLkm8s6ayHsaZjX2VWn5NwhpS3h7l2V9uvp_jvGH9nXWrjtkrSH9KqOqO1cJs_O8j1fbJRhRReXbK",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCzlOnuzUmP5V907pm8Xrgq1vORQDmmGxW-PzrFjcSViBMrWbBZeonvrTmCacTd_iwmnRBr1S8OvYTJ6ZeOAQ5V023aLZ3eC9VuwAuh5-wlIGnG3SwlGdGuq-yUxmRNiK1iCYW5fccCMjQ67gmqqzdXJHaZa_v5J_e9hd0oQweo187I0tktiwJMGa2-hHL_4-bv6-XIw_jRyIeNae2UrAgrGNd8L-TowaQekSIZk-duWCXBDJSGYXHOM-sjeeyKRWOjgA4JlHynGQrs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDi-zkBlJ1LYBqvRfhU0f9mAkP2G4NmxOq6XheJUAI5VaW3uflx1L2UJwtcz_5M--Snki7hzvkaQ1GOx6MWvPZR7rdBlmFENtPzNt25d9I16aiUXskKVupjyDi_bHJglclOQoK-LZs0JeFL0JajxpUVTqvtfLv8JnfGAVjQCV5be6Aalul2c00SHYngXzRaid8ut7GIZPk6FsKmat3O8SDxd3_ZQvAi32Eq7gwANgEoKd1x6scUBab-VHUWkST48EZzRF2PdxFNKzwL",
  ],
};
// reuse same set for other cards
const AV2 = AVATARS.crispr.slice(0, 2);
const AV3 = AVATARS.crispr;

// ── Icon helpers ─────────────────────────────────────────────────────────────
const BellIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);
const AddTaskIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10.01L22 5.18zm-2.21 5.04c.13.57.21 1.17.21 1.78 0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44A9.9 9.9 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-1.19-.22-2.33-.6-3.4l-1.61 1.62z" />
  </svg>
);

const PROFILE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Zajs6WPoj5eQ81hSOYLZzaGab_hKAl1u8KXuo0_1w31T4HPagL8yz6P8vGTI4dMeFS9kE9XLK3HBn1XqTJvazzhambm3cawbyXFqr3vYp0AVLJVuz3qXqxsfopB-7GuaHVw1dps_iOqyFN1npu0qCmoptuML25GwCtL--fUg2l4Mmcas7em7cbK5WTIvj17z9tjF8IU-ZM2UuiAVebuHFJck-yeG3nWXEZG2Zl-k8Anl0sRPXvhBjDm4JMWElRmplVZD7xc1yXMA";

// ── Status chip ───────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Submitted: { bg: "#16893a", text: "#fff", dot: "#fff" },
  Pending: { bg: "#dfe3e8", text: "#43474c", dot: "#f59e0b" },
  Overdue: { bg: "#ffdad6", text: "#93000a", dot: "#ba1a1a" },
};
function StatusChip({ status }) {
  const c = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
      style={{ background: c.bg, color: c.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: c.dot }}
      />
      {status}
    </span>
  );
}

// ── Assignment icon map ───────────────────────────────────────────────────────
const AssignIcon = ({ type }) => {
  const cls = "w-5 h-5 fill-current text-[#727785]";
  if (type === "draw")
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path d="M20.71 4.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
      </svg>
    );
  if (type === "voice")
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" />
      </svg>
    );
  if (type === "analytics")
    return (
      <svg className={cls} viewBox="0 0 24 24">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 24 24">
      <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
};

// ── Group card ────────────────────────────────────────────────────────────────
function GroupCard({
  tag,
  tagBg,
  iconBg,
  iconColor,
  icon,
  title,
  desc,
  avatars,
  extraCount,
  progress,
}) {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
      style={{
        boxShadow: "0 12px 32px -4px rgba(25,28,29,0.06)",
        border: "1px solid rgba(193,198,214,0.1)",
      }}
    >
      <div className="flex justify-between items-start">
        <div
          className="p-3 rounded-xl"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded"
          style={{
            background: tagBg ?? "#e7e8e9",
            color: "#414754",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {tag}
        </span>
      </div>
      <div>
        <h3
          className="text-base font-bold text-[#191c1d]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="text-xs text-[#5f6368] mt-1 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-1 -space-x-2">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-7 h-7 rounded-full border-2 border-white object-cover"
          />
        ))}
        {extraCount > 0 && (
          <span
            className="w-7 h-7 rounded-full border-2 border-white bg-[#e7e8e9] flex items-center justify-center text-[10px] font-bold text-[#414754]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            +{extraCount}
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        <div
          className="flex justify-between text-xs font-semibold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="text-[#191c1d]">Progress</span>
          <span style={{ color: "#005bbf" }}>{progress}%</span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "#e7e8e9" }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: "#005bbf" }}
          />
        </div>
      </div>
    </div>
  );
}

const GROUPS = [
  {
    tag: "Bio-Ethics Lab",
    tagBg: "#e8f5e9",
    iconBg: "rgba(0,109,42,0.08)",
    iconColor: "#006d2a",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.5 10h-2v7h2v-7zm5 0h-2v7h2v-7zm8.5 9H2v2h18v-2zm-3.5-9h-2v7h2v-7zM11 1L2 6v2h18V6l-9-5z" />
      </svg>
    ),
    title: "CRISPR Research",
    desc: "Analyzing ethical frameworks for genomic editing in modern pediatrics.",
    avatars: AV3,
    extraCount: 2,
    progress: 85,
  },
  {
    tag: "Architecture",
    tagBg: "#e3f2fd",
    iconBg: "rgba(0,91,191,0.08)",
    iconColor: "#005bbf",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" />
      </svg>
    ),
    title: "Urban Resilience",
    desc: "Redesigning coastal infrastructure to combat sea-level rising in Jakarta.",
    avatars: AV2,
    extraCount: 4,
    progress: 42,
  },
  {
    tag: "Humanities",
    tagBg: "#fce4ec",
    iconBg: "rgba(91,95,100,0.08)",
    iconColor: "#5b5f64",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
      </svg>
    ),
    title: "Digital Archives",
    desc: "Preserving oral histories from the 1950s using blockchain verification.",
    avatars: AV3,
    extraCount: 0,
    progress: 12,
  },
];

const ASSIGNMENTS = [
  {
    iconType: "doc",
    title: "Literature Review: CRISPR",
    sub: "Advanced Genomics 402",
    date: "Oct 24, 2023",
    status: "Submitted",
  },
  {
    iconType: "draw",
    title: "Infrastructure Blueprint V1",
    sub: "Urban Resilience Lab",
    date: "Nov 02, 2023",
    status: "Pending",
  },
  {
    iconType: "voice",
    title: "Oral History Metadata",
    sub: "Digital Humanities",
    date: "Oct 18, 2023",
    status: "Overdue",
  },
  {
    iconType: "analytics",
    title: "Quantitative Data Summary",
    sub: "Research Methods",
    date: "Nov 15, 2023",
    status: "Pending",
  },
];

export default function StudentDashboard() {
  const [notifCount] = useState(3);

  return (
    <StudentDashboardLayout>
      <div
        className="ml-20 mr-10 min-h-screen pb-24"
        style={{ background: "#f8f9fa" }}
      >
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex justify-between items-center px-8 lg:px-10 py-5"
          style={{
            background: "rgba(248,249,250,0.88)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <h1
              className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#191c1d]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Good morning, Jane Doe!
            </h1>
            <p
              className="text-sm text-[#5f6368] mt-0.5"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Here is what is happening with your scholarly projects today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-full transition-colors text-[#414754]"
              style={{ background: "#e7e8e9" }}
            >
              <BellIcon />
              {notifCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#005bbf] text-white text-[9px] font-bold flex items-center justify-center">
                  {notifCount}
                </span>
              )}
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#005bbf]/15">
              <img
                src={PROFILE}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <div className="px-8 lg:px-10 space-y-12">
          {/* Groups section */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2
                  className="text-2xl font-bold text-[#191c1d]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Your Groups
                </h2>
                <p
                  className="text-sm text-[#5f6368] mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Active collaborations and project teams.
                </p>
              </div>
              <button
                className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
                style={{
                  fontFamily: "Inter, sans-serif",
                  background: "linear-gradient(180deg,#005bbf,#1a73e8)",
                  boxShadow: "0 8px 24px -4px rgba(0,91,191,0.2)",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Create Group
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {GROUPS.map((g) => (
                <GroupCard key={g.title} {...g} />
              ))}
            </div>
          </section>

          {/* Assignments section */}
          <section>
            <div className="mb-6">
              <h2
                className="text-2xl font-bold text-[#191c1d]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Assignments
              </h2>
              <p
                className="text-sm text-[#5f6368] mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Upcoming deadlines and submission status.
              </p>
            </div>
            <div
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 12px 32px -4px rgba(25,28,29,0.06)",
                border: "1px solid rgba(193,198,214,0.08)",
              }}
            >
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: "#f3f4f5" }}>
                    {["Assignment Title", "Due Date", "Status"].map((h, i) => (
                      <th
                        key={h}
                        className="px-6 lg:px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-[#414754]"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          textAlign: i === 2 ? "right" : "left",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ASSIGNMENTS.map((a, i) => (
                    <tr
                      key={i}
                      className="transition-colors"
                      style={{ borderTop: "1px solid #e7e8e9" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(243,244,245,0.5)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td className="px-6 lg:px-8 py-5">
                        <div className="flex items-center gap-4">
                          <span className="flex-shrink-0">
                            <AssignIcon type={a.iconType} />
                          </span>
                          <div>
                            <p
                              className="text-sm font-bold text-[#191c1d]"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {a.title}
                            </p>
                            <p
                              className="text-[10px] text-[#5f6368] mt-0.5"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {a.sub}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 lg:px-8 py-5">
                        <span
                          className="text-sm font-medium text-[#414754]"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {a.date}
                        </span>
                      </td>
                      <td className="px-6 lg:px-8 py-5 text-right">
                        <StatusChip status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="px-8 py-5"
                style={{
                  background: "#f3f4f5",
                  borderTop: "1px solid #e7e8e9",
                }}
              >
                <button
                  className="block mx-auto text-sm font-bold text-[#005bbf] hover:underline"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  View All Assignments
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* FAB */}
        <button
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg,#005bbf,#1a73e8)",
            boxShadow: "0 12px 32px -4px rgba(0,91,191,0.35)",
          }}
        >
          <AddTaskIcon />
        </button>
      </div>
    </StudentDashboardLayout>
  );
}
