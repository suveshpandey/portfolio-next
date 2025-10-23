"use client";
import { useState, useEffect } from "react";
import { FaLinkedinIn, FaGithub, FaArrowUp, FaBars, FaTimes } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["about", "projects", "technologies", "contact"];
  const socials = [
    { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/suvesh-pandey/" },
    { icon: <FaGithub />, url: "https://github.com/suveshpandey" },
    { icon: <BsTwitterX />, url: "https://x.com/suvesh_298" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[80%] lg:w-[60%] rounded-2xl border transition-all duration-500
          ${
            scrolled
              ? "backdrop-blur-xl bg-black/30 border-white/10 shadow-lg"
              : "backdrop-blur-md bg-black/20 border-white/10 shadow-sm"
          }`}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:py-4">
          {/* Logo */}
          <div
            onClick={scrollToTop}
            className="flex items-center cursor-pointer select-none group"
          >
            <h1 className="font-mono text-lg sm:text-xl text-white/80 group-hover:text-white transition-all duration-300 flex items-center gap-1">
              <span className="text-green-400 group-hover:text-green-300 transition-colors duration-300">$</span>

              <span className="relative">
                <span className="bg-linear-to-r from-pink-300 via-fuchsia-400 to-violet-500 text-transparent bg-clip-text font-semibold transition-all duration-300 group-hover:brightness-125 group-hover:scale-[1.02] inline-block">
                  devSuvesh
                </span>

                {/* Blinking underscore */}
                <span className="absolute -right-3 text-fuchsia-500 animate-pulse">
                  _
                </span>
              </span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 text-sm text-white/80 font-medium">
            {navItems.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="hover:text-white relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-linear-to-r from-pink-400 to-violet-500 after:transition-all after:duration-300 capitalize cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden sm:flex gap-3">
            {socials.map(({ icon, url }, i) => (
              <span
                key={i}
                onClick={() => window.open(url, "_blank")}
                className="group relative p-px rounded-full bg-linear-to-tr from-pink-500/60 to-violet-600/60 hover:from-pink-400 hover:to-violet-500 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-center bg-black/80 backdrop-blur-md rounded-full w-9 h-9 group-hover:bg-black/60">
                  <span className="text-white/80 text-lg group-hover:scale-110 group-hover:text-white transition-transform duration-300">
                    {icon}
                  </span>
                </div>
              </span>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white/80 hover:text-white transition-colors"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="lg:hidden animate-slideDown flex flex-col items-center gap-5 py-6 bg-black/70 border-t border-white/10 text-white/90 text-sm rounded-b-2xl backdrop-blur-sm">
            {navItems.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="capitalize hover:text-white tracking-wide"
              >
                {id}
              </button>
            ))}
            <div className="flex gap-5 mt-2">
              {socials.map(({ icon, url }, i) => (
                <span
                  key={i}
                  onClick={() => window.open(url, "_blank")}
                  className="group relative p-px rounded-full bg-linear-to-tr from-pink-500/50 to-violet-500/50 hover:from-pink-400 hover:to-violet-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-center bg-black/70 rounded-full w-9 h-9 group-hover:bg-black/50">
                    <span className="text-white/80 text-lg group-hover:scale-110 group-hover:text-white transition-transform duration-300">
                      {icon}
                    </span>
                  </div>
                </span>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed z-40 bottom-6 right-6 sm:bottom-10 sm:right-10 p-0.5 rounded-full bg-linear-to-r from-pink-500 to-violet-600 shadow-md hover:shadow-lg transition-all hover:scale-110 group cursor-pointer"
      >
        <div className="backdrop-blur-md bg-slate-900/90 rounded-full p-3 group-hover:bg-slate-900/80 transition-all">
          <FaArrowUp className="text-white text-xl group-hover:scale-110 transition-transform" />
        </div>
      </button>

      {/* Slide Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
