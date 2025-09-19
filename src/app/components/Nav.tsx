"use client";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl bg-black/40 px-3 py-2 ring-1 ring-white/10 backdrop-blur">
          <a href="#top" className="text-sky-200">lostastro</a>
          <ul className="flex items-center gap-3 text-sm text-sky-300/80">
            <li><a href="#projects" className="hover:text-sky-200">Projects</a></li>
            <li><a href="#skills" className="hover:text-sky-200">Skills</a></li>
            <li><a href="#goals" className="hover:text-sky-200">Goals</a></li>
            <li><a href="#journey" className="hover:text-sky-200">Journey</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
