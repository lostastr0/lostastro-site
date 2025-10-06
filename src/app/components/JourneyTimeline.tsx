"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Phase = {
  id: string;
  title: string;
  start: string;
  end: string;
  markers?: { label: string; atISO: string }[];
};

function phaseStatus(startISO: string, endISO: string, now = Date.now()) {
  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();
  if (now < start) {
    const daysToStart = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    if (daysToStart <= 30) {
      return { label: `Starting soon • ${daysToStart}d`, dot: "bg-amber-400", gradient: "from-amber-400 to-orange-500" };
    }
    return { label: "Scheduled", dot: "bg-slate-500", gradient: "from-slate-400 to-slate-600" };
  }
  if (now >= end) {
    return { label: "Completed", dot: "bg-emerald-500", gradient: "from-emerald-400 to-green-600" };
  }
  return { label: "In progress", dot: "bg-sky-500 animate-pulse", gradient: "from-sky-400 to-blue-600" };
}

function fmtCountdown(endISO: string) {
  const now = Date.now();
  const end = new Date(endISO).getTime();
  const diff = end - now;
  if (diff <= 0) return "🎉 Complete";
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  if (d > 30) return `${d} days remaining`;
  if (d > 0) return `${d}d ${h}h left`;
  return `${h}h ${m}m left`;
}

