"use client";
import { useState, useEffect } from "react";
import { FaLinkedinIn, FaGithub, FaArrowUp, FaBars, FaTimes } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["about", "experience", "projects", "technologies", "contact"];
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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:max-w-[1400px] rounded-2xl border border-neutral-800 backdrop-blur-sm bg-neutral-900/40 transition-all duration-500
          ${
            scrolled
              ? "shadow-lg hover:border-blue-500/30"
              : "shadow-sm"
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
                <span className="bg-linear-to-r from-blue-500 to-green-500 text-transparent bg-clip-text font-semibold transition-all duration-300 group-hover:brightness-125 group-hover:scale-[1.02] inline-block">
                  devSuvesh
                </span>

                {/* Blinking underscore */}
                <span className="absolute -right-3 text-green-400 animate-pulse">
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
                className="hover:text-white relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-0.5 after:bg-linear-to-r after:from-blue-500 after:to-green-500 after:transition-all after:duration-300 capitalize cursor-pointer"
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
                className="group relative p-px rounded-full bg-linear-to-tr from-blue-500/60 to-green-500/60 hover:from-blue-400 hover:to-green-400 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-center bg-neutral-800/60 backdrop-blur-sm rounded-full w-9 h-9 group-hover:bg-neutral-700/60 border border-neutral-700/50 group-hover:border-blue-500/30 transition-all">
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
          <div className="lg:hidden animate-slideDown flex flex-col items-center gap-5 py-6 bg-neutral-900/40 border-t border-neutral-800 text-white/90 text-sm rounded-b-2xl backdrop-blur-sm">
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
                  className="group relative p-px rounded-full bg-linear-to-tr from-blue-500/50 to-green-500/50 hover:from-blue-400 hover:to-green-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-center bg-neutral-800/60 backdrop-blur-sm rounded-full w-9 h-9 group-hover:bg-neutral-700/60 border border-neutral-700/50 group-hover:border-blue-500/30 transition-all">
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
        className="fixed z-40 bottom-6 right-6 sm:bottom-10 sm:right-10 p-0.5 rounded-full bg-gradient-to-r from-blue-500/90 to-green-500/90 hover:from-blue-400 hover:to-green-400 border-2 border-blue-400/60 hover:border-green-400/80 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all hover:scale-110 group cursor-pointer backdrop-blur-sm"
      >
        <div className="bg-neutral-900/40 backdrop-blur-sm rounded-full p-3 group-hover:bg-neutral-800/40 transition-all">
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
