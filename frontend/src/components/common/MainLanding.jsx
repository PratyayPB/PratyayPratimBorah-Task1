import { Link } from "react-router-dom";

export default function Main() {
  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="relative pt-16 sm:pt-20 pb-24 sm:pb-32 overflow-hidden bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left copy */}
          <div className="space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#e7e8e9] rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#005bbf] animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-[#414754] font-[Inter,sans-serif]">
                v2.0 SCHOLARLY CURATOR
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold font-[Manrope,sans-serif] tracking-tight text-[#191c1d] leading-[1.08]">
              Joineazy
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-[#5f6368] max-w-lg leading-relaxed font-[Inter,sans-serif]">
              Empowering academic collaboration and effortless group management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/signup" className="cursor-pointer">
                <button className="px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-b from-[#005bbf] to-[#1a73e8] text-white rounded-lg font-semibold text-base sm:text-lg shadow-md active:scale-[0.98] transition-all font-[Inter,sans-serif]">
                  Get Started
                </button>
              </Link>
              <Link to="/signin" className="cursor-pointer">
                <button className="px-7 py-3.5 sm:px-8 sm:py-4 bg-[#e7e8e9] text-[#191c1d] rounded-lg font-semibold text-base sm:text-lg active:scale-[0.98] transition-all font-[Inter,sans-serif]">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuD5NxbKeuDM7cGdx-1-XT_Hf4xJvN2HRjo8pV6LAr1K2EyJM9QKyD45O8kpOjPWipGzUtLdBzp5usb7InIBDNGrtpksHQHpNc8LxnkpYm6URlPTAAuHF57jEEKJdKuHmFzB057w0WnGKpexZU4ZoyXYJEVfMz5VDPZeCRpVLJ1SvB-QhbdSiocXT5bfwqYhKh4-Ky76oQM_bJ_qPPnpwbbr1Wb6nEUynL9xRtgmdMx0QT6AEVJqY2rQHANEBOOS-WNr_hfGFBBpA9qQ",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXHk5FQs0ahETIyfX8IHz9iKQgEQ4G0Z3FJSjuZdRzY95kBzAheUy61yv_ErlhsBDXmS0bTKkzZtw7e3cglHfUxDdhtOdNlrLl9x41cliTVHfkLdLso4JPvJWz-mJcgbAwOuwyspuA4yUq9tu_0VJdD6MvMki4IFc1nAPpMcf3rxSmY7OStfvle_1gwqLKEuZJJNQTqKyJEj-Pkopm-pFi3TZvGYoL2vPJFOQbeAdB52dohPUGkODVnkdGn_8pqyIsnK5Yziemv69D",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIV7wsPuYXpayh6TedL6UWO34aVX7A0-xWseNjrdhDBtnuyDctTykVKOp8r5zqR50vBfBPyzYccyXPztpP1KPp5UrtIJp3iE_NJo72eUtfh_Xfx7xEKtSvQ5RH_fu90pxmixHthadJCqu_KE_UqN0xX5oujfJV4fRouFRkbUVjKfZiGBNKHln4A8T5_4T5Ils3LAnMp0FCvnZPGEiGeKU1eHP-lwxJpNTDW0d4ztpfC1IsBI2h0AV6JwV_I5WtnKqtDtPDnuvMwTuF",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#f8f9fa] bg-[#e1e3e4] overflow-hidden"
                  >
                    <img
                      src={src}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-[Inter,sans-serif] text-[#414754]">
                Trusted by{" "}
                <span className="font-bold text-[#191c1d]">2,400+</span>{" "}
                research groups globally
              </p>
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-[0_12px_32px_-4px_rgba(25,28,29,0.08)] p-4 sm:p-6 space-y-4 border border-[#e7e8e9]/60">
              {/* Window chrome */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#e1e3e4]" />
                  <div className="w-3 h-3 rounded-full bg-[#e1e3e4]" />
                </div>
              </div>

              {/* Skeleton rows */}
              {[
                { w: "60%", accent: true },
                { w: "45%", accent: false },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="h-4 rounded bg-[#e7e8e9] flex-1"
                    style={{ maxWidth: row.w }}
                  />
                  <div
                    className="h-4 rounded flex-shrink-0 w-24"
                    style={{ background: row.accent ? "#d8e2ff" : "#8ffa9b" }}
                  />
                </div>
              ))}

              {/* Progress block */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#005bbf]/10 flex items-center justify-center text-[#005bbf]">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M19 3H5a2 2 0 00-2 2v14l4-4h12a2 2 0 002-2V5a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 rounded bg-[#e7e8e9] w-3/4" />
                    <div className="h-1.5 rounded-full bg-[#e7e8e9] overflow-hidden">
                      <div className="h-full rounded-full bg-[#005bbf] w-[68%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-white shadow-[0_12px_32px_-4px_rgba(25,28,29,0.1)] p-3 rounded-xl border border-[#e7e8e9]/30 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#006d2a]/10 flex items-center justify-center text-[#006d2a]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold font-[Manrope,sans-serif] text-[#191c1d]">
                  Submission Received
                </p>
                <p className="text-[10px] text-[#414754] font-[Inter,sans-serif]">
                  Advanced Physics Group A
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Bento Grid ── */}
      <section className="py-16 sm:py-24 bg-[#f3f4f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold font-[Manrope,sans-serif] tracking-tight text-[#191c1d]">
              Elegance in Management
            </h2>
            <p className="text-[#5f6368] font-[Inter,sans-serif] text-sm sm:text-base leading-relaxed">
              A scholarly environment designed to strip away noise and focus on
              what matters most: academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                ),
                iconBg: "bg-[#005bbf]/5 text-[#005bbf]",
                title: "Centralized Assignments",
                desc: "Organize curriculums, deadlines, and resources in a unified editorial-style dashboard that prioritizes clarity over clutter.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                ),
                iconBg: "bg-[#006d2a]/5 text-[#006d2a]",
                title: "Seamless Group Collaboration",
                desc: "Real-time collaboration tools that facilitate peer-review, shared drafting, and effective team communication without leaving the platform.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                ),
                iconBg: "bg-[#1a73e8]/5 text-[#1a73e8]",
                title: "Insightful Analytics",
                desc: "Deep-dive performance tracking and activity insights that help instructors and students identify growth opportunities.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-[0_12px_32px_-4px_rgba(25,28,29,0.06)] flex flex-col gap-5 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center`}
                >
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold font-[Manrope,sans-serif] text-[#191c1d]">
                    {feature.title}
                  </h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed font-[Inter,sans-serif]">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase Section ── */}
      <section className="py-20 sm:py-32 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(25,28,29,0.08)] border border-[#e7e8e9]/40">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR9o7mCYmjX8rwQq4GcM9aVvHG8DhOFnjI6qpf6aFtJvsi6BfFNF_ndJ51T01-R1f7GxA3H7OMc3o2BjQr-eeZfbU1-VHXicHrBd26eF7nz8RNcVhH2JJX0fy9aiSeJvTaIY14I_bv0ofyJnv3Mi1h4o1f2icWl45HD43nKJYccZBxlU34_c_yEKcV2NBxa6cDWyx8mkN7_VkxdWVGMj91vwt_OaNGfzexbghKNv0eEkUAuRpDwzmXArF_jg_bUlluWftBdIDqtpAB"
                  alt="Modern workspace"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold font-[Manrope,sans-serif] leading-tight text-[#191c1d]">
                The Scholarly Curator Experience
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Intuitive Information Architecture",
                    desc: "Every data point is positioned with intentional asymmetry to reduce cognitive load.",
                  },
                  {
                    title: "Atmospheric Minimalism",
                    desc: "We use tonal shifts instead of rigid borders to create a breathable, digital vellum feel.",
                  },
                  {
                    title: "Premium Editorial Typography",
                    desc: "High-contrast font scaling treats student assignments with the prestige they deserve.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[#005bbf]/10 flex-shrink-0 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 fill-current text-[#005bbf]"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold font-[Manrope,sans-serif] text-[#191c1d]">
                        {item.title}
                      </p>
                      <p className="text-[#5f6368] text-sm font-[Inter,sans-serif] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 sm:py-24 bg-[#1a73e8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 sm:space-y-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[Manrope,sans-serif] leading-tight">
            Ready to transform your academic workflow?
          </h2>
          <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto font-[Inter,sans-serif] leading-relaxed">
            Join thousands of students and educators who have found their focus
            with Joineazy's curated editorial management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-[#005bbf] rounded-lg font-bold text-base sm:text-lg shadow-md hover:scale-105 transition-transform font-[Inter,sans-serif]">
              Register Your Group
            </button>
            <button className="px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-white rounded-lg font-bold text-base sm:text-lg hover:bg-white/10 transition-colors font-[Inter,sans-serif]">
              Explore Methodology
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
