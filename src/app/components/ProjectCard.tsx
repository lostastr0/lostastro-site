"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PasswordCard from "./PasswordCard";

type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "cybersecurity" | "development" | "learning";
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: "completed" | "in-progress" | "planned";
  featured: boolean;
  isReal: boolean;
  component?: React.ComponentType;
};

const projects: Project[] = [
  // 🎉 COMPLETED PROJECTS - Both real and finished
  {
    id: "password-strength-checker",
    title: "Password Strength Analyzer",
    description: "Real-time password security assessment with comprehensive feedback system",
    longDescription: "An interactive password strength checker that analyzes password security in real-time using multiple criteria including length, character diversity, common password detection, and pattern recognition. Originally built in Python for command-line use, then enhanced and converted to React/TypeScript to create an interactive web application. Features comprehensive feedback with visual indicators and security recommendations based on cybersecurity best practices.",
    category: "cybersecurity",
    techStack: ["Python (Original)", "React", "TypeScript", "Tailwind CSS", "Security Algorithms"],
    githubUrl: "https://github.com/lostastr0/password_strength_checker_upgraded",
    status: "completed",
    featured: true,
    isReal: true,
    component: PasswordCard
  },

  {
    id: "portfolio-site",
    title: "Interactive Portfolio Website",
    description: "Modern, responsive portfolio showcasing my cybersecurity and development journey",
    longDescription: "A professional portfolio website built with Next.js featuring animated components, interactive timeline with real-time progress tracking, mobile-optimized design, and smooth animations. Includes live project demos, responsive design patterns, and advanced UI/UX elements. The site demonstrates modern web development practices including TypeScript, Tailwind CSS, Framer Motion animations, and mobile-first responsive design.",
    category: "development", 
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design", "Interactive Animations"],
    demoUrl: "https://yourportfolio.com", // Add your actual URL
    status: "completed",
    featured: true,
    isReal: true
  },

  // 🚧 FUTURE LEARNING PROJECTS
  {
    id: "network-scanner-basics",
    title: "Basic Network Scanner",
    description: "Python script for ethical network discovery and port scanning",
    longDescription: "A beginner-friendly network scanner built with Python for learning cybersecurity fundamentals. Will include basic port scanning, service detection, and educational reporting features following ethical hacking principles.",
    category: "cybersecurity",
    techStack: ["Python", "Socket Programming", "Nmap Library", "CLI"],
    status: "planned",
    featured: true,
    isReal: false
  },

  {
    id: "kali-setup-scripts",
    title: "Kali Linux Setup Automation",
    description: "Bash scripts to automate Kali Linux configuration for pentesting",
    longDescription: "Collection of bash scripts designed to streamline the initial setup and configuration of Kali Linux for cybersecurity students. Will include tool installation, environment configuration, and useful aliases for efficient workflow.",
    category: "cybersecurity",
    techStack: ["Bash", "Linux", "Shell Scripting", "Automation"],
    status: "planned",
    featured: false,
    isReal: false
  },

  {
    id: "algorithm-visualizer",
    title: "Algorithm Learning Visualizer", 
    description: "Interactive tool for visualizing computer science algorithms",
    longDescription: "Educational web application for visualizing fundamental CS algorithms including sorting (bubble, merge, quick) and basic search algorithms. Planned as a learning project to strengthen programming fundamentals before university.",
    category: "learning",
    techStack: ["React", "JavaScript", "Canvas API", "CSS Animations"],
    status: "planned",
    featured: false,
    isReal: false
  },

  {
    id: "security-news-aggregator",
    title: "Cybersecurity News Dashboard",
    description: "Simple dashboard aggregating cybersecurity news and threats",
    longDescription: "A basic news aggregation tool that collects cybersecurity updates from multiple sources. Planned as an introduction to API integration and data processing in the cybersecurity domain.",
    category: "cybersecurity",
    techStack: ["React", "APIs", "JSON Processing", "CSS Grid"],
    status: "planned", 
    featured: false,
    isReal: false
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: {
    opacity: 0, scale: 0.8, y: 20,
    transition: { duration: 0.2 }
  }
};

export default function ProjectCard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"all" | "cybersecurity" | "development" | "learning">("all");

  const filteredProjects = projects.filter(project => 
    filter === "all" || project.category === filter
  );

  const realProjects = projects.filter(project => project.isReal);
  const placeholderProjects = projects.filter(project => !project.isReal);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cybersecurity': return 'from-red-500 to-orange-500';
      case 'development': return 'from-blue-500 to-cyan-500';
      case 'learning': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cybersecurity': return '🛡️';
      case 'development': return '💻';
      case 'learning': return '📚';
      default: return '🔧';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planned': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <motion.div 
        className="w-full mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sky-300/80 text-lg mb-6 text-left">
          Showcasing my <span className="text-red-400">cybersecurity</span> and <span className="text-blue-400">development</span> projects
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { key: "all", label: "All Projects", icon: "🎯" },
            { key: "cybersecurity", label: "Cybersecurity", icon: "🛡️" },
            { key: "development", label: "Development", icon: "💻" },
            { key: "learning", label: "Learning", icon: "📚" }
          ].map((filterOption) => (
            <motion.button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{filterOption.icon}</span>
              {filterOption.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Completed Projects Section - Now with 2 projects! */}
      {realProjects.length > 0 && (
        <motion.div 
          className="w-full mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-green-400">✅</span>
            Completed Projects ({realProjects.length})
          </h3>
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {realProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover="hover"
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border-2 border-green-500/30 hover:border-green-400/50 transition-all duration-500 cursor-pointer h-full"
                     onClick={() => setSelectedProject(project)}>
                  
                  {/* Real Project Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    ✅ Live Project
                  </div>

                  {/* Category Badge */}
                  <motion.div 
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(project.category)} text-white`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {getCategoryIcon(project.category)} {project.category}
                  </motion.div>

                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-base mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-green-800/30 text-green-300 rounded-full text-sm border border-green-700/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{project.component ? '🚀' : '🌐'}</span> 
                        {project.component ? 'Try Demo' : 'View Site'}
                      </motion.button>
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>📂</span> Code
                        </motion.a>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-blue-300 rounded-lg hover:bg-blue-700 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>🌐</span> Visit
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Success Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Future Learning Projects */}
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-blue-400">🚧</span>
          Learning Roadmap ({placeholderProjects.length} planned)
        </h3>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {placeholderProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              <div
                className="relative bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300 cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <span className="text-xs text-gray-400 capitalize">{project.status.replace('-', ' ')}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-800/40 text-gray-400 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Placeholder Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl">{getCategoryIcon(selectedProject.category)}</span>
                      {selectedProject.isReal && (
                        <div className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          ✅ Live Project
                        </div>
                      )}
                      <div className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(selectedProject.category)} text-white`}>
                        {selectedProject.category}
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className={`w-3 h-3 rounded-full ${getStatusColor(selectedProject.status)}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                        <span className="text-sm text-gray-400 capitalize">{selectedProject.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white">{selectedProject.title}</h3>
                    <p className="text-xl text-gray-300 mb-6">{selectedProject.description}</p>
                  </div>
                  
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Description */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-3">About This Project</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                </motion.div>

                {/* Development Journey - for real projects */}
                {selectedProject.isReal && (
                  <motion.div 
                    className="mb-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h5 className="text-md font-semibold text-green-300 mb-2">Development Journey</h5>
                    <p className="text-green-200 text-sm">
                      {selectedProject.id === 'password-strength-checker' 
                        ? '🐍 Originally developed in Python as a command-line tool for learning cybersecurity fundamentals, then enhanced and converted to React/TypeScript to create this interactive web version with real-time feedback and visual indicators.'
                        : '🚀 Built using modern web development practices with Next.js, featuring responsive design, interactive animations, and optimized performance. Demonstrates proficiency in TypeScript, Tailwind CSS, and advanced React patterns.'
                      }
                    </p>
                  </motion.div>
                )}

                {/* Tech Stack */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-4">Tech Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className={`px-4 py-2 ${
                          selectedProject.isReal 
                            ? 'bg-green-800/30 text-green-300 border-green-700/50' 
                            : 'bg-gray-800/30 text-gray-300 border-gray-600/50'
                        } rounded-lg border`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Live Demo Component (for projects with components) */}
                {selectedProject.isReal && selectedProject.component && (
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-lg font-semibold text-white mb-4">Live Demo</h4>
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
                      <selectedProject.component />
                    </div>
                  </motion.div>
                )}

                {/* Placeholder Notice */}
                {!selectedProject.isReal && (
                  <motion.div 
                    className="mb-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-blue-300 text-sm">
                      🚧 This project is part of my learning roadmap. I'll be building this as I continue my cybersecurity and CS education journey.
                    </p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {selectedProject.demoUrl && (
                    <motion.a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>🌐</span> Visit Live Site
                    </motion.a>
                  )}
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>📂</span> View Source Code
                    </motion.a>
                  )}
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-3 px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800/50 transition-all duration-300 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
