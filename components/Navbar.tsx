"use client";
import { FaLinkedinIn, FaGithub, FaXTwitter, FaArrowUp } from "react-icons/fa6";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";

export default function Navbar() {
  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <nav className="w-full fixed z-50 top-3 left-0">
        <div className="sm:w-[80%] md:w-[90%] lg:w-[60%] mx-auto">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between sm:py-4 py-3 sm:px-6 px-4">
              <div className="flex items-center text-2xl">
                <MdChevronLeft className="text-white/70" />
                <h1 className="cursor-pointer bg-linear-to-r from-pink-200 to-violet-600 text-transparent bg-clip-text font-semibold">
                  devSuvesh
                </h1>
                <h1 className="ml-2 text-white/70">/</h1>
                <MdChevronRight className="text-white/70" />
              </div>
              <div className="flex items-center justify-between gap-5 text-2xl">
                <FaLinkedinIn
                  onClick={() => handleIconClick("https://www.linkedin.com/in/suvesh-pandey/")}
                  className="cursor-pointer hover:text-blue-400 transition-all duration-300 text-white/80 hover:scale-110"
                />
                <FaGithub
                  onClick={() => handleIconClick("https://github.com/suveshpandey")}
                  className="cursor-pointer hover:text-gray-300 transition-all duration-300 text-white/80 hover:scale-110"
                />
                <FaXTwitter
                  onClick={() => handleIconClick("https://x.com/suvesh_298")}
                  className="cursor-pointer hover:text-white transition-all duration-300 text-white/80 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed z-50 bottom-6 sm:bottom-15 right-6 sm:right-15 p-0.5 rounded-full bg-linear-to-r from-pink-400 to-violet-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group cursor-pointer"
        aria-label="Back to top"
      >
        <div className="backdrop-blur-lg bg-slate-900/90 rounded-full p-3 group-hover:bg-slate-900/80 transition-all duration-300">
          <FaArrowUp className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
        </div>
      </button>
    </>
  );
}