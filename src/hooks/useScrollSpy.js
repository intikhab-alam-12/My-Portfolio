/**
 * useScrollSpy — Section-aware IntersectionObserver hook
 * Returns the id of the currently visible section.
 */
import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(sectionIds = [], options = {}) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const observerRef = useRef(null);

  useEffect(() => {
    // respect prefers-reduced-motion — still track, just no animated scroll
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    observerRef.current?.disconnect();

    const cb = (entries) => {
      // Find the topmost intersecting entry
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(cb, {
      rootMargin: options.rootMargin ?? '-20% 0px -60% 0px',
      threshold: options.threshold ?? 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sectionIds.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}

/**
 * useReducedMotion — mirrors CSS `prefers-reduced-motion`
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

