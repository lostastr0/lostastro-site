"use client";

import { useState, useEffect } from "react";
import Nav from "./components/Nav";

/* ===== Password strength helpers ===== */
const commonPasswords = new Set([
  "password","123456","password123","admin","qwerty",
  "letmein","welcome","monkey","dragon","master",
  "shadow","123456789","football","baseball","superman",
  "abc123","iloveyou","trustno1","sunshine","princess",
  "welcome123","login","guest","hello","access"
]);

const lowercase = /[a-z]/;
const uppercase = /[A-Z]/;
const digits = /[0-9]/;
const specialChars = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/;

function hasRepeatedChars(pwd: string) { return /(.)\1\1/.test(pwd); }
function hasSequentialChars(pwd: string) {
  const s = pwd.toLowerCase();
  for (let i = 0; i < s.length - 2; i++) {
    const a = s.charCodeAt(i), b = s.charCodeAt(i + 1), c = s.charCodeAt(i + 2);
    if (b === a + 1 && c === a + 2) return true;
  }
  return false;
}
function calculateStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 12) score += 25;
  else if (pwd.length >= 8) score += 20;
  else if (pwd.length >= 6) score += 10;
  else if (pwd.length >= 4) score += 5;

  if (lowercase.test(pwd)) score += 10;
  if (uppercase.test(pwd)) score += 10;
  if (digits.test(pwd)) score += 10;
  if (specialChars.test(pwd)) score += 10;

  if (lowercase.test(pwd) && uppercase.test(pwd) && digits.test(pwd) && specialChars.test(pwd)) {
    score += 10;
  }

  if (commonPasswords.has(pwd.toLowerCase())) score -= 30;
  if (hasRepeatedChars(pwd)) score -= 15;
  if (hasSequentialChars(pwd)) score -= 10;

  return Math.min(Math.max(score, 0), 100);
}
function getStrengthLevel(score: number) {
  if (score >= 80) return "Very Strong";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Medium";
  if (score >= 20) return "Weak";
  return "Very Weak";
}
type FeedbackItem = { icon: "check" | "warn" | "stop"; text: string; tone: "good" | "warning" | "danger" };
function generateFeedback(pwd: string, score: number): FeedbackItem[] {
  const f: FeedbackItem[] = [];
  if (pwd.length < 8) f.push({ icon: "warn", text: "Use at least 8 characters (12+ recommended)", tone: "warning" });
  else if (pwd.length < 12) f.push({ icon: "warn", text: "Consider using 12+ characters for better security", tone: "warning" });
  else f.push({ icon: "check", text: "Good length", tone: "good" });

  if (!lowercase.test(pwd)) f.push({ icon: "warn", text: "Add lowercase letters (a-z)", tone: "warning" });
  if (!uppercase.test(pwd)) f.push({ icon: "warn", text: "Add uppercase letters (A-Z)", tone: "warning" });
  if (!digits.test(pwd)) f.push({ icon: "warn", text: "Add numbers (0-9)", tone: "warning" });
  if (!specialChars.test(pwd)) f.push({ icon: "warn", text: "Add special characters (!@#$%^&*)", tone: "warning" });

  if (commonPasswords.has(pwd.toLowerCase())) f.push({ icon: "stop", text: "Common password — avoid it", tone: "danger" });
  if (hasRepeatedChars(pwd)) f.push({ icon: "warn", text: "Avoid repeating characters (aaa, 111)", tone: "warning" });
  if (hasSequentialChars(pwd)) f.push({ icon: "warn", text: "Avoid sequential characters (abc, 123)", tone: "warning" });

  if (score >= 80) f.push({ icon: "check", text: "Excellent password strength!", tone: "good" });
  else if (score >= 60) f.push({ icon: "check", text: "Good password strength", tone: "good" });

  return f;
}

/* ===== Utilities ===== */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

