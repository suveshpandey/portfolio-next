"use client";
import { CONTACT } from "@/lib";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="py-16 flex flex-col items-center justify-center px-4 sm:px-0">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-4"
      >
        Get In Touch
      </motion.h2>

      <motion.div
        whileInView={{ scaleX: 1 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 1 }}
        className="w-60 h-1 mx-auto rounded-full bg-gradient-to-r from-green-400 via-slate-500 to-blue-500 mb-8"
      />

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 1 }}
        className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-500/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-default">
          <Phone className="text-sky-400 w-6 h-6" />
          <p className="text-gray-300 text-lg">
            <span className="mr-2 text-gray-400">+91</span>
            {CONTACT.phoneNo}
          </p>
        </div>

        <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-500/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
          <Mail className="text-green-400 w-6 h-6" />
          <a href={`mailto:${CONTACT.email}`} className="text-lg text-gray-300 hover:text-green-400 transition-colors">
            {CONTACT.email}
          </a>
        </div>
      </motion.div>

      <p className="text-center mt-10 text-gray-500 text-sm">© 2025 | Suvesh Pandey</p>
    </div>
  );
}
