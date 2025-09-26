"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

// Real tech logos that work
import { 
  SiPython,
  SiReact,     
  SiGithub,
  SiDocker,
  SiMysql,
  SiLinux
} from 'react-icons/si';

// Reliable FontAwesome fallbacks
import { 
  FaJs, FaCss3Alt, FaCode, FaTerminal, FaLock, FaShieldAlt,
  FaNetworkWired, FaSearch, FaBug, FaCoffee, FaDatabase,
  FaPuzzlePiece, FaBookOpen, FaBox
} from 'react-icons/fa';

type Skill = {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  level?: number;
  category?: "cybersecurity" | "development" | "learning" | "tool";
  status: string;
};

type SkillToolsProps = {
  skills: Skill[];
  learningNext: Skill[];
};

// HONEST BEGINNER-LEVEL SKILLS
const currentSkills: Skill[] = [
  // LEARNING FOUNDATIONS
  {
    name: "Python",
    Icon: SiPython,
    description: "Learning basics - variables, loops, simple programs",
    level: 15,
    category: "development",
    status: "Learning"
  },

  {
    name: "HTML & CSS",
    Icon: FaCss3Alt,
    description: "Basic web structure and styling - used in this portfolio",
    level: 25,
    category: "development",
    status: "Learning"
  },

  {
    name: "React Basics",
    Icon: SiReact,
    description: "Following tutorials, building this portfolio as first project",
    level: 20,
    category: "development",
    status: "Exploring"
  },

  {
    name: "VS Code",
    Icon: FaCode,
    description: "Getting comfortable with editor, extensions, and shortcuts",
    level: 40,
    category: "tool",
    status: "Using"
  },

  {
    name: "Git & GitHub",
    Icon: SiGithub,
    description: "Basic version control - pushing code, repositories",
    level: 25,
    category: "tool", 
    status: "Learning"
  },

  // SOFT SKILLS & MINDSET
  {
    name: "Problem Solving",
    Icon: FaPuzzlePiece,
    description: "Breaking down problems, researching solutions online",
    level: 35,
    category: "learning",
    status: "Developing"
  },

  {
    name: "Self-Learning", 
    Icon: FaBookOpen,
    description: "Using YouTube, documentation, online courses to learn",
    level: 45,
    category: "learning",
    status: "Active"
  },

  // CYBERSECURITY PREP
  {
    name: "Security Concepts",
    Icon: FaLock,
    description: "Researching cybersecurity basics, preparing for Cert IV",
    level: 10,
    category: "cybersecurity",
    status: "Researching"
  }
];

