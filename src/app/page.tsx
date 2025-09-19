"use client";

import { useMemo, useState, useEffect } from "react";
import Nav from "./components/Nav";

/* ===== Original-style strength logic (React version) ===== */
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
  if (lowercase.test(pwd) && uppercase.test(pwd) && digits.test(pwd) && specialChars.test(pwd)) score += 10;
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

/* ===== Password demo card ===== */
function PasswordCard() {
  const [pw, setPw] = useState("");
  const score = useMemo(() => calculateStrength(pw), [pw]);
  const level = useMemo(() => getStrengthLevel(score), [score]);
  const feedback = useMemo(() => generateFeedback(pw, score), [pw, score]);

  const barColor = score >= 80 ? "bg-green-600" : score >= 60 ? "bg-emerald-500" : score >= 40 ? "bg-yellow-500" : score >= 20 ? "bg-orange-500" : "bg-red-500";
  const labelColor = score >= 80 ? "text-green-400" : score >= 60 ? "text-emerald-400" : score >= 40 ? "text-yellow-400" : score >= 20 ? "text-orange-400" : "text-red-400";

  return (
    <div className="mt-4">
      <label className="block text-sm text-sky-300/80">Try a password</label>
      <input
        type="text"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="Type here…"
        className="mt-2 w-full rounded-lg bg-slate-800 px-3 py-2 text-sky-100 outline-none ring-1 ring-white/10 focus:ring-sky-400/40"
      />
      <p className={`mt-3 text-sm ${labelColor}`}>Strength: {level} ({score}/100)</p>
      <div className="mt-2 h-2 w-full rounded-full bg-slate-700">
        <div className={`h-2 rounded-full transition-all duration-200 ${barColor}`} style={{ width: `${score}%` }} />
      </div>
      <ul className="mt-3 space-y-1 text-sm">
        {feedback.map((item, i) => (
          <li key={i} className={item.tone === "good" ? "text-emerald-300/90" : item.tone === "danger" ? "text-red-300/90" : "text-yellow-300/90"}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
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
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zm-8 6v4c0 1.7 3.6 3 8 3s8-1.3 8-3V9c-1.7 1.3-5 2-8 2s-6.3-.7-8-2zm0 6v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4c-1.7 1.3-5 2-8 2s-6.3-.7-8-2z"/></svg>;
      case "Linux":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 2c2.2 0 4 1.8 4 4 0 1.3-.6 2.5-1.6 3.2.8 2.1 3.6 3.7 3.6 7.3 0 2.6-2.5 4.5-6 4.5s-6-1.9-6-4.5c0-3.6 2.8-5.2 3.6-7.3C8.6 8.5 8 7.3 8 6c0-2.2 1.8-4 4-4z"/></svg>;
      case "Bash":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 6l9-4 9 4v12l-9 4-9-4V6zm9 9h4v2h-4v-2zm-6-7l4 3-4 3V8z"/></svg>;
      case "Nmap":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 3a9 9 0 100 18 9 9 0 000-18zm1 4v5l4 2-.7 1.4L11 13V7h2z"/></svg>;
      case "Wireshark":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 18c3-6 7-9 9-9s6 3 9 9H3z"/></svg>;
      case "Burp Suite":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M4 4h16v16H4V4zm3 3v10h10V7H7z"/></svg>;
      case "TryHackMe":
      case "Hack The Box":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.2L5 7.2v9.6l7 3.9 7-3.9V7.2l-7-3z"/></svg>;
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

/* ===== Journey helpers (time-only + status) ===== */
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

/* ===== Journey timeline component (live, no checkboxes) ===== */
function JourneyTimeline() {
  const phases: Phase[] = [
    {
      id: "cert4",
      title: "Cert IV in Cybersecurity",
      start: "2025-10-07",
      end:   "2026-10-07",
      markers: [{ label: "Halfway", atISO: "2026-04-07" }],
    },
    {
      id: "gap",
      title: "Transition to Bachelor (prep)",
      start: "2026-10-08",
      end:   "2027-02-01",
    },
    {
      id: "bachelor",
      title: "Bachelor of IT (Computer Science Major)",
      start: "2027-02-01",
      end:   "2030-02-01",
      markers: [
        { label: "Year 1", atISO: "2028-02-01" },
        { label: "Year 2", atISO: "2029-02-01" },
        { label: "Year 3", atISO: "2030-02-01" },
      ],
    },
  ];

  const [, forceTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceTick(v => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

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

              {/* live clock + countdown */}
              <div className="mt-2 flex items-center justify-between text-xs text-sky-300/80">
                <span className="inline-flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{new Date().toLocaleString()}</span>
                </span>
                <span>Time left: {fmtCountdown(ph.end)}</span>
              </div>

              {/* progress bar with markers */}
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
                        <div className="absolute -top-5 -translate-x-1/2 whitespace-nowrap text-[10px] text-sky-300/80">{m.label}</div>
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

/* ------------------------ Page ----------------------- */
export default function Page() {
  return (
    <>
      <Nav />

      <main id="top" className="min-h-screen flex items-center justify-center bg-black text-sky-200">
        <section className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight">Hello, World</h1>
          <p className="mt-3 text-sky-300/80">Cybersecurity learner • Future ethical hacker</p>
        </section>
      </main>

      {/* About */}
      <section id="about" className="scroll-mt-20 mx-auto max-w-5xl px-4 pt-10 text-sky-200">
        <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <h2 className="text-3xl font-semibold text-center">About</h2>
          <p className="mt-3 text-center text-sky-300/85">
            Learning cybersecurity from the ground up with Linux, scripting, and hands‑on labs.
            Starting Cert IV on Oct 7, 2025, then a Bachelor of IT (Computer Science major) in early 2027.
            This site tracks progress with small projects, simple notes, and a live timeline.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">Cert IV • 2025 → 2026</span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">Transition • late 2026 → early 2027</span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">Bachelor CS • 2027 → 2030</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
            <a href="#projects" className="rounded-lg bg-sky-500/10 px-3 py-1.5 text-sky-200 ring-1 ring-sky-400/20 hover:bg-sky-500/15">
              View projects
            </a>
            <a href="#journey" className="rounded-lg bg-white/5 px-3 py-1.5 text-sky-200 ring-1 ring-white/10 hover:bg-white/10">
              See journey
            </a>
            <a href="#skills" className="rounded-lg bg-white/5 px-3 py-1.5 text-sky-200 ring-1 ring-white/10 hover:bg-white/10">
              Skills
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-24 text-sky-200">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <p className="mt-2 text-sky-300/80">A few things built while learning.</p>

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
            <a href="#" className="mt-3 inline-block text-sky-400 hover:text-sky-300">
              Details →
            </a>
          </article>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-24 text-sky-200">
        <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <h2 className="text-3xl font-semibold">Stuff I’m Comfortable With</h2>
          <div className="mt-4 h-px bg-white/10" />
          <div className="mt-6 flex flex-wrap gap-3">
            {["Python","JavaScript","HTML5","CSS3","PHP","SQL"].map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>

          <h3 className="mt-10 text-2xl font-semibold">Currently Figuring Out</h3>
          <div className="mt-4 h-px bg-white/10" />
          <div className="mt-6 flex flex-wrap gap-3">
            {["Linux","Bash","Nmap","Wireshark","Burp Suite","TryHackMe","Hack The Box"].map((t) => (
              <Pill key={t} label={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section id="goals" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-24 text-sky-200">
        <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <h2 className="text-3xl font-semibold">Learning Goals</h2>
          <div className="mt-4 h-px bg-white/10" />
          <ul className="mt-6 space-y-3">
            {[
              "Get comfy with Linux basics",
              "Write Bash scripts without Googling every 5 mins",
              "Build small security‑related projects",
              "Learn data structures & algorithms in Python",
              "Work towards CompTIA Security+",
              "Master shell scripting (Bash & PowerShell)",
              "Understand networking fundamentals deeply",
              "Learn pentesting methodologies and tools",
              "Explore web security concepts (OWASP)",
              "Get familiar with cloud security basics",
              "Practice incident response & forensics basics",
            ].map((g, i) => (
              <li key={i} className="group flex items-start gap-3 rounded-xl p-2 hover:bg-white/5">
                <span className="mt-1 size-4 shrink-0 rounded border border-white/20 bg-slate-900/40 ring-1 ring-white/5 group-hover:border-sky-400/40" />
                <span className="text-sky-300/90">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey & Plan (time-driven + status badges) */}
      <section id="journey" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-24 text-sky-200">
        <div className="rounded-3xl bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
          <h2 className="text-3xl font-semibold">Journey & Plan</h2>
          <p className="mt-2 text-sky-300/80">Live timeline with halfway and yearly markers.</p>
          <JourneyTimeline />
        </div>
      </section>
    </>
  );
}
