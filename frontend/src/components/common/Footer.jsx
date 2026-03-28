import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Terms of Service", to: "/terms" },
    { name: "Institutional Access", to: "/institutional-access" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <footer className="bg-[#f3f4f5] border-t border-[#e7e8e9]">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="text-center md:text-left">
          <div className="text-lg font-bold text-[#191c1d] font-[Manrope,sans-serif] mb-1">
            Joineazy
          </div>
          <p className="text-[#5f6368] text-sm font-[Inter,sans-serif]">
            © 2024 Joineazy Editorial Systems. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-[#5f6368] text-sm font-[Inter,sans-serif] hover:text-[#005bbf] underline underline-offset-2 transition-colors duration-200 cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
