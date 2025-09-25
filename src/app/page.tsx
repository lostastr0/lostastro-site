"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOffsetAnchors } from "@/hooks/useOffsetAnchors";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import JourneyTimeline from "./components/JourneyTimeline";
import ProjectCard from "./components/ProjectCard";
import SkillTools from "./components/SkillTools";
import Loader from "./components/Loader";
import ExperienceEducation from "./components/ExperienceEducation";
import Footer from "./components/Footer";  // 🆕 NEW IMPORT!

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyDiscordUsername = async () => {
    try {
      await navigator.clipboard.writeText("lostastr0");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy username:', err);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-black text-blue-100 px-4 relative overflow-hidden">
      {/* Background Effects - Your Brand Colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-700/20 to-blue-800/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-gradient-to-l from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-3xl animate-pulse" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-blue-300/80 mb-4">
            Interested in <span className="text-orange-400">computer science</span>, <span className="text-blue-400">development</span>, or just want to chat about tech?
          </p>
          <p className="text-lg text-blue-200/70 mb-12">
            I&apos;m always open to discussing projects, learning opportunities, or technology topics!
          </p>
        </motion.div>

        {/* Contact Buttons - Your Brand Colors */}
        <motion.div 
          className="flex flex-wrap gap-8 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Discord Button */}
          <motion.div
            onClick={copyDiscordUsername}
            className="flex items-center gap-4 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#5865F2]/25 cursor-pointer border border-[#5865F2]/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold">@lostastr0</div>
              <div className="text-sm opacity-90">
                {copied ? "✅ Copied!" : "Click to copy • Add me on Discord"}
              </div>
            </div>
          </motion.div>

          {/* GitHub Button - Your Brand Colors */}
          <motion.a
            href="https://github.com/lostastr0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-600/80 to-blue-700/80 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 border border-blue-500/20 hover:border-blue-400/30"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold">GitHub</div>
              <div className="text-sm opacity-90">View my code & projects</div>
            </div>
          </motion.a>
        </motion.div>

        {/* Response Promise - Your Brand Colors */}
        <motion.div
          className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-blue-600/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="text-blue-200/90 text-sm mb-3">
            💡 <strong>Quick Response Promise:</strong> I typically respond on Discord within a few hours.
          </p>
          <p className="text-blue-300/70 text-sm">
            Whether you&apos;re a fellow student, someone learning computer science, or just want to discuss tech - feel free to reach out!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Page() {
  useOffsetAnchors();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader message="Launching..." />;

  return (
    <>
      <Nav />
      
      {/* Hero Section - Top of page */}
      <Hero />
      
      {/* About Section - Personal intro */}
      <AboutSection />
      
      {/* Experience & Education Section */}
      <section id="experience" className="scroll-mt-20">
        <ExperienceEducation />
      </section>
      
      {/* Journey Timeline Section */}
      <section id="journey" className="scroll-mt-20">
        <JourneyTimeline />
      </section>

      {/* Skills & Tools Section */}
      <section id="skills" className="scroll-mt-20">
        <SkillTools />
      </section>

      {/* Projects Section - Your Brand Colors */}
      <section id="projects" className="min-h-screen flex flex-col items-center bg-black text-blue-100 px-4 py-20 relative overflow-hidden scroll-mt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-700/10 to-blue-800/10 blur-3xl animate-pulse" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Projects
            </h2>
            <p className="text-blue-200/70 text-lg">
              Real-world applications and learning projects
            </p>
          </motion.div>
          <ProjectCard />
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* 🆕 FOOTER - Complete your portfolio! */}
      <Footer />
    </>
  );
}
