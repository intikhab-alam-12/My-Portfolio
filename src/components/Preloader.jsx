import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useReducer } from 'react';

/* ─── helpers ───────────────────────────────────────────────── */
const LETTERS = 'INTIKHAB ALAM'.split('');

// Stagger config
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: 'blur(6px)',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const curtainVariants = {
  initial: { y: 0 },
  exit: {
    y: '-100%',
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
  },
};

/* ─── component ─────────────────────────────────────────────── */
export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  /* Animated counter 0 → 100 */
  useEffect(() => {
    // Check prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // Skip animation immediately
      setCount(100);
      setDone(true);
      setRemoved(true);
      onComplete?.();
      return;
    }

    let start = null;
    const duration = 1100; // ms snappy and silky-smooth

    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Snappy transition
        setTimeout(() => setDone(true), 120);
      }
    };

    const raf = requestAnimationFrame(step);

    // Guaranteed fallback timer so background tabs or slow RAF never get stuck
    const safetyTimer = setTimeout(() => {
      setCount(100);
      setDone(true);
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Guarantee preloader DOM node is cleared after curtain lifts
  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => {
        setRemoved(true);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  if (removed) return null;

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {!done && (
        <motion.div
          key="preloader"
          variants={curtainVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08090D] overflow-hidden"
        >
          {/* Ambient glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/8 blur-[80px]" />
          </div>

          {/* Letter-by-letter name reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex items-end gap-[2px] mb-14 overflow-hidden"
            aria-label="Intikhab Alam"
          >
            {LETTERS.map((char, i) =>
              char === ' ' ? (
                <span key={i} className="w-4 md:w-6" aria-hidden />
              ) : (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="
                    font-heading font-bold text-4xl md:text-6xl lg:text-7xl
                    tracking-[0.08em] select-none
                    bg-gradient-to-br from-white via-slate-200 to-slate-400
                    bg-clip-text text-transparent
                  "
                  style={{
                    textShadow: '0 0 40px rgba(139,92,246,0.25)',
                  }}
                >
                  {char}
                </motion.span>
              )
            )}
          </motion.div>

          {/* Progress block */}
          <div className="relative z-10 w-64 md:w-80 flex flex-col items-center gap-3">
            {/* Percentage label */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-sm text-slate-500 tabular-nums tracking-widest"
            >
              {String(count).padStart(3, '0')}%
            </motion.span>

            {/* Progress bar track */}
            <div className="w-full h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${count}%`,
                  background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
                  boxShadow: '0 0 12px 2px rgba(139,92,246,0.5), 0 0 20px 4px rgba(59,130,246,0.25)',
                }}
                /* width is driven by count state; keep transition minimal for counter smoothness */
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-slate-600"
            >
              Crafting experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

