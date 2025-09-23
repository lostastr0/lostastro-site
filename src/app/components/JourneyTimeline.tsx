"use client";
import { useEffect, useState } from "react";

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
      return { label: `Starting soon • ${daysToStart}d`, dot: "bg-yellow-400" };
    }
    return { label: "Scheduled", dot: "bg-gray-500" };
  }
  if (now >= end) {
    return { label: "Completed", dot: "bg-green-500" };
  }
  return { label: "In progress", dot: "bg-blue-500 animate-pulse" };
}

function fmtCountdown(endISO: string) {
  const now = Date.now();
  const end = new Date(endISO).getTime();
  const diff = end - now;
  if (diff <= 0) return "Done 🎉";
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  if (d > 30) return `${d} days left`;
  if (d > 0) return `${d}d ${h}h`;
  return `${h}h ${m}m`;
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

export default function Timeline() {
  const [tick, setTick] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-0">
      {/* SPINE: always full length, perfectly centered with dot column */}
      <div className="absolute top-0 bottom-0 left-8 w-px bg-gray-700/50 z-0" />
      <ol className="space-y-16 relative z-10">
        {phases.map((phase, idx) => {
          const status = phaseStatus(phase.start, phase.end, tick);
          const start = new Date(phase.start).getTime();
          const end = new Date(phase.end).getTime();
          const progress = tick <= start ? 0 : tick >= end ? 100 : ((tick - start) / (end - start)) * 100;

          return (
            <li key={phase.id} className="flex relative">
              {/* Dot column, always centered with spine */}
              <div className="flex flex-col items-center w-8 mr-8 flex-shrink-0 z-10">
                <span
                  className={`block w-4 h-4 rounded-full ${status.dot} ring-2 ring-white shadow-md`}
                  title={`${phase.title} status: ${status.label}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="rounded-2xl bg-gray-800/90 p-6 sm:p-8 ring-1 ring-gray-700/70 shadow-lg shadow-black/20 space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white leading-relaxed">{phase.title}</h3>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-sm text-gray-400">{new Date(phase.start).toLocaleDateString("en-AU")} — {new Date(phase.end).toLocaleDateString("en-AU")}</span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1.5 text-sm text-gray-300 ring-1 ring-gray-600 shadow">
                        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                        <span>{status.label}</span>
                      </span>
                    </div>
                  </div>
                  {/* Time + Countdown */}
                  <div className="flex justify-between items-center mb-6 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-xs sm:text-sm leading-relaxed">{fmtDateTime(new Date(tick))}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-gray-900 text-gray-200 ring-1 ring-gray-700 text-xs sm:text-sm shadow-sm">
                      ⏳ {fmtCountdown(phase.end)}
                    </span>
                  </div>
                  {/* Progress Bar + Markers */}
                  <div className="relative h-24">
                    <div className="absolute inset-x-6 top-8 h-2.5 rounded-full bg-gray-700/60 shadow-inner">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-md" style={{ width: `${progress}%` }} />
                    </div>
                    {phase.markers?.map((marker, i, arr) => {
                      const pos = arr.length <= 1 ? 0.5 : i / (arr.length - 1);
                      const left = `${pos * 100}%`;
                      const markerTime = new Date(marker.atISO + "T00:00:00").getTime();
                      const reached = tick >= markerTime;
                      return (
                        <div
                          key={marker.label}
                          className="absolute flex flex-col items-center"
                          style={{
                            left,
                            top: "1.5rem",
                            transform: "translateX(-50%)"
                          }}
                          title={`${marker.label} - ${new Date(marker.atISO).toLocaleDateString("en-AU")}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 shadow ${reached ? "bg-blue-500 ring-2 ring-blue-300" : "bg-gray-500 ring-2 ring-gray-400"} transition-transform hover:scale-110`} />
                          <span className={`mt-3 text-xs text-center leading-snug ${reached ? "text-gray-200" : "text-gray-500"}`}>{marker.label}</span>
                          <span className="text-[11px] text-gray-400 mt-1">{new Date(marker.atISO).toLocaleDateString("en-AU")}</span>
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
    </div>
  );
}
