import { useEffect } from "react";

export function useOffsetAnchors() {
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
