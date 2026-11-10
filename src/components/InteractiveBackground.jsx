import { useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* ─── Floating particle definition ──────────────────────────── */
function createParticle(canvas) {
  const size = Math.random() * 1.5 + 0.5;
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    size,
    alpha: Math.random() * 0.4 + 0.05,
  };
}

/* ─── Canvas Particle Layer ──────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-seed particles on resize
      particles.current = Array.from({ length: reduced ? 0 : 55 }, () =>
        createParticle(canvas)
      );
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (reduced) return () => window.removeEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

/* ─── Main background component ─────────────────────────────── */
export default function InteractiveBackground() {
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* Mouse spotlight — smooth spring */
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  );
  const spotX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const handler = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [reduced]);

  return (
    <>
      {/* ── Layer 0: Canvas Particles ── */}
      <ParticleCanvas />

      {/* ── Layer 1: Architectural grid ── */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '44px 44px',
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)
          `,
        }}
      />

      {/* ── Layer 2: Ambient gradient orbs (slow CSS animation) ── */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Purple orb */}
        <div
          className={`absolute rounded-full ${!reduced ? 'animate-float-slow' : ''}`}
          style={{
            top: '-10%',
            left: '20%',
            width: 600,
            height: 500,
            background: 'radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDuration: '12s',
          }}
        />
        {/* Blue orb */}
        <div
          className={`absolute rounded-full ${!reduced ? 'animate-float-slow' : ''}`}
          style={{
            bottom: '5%',
            right: '-5%',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animationDuration: '16s',
            animationDelay: '-6s',
          }}
        />
        {/* Subtle accent orb */}
        <div
          className={`absolute rounded-full ${!reduced ? 'animate-float-slow' : ''}`}
          style={{
            top: '50%',
            left: '-10%',
            width: 350,
            height: 350,
            background: 'radial-gradient(circle, rgba(6,182,212,0.055) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDuration: '20s',
            animationDelay: '-10s',
          }}
        />
      </div>

      {/* ── Layer 3: Mouse-tracking radial spotlight ── */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="fixed -top-48 -left-48 w-96 h-96 z-0 pointer-events-none rounded-full"
          style={{
            x: spotX,
            y: spotY,
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.04) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      )}
    </>
  );
}

