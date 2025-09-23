import { useState, useEffect } from "react";

export function useTypeSwap(handle: string, realName: string) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typeHandle" | "pause1" | "erase" | "typeReal" | "pause2">("typeHandle");

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}


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
