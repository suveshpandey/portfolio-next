"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaLinkedinIn, FaGithub, FaArrowUp, FaBars, FaTimes } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "technologies", label: "Technologies" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/suvesh-pandey/", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/suveshpandey", label: "GitHub" },
  { icon: <BsTwitterX />, url: "https://x.com/suvesh_298", label: "X (Twitter)" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 border-b border-border backdrop-blur-md shadow-sm shadow-black/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
            >
              <span className="font-mono text-base sm:text-lg font-semibold tracking-tight">
                <span className="text-accent">$</span>
                <span className="text-foreground">devSuvesh</span>
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
                hidden: {},
              }}
              className="hidden lg:flex items-center gap-1"
            >
              {navItems.map(({ id, label }) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  variants={{
                    hidden: { opacity: 0, y: -8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors duration-200 relative"
                >
                  {label}
                </motion.button>
              ))}
            </motion.div>

            {/* Social Icons - Desktop */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.2 },
                },
                hidden: {},
              }}
              className="hidden sm:flex items-center gap-2"
            >
              {socials.map(({ icon, url, label }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-colors duration-200"
                  aria-label={label}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Mobile Menu Toggle */}
            <motion.button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.92 }}
              className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <span className="relative inline-flex w-5 h-5 items-center justify-center">
                <motion.span
                  animate={menuOpen ? { rotate: 90, opacity: 0 } : { rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FaBars size={20} />
                </motion.span>
                <motion.span
                  initial={false}
                  animate={menuOpen ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <FaTimes size={20} />
                </motion.span>
              </span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              className="lg:hidden overflow-hidden border-t border-border bg-background/98 backdrop-blur-md"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
                  },
                  hidden: {},
                }}
                className="mx-auto max-w-[1400px] px-4 py-4 space-y-0.5"
              >
                {navItems.map(({ id, label }, i) => (
                  <motion.button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors active:bg-muted/80"
                  >
                    {label}
                  </motion.button>
                ))}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex gap-2 pt-4 mt-2 border-t border-border"
                >
                  {socials.map(({ icon, url, label }, i) => (
                    <motion.a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                      aria-label={label}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Back to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed z-40 bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center justify-center w-12 h-12 rounded-full border border-border bg-background/90 hover:border-accent/50 hover:bg-accent/10 shadow-lg backdrop-blur-sm"
            aria-label="Back to top"
          >
            <FaArrowUp className="text-muted-foreground group-hover:text-accent text-lg transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
