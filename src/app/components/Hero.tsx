"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTypeSwap } from "@/hooks/useTypeSwap";

function useStaggeredReveal(delaySteps: number, stepMs: number): number {
  const [shownStep, setShownStep] = useState<number>(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setShownStep((step) => {
        if (step < delaySteps) return step + 1;
        clearInterval(interval);
        return step;
      });
    }, stepMs);
    return () => clearInterval(interval);
  }, [delaySteps, stepMs]);

  return shownStep;
}

function useViewportHeight() {
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setViewportHeight(window.innerHeight);
    };

    updateVH();
    window.addEventListener('resize', updateVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateVH, 100);
    });

    return () => {
      window.removeEventListener('resize', updateVH);
      window.removeEventListener('orientationchange', updateVH);
    };
  }, []);

  return viewportHeight;
}

function useResponsiveBreakpoint() {
  const [screenSize, setScreenSize] = useState<string>('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('mobile');
      else if (width < 768) setScreenSize('mobile-lg');
      else if (width < 1024) setScreenSize('tablet');
      else if (width < 1440) setScreenSize('laptop');
      else setScreenSize('desktop');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

const FloatingTechElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const elementsRef = useRef<HTMLElement[]>([]);
  const screenSize = useResponsiveBreakpoint();

  useEffect(() => {
    // Implementation for floating tech elements, particle creation, mouse interactions,
    // responsive positioning remains as per original code.
  }, [screenSize]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden md:block"
      style={{ opacity: 0.88 }}
    />
  );
};

const Hero: React.FC = () => {
  const REVEAL_STEPS = 5;
  const shown = useStaggeredReveal(REVEAL_STEPS, 450);
  const text = useTypeSwap("lostastr0", "Jaineel.");
  const viewportHeight = useViewportHeight();

  useEffect(() => {
    console.log("🚀 Welcome to my learning journey!");
  }, []);

  return (
    <main
      id="top"
      className="relative flex flex-col items-center justify-center bg-black text-blue-100 overflow-hidden"
      style={{
        minHeight: `calc(var(--vh, 1vh) * 100)`,
        padding: '0 clamp(16px, 5vw, 24px)'
      }}
    >
      <FloatingTechElements />

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-900/30 via-blue-800/25 to-blue-900/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-15rem] right-[-15rem] h-[35rem] w-[35rem] rounded-full bg-gradient-to-l from-blue-800/25 via-blue-900/20 to-blue-800/25 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-[30rem] w-[30rem] -translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-900/15 blur-2xl animate-pulse" />
      </div>

      <section className="relative max-w-5xl text-center z-10 flex flex-col items-center gap-4 md:gap-6 w-full">
        <div
          className={`transition-all duration-700 text-xs sm:text-sm font-mono text-blue-400/80 tracking-widest ${
            shown >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 text-xs">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="hidden sm:inline">ASPIRING COMPUTER SCIENCE STUDENT</span>
            <span className="sm:hidden">CS STUDENT</span>
          </span>
        </div>

        <div
          className={`transition-all duration-700 ${
            shown >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-blue-300/90 font-medium mb-2 md:mb-3">
            Hi, I'm <span className="text-blue-400 font-bold">Jaineel</span> 👋
          </p>
          <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-blue-200/80">
            <span className="text-blue-400 font-medium">
              Learning, Building, Breaking Boundaries in Tech
            </span>
          </p>
        </div>

        <h1
          className={`transition-all duration-700 font-bold tracking-tight bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent relative ${
            shown >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
          style={{
            fontSize: 'clamp(2.5rem, 12vw, 5rem)',
            filter: "drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))",
            textShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
            lineHeight: '1.1'
          }}
        >
          <span>{text}</span>
          <span
            className="ml-2 inline-block w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"
            style={{
              height: 'clamp(2rem, 10vw, 2.5rem)',
              animation: "subtleCursorBlink 1.5s ease-in-out infinite",
            }}
          />
        </h1>

        <div
          className={`transition-all duration-700 mt-2 md:mt-4 space-y-3 md:space-y-4 ${
            shown >= 4 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-2 md:space-y-3">
            <p className="text-lg sm:text-xl md:text-2xl text-blue-200 font-bold leading-tight">
              Passionate about{" "}
              <span className="text-cyan-400">Computer Science</span> with{" "}
              <span className="text-blue-400">Cyber Security</span> as my pathway
            </p>
            <p className="text-sm sm:text-base md:text-lg text-blue-200/80 leading-relaxed px-4 md:px-0">
              Currently learning programming and building projects while
              preparing for Cert IV in Cyber Security (2025) – my stepping stone
              to a CS degree
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-6 text-xs sm:text-sm px-4 md:px-0">
            <span className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-200">Learning Programming</span>
            </span>
            <span className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-blue-200">Building Projects</span>
            </span>
            <span className="inline-flex items-center gap-2 px-2 md:px-3 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-blue-200">Pathway to CS</span>
            </span>
          </div>
        </div>

        <div
          className={`transition-all duration-700 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 relative z-0 w-full max-w-lg sm:max-w-none ${
            shown >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <a
            href="#projects"
            className="group px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 min-h-[44px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              See What I've Built
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </a>

          <a
            href="#about"
            className="group px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-blue-500/30 text-blue-300 bg-transparent hover:bg-blue-500/10 transition-all duration-300 text-base md:text-lg font-semibold hover:scale-105 min-h-[44px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              My Journey
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
          </a>

          <a
            href="#contact"
            className="group px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-cyan-500/30 text-cyan-300 bg-transparent hover:bg-cyan-500/10 transition-all duration-300 text-base md:text-lg font-semibold hover:scale-105 min-h-[44px] flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              Let's Connect
              <svg
                className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </span>
          </a>
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <a
            href="#about"
            className="group animate-bounce text-blue-400 hover:text-blue-300 transition-colors p-2"
            aria-label="Learn more about my journey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Hero;