function fmtDateTime(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const phases: Phase[] = [
  {
    id: "foundations",
    title: "Cert IV in Cyber Security",
    start: "2025-10-07",
    end: "2026-10-07",
    markers: [
      { label: "Start", atISO: "2025-10-07" },
      { label: "Halfway", atISO: "2026-04-07" },
      { label: "Complete", atISO: "2026-10-07" },
    ],
  },
  {
    id: "bachelor",
    title: "Bachelor of IT (Computer Science Major)",
    start: "2027-02-01",
    end: "2030-02-01",
    markers: [
      { label: "Start", atISO: "2027-02-01" },
      { label: "Year 1 Complete", atISO: "2028-02-01" },
      { label: "Year 2 Complete", atISO: "2029-02-01" },
      { label: "Graduation", atISO: "2030-02-01" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Timeline() {
  const [tick, setTick] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mobile-Optimised Title */}
        <motion.div
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="relative">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full animate-ping absolute" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-sky-400 rounded-full" />
            </div>
            <span className="text-sky-400 font-medium tracking-wide text-sm sm:text-base">Live Education Timeline</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 tracking-tight px-2">
            <span className="bg-gradient-to-r from-white via-sky-100 to-sky-200 bg-clip-text text-transparent">Journey</span>
            <span className="text-slate-300 mx-2 sm:mx-4">&</span>
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Plan</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Interactive timeline showcasing educational milestones with <span className="text-sky-400 font-semibold">real-time progress</span> tracking.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="grid gap-6 sm:gap-8 lg:gap-12">
          {phases.map((phase, idx) => {
            const status = phaseStatus(phase.start, phase.end, tick);
            const start = new Date(phase.start).getTime();
            const end = new Date(phase.end).getTime();
            const progress = tick <= start ? 0 : tick >= end ? 100 : ((tick - start) / (end - start)) * 100;

            return (
              <motion.div key={phase.id} variants={cardVariants} className="group">
                <motion.div
                  className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 shadow-2xl"
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Status Indicator */}
                  <motion.div
                    className={`absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r ${status.gradient} text-white font-semibold shadow-lg text-xs sm:text-sm`}
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + idx * 0.2, type: "spring", stiffness: 200 }}
                  >
                    {status.label}
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Title - Mobile */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent leading-tight pr-16 sm:pr-0">
                      {phase.title}
                    </h3>
                    {/* Date Range */}
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm sm:text-lg font-medium">
                        {new Date(phase.start).toLocaleDateString("en-AU")} → {new Date(phase.end).toLocaleDateString("en-AU")}
                      </span>
                    </div>
                    {/* Live Stats / Countdown */}
                    <motion.div
                      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600/30"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                          <span className="text-emerald-400 font-medium text-sm sm:text-base">LIVE</span>
                        </div>
                        <div className="h-3 sm:h-4 w-px bg-slate-600" />
                        <span className="text-slate-300 font-mono text-sm sm:text-lg tracking-wider">
                          {fmtDateTime(new Date(tick))}
                        </span>
                      </div>
                      <motion.div
                        className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/40 self-start sm:self-auto"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-lg sm:text-2xl">⏰</span>
                        <span className="font-bold text-sky-300 text-base sm:text-lg">
                          {fmtCountdown(phase.end)}
                        </span>
                      </motion.div>
                    </motion.div>
                    {/* Progress Bar & Milestones */}
                    <div className="space-y-4 sm:space-y-6">
                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="h-2 sm:h-3 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-full relative"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 2, ease: "easeOut" }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
                          </motion.div>
                        </div>
                      </div>
                      {/* Milestones: Mobile and Desktop */}
                      <div className="relative" style={{ marginTop: '1rem sm:1.4rem' }}>
                        {/* Mobile - vertical */}
                        <div className="block sm:hidden space-y-3">
                          {phase.markers?.map((marker, i) => {
                            const markerTime = new Date(marker.atISO + "T00:00:00").getTime();
                            const reached = tick >= markerTime;
                            return (
                              <motion.div
                                key={marker.label}
                                className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + i * 0.1 }}
                              >
                                <div className="relative flex-shrink-0">
                                  <div
                                    className={`w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                                      reached
                                        ? "bg-gradient-to-br from-sky-400 to-blue-600 border-white shadow-lg shadow-sky-400/50"
                                        : "bg-slate-600 border-slate-400"
                                    }`}
                                  />
                                  {reached && (
                                    <motion.div
                                      className="absolute inset-0 rounded-full bg-sky-400 opacity-30"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div
                                    className={`text-sm font-bold transition-colors duration-300 ${
                                      reached ? "text-sky-300" : "text-slate-400"
                                    }`}
                                  >
                                    {marker.label}
                                  </div>
                                  <div className="text-xs text-slate-500 font-mono">
                                    {new Date(marker.atISO).toLocaleDateString("en-AU")}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                        {/* Desktop - horizontal */}
                        <div className="hidden sm:block absolute left-0 right-0 top-0">
                          {phase.markers?.map((marker, i, arr) => {
                            const markerTime = new Date(marker.atISO + "T00:00:00").getTime();
                            const reached = tick >= markerTime;
                            let position: number;
                            let transformValue: string;
                            if (arr.length === 3) {
                              if (i === 0) {
                                position = -2.5;
                                transformValue = "translateX(0%)";
                              } else if (i === 1) {
                                position = 47.5;
                                transformValue = "translateX(-50%)";
                              } else {
                                position = 95;
                                transformValue = "translateX(-100%)";
                              }
                            } else if (arr.length === 4) {
                              if (i === 0) {
                                position = -2.5;
                                transformValue = "translateX(0%)";
                              } else if (i === 1) {
                                position = 30;
                                transformValue = "translateX(-50%)";
                              } else if (i === 2) {
                                position = 63;
                                transformValue = "translateX(-50%)";
                              } else {
                                position = 95;
                                transformValue = "translateX(-100%)";
                              }
                            } else {
                              position = (i / (arr.length - 1)) * 100;
                              transformValue = "translateX(-50%)";
                            }
                            return (
                              <motion.div
                                key={marker.label}
                                className="absolute flex flex-col items-center cursor-pointer"
                                style={{
                                  left: `${position}%`,
                                  top: "-2.8rem",
                                  transform: transformValue,
                                }}
                                initial={{ opacity: 0, scale: 0, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 1 + i * 0.2, type: "spring", stiffness: 200 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                              >
                                <div className="relative">
                                  <div
                                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-4 transition-all duration-500 ${
                                      reached
                                        ? "bg-gradient-to-br from-sky-400 to-blue-600 border-white shadow-lg shadow-sky-400/50"
                                        : "bg-slate-600 border-slate-400"
                                    }`}
                                  />
                                  {reached && (
                                    <motion.div
                                      className="absolute inset-0 rounded-full bg-sky-400 opacity-30"
                                      animate={{ scale: [1, 1.3, 1] }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                  )}
                                </div>
                                <div className="mt-2 sm:mt-3 text-center space-y-1">
                                  <span
                                    className={`text-xs sm:text-sm font-bold transition-colors duration-300 block ${
                                      reached ? "text-sky-300" : "text-slate-400"
                                    }`}
                                  >
                                    {marker.label}
                                  </span>
                                  <div className="text-xs text-slate-500 font-mono">
                                    {new Date(marker.atISO).toLocaleDateString("en-AU")}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
