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
      {/* Background Effects - Your Brand Colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-600/20 via-blue-700/20 to-blue-800/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-blue-500/20 via-blue-600/20 to-blue-700/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Header with Real Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Real Logo Component */}
            <Logo size="md" variant="animated" />
            <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <span className="text-4xl">💻</span>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-600/20 hover:border-blue-500/40 transition-all duration-500 shadow-xl">
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col justify-center space-y-6"
              >
                {/* Main Description */}
                <div className="space-y-4">
                  <p className="text-lg text-blue-100/90 leading-relaxed">
                    I'm an aspiring <span className="text-blue-400 font-bold">Computer Science student</span> passionate about 
                    <span className="text-blue-300 font-medium"> software development</span>, 
                    <span className="text-blue-200 font-medium"> problem-solving</span>, and exploring all areas of 
                    <span className="text-blue-300 font-medium"> technology</span>.
                  </p>

                  {/* Quote - Your Brand Colors */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-500/20">
                      <p className="text-xl text-blue-300 italic font-semibold text-center">
                        "Code, learn, build, repeat."
                      </p>
                    </div>
                  </motion.div>

                  {/* Enhanced Description */}
                  <p className="text-blue-100/80 leading-relaxed">
                    My journey starts with a <span className="text-orange-400 font-medium">Cert IV in Cyber Security (2025)</span> 
                    to build foundational tech skills, but my ultimate goal is a 
                    <span className="text-blue-400 font-bold"> Bachelor of Computer Science (2027-2030)</span>. 
                    I'm interested in <span className="text-blue-300">web development</span>, 
                    <span className="text-blue-200"> algorithms</span>, and 
                    <span className="text-blue-300"> software engineering</span>.
                  </p>

                  <p className="text-blue-100/80 leading-relaxed">
                    I believe in <span className="text-yellow-400 font-medium">learning through building</span> - 
                    creating real projects, experimenting with different programming languages, and staying curious about 
                    emerging technologies. Whether it's cybersecurity, AI, web development, or systems programming - 
                    <span className="text-blue-400 font-bold"> Computer Science opens all doors</span>.
                  </p>
                </div>
              </motion.div>

              {/* Profile Side with Real Logo */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center lg:items-end space-y-6"
              >
                {/* Profile Image with Real Logo */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-56 h-56 rounded-full bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700 shadow-2xl ring-4 ring-blue-500/30 overflow-hidden relative flex items-center justify-center"
                  >
                    {/* Real Logo Component */}
                    <Logo size="xxl" priority />
                    
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-blue-500/20 to-blue-600/20 animate-pulse"></div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-blue-500/10 to-blue-600/10 blur-xl"></div>
                  </motion.div>

                  {/* Floating Elements - Your Brand Colors */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg"
                  />
                </div>

                {/* Status Badge - Your Brand Colors */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-center space-y-2"
                >
                  <div className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold border border-blue-500/30">
                    🎯 Future CS Student
                  </div>
                  <div className="px-3 py-1 bg-blue-600/10 text-blue-300 rounded-full text-xs border border-blue-600/20">
                    Building Skills • Open to All Tech Areas
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Cards - Your Brand Colors */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { 
              period: "2025 → 2026", 
              title: "Cert IV Cyber Security", 
              subtitle: "Foundation & Technical Skills", 
              color: "from-orange-500 to-red-500", 
              icon: "🛠️",
              note: "Stepping Stone"
            },
            { 
              period: "2026 → 2027", 
              title: "Industry Experience", 
              subtitle: "Internships & Real Projects", 
              color: "from-green-500 to-emerald-500", 
              icon: "🚀",
              note: "Practical Learning"
            },
            { 
              period: "2027 → 2030", 
              title: "Bachelor Computer Science", 
              subtitle: "My Main Goal & Future", 
              color: "from-blue-500 to-blue-600", // Your brand colors!
              icon: "🎓",
              note: "Ultimate Objective"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className={`
                bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-4 border border-gray-700/30 
                group-hover:border-blue-500/50 transition-all duration-300
                ${index === 2 ? 'ring-2 ring-blue-500/30' : ''}
              `}>
                {/* Main Goal Badge */}
                {index === 2 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                      MAIN GOAL
                    </span>
                  </div>
                )}
                
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-sm">{item.icon}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-blue-300/60 text-xs mb-2">{item.subtitle}</p>
                <p className="text-blue-300/70 text-xs mb-1">{item.period}</p>
                <p className="text-blue-400/50 text-xs italic">{item.note}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons - Your Brand Colors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {[
            { href: "#projects", label: "View Projects", primary: true, icon: "💻" },
            { href: "#skills", label: "Technical Skills", primary: false, icon: "⚡" },
            { href: "#journey", label: "Learning Path", primary: false, icon: "🗺️" }
          ].map((button, index) => (
            <motion.a
              key={index}
              href={button.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2
                ${button.primary 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-gray-800/50 text-gray-300 border border-gray-600/30 hover:bg-gray-700/50 hover:text-white hover:border-blue-500/50'
                }
              `}
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