/* ===== Typewriter (handle → name, loop) ===== */
function useTypeSwap(handle: string, realName: string) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typeHandle"|"pause1"|"erase"|"typeReal"|"pause2">("typeHandle");

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const speed = reduce ? 0 : 70;
    const eraseSpeed = reduce ? 0 : 35;
    const hold1 = reduce ? 300 : 900;
    const hold2 = reduce ? 1000 : 2200;

    let cancelled = false;
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    const run = async () => {
      if (cancelled) return;

      if (phase === "typeHandle") {
        for (let i = 0; i <= handle.length; i++) { if (cancelled) return; setText(handle.slice(0, i)); await sleep(speed); }
        setPhase("pause1"); return;
      }
      if (phase === "pause1") { await sleep(hold1); setPhase("erase"); return; }
      if (phase === "erase") {
        for (let i = handle.length; i >= 0; i--) { if (cancelled) return; setText(handle.slice(0, i)); await sleep(eraseSpeed); }
        setPhase("typeReal"); return;
      }
      if (phase === "typeReal") {
        for (let i = 0; i <= realName.length; i++) { if (cancelled) return; setText(realName.slice(0, i)); await sleep(speed); }
        setPhase("pause2"); return;
      }
      if (phase === "pause2") { await sleep(hold2); setPhase("typeHandle"); }
    };

    run();
    return () => { cancelled = true; };
  }, [phase, handle, realName]);

  return text;
}

/* ===== Exact-offset hash scrolling (nav-aware, scoped to nav) ===== */
function useOffsetAnchors() {
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const navScope =
      document.querySelector<HTMLElement>("[data-nav]") ||
      document.querySelector<HTMLElement>("nav, header") ||
      document;

    const links = Array.from(
      navScope.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    );

    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href") || "";
      const id = href.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const navEl =
        document.querySelector<HTMLElement>("[data-nav]") ||
        document.querySelector<HTMLElement>("nav, header");
      const navHeight = navEl ? navEl.getBoundingClientRect().height : 0;

      const rect = target.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;

      const cushion = 4;
      const top = Math.max(0, absoluteTop - navHeight - cushion);

      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    };

    links.forEach(l => l.addEventListener("click", onClick));
    return () => links.forEach(l => l.removeEventListener("click", onClick));
  }, []);
}

