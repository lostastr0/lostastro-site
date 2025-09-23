"use client";

export default function Pill({ label }: { label: string }) {
  const Icon = () => {
    switch (label) {
      case "Python":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M12 2c3 0 5 2 5 5v2H7V7c0-3 2-5 5-5"/></svg>;
      case "JavaScript":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 3h18v18H3"/></svg>;
      case "HTML5":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 2l1.7 19.6L12 22"/></svg>;
      case "CSS3":
        return <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M3 2l1.7 19.6L12 22"/></svg>;
      // Add other cases here with respective SVGs
      default:
        return null;
    }
  };

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 px-3 py-1.5 text-sm ring-1 ring-white/10 shadow-sm">
      <Icon />
      <span>{label}</span>
    </span>
  );
}
