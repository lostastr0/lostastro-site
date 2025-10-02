"use client";

import { motion } from "framer-motion";

export default function ExperienceEducation() {
  return (
    <section id="experience" className="min-h-screen flex flex-col items-center justify-center bg-black text-sky-200 px-4 py-20">
      <div className="mx-auto max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Learning & Background
          </h2>
          <p className="text-xl text-sky-300/80 max-w-3xl mx-auto">
            Building my path to <span className="text-cyan-400">Computer Science</span> through hands-on learning and <span className="text-blue-400">strategic education</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ✅ REVERTED: Back to "Current Learning Focus" */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-green-400">📚</span>
              Current Learning Focus
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 mt-2 animate-pulse"></div>
                <div>
                  <h4 className="text-blue-300 font-semibold">Programming Foundations</h4>
                  <p className="text-gray-300 text-sm mb-2">Learning Python basics, problem-solving logic, and coding fundamentals</p>
                  {/* ✅ REMOVED: Only the progress bar */}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 animate-pulse"></div>
                <div>
                  <h4 className="text-cyan-300 font-semibold">Web Development Basics</h4>
                  <p className="text-gray-300 text-sm mb-2">HTML, CSS fundamentals and exploring modern frameworks like React</p>
                  {/* ✅ REMOVED: Only the progress bar */}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-2 animate-pulse"></div>
                <div>
                  <h4 className="text-purple-300 font-semibold">Cybersecurity Preparation</h4>
                  <p className="text-gray-300 text-sm mb-2">Researching security concepts, preparing for Cert IV starting Oct 2025</p>
                  {/* ✅ REMOVED: Only the progress bar */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* My Learning Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-blue-400">⚡</span>
              My Learning Philosophy
            </h3>
            
            <div className="space-y-4 text-gray-300">
              {/* Featured Quote */}
              <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-xl p-6 border border-cyan-400/30 mb-6">
                <p className="text-cyan-200 font-semibold italic text-lg text-center">
                  "Every problem is just a puzzle waiting for the right algorithm."
                </p>
              </div>
              
              <p className="leading-relaxed">
                I'm driven by curiosity and the belief that technology shapes our future. My approach? Start exploring, stay curious, and never stop learning.
              </p>
              
              <p className="leading-relaxed">
                Starting with <span className="text-purple-400 font-medium">cybersecurity</span> gives me a unique foundation - understanding how systems can break teaches you how to build them stronger. But my ultimate destination is <span className="text-cyan-400 font-medium">Computer Science</span> where I can explore everything from AI to web development.
              </p>
              
              <p className="leading-relaxed">
                Every day brings new concepts to discover, new challenges to understand, and new possibilities to explore. I'm just getting started, but that's what makes this journey exciting.
              </p>

              <div className="pt-4 border-t border-gray-700/50">
                <h4 className="text-white font-semibold mb-3">How I Learn</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Build simple projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Practise daily coding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Research concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    <span>Stay endlessly curious</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Updated Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">The Roadmap Ahead</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl">🛡️</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">1</span>
                </div>
              </div>
              <h4 className="text-purple-300 font-semibold mb-2">Phase 1: Foundation</h4>
              <p className="text-gray-400 text-sm">Cert IV Cybersecurity (Oct 2025-Oct 2026) - Learning security principles & tech fundamentals</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl">🎓</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">2</span>
                </div>
              </div>
              <h4 className="text-cyan-300 font-semibold mb-2">Phase 2: Deep Dive</h4>
              <p className="text-gray-400 text-sm">Bachelor of Computer Science (2027-2030) - Mastering algorithms, systems & software engineering</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl">🚀</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">3</span>
                </div>
              </div>
              <h4 className="text-green-300 font-semibold mb-2">Phase 3: Impact</h4>
              <p className="text-gray-400 text-sm">Software engineering career - Building innovative solutions and contributing to technology</p>
            </div>
          </div>
        </motion.div>

        {/* ✅ REVERTED: Back to "Learning Evidence" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">Learning Evidence</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐍</span>
              </div>
              <h4 className="text-blue-300 font-semibold mb-2">Python Learning</h4>
              <p className="text-gray-400 text-sm">Starting with fundamentals - each concept builds towards bigger projects</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="text-cyan-300 font-semibold mb-2">This Portfolio Site</h4>
              <p className="text-gray-400 text-sm">Built whilst learning web technologies - my first real project and learning playground</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-purple-300 font-semibold mb-2">Daily Progress</h4>
              <p className="text-gray-400 text-sm">Small steps every day - researching concepts, practising basics, preparing for the journey ahead</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}