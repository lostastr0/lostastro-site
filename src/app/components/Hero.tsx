"use client";
import React, { useState, useEffect } from "react";
import { useTypeSwap } from "@/hooks/useTypeSwap";


// Util for staggered entrance
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

// React functional component for Aurora background effect with animation positions
const AuroraBackground: React.FC = () => {
  const [bgPos, setBgPos] = useState<[number, number, number, number, number, number]>([
    50, 30, 40, 70, 70, 50,
  ]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setBgPos(([x1, y1, x2, y2, x3, y3]) => [
        (x1 + 0.05) % 100,
        (y1 + 0.035) % 100,
        (x2 + 0.03) % 100,
        (y2 + 0.04) % 100,
        (x3 + 0.02) % 100,
        (y3 + 0.025) % 100,
      ]);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const background = `
    radial-gradient(ellipse 35% 60% at ${bgPos[0]}% ${bgPos[1]}%, #001d3dcc, transparent 75%),
    radial-gradient(ellipse 40% 70% at ${bgPos[2]}% ${bgPos[3]}%, #003566cc, transparent 65%),
    radial-gradient(ellipse 50% 80% at ${bgPos[4]}% ${bgPos[5]}%, #005fb8cc, transparent 60%)
  `;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 blur-[120px]"
      style={{ background, opacity: 0.3, transition: "background-position 0.1s linear" }}
    />
  );
};

const Hero: React.FC = () => {
  const REVEAL_STEPS = 4;
  const shown = useStaggeredReveal(REVEAL_STEPS, 400);
  const text = useTypeSwap("lostastr0", "Jaineel.");

  useEffect(() => {
    console.log("👋 Welcome, astronaut! Thanks for visiting.");
  }, []);

  return (
    <main
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-sky-200 overflow-hidden px-6"
    >
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-rich_black/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[22rem] w-[22rem] rounded-full bg-emerald-900/5 blur-3xl" />
      </div>
      <section className="relative max-w-3xl text-center z-10 flex flex-col items-center gap-3">
        <p
          className={`transition-all text-xs sm:text-sm tracking-wide font-medium text-sky-400/80 ${
            shown >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          Student - Building Skills in Computer Science & Cybersecurity
        </p>
        <h1
          className={`transition-all text-5xl sm:text-7xl xl:text-8xl font-semibold tracking-tight ${
            shown >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <span className="text-sky-400/90">{text}</span>
          <span className="ml-1 inline-block h-[2.25rem] w-2 translate-y-1 align-middle bg-sky-700/80 animate-pulse rounded-md" />
        </h1>
        <p
          className={`transition-all mt-5 text-lg text-sky-400/85 max-w-xl mx-auto ${
            shown >= 3 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          Blending creativity and technology while building my journey in cybersecurity & computer science.
        </p>
        <div
          className={`transition-all flex gap-6 justify-center mt-8 ${
            shown >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <a
            href="#projects"
            className="px-6 py-2 rounded-lg bg-gradient-to-br from-sky-900 to-emerald-700/90 text-white shadow-lg hover:scale-105 hover:shadow-xl transition text-base font-medium focus:outline-none focus:ring-2 focus:ring-sky-700"
          >
            View My Work
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg border border-sky-700 text-sky-400 bg-black/50 backdrop-blur hover:bg-sky-900/30 hover:text-white transition text-base font-medium shadow focus:outline-none focus:ring-2 focus:ring-sky-700"
          >
            Download CV
          </a>
        </div>
      </section>
      <div className="mt-14 flex justify-center">
        <a href="#about" className="animate-bounce text-sky-400 hover:text-sky-300" aria-label="Scroll down to About section">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </main>
  );
};

export default Hero;
