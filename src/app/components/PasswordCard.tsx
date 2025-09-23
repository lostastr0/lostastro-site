"use client";

import { useState } from "react";

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

export default function PasswordCard() {
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
