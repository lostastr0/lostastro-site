"use client";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center bg-black text-sky-200">
      <div className="mx-auto max-w-5xl w-full px-4">
        <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-center md:text-left mb-4">About</h2>
            <p className="text-center md:text-left text-sky-300/80 leading-relaxed max-w-lg mx-auto md:mx-0">
              I’m a passionate and curious developer diving deep into software engineering, systems, and cybersecurity.
              <span className="block mt-2 text-sky-400 italic font-semibold">"Always learning, always securing."</span>
              Starting with a foundational Cert IV in Cyber Security in 2025, I’m building hands-on projects to solidify my skills and prepare for a 2026 internship.
              My journey is driven by the challenge of securing digital systems and continuous learning.
              I aim to leverage this knowledge in real-world environments while pursuing a Bachelor of IT (Computer Science major) from 2027 onwards.
            </p>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-400 shadow-lg ring-1 ring-white/20 overflow-hidden">
              {/* Replace this SVG with your photo if desired */}
              <svg className="w-full h-full text-white/20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"/>
                <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">Cert IV in Cyber Security • 2025 → 2026</span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">Transition • late 2026 → early 2027</span>
          <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">Bachelor CS • 2027 → 2030</span>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
          <a href="#projects" className="rounded-lg bg-sky-500/10 px-3 py-1.5 text-sky-200 ring-1 ring-sky-400/20 hover:bg-sky-500/15">View projects</a>
          <a href="#journey" className="rounded-lg bg-white/5 px-3 py-1.5 text-sky-200 ring-1 ring-white/10 hover:bg-white/10">See journey</a>
          <a href="#skills" className="rounded-lg bg-white/5 px-3 py-1.5 text-sky-200 ring-1 ring-white/10 hover:bg-white/10">Skills</a>
        </div>
      </div>
    </section>
  );
}
