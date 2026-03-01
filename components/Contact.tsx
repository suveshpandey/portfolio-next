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
    <div id="contact" className="section-wrapper w-full pt-24 sm:pt-32 pb-24 px-4 sm:px-6">
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="section-heading"
      >
        <h2 className="section-title">Get In Touch</h2>
        <motion.div
          whileInView={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left center" }}
          className="section-divider"
        />
        <p className="section-subtitle">
          I'm open to remote opportunities worldwide and excited to collaborate on innovative projects.
        </p>
      </motion.div>

      <div className="w-full">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {/* Phone - Copy to Clipboard */}
          <div 
            onClick={() => copyToClipboard(`+91 ${CONTACT.phoneNo}`, 'phone')}
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl section-card transition-all duration-200 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-accent/10 shrink-0">
              <Phone className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="text-foreground text-sm sm:text-lg font-medium truncate">
                +91 {CONTACT.phoneNo}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted shrink-0">
              {copiedField === 'phone' ? (
                <Check className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Copy className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
          </div>

          {/* Email - Open Gmail */}
          <div 
            onClick={openEmail}
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl section-card transition-all duration-200 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-accent/10 shrink-0">
              <Mail className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="text-foreground text-sm sm:text-lg font-medium hover:opacity-80 transition-opacity truncate">
                {CONTACT.email}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted shrink-0">
              <Mail className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          {/* LinkedIn - Redirect */}
          <a 
            href={CONTACT.linkedin || "https://linkedin.com/in/suvesh-pandey"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl section-card transition-all duration-200 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-accent/10 shrink-0">
              <Linkedin className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">LinkedIn</p>
              <p className="text-foreground text-sm sm:text-lg font-medium hover:opacity-80 transition-opacity">
                Connect professionally
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted shrink-0">
              <Linkedin className="text-foreground w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* GitHub - Redirect */}
          <a 
            href={CONTACT.github || "https://github.com/suveshpandey"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl section-card transition-all duration-200 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-accent/10 shrink-0">
              <Github className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">GitHub</p>
              <p className="text-foreground text-sm sm:text-lg font-medium hover:opacity-80 transition-opacity">
                Check my projects
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted shrink-0">
              <Github className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* Twitter - Redirect */}
          <a 
            href={CONTACT.twitter || "https://twitter.com/suvesh_298"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl section-card transition-all duration-200 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-accent/10 shrink-0">
              <Twitter className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">Twitter ( X )</p>
              <p className="text-foreground text-sm sm:text-lg font-medium hover:opacity-80 transition-opacity">
                Follow for updates
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted shrink-0">
              <Twitter className="text-foreground w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </a>

          {/* Location - Copy to Clipboard */}
          <div 
            onClick={() => copyToClipboard(CONTACT.location || "India", 'location')}
            className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl section-card transition-all duration-200 cursor-pointer group"
          >
            <div className="p-2 sm:p-3 rounded-lg bg-accent/10 shrink-0">
              <MapPin className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">Location</p>
              <p className="text-foreground text-sm sm:text-lg font-medium truncate">
                {CONTACT.location || "India"}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted shrink-0">
              {copiedField === 'location' ? (
                <Check className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Copy className="text-accent w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
          </div>

          {/* Remote Work Availability - Info Only */}
          <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl bg-accent/5 border border-accent/20 cursor-default group md:col-span-2">
            <div className="p-2 sm:p-3 rounded-lg bg-accent/10 shrink-0">
              <Briefcase className="text-accent w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-sm">Work Availability</p>
              <p className="text-foreground text-base sm:text-lg font-medium">
                Open to remote opportunities worldwide
              </p>
              <p className="text-accent text-xs sm:text-sm mt-1 font-medium">
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
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg text-sm sm:text-base mx-4 font-medium"
        >
          {copiedField === 'phone' && 'Phone number copied to clipboard!'}
          {copiedField === 'location' && 'Location copied to clipboard!'}
        </motion.div>
      )}

      <div className="mt-12 w-full flex justify-center">
        <div className="flex gap-1.5 mt-3">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>  
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
          <p className="text-sm">Crafted with passion</p>
          <p className="text-sm mt-0.5">© 2026 • Suvesh Pandey</p>
        </div>
        <div className="flex gap-1.5 mt-3">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}