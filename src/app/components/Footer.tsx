"use client";

import { motion } from "framer-motion";
import { LogoWithText } from "@/components/Logo";

// ✅ Add proper types for links
type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  isDiscord?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks: FooterSection[] = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#top" },
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Journey", href: "#journey" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Connect",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/lostastr0",
          external: true,
        },
        { label: "Discord", href: "#", external: false, isDiscord: true },
        { label: "LinkedIn", href: "#", external: true },
      ],
    },
    {
      title: "Learning",
      links: [
        { label: "Computer Science", href: "#skills" },
        { label: "Cybersecurity", href: "#journey" },
        { label: "Development", href: "#projects" },
        { label: "Ethical Hacking", href: "#experience" },
      ],
    },
  ];

  // ✅ Fix function with proper typing
  const handleNavClick = (href: string, isDiscord?: boolean) => {
    if (isDiscord) {
      navigator.clipboard.writeText("lostastr0");
      return;
    }

    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        // ✅ Fix offsetTop type error
        const offsetTop = href === "#top" ? 0 : (element as HTMLElement).offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-black via-gray-900/50 to-black border-t border-blue-500/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 h-32 w-32 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-700/10 to-blue-800/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-32 w-32 rounded-full bg-gradient-to-l from-blue-500/10 via-blue-600/10 to-blue-700/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-8">
        {/* Compact Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section - Smaller */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <LogoWithText size="sm" />
              </div>
              <p className="text-blue-200/70 text-xs leading-relaxed mb-4">
                Cybersecurity student in Brisbane, Australia, moving into computer science. Always learning, always growing.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-blue-300/60 text-xs">Available for opportunities</span>
              </div>

              {/* Spotify Music Widget with Header */}
              <div className="space-y-3">
                {/* Header Text */}
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400/80 text-xs font-medium">Soundtrack to this creation</span>
                </div>
                
                {/* Spotify Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gradient-to-r from-green-400/5 to-green-600/5 rounded-lg p-4 border border-green-500/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-blue-200 text-xs font-medium truncate">Late Night Vibes</p>
                        <p className="text-blue-300/60 text-xs truncate">Nostalgia • Vibes</p>
                      </div>
                    </div>
                    
                    <a 
                      href="https://open.spotify.com/playlist/55JbdGOfDKw0qHWprCnSVd?si=315982bb5d2f4417" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-full transition-colors font-medium flex items-center gap-1 flex-shrink-0"
                    >
                      <span>▶</span> Play
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links - Compact */}
          {footerLinks.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <h3 className="text-blue-300 font-medium text-sm mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {/* ✅ Fix conditional rendering with proper type checking */}
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-200/60 hover:text-blue-300 transition-colors duration-200 text-xs flex items-center gap-1 group"
                        >
                          <span>{link.label}</span>
                          <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <button
                          onClick={() => handleNavClick(link.href, link.isDiscord)}
                          className="text-blue-200/60 hover:text-blue-300 transition-colors duration-200 text-xs text-left group"
                        >
                          <span>{link.label}</span>
                          {/* ✅ Fix isDiscord property check */}
                          {link.isDiscord && (
                            <span className="text-xs text-blue-400/50 ml-1">@lostastr0</span>
                          )}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Compact Bottom Section */}
        <motion.div
          className="pt-6 border-t border-blue-600/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright with Music Credit */}
            <div className="text-blue-200/50 text-xs text-center md:text-left">
              © {currentYear} lostastr0. Built with passion, lots of coffee
            </div>

            {/* Tech Stack with "Built on" Label */}
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="text-blue-300/70 text-xs font-medium">Built on</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-600/15 rounded-full border border-blue-500/20">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-200 text-xs">Next.js</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-600/15 rounded-full border border-blue-500/20">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span className="text-blue-200 text-xs">TypeScript</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-600/15 rounded-full border border-blue-500/20">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-200 text-xs">Tailwind</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Back to Top */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/60 to-blue-700/60 hover:from-blue-600/80 hover:to-blue-700/80 text-white rounded-full transition-all duration-300 border border-blue-500/20 text-xs"
            >
              <svg className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Back to Top</span>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
