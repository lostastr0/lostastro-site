"use client";
import { useState, useEffect } from "react";
import { useTypeSwap } from "@/hooks/useTypeSwap";

// Util for staggered entrance
function useStaggeredReveal(delaySteps: number, stepMs: number) {
  const [shownStep, setShownStep] = useState(0);
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

export default function Hero() {
  // Stagger logic for subtitle → typing → support line → buttons
  const REVEAL_STEPS = 4;
  const shown = useStaggeredReveal(REVEAL_STEPS, 400);

  // Typing animation
  const text = useTypeSwap("lostastr0", "Jaineel.");

  // Easter egg: console log message
  useEffect(() => {
    // Message shows only once on mount (for visitors)
    // eslint-disable-next-line no-console
    console.log("👋 Welcome, astronaut! Thanks for visiting.");
  }, []);

  return (
    <main id="top" className="relative min-h-screen flex flex-col items-center justify-center bg-black text-sky-200 overflow-hidden px-6">
      {/* Animated/aurora background layers - keep your style, or replace with starfield later */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute h-full w-full top-0 left-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 35% 60% at 50% 30%, #33ffbb88, transparent 80%), ' +
              'radial-gradient(ellipse 40% 70% at 40% 70%, #33aaff77, transparent 75%), ' +
              'radial-gradient(ellipse 50% 80% at 70% 50%, #55ddffaa, transparent 70%)',
            animation: 'aurora 20s ease-in-out infinite alternate',
            filter: 'blur(120px)',
          }}
        />
        <style jsx>{`
          @keyframes aurora {
            0% { background-position: 50% 30%, 40% 70%, 70% 50%; }
            100% { background-position: 60% 40%, 30% 60%, 80% 40%; }
          }
        `}</style>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[22rem] w-[22rem] rounded-full bg-emerald-400/5 blur-3xl" />
      </div>
      {/* HERO CONTENT */}
      <section className="relative max-w-3xl text-center z-10 flex flex-col items-center gap-3">
        {/* Subtitle */}
        <p
          className={`transition-all text-xs sm:text-sm tracking-wide font-medium text-sky-300/80 ${
            shown >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
            Student - Building Skills in Computer Science & Cybersecurity
        </p>
        {/* Typing animation display */}
        <h1
          className={`transition-all text-5xl sm:text-7xl xl:text-8xl font-semibold tracking-tight ${
            shown >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <span className="text-sky-300/90">{text}</span>
          <span className="ml-1 inline-block h-[2.25rem] w-2 translate-y-1 align-middle bg-sky-400/80 animate-pulse rounded-md" />
        </h1>
        {/* Support line */}
        <p
          className={`transition-all mt-5 text-lg text-sky-300/85 max-w-xl mx-auto ${
            shown >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          Blending creativity and technology while building my journey in cybersecurity & computer science.
        </p>
        {/* CTAs */}
        <div
          className={`transition-all flex gap-6 justify-center mt-8 ${
            shown >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <a
            href="#projects"
            className="px-6 py-2 rounded-lg bg-gradient-to-br from-sky-400 to-emerald-400/90 text-black shadow-lg hover:scale-105 hover:shadow-xl transition text-base font-medium focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            View My Work
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg border border-sky-300 text-sky-200 bg-black/50 backdrop-blur hover:bg-sky-700/30 hover:text-white transition text-base font-medium shadow focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Download CV
          </a>
        </div>
      </section>
      {/* Down arrow CTA (unchanged, or update style as needed) */}
      <div className="mt-14 flex justify-center">
        <a href="#about" className="animate-bounce text-sky-400 hover:text-sky-300" aria-label="Scroll down to About section">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </main>
  );
}
