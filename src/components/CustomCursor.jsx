import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ─── detect touch / coarse pointer ─────────────────────────── */
function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches;
}

/* ─── spring config for outer ring lag ──────────────────────── */
const SPRING = { stiffness: 180, damping: 22, mass: 0.8 };

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  /* Raw mouse position (instant) */
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  /* Outer ring follows with spring lag */
  const ringX = useSpring(rawX, SPRING);
  const ringY = useSpring(rawY, SPRING);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    if (isCoarsePointer()) { setIsTouch(true); return; }
    // Also disable if prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setIsTouch(true); return; }

    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    /* Interactive target detection */
    const INTERACTIVE = 'a, button, [data-cursor="pointer"], input, textarea, select, label, [role="button"]';
    const onOver = (e) => {
      if (e.target?.closest?.(INTERACTIVE)) setHovered(true);
    };
    const onOut = (e) => {
      if (e.target?.closest?.(INTERACTIVE)) setHovered(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [visible]);

  /* Hide native cursor only when custom cursor is active and moving */
  useEffect(() => {
    if (!isTouch && visible) {
      document.documentElement.style.cursor = 'none';
    } else {
      document.documentElement.style.cursor = '';
    }
    return () => { document.documentElement.style.cursor = ''; };
  }, [isTouch, visible]);

  if (isTouch || !visible) return null;

  return (
    <>
      {/* ── Inner dot (instant, no lag) ── */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: rawX, y: rawY }}
      >
        <motion.div
          animate={{
            scale: hovered ? 0 : 1,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            background: '#8B5CF6',
            boxShadow: '0 0 10px 3px rgba(139,92,246,0.7)',
          }}
        />
      </motion.div>

      {/* ── Outer ring (spring lag) ── */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{
            scale: hovered ? 2.6 : 1,
            opacity: hidden ? 0 : hovered ? 0.5 : 0.65,
            borderColor: hovered ? 'rgba(139,92,246,0.9)' : 'rgba(139,92,246,0.5)',
            backgroundColor: hovered ? 'rgba(139,92,246,0.08)' : 'transparent',
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full border"
          style={{
            width: 36,
            height: 36,
            marginLeft: -18,
            marginTop: -18,
          }}
        />
      </motion.div>
    </>
  );
}