const learningNext: Skill[] = [
  // CYBERSECURITY FOUNDATION (for upcoming course)
  {
    name: "Password Security",
    Icon: FaLock,
    description: "Will learn in Cert IV - password attacks, strength analysis",
    category: "cybersecurity",
    status: "Oct 2025"
  },

  {
    name: "Kali Linux",
    Icon: SiLinux,
    description: "Cybersecurity toolkit - will explore in course",
    category: "cybersecurity",
    status: "Oct 2025"
  },

  {
    name: "Network Basics",
    Icon: FaNetworkWired,
    description: "TCP/IP, networking fundamentals for security",
    category: "cybersecurity",
    status: "Oct 2025"
  },

  {
    name: "Terminal/Bash",
    Icon: FaTerminal,
    description: "Command line skills for cybersecurity work",
    category: "tool",
    status: "Oct 2025"
  },

  // PROGRAMMING EXPANSION
  {
    name: "JavaScript",
    Icon: FaJs,
    description: "Web interactivity - logical next step after HTML/CSS",
    category: "development",
    status: "Soon"
  },

  {
    name: "Python Projects",
    Icon: SiPython,
    description: "Building actual programs beyond basic syntax",
    category: "development",
    status: "Next"
  },

  // CYBERSECURITY TOOLS (future learning)
  {
    name: "Nmap",
    Icon: FaSearch,
    description: "Network discovery tool - will learn in course",
    category: "cybersecurity",
    status: "Future"
  },

  {
    name: "Wireshark",
    Icon: FaNetworkWired,
    description: "Network packet analysis for security",
    category: "cybersecurity",
    status: "Future"
  },

  {
    name: "Burp Suite",
    Icon: FaBug,
    description: "Web application security testing",
    category: "cybersecurity",
    status: "Future"
  },

  // COMPUTER SCIENCE PREP
  {
    name: "C/C++",
    Icon: FaCode,
    description: "Will need for Computer Science degree",
    category: "development",
    status: "2027"
  },

  {
    name: "Java",
    Icon: FaCoffee,
    description: "Object-oriented programming for CS studies",
    category: "development",
    status: "2027"
  },

  {
    name: "SQL",
    Icon: SiMysql,
    description: "Database fundamentals for development",
    category: "development",
    status: "Future"
  }
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const skillCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: (index: number) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.1
    }
  }),
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export default function SkillTools({ skills = currentSkills, learningNext: learningNextProp = learningNext }: SkillToolsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState<"all" | "cybersecurity" | "development" | "learning" | "tool">("all");

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

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'cybersecurity': return 'from-red-500 to-orange-500';
      case 'development': return 'from-blue-500 to-cyan-500'; 
      case 'learning': return 'from-green-500 to-emerald-500';
      case 'tool': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'cybersecurity': return '🛡️';
      case 'development': return '💻';
      case 'learning': return '📚';
      case 'tool': return '🔧';
      default: return '⚡';
    }
  };

  const filteredSkills = skills.filter(skill => 
    filter === "all" || skill.category === filter
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center px-6 py-20 bg-black text-sky-200 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-red-900/20 via-orange-900/20 to-yellow-900/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-blue-900/20 via-cyan-900/20 to-sky-900/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Skills & Tools
          </h2>
          <p className="text-xl text-sky-300/80 max-w-3xl mx-auto">
            What I'm currently <span className="text-green-400">learning</span> and planning to <span className="text-blue-400">explore</span> next
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            { key: "all", label: "All Skills", icon: "🎯" },
            { key: "cybersecurity", label: "Cybersecurity", icon: "🛡️" },
            { key: "development", label: "Development", icon: "💻" },
            { key: "learning", label: "Learning", icon: "📚" },
            { key: "tool", label: "Tools", icon: "🔧" }
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
        </motion.div>

        {/* Current Learning */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-green-400">📚</span>
            Currently Learning
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillCardVariants}
                custom={index}
                whileHover="hover"
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-sky-500/50 transition-all duration-500 h-full">
                  
                  {/* Category Badge */}
                  {skill.category && (
                    <div className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r ${getCategoryColor(skill.category)} flex items-center justify-center text-xs`}>
                      {getCategoryIcon(skill.category)}
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative mb-3">
                      <skill.Icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl group-hover:bg-sky-300/30 transition-all duration-300"></div>
                    </div>
                    <h4 className="text-lg font-semibold text-white text-center">{skill.name}</h4>
                  </div>

                  {/* Honest Progress Bar */}
                  {skill.level !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">Learning Progress</span>
                        <motion.span 
                          className="text-xs text-sky-400 font-medium"
                          initial={{ opacity: 0 }}
                          animate={visible ? { opacity: 1 } : {}}
                          transition={{ delay: 1.2 + index * 0.1 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getCategoryColor(skill.category)} rounded-full`}
                          initial={{ width: 0, opacity: 0 }}
                          animate={visible ? { 
                            width: `${skill.level}%`, 
                            opacity: 1 
                          } : {}}
                          transition={{
                            width: {
                              duration: 1.5,
                              ease: "easeOut",
                              delay: 0.8 + index * 0.1
                            },
                            opacity: {
                              duration: 0.3,
                              delay: 0.6 + index * 0.1
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-sky-900/30 text-sky-300 rounded-full text-xs">
                      {skill.status}
                    </span>
                  </div>

                  {/* Description Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg border border-gray-600 shadow-xl max-w-xs text-center">
                      {skill.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(skill.category)} opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-500`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Next Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
        >
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-blue-400">🎯</span>
            Learning Next
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {learningNextProp.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillCardVariants}
                custom={index}
                whileHover="hover"
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/20 hover:border-blue-500/30 transition-all duration-500 h-full">
                  
                  {/* Learning Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs font-medium">
                    {skill.status}
                  </div>

                  {/* Icon */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative mb-3">
                      <skill.Icon className="w-12 h-12 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                      <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-xl group-hover:bg-blue-400/20 transition-all duration-300"></div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors text-center">{skill.name}</h4>
                  </div>

                  {/* Learning Status */}
                  <div className="text-center">
                    <span className="px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-xs">
                      Planned
                    </span>
                  </div>

                  {/* Description Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg border border-gray-600 shadow-xl max-w-xs text-center">
                      {skill.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>

                  {/* Future Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}