/* ===== PasswordCard (inline, self-contained) ===== */
function PasswordCard() {
  const [pwd, setPwd] = useState("");
  const score = calculateStrength(pwd);
  const level = getStrengthLevel(score);
  const feedback = generateFeedback(pwd, score);

  const bar = (() => {
    const colors = {
      "Very Weak": "bg-rose-500",
      "Weak": "bg-amber-500",
      "Medium": "bg-yellow-400",
      "Strong": "bg-emerald-500",
      "Very Strong": "bg-sky-500",
    } as const;
    return colors[level as keyof typeof colors] || "bg-slate-500";
  })();

  return (
    <div className="rounded-xl bg-black/40 ring-1 ring-white/10 p-4">
      <label className="block text-sm text-sky-300/80" htmlFor="pwd">Try a password</label>
      <input
        id="pwd"
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        placeholder="Type here..."
        className="mt-2 w-full rounded-lg bg-slate-900/60 px-3 py-2 text-sky-100 ring-1 ring-white/10 outline-none focus:ring-sky-400/40"
      />

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-sky-300/80">
          <span>Strength: {level}</span>
          <span>{score}%</span>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
          <div className={`h-2 ${bar} transition-all`} style={{ width: `${score}%` }} />
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 text-xs">
        {feedback.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sky-300/85">
            <span className={`size-1.5 rounded-full ${
              f.tone === "good" ? "bg-emerald-500" : f.tone === "danger" ? "bg-rose-500" : "bg-amber-400"
            }`} />
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ===== Journey helpers and components ===== */
type Phase = { id: string; title: string; start: string; end: string; markers?: { label: string; atISO: string }[] };

function pctBetween(startISO: string, endISO: string, now = Date.now()) {
  const s = new Date(startISO + "T00:00:00").getTime();
  const e = new Date(endISO + "T00:00:00").getTime();
  if (now <= s) return 0;
  if (now >= e) return 100;
  return Math.round(((now - s) / (e - s)) * 100);
}
function fmtCountdown(endISO: string) {
  const end = new Date(endISO + "T00:00:00").getTime();
  const diff = Math.max(0, end - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${d}d ${h}h ${m}m`;
}
function phaseStatus(startISO: string, endISO: string) {
  const now = Date.now();
  const s = new Date(startISO + "T00:00:00").getTime();
  const e = new Date(endISO + "T00:00:00").getTime();
  if (now < s) {
    const daysToStart = Math.ceil((s - now) / 86400000);
    if (daysToStart <= 365) return { key: "soon" as const, label: `Starting soon • ${daysToStart}d`, dot: "bg-amber-400" };
    return { key: "scheduled" as const, label: "Scheduled", dot: "bg-slate-400" };
  }
  if (now > e) return { key: "done" as const, label: "Completed", dot: "bg-zinc-500" };
  return { key: "live" as const, label: "In progress", dot: "bg-emerald-500" };
}

function JourneyTimeline() {
  const phases: Phase[] = [
    { id: "foundations", title: "Cert IV in Cyber Security", start: "2025-10-07", end: "2026-10-07",
      markers: [{ label: "Halfway", atISO: "2026-04-07" }] },
    { id: "gap", title: "Transition and prep", start: "2026-10-08", end: "2027-02-01" },
    { id: "bachelor", title: "Bachelor of IT (Computer Science Major)", start: "2027-02-01", end: "2030-02-01",
      markers: [{ label: "Year 1", atISO: "2028-02-01" }, { label: "Year 2", atISO: "2029-02-01" }, { label: "Year 3", atISO: "2030-02-01" }] },
  ];

  const [, forceTick] = useState(0);
  useEffect(() => { const id = setInterval(() => forceTick(v => v + 1), 1000); return () => clearInterval(id); }, []);

  return (
    <ol className="mt-6 space-y-6">
      {phases.map((ph, idx) => {
        const pct = pctBetween(ph.start, ph.end);
        const st = phaseStatus(ph.start, ph.end);
        return (
          <li key={ph.id} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span className="mt-1 size-2 rounded-full bg-sky-400" />
              {idx < phases.length - 1 && <span className="mx-auto h-full w-px flex-1 bg-white/10" />}
            </div>

            <div className="flex-1 rounded-2xl bg-black/40 p-4 ring-1 ring-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-medium">{ph.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-sky-300/70">{ph.start} → {ph.end}</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2.5 py-1 text-[11px] ring-1 ring-white/10">
                    <span className={`size-2 rounded-full ${st.dot}`} />
                    <span className="text-sky-200">{st.label}</span>
                  </span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-sky-300/80">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{new Date().toLocaleString()}</span>
                </span>
                <span>Time left: {fmtCountdown(ph.end)}</span>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-sky-300/70">
                  <span>Progress</span>
                  <span>{pct}%</span>
                </div>
                <div className="mt-1 relative h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-2 bg-sky-500 transition-all" style={{ width: `${pct}%` }} />
                  {(ph.markers || []).map(m => {
                    const mp = pctBetween(ph.start, ph.end, new Date(m.atISO + "T00:00:00").getTime());
                    return (
                      <div key={m.label} className="absolute inset-y-0" style={{ left: `${mp}%` }}>
                        <div className="h-2 w-px bg-white/60" />
                        <div className="absolute -top-5 -translate-x-1/2 whitespace-nowrap text-sky-300/80">{m.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ===== Hero (with soft aurora background effect) ===== */
function Hero() {
  const text = useTypeSwap("lostastr0", "Jaineel.");

  return (
    <main id="top" className="relative min-h-screen flex flex-col items-center justify-center bg-black text-sky-200 overflow-hidden px-6">
      {/* Aurora Background Layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute h-full w-full top-0 left-0 opacity-30" style={{
          background:
            'radial-gradient(ellipse 35% 60% at 50% 30%, #33ffbb88, transparent 80%), ' +
            'radial-gradient(ellipse 40% 70% at 40% 70%, #33aaff77, transparent 75%), ' +
            'radial-gradient(ellipse 50% 80% at 70% 50%, #55ddffaa, transparent 70%)',
          animation: 'aurora 20s ease-in-out infinite alternate',
          filter: 'blur(120px)'
        }} />
        <style jsx>{`
          @keyframes aurora {
            0% {
              background-position: 50% 30%, 40% 70%, 70% 50%;
            }
            100% {
              background-position: 60% 40%, 30% 60%, 80% 40%;
            }
          }
        `}</style>
      </div>

      {/* Original Glow Blurs */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[22rem] w-[22rem] rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      {/* Hero Content */}
      <section className="relative max-w-3xl text-center z-10">
        <p className="text-sm tracking-wide text-sky-300/80 mb-2">Welcome</p>

        <h1 className="text-6xl sm:text-7xl xl:text-8xl font-semibold tracking-tight">
          <span className="text-sky-300/90">{text}</span>
          <span className="ml-1 inline-block h-[2.25rem] w-2 translate-y-1 align-middle bg-sky-400/80 animate-pulse" />
        </h1>

        <p className="mt-5 text-lg text-sky-300/85 max-w-xl mx-auto">
          Exploring cybersecurity today, growing into Computer Science tomorrow.
        </p>
      </section>

      <div className="mt-12 flex justify-center">
        <a href="#about" className="animate-bounce text-sky-400 hover:text-sky-300" aria-label="Scroll down to About section">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </main>
  );
}

/* ===== About section ===== */
function AboutSection() {
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

/* ===== Skill pill with tiny inline icons ===== */
function Pill({ label }: { label: string }) {
  const Icon = () => {
    switch (label) {
      case "Python":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 2c3 0 5 2 5 5v2H7V7c0-3 2-5 5-5zM7 11h10v2c0 3-2 5-5 5s-5-2-5-5v-2z"/></svg>;
      case "JavaScript":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 3h18v18H3zM13 17c0 2-1 3-3 3-1 0-2-.4-3-1l1-2c.5.4 1 .7 1.6.7.7 0 1.1-.3 1.1-1.2V10h2v7zm6 .1c0 1.9-1.3 2.9-3.1 2.9-1.3 0-2.3-.5-3-1.2l1.2-1.8c.5.5 1 .8 1.8.8.6 0 1.1-.3 1.1-1 0-.7-.5-1-1.3-1.4l-.4-.2c-1.2-.5-2.1-1.2-2.1-2.7 0-1.6 1.2-2.6 3-2.6 1.3 0 2.2.5 2.9 1.1l-1.1 1.7c-.5-.4-1-.7-1.7-.7-.6 0-1 .3-1 .9 0 .6.4.9 1.3 1.3l.4.2c1.4.6 2.4 1.2 2.4 2.8z"/></svg>;
      case "HTML5":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 2l1.7 19.6L12 22l7.3-.4L21 2H3zm14 5l-.2 2.2-4.8 2-.1.1H15L14.6 15 12 16l-2.6-1-.2-2H8l.1 1.7 4 .9 4-1 .6-6.6H7.2L7 6h10z"/></svg>;
      case "CSS3":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 2l1.7 19.6L12 22l7.3-.4L21 2H3zm12.9 6H9.3l.1 1.6h6.3l-.4 4.5L12 16l-3.3-1.1-.2-2h1.7l.1.9L12 14l1.7-.6.2-2.2H8.2L7.8 6h9.4l-.3 2z"/></svg>;
      case "PHP":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M4 9h4c2 0 3 1 3 3s-1 3-3 3H6v2H4V9zm2 2v2h2c1 0 1-1 1-1s0-1-1-1H6zm8-2h2v3h2V9h2v8h-2v-3h-2v3h-2V9z"/></svg>;
      case "SQL":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 3c4.4 0 8 1.6 8 3.5S16.4 10 12 10 4 8.4 4 6.5 7.6 3 12 3zm-8 6v4.5C4 15.4 7.6 17 12 17s8-1.6 8-3.5V9c-1.9 1.4-5 2.2-8 2.2S5.9 10.4 4 9zm0 6v4.5C4 21.4 7.6 23 12 23s8-1.6 8-3.5V15c-1.9 1.4-5 2.2-8 2.2S5.9 16.4 4 15z"/></svg>;
      case "Linux":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 2c2.2 0 4 1.8 4 4 0 1.3-.6 2.5-1.6 3.2.8 2.1 3.6 3.7 3.6 7.3 0 2.6-2.5 4.5-6 4.5s-6-1.9-6-4.5c0-3.6 2.8-5.2 3.6-7.3C8.6 8.5 8 7.3 8 6c0-2.2 1.8-4 4-4z"/></svg>;
      case "Bash":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 6l9-4 9 4v12l-9 4-9-4V6zm9 9h4v2h-4v-2zm-6-7l4 3-4 3V8z"/></svg>;
      case "Networking":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z"/></svg>;
      case "Databases":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 3c4.4 0 8 1.6 8 3.5S16.4 10 12 10 4 8.4 4 6.5 7.6 3 12 3zm-8 6v4.5C4 15.4 7.6 17 12 17s8-1.6 8-3.5V9c-1.9 1.4-5 2.2-8 2.2S5.9 10.4 4 9zm0 6v4.5C4 21.4 7.6 23 12 23s8-1.6 8-3.5V15c-1.9 1.4-5 2.2-8 2.2S5.9 16.4 4 15z"/></svg>;
      case "Cloud Basics":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M6 16a4 4 0 010-8 5 5 0 09.6-1.2A4 4 0 1117 16H6z"/></svg>;
      case "Data Structures":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M7 5h4v4H7V5zm6 0h4v4h-4V5zM7 11h4v4H7v-4zm6 0h4v4h-4v-4z"/></svg>;
      case "Web Security":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 2l7 4v6c0 5-3.1 7.9-7 10-3.9-2.1-7-5-7-10V6l7-4zm0 5a3 3 0 100 6 3 3 0 000-6z"/></svg>;
      default:
        return null;
    }
  };
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-slate-800/80 to-slate-900/80 px-3 py-1.5 text-sm ring-1 ring-white/10 shadow-sm">
      <Icon />
      <span>{label}</span>
    </span>
  );
}

/* ===== Hero with soft aurora background effect ===== */

/* ------------------------ Page ----------------------- */
export default function Page() {
  useOffsetAnchors();

  return (
    <>
      <Nav />

      <Hero />

      <AboutSection />

      {/* Projects */}
      <section id="projects" className="min-h-screen flex items-center bg-black text-sky-200">
        <div className="mx-auto max-w-5xl w-full px-4">
          <h2 className="text-3xl font-semibold">Projects</h2>
          <p className="mt-2 text-sky-300/80">A few things built while learning and exploring.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <article className="group rounded-2xl bg-slate-900/60 p-6 ring-1 ring-white/10 transition-colors duration-200 hover:ring-sky-400/40">
              <header className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Password Strength Checker</h3>
                <span className="text-xs text-sky-300/70">Python • UI demo</span>
              </header>
              <div className="mt-4">
                <PasswordCard />
              </div>
              <footer className="mt-5 flex items-center gap-4">
                <a
                  href="https://github.com/lostastr0/password_strength_checker_upgraded"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-400 transition-colors hover:text-sky-300"
                  aria-label="Open the Python repository on GitHub in a new tab"
                >
                  GitHub (Python) →
                </a>
                <a href="#projects" className="inline-flex items-center gap-1 text-sky-400 transition-colors hover:text-sky-300">
                  Learn more →
                </a>
              </footer>
            </article>

            <article className="rounded-2xl bg-slate-900/60 p-6 ring-1 ring-white/10">
              <h3 className="text-xl font-medium">Project Two</h3>
              <p className="mt-2 text-sky-300/80">Placeholder for the next build.</p>
              <a href="#" className="mt-3 inline-block text-sky-400 hover:text-sky-300">Details →</a>
            </article>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="min-h-screen flex items-center bg-black text-sky-200">
        <div className="mx-auto max-w-5xl w-full px-4">
          <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <h2 className="text-3xl font-semibold">Core toolkit</h2>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-6 flex flex-wrap gap-3">
              {["Python","JavaScript","HTML5","CSS3","PHP","SQL"].map((t) => (<Pill key={t} label={t} />))}
            </div>
            <h3 className="mt-10 text-2xl font-semibold">Exploring next</h3>
            <div className="mt-4 h-px bg-white/10" />
            <div className="mt-6 flex flex-wrap gap-3">
              {["Linux","Bash","Networking","Databases","Cloud Basics","Data Structures","Web Security"].map((t) => (<Pill key={t} label={t} />))}
            </div>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section id="goals" className="min-h-screen flex items-center bg-black text-sky-200">
        <div className="mx-auto max-w-5xl w-full px-4">
          <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <h2 className="text-3xl font-semibold">Learning Goals</h2>
            <div className="mt-4 h-px bg-white/10" />
            <ul className="mt-6 space-y-3">
              {[
                "Build and deploy small full‑stack apps",
                "Get confident with Linux and the terminal",
                "Practice data structures and algorithms in Python/JS",
                "Automate tasks with scripts and CLIs",
                "Understand networking and HTTP deeply",
                "Learn modern frontend patterns (React/Next)",
                "Strengthen database fundamentals (SQL + modeling)",
                "Explore cloud basics and CI/CD",
                "Study web security essentials (OWASP) and threat modeling",
                "Document projects with concise write‑ups",
              ].map((g, i) => (
                <li key={i} className="group flex items-start gap-3 rounded-xl p-2 hover:bg-white/5">
                  <span className="mt-1 size-4 shrink-0 rounded border border-white/20 bg-slate-900/40 ring-1 ring-white/5 group-hover:border-sky-400/40" />
                  <span className="text-sky-300/90">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Journey & Plan */}
      <section id="journey" className="min-h-screen flex items-center bg-black text-sky-200">
        <div className="mx-auto max-w-5xl w-full px-4">
          <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <h2 className="text-3xl font-semibold">Journey & Plan</h2>
            <p className="mt-2 text-sky-300/80">Live timeline with halfway and yearly markers.</p>
            <JourneyTimeline />
          </div>
        </div>
      </section>
    </>
  );
}
