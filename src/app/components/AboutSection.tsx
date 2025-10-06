"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Logo from '@/components/Logo';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    ob.observe(sectionRef.current);
    return () => ob.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen flex items-center bg-black text-blue-100 relative overflow-hidden px-6 py-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/15 via-blue-700/15 to-blue-800/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-blue-500/15 via-blue-600/15 to-blue-700/15 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <Logo size="md" variant="animated" />
            <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/20">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            My Pathway to Computer Science
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-blue-600/20 hover:border-blue-500/30 transition-all duration-500 shadow-2xl">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                'Why Computer Science?'
              </h3>
              <blockquote className="text-xl text-blue-100 leading-relaxed mb-6">
                My fascination with technology started early, but it crystallised when I realised that
                <strong className="text-blue-300"> Computer Science is the foundation that powers everything digital</strong>—from
                the apps we use each day to the security systems safeguarding our data.
              </blockquote>
              <p className="text-blue-200/80 text-lg leading-relaxed">
                Every algorithm I learnt, every system I built, is guided by one vision: 
                <em className="text-blue-400 font-medium"> 'How can I create technology that improves lives?'</em>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-blue-600/20 hover:border-blue-500/30 transition-all duration-500 shadow-2xl">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">From Curiosity to Career</h3>

                <p className="text-lg text-blue-100/90 leading-relaxed">
                  I am an aspiring <span className="text-blue-400 font-bold">Computer Science student</span> passionate about 
                  <span className="text-blue-300 font-medium"> software development</span>, 
                  <span className="text-blue-200 font-medium"> problem-solving</span>, and exploring all areas of 
                  <span className="text-blue-300 font-medium"> technology</span>.
                </p>

                <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/20 my-6">
                  <p className="text-xl text-blue-300 italic font-semibold text-center">
                    'Code, learn, build, repeat.'
                  </p>
                </div>

                <p className="text-blue-100/80 leading-relaxed">
                  My journey begins with a <span className="text-purple-400 font-medium">Cert IV in Cyber Security (Oct 2025 - Oct 2026)</span> 
                  to build foundational tech skills, then straight into a 
                  <span className="text-blue-400 font-bold"> Bachelor of Computer Science (2027-2030)</span>. 
                  I am interested in <span className="text-blue-300">web development</span>, 
                  <span className="text-blue-200"> algorithms</span>, and 
                  <span className="text-blue-300"> software engineering</span>.
                </p>

                <p className="text-blue-100/80 leading-relaxed">
                  I believe in <span className="text-yellow-400 font-medium">learning through building</span>—creating real projects, 
                  experimenting with different programming languages, and staying curious about emerging technologies. 
                  Whether it is cyber security, AI, web development, or systems programming—
                  <span className="text-blue-400 font-bold"> Computer Science opens all doors</span>.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-56 h-56 rounded-full bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700 shadow-2xl ring-4 ring-blue-500/30 overflow-hidden relative flex items-center justify-center"
                  >
                    <Logo size="xxl" priority />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-blue-500/20 to-blue-600/20 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-blue-500/10 to-blue-600/10 blur-xl"></div>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center"
                  >
                    <span className="text-lg">💻</span>
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center"
                  >
                    <span className="text-sm">⚡</span>
                  </motion.div>
                </div>

                <div className="text-center space-y-3">
                  <div className="px-6 py-3 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold border border-blue-500/30">
                    🎯 Future CS Student
                  </div>
                  <div className="px-4 py-2 bg-blue-600/10 text-blue-300 rounded-full text-xs border border-blue-600/20">
                    Building Skills • Open to All Tech Areas
                  </div>
                </div>

                <div className="w-full max-w-sm">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                          2025
                        </div>
                        <div className="text-xs text-blue-300/80 font-medium">Starting</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                          Preparing
                        </div>
                        <div className="text-xs text-purple-300/80 font-medium">Now</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">
                          Ready
                        </div>
                        <div className="text-xs text-emerald-300/80 font-medium">Soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">My Learning Pathway</h3>
            <p className="text-blue-200/70 max-w-2xl mx-auto">Strategic pathway to Computer Science mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                period: "Oct 2025 - Oct 2026", 
                title: "Cert IV in Cyber Security", 
                subtitle: "Foundation & Technical Skills", 
                color: "from-purple-500 to-pink-500", 
                icon: "🛡️",
                note: "Phase 1: Foundation Year",
                highlights: ["Technical Foundation", "Problem-Solving Skills", "Industry Knowledge"]
              },
              { 
                period: "Late 2026", 
                title: "University Preparation", 
                subtitle: "Applications & Skill Refinement", 
                color: "from-green-500 to-emerald-500", 
                icon: "📚",
                note: "Bridge to University",
                highlights: ["University Applications", "Portfolio Completion", "Skill Consolidation"]
              },
              { 
                period: "2027-2030", 
                title: "Bachelor of Computer Science", 
                subtitle: "My Ultimate Goal", 
                color: "from-blue-500 to-cyan-500",
                icon: "🎓",
                note: "Phase 2: Deep Dive",
                highlights: ["CS Degree", "Software Engineering", "All Tech Areas"],
                ultimate: true
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className="relative group"
              >
                {item.ultimate && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
                      ULTIMATE GOAL
                    </span>
                  </div>
                )}
                <div className={`bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-600/20 group-hover:border-blue-500/40 transition-all duration-300 h-full shadow-xl ${item.ultimate ? 'ring-2 ring-blue-500/20' : ''}`}>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-blue-300/80 mb-2">{item.subtitle}</p>
                      <p className="text-sm text-blue-300/70 font-medium">{item.period}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-blue-600/20">
                      {item.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-blue-200/90">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} flex-shrink-0`}></div>
                          {highlight}
                        </div>
                      ))}
                    </div>
                    <p className="text-blue-400/60 text-xs italic mt-4">{item.note}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { href: "#projects", label: "View Projects", primary: true, icon: "💻" },
            { href: "#skills", label: "Technical Skills", primary: false, icon: "⚡" },
            { href: "#journey", label: "Learning Pathway", primary: false, icon: "🗺️" }
          ].map((button, index) => (
            <motion.a
              key={index}
              href={button.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 shadow-lg ${
                button.primary 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl hover:from-blue-600 hover:to-blue-700' 
                  : 'bg-gradient-to-r from-gray-800/70 to-gray-900/70 text-gray-300 border border-blue-600/20 hover:bg-gradient-to-r hover:from-gray-700/70 hover:to-gray-800/70 hover:text-white hover:border-blue-500/40 backdrop-blur-sm'
              }`}
            >
              <span>{button.icon}</span>
              {button.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
