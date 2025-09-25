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
            My current learning process and the journey that sparked my passion for <span className="text-red-400">cybersecurity</span>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Current Learning */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-green-400">📚</span>
              Currently Learning
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mt-2 animate-pulse"></div>
                <div>
                  <h4 className="text-yellow-300 font-semibold">Python Security Tools</h4>
                  <p className="text-gray-300 text-sm mb-2">Building password analyzers and security automation scripts</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-2 animate-pulse"></div>
                <div>
                  <h4 className="text-cyan-300 font-semibold">React Development</h4>
                  <p className="text-gray-300 text-sm mb-2">Building interactive web applications like this portfolio</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 mt-2 animate-pulse"></div>
                <div>
                  <h4 className="text-purple-300 font-semibold">Kali Linux & Tools</h4>
                  <p className="text-gray-300 text-sm mb-2">Setting up VM environments and learning penetration testing basics</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Background Story */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-blue-400">🌟</span>
              My Story
            </h3>
            
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                My interest in cybersecurity began when I realized how much of our world depends on digital security. Every day, we trust systems with our personal data, financial information, and digital lives.
              </p>
              
              <p className="leading-relaxed">
                I started with <span className="text-yellow-400 font-medium">Python</span> because it&apos;s powerful for security automation, then expanded into <span className="text-cyan-400 font-medium">web development</span> to understand how applications work from both sides - building them and securing them.
              </p>
              
              <p className="leading-relaxed">
                What drives me is the challenge of thinking like both the defender and the attacker. Every security measure has to be perfect, but an attacker only needs to find one weakness.
              </p>

              <div className="pt-4 border-t border-gray-700/50">
                <h4 className="text-white font-semibold mb-3">Learning Approach</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Hands-on projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Documentation deep-dives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>VM experimentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Security research</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">Self-Taught Achievements</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h4 className="text-yellow-300 font-semibold mb-2">Password Security Tool</h4>
              <p className="text-gray-400 text-sm">Built a comprehensive password strength analyzer in Python</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="text-cyan-300 font-semibold mb-2">Interactive Portfolio</h4>
              <p className="text-gray-400 text-sm">Created this responsive website with React, TypeScript & animations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-green-300 font-semibold mb-2">Continuous Learning</h4>
              <p className="text-gray-400 text-sm">Daily practice with new technologies and security concepts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
