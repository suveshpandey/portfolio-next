"use client";
import { CONTACT } from "@/lib";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Linkedin, Github, Twitter, Briefcase, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const openEmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`, '_blank');
  };

  return (
    <div id="contact" className="min-h-screen py-16 flex flex-col items-center justify-center px-4 sm:px-6">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col gap-y-4 items-center mb-12"
      >
        <h2 className="text-4xl font-bold text-center bg-linear-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <motion.div
          whileInView={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 1 }}
          className="w-60 h-1 rounded-full bg-linear-to-r from-green-400 via-slate-500 to-blue-500"
        />

        <p className="text-gray-400 text-lg text-center mt-4 max-w-2xl">
          Let's connect! I'm open to remote opportunities worldwide and excited to collaborate on innovative projects.
        </p>
      </motion.div>

      <div className="w-full">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {/* Phone - Copy to Clipboard */}
          <div 
            onClick={() => copyToClipboard(`+91 ${CONTACT.phoneNo}`, 'phone')}
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-500/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-xl bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors shrink-0">
              <Phone className="text-sky-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-gray-300 text-sm sm:text-lg font-medium truncate">
                +91 {CONTACT.phoneNo}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-sky-500/20 transition-colors shrink-0">
              {copiedField === 'phone' ? (
                <Check className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Copy className="text-sky-400 w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
          </div>

          {/* Email - Open Gmail */}
          <div 
            onClick={openEmail}
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-green-500/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 transition-colors shrink-0">
              <Mail className="text-green-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-gray-300 text-sm sm:text-lg font-medium group-hover:text-green-400 transition-colors truncate">
                {CONTACT.email}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-green-500/20 transition-colors shrink-0">
              <Mail className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          {/* LinkedIn - Redirect */}
          <a 
            href={CONTACT.linkedin || "https://linkedin.com/in/suvesh-pandey"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-600/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-xl bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors shrink-0">
              <Linkedin className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm">LinkedIn</p>
              <p className="text-gray-300 text-sm sm:text-lg font-medium group-hover:text-blue-400 transition-colors">
                Connect professionally
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-blue-600/20 transition-colors shrink-0">
              <Linkedin className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* GitHub - Redirect */}
          <a 
            href={CONTACT.github || "https://github.com/suveshpandey"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-gray-400/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-xl bg-gray-500/10 group-hover:bg-gray-500/20 transition-colors shrink-0">
              <Github className="text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm">GitHub</p>
              <p className="text-gray-300 text-sm sm:text-lg font-medium group-hover:text-white transition-colors">
                Check my projects
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-gray-500/20 transition-colors shrink-0">
              <Github className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* Twitter - Redirect */}
          <a 
            href={CONTACT.twitter || "https://twitter.com/suvesh_298"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-sky-400/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-xl bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors shrink-0">
              <Twitter className="text-sky-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm">Twitter</p>
              <p className="text-gray-300 text-sm sm:text-lg font-medium group-hover:text-sky-400 transition-colors">
                Follow for updates
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-sky-500/20 transition-colors shrink-0">
              <Twitter className="text-sky-400 w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* Location - Copy to Clipboard */}
          <div 
            onClick={() => copyToClipboard(CONTACT.location || "India", 'location')}
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors shrink-0">
              <MapPin className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-gray-300 text-sm sm:text-lg font-medium truncate">
                {CONTACT.location || "India"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-700/50 group-hover:bg-purple-500/20 transition-colors shrink-0">
              {copiedField === 'location' ? (
                <Check className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Copy className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
          </div>

          {/* Remote Work Availability - Info Only */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-linear-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 hover:border-green-300/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-default group md:col-span-2">
            <div className="p-2 sm:p-3 rounded-xl bg-green-500/20 group-hover:bg-green-500/30 transition-colors shrink-0">
              <Briefcase className="text-green-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-400 text-sm">Work Availability</p>
              <p className="text-gray-300 text-base sm:text-lg font-medium">
                Open to remote opportunities worldwide
              </p>
              <p className="text-green-400 text-xs sm:text-sm mt-1">
                ✓ Available for full-time remote positions
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {copiedField && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg backdrop-blur-sm text-sm sm:text-base mx-4"
        >
          {copiedField === 'phone' && 'Phone number copied to clipboard!'}
          {copiedField === 'location' && 'Location copied to clipboard!'}
        </motion.div>
      )}

      <div 
        className="mt-10"
      >
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="flex-col gap-y-2 items-center justify-center">
            <p className="text-sm text-center">Crafted with passion</p>
            <p className="text-sm text-center">© 2025 • Suvesh Pandey</p>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}