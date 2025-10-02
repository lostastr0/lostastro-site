"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyDiscordUsername = async () => {
    try {
      await navigator.clipboard.writeText("lostastr0");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy username:", err);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-black text-blue-100 px-4 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-700/20 to-blue-800/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-gradient-to-l from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-blue-300/80 mb-4 max-w-3xl mx-auto">
            Interested in <span className="text-blue-400">computer science</span>,{" "}
            <span className="text-blue-400">cybersecurity</span>, or want to chat about tech?
          </p>
          <p className="text-lg text-blue-200/70 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing projects, learning opportunities, or technology topics!
          </p>
        </motion.div>

        {/* What I'm Looking For */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/20 text-center">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-white mb-2">Mentorship</h3>
            <p className="text-blue-200/70 text-sm">Seeking guidance from experienced professionals in cybersecurity and CS</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/20 text-center">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-white mb-2">Study Partners</h3>
            <p className="text-blue-200/70 text-sm">Connect with fellow cybersecurity students and CS learners</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/20 text-center">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Collaboration</h3>
            <p className="text-blue-200/70 text-sm">Open to beginner-friendly projects and learning together</p>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Discord - Primary */}
          <motion.div
            onClick={copyDiscordUsername}
            className="flex items-center gap-4 px-8 py-6 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer border border-[#5865F2]/20 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 rounded-full text-xs">
              Best Response
            </div>
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            <div className="text-left flex-grow">
              <div className="font-semibold text-lg">@lostastr0</div>
              <div className="text-sm opacity-90">
                {copied ? "✅ Copied!" : "Click to copy • Add me on Discord"}
              </div>
              <div className="text-xs opacity-75 mt-1">Usually respond within a few hours</div>
            </div>
          </motion.div>

          {/* GitHub */}
          <motion.a
            href="https://github.com/lostastr0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/30"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <div className="text-left flex-grow">
              <div className="font-semibold text-lg">GitHub</div>
              <div className="text-sm opacity-90">View my code & projects</div>
              <div className="text-xs opacity-75 mt-1">Check out my learning progress</div>
            </div>
          </motion.a>
        </motion.div>

        {/* Response Promise */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-blue-200/80 text-sm">
            Whether you're a fellow student, industry professional, or just curious about tech – I'd love to connect!
          </p>
        </motion.div>
      </div>
    </section>
  );
}