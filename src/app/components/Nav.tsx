"use client";

import { useState } from "react";

export default function Nav() {
  const navLinks = [
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "goals", label: "Goals", href: "#goals" },
    { id: "journey", label: "Journey", href: "#journey" },
  ];

  const [active, setActive] = useState("projects");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/75 backdrop-blur-md shadow-lg">
      <nav className="mx-auto max-w-7xl px-10 py-5 flex items-center justify-between">
        {/* Logo with rotated highlight */}
        <a
          href="#top"
          className="relative z-20 font-extrabold text-3xl tracking-wide text-cyan-400 cursor-pointer"
          aria-label="Home"
        >
          lostastr0
          <span className="absolute top-1/2 left-0 -z-10 h-8 w-20 rounded-lg bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-600 -translate-y-1/2 rotate-12 blur-xl opacity-60 transition-all duration-500"></span>
        </a>

        {/* Navigation with wrap and custom hover */}
        <ul className="flex flex-wrap justify-center gap-6 max-w-4xl z-10">
          {navLinks.map(({ id, label, href }) => {
            const isActive = active === id;
            return (
              <li key={id} className="group relative">
                <a
                  href={href}
                  onClick={() => setActive(id)}
                  className={`relative z-20 px-5 py-2 rounded-full font-semibold transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {label}
                  {/* Highlight bubble behind */}
                  <span
                    className={`absolute inset-0 -z-10 rounded-full transition-transform duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FF41B5] via-[#7C42FF] to-[#4881FF] shadow-lg scale-110"
                        : "bg-transparent group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:via-purple-700 group-hover:to-indigo-600 group-hover:shadow-md group-hover:scale-105"
                    }`}
                  ></span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Placeholder for mobile menu */}
        <button
          aria-label="Toggle menu"
          className="text-cyan-400 hover:text-cyan-300 md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
