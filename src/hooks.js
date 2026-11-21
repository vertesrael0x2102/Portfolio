import { useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function scrollToTop(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

// Adds .in-view to every .rv element the first time it scrolls into view.
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

// Returns the id of the section currently near the top, and whether the page is scrolled far enough for the up button.
export function useScrollState(ids) {
  const [state, setState] = useState({ current: null, far: false });
  useEffect(() => {
    function onScroll() {
      const line = window.innerHeight * 0.4;
      let current = null;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      const far = window.scrollY > 700;
      setState((s) => (s.current === current && s.far === far ? s : { current, far }));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return state;
}
