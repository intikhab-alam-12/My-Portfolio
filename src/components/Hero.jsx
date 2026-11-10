import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { ArrowUpRight, Github, MessageSquare, ChevronDown, Sparkles, Code2, MapPin, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/intikhab-alam.jpg';

/* ══════════════════════════════════════════════════════════════
   CONSTANTS & CONFIG
══════════════════════════════════════════════════════════════ */
const ROLES = [
  'Web Developer',
  'MERN Stack Developer',
  'Frontend Developer',
  'Future Full-Stack Developer',
];

const HERO_LETTERS = 'INTIKHAB ALAM'.split('');

/* IDE code lines — each token has text + colour class */
const CODE_LINES = [
  { tokens: [{ text: 'const ', cls: 'text-purple-400' }, { text: 'developer', cls: 'text-blue-300' }, { text: ' = {', cls: 'text-slate-200' }] },
  { tokens: [{ text: '  name', cls: 'text-blue-200' }, { text: ': ', cls: 'text-slate-400' }, { text: '"Intikhab Alam"', cls: 'text-emerald-300' }, { text: ',', cls: 'text-slate-400' }] },
  { tokens: [{ text: '  role', cls: 'text-blue-200' }, { text: ': ', cls: 'text-slate-400' }, { text: '"MERN Stack Developer"', cls: 'text-emerald-300' }, { text: ',', cls: 'text-slate-400' }] },
  { tokens: [{ text: '  education', cls: 'text-blue-200' }, { text: ': ', cls: 'text-slate-400' }, { text: '"DIT — 2nd Year"', cls: 'text-emerald-300' }, { text: ',', cls: 'text-slate-400' }] },
  { tokens: [{ text: '  status', cls: 'text-blue-200' }, { text: ': ', cls: 'text-slate-400' }, { text: '"Learning & Building"', cls: 'text-amber-300' }, { text: ',', cls: 'text-slate-400' }] },
  { tokens: [{ text: '  stack', cls: 'text-blue-200' }, { text: ': [', cls: 'text-slate-400' }] },
  { tokens: [{ text: '    ', cls: '' }, { text: '"MongoDB"', cls: 'text-emerald-300' }, { text: ', ', cls: 'text-slate-400' }, { text: '"Express"', cls: 'text-yellow-300' }, { text: ',', cls: 'text-slate-400' }] },
  { tokens: [{ text: '    ', cls: '' }, { text: '"React"', cls: 'text-cyan-300' }, { text: ', ', cls: 'text-slate-400' }, { text: '"Node.js"', cls: 'text-lime-300' }] },
  { tokens: [{ text: '  ],', cls: 'text-slate-400' }] },
  { tokens: [{ text: '};', cls: 'text-slate-200' }] },
];

/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════ */

/* ── Availability badge ─────────────────────────────────────── */
function AvailabilityBadge({ reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="
        inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
        bg-white/[0.04] border border-white/[0.1]
        backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.12)]
      "
    >
      {/* Pulsing emerald dot */}
      <span className="relative flex h-2 w-2 flex-shrink-0">
        {!reduced && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
      </span>
      <span className="text-[11px] font-mono font-semibold tracking-[0.18em] text-emerald-400 uppercase">
        Available for Internships
      </span>
    </motion.div>
  );
}

/* ── Staggered hero title letters ───────────────────────────── */
const letterContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.3 },
  },
};
const letterItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function HeroTitle() {
  return (
    <motion.div
      variants={letterContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap items-end gap-x-[3px] gap-y-0 leading-none"
      aria-label="Intikhab Alam"
    >
      {HERO_LETTERS.map((char, i) =>
        char === ' ' ? (
          <span key={`sp-${i}`} className="w-3 md:w-5 lg:w-6" aria-hidden />
        ) : (
          <motion.span
            key={`${char}-${i}`}
            variants={letterItem}
            className="
              font-heading font-bold
              text-[11vw] sm:text-[9vw] md:text-7xl lg:text-8xl
              tracking-tight select-none leading-none
            "
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e2d9ff 30%, #a78bfa 60%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'sheenScroll 5s linear infinite',
              animationDelay: `${i * 0.08}s`,
            }}
          >
            {char}
          </motion.span>
        )
      )}
    </motion.div>
  );
}

/* ── Smooth role word-switcher ──────────────────────────────── */
function RoleSwitcher({ reduced }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="relative h-8 md:h-10 overflow-hidden" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="
            absolute inset-0 flex items-center
            text-lg md:text-2xl font-heading font-semibold
          "
          style={{
            background: 'linear-gradient(90deg, #8B5CF6, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ── Animated CTA Buttons ───────────────────────────────────── */
function CTAButtons({ reduced }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Primary — purple-blue gradient */}
      <motion.button
        onClick={() => scrollTo('projects')}
        whileHover={reduced ? {} : { scale: 1.04, y: -2 }}
        whileTap={reduced ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="
          relative inline-flex items-center gap-2 px-6 py-3 rounded-xl
          text-sm font-semibold text-white overflow-hidden
          bg-gradient-to-r from-purple-600 to-blue-500
          hover:from-purple-500 hover:to-blue-400
          shadow-[0_0_30px_-6px_rgba(139,92,246,0.55)]
          hover:shadow-[0_0_40px_-4px_rgba(139,92,246,0.7)]
          transition-all duration-200
        "
        data-cursor="pointer"
        aria-label="View my projects"
      >
        {/* Shimmer sweep */}
        <motion.span
          aria-hidden
          className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none"
          animate={reduced ? {} : {
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.14) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
          }}
        />
        <span className="relative">View My Projects</span>
        <ArrowUpRight size={15} className="relative" />
      </motion.button>

      {/* Secondary — glass */}
      <motion.button
        onClick={() => scrollTo('contact')}
        whileHover={reduced ? {} : { scale: 1.04, y: -2 }}
        whileTap={reduced ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="
          inline-flex items-center gap-2 px-6 py-3 rounded-xl
          text-sm font-semibold text-slate-200
          bg-white/[0.04] backdrop-blur-sm
          border border-white/[0.1]
          hover:bg-white/[0.08] hover:border-white/[0.18]
          hover:text-white
          transition-all duration-200
        "
        data-cursor="pointer"
        aria-label="Go to contact section"
      >
        Contact Me
      </motion.button>
    </div>
  );
}

/* ── Social icon links ──────────────────────────────────────── */
function SocialLinks({ reduced }) {
  const links = [
    {
      href: personalInfo.contact.github,
      label: 'GitHub — @intikhab-alam-12',
      title: 'GitHub',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
      colour: 'hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/8 hover:shadow-[0_0_16px_rgba(139,92,246,0.25)]',
    },
    {
      href: personalInfo.contact.whatsappLink,
      label: 'WhatsApp — +92 329 9599805',
      title: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      colour: 'hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/8 hover:shadow-[0_0_16px_rgba(16,185,129,0.25)]',
    },
  ];

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mr-1 hidden sm:block">Find me</span>
      {links.map((l) => (
        <motion.a
          key={l.title}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          whileHover={reduced ? {} : { y: -2, scale: 1.08 }}
          whileTap={reduced ? {} : { scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className={`
            p-2.5 rounded-xl text-slate-500 border border-white/[0.08]
            bg-white/[0.03] backdrop-blur-sm
            transition-all duration-200 ${l.colour}
          `}
          data-cursor="pointer"
        >
          {l.icon}
        </motion.a>
      ))}

      {/* Scroll-down hint */}
      <motion.div
        className="ml-4 hidden lg:flex flex-col items-center gap-1 text-slate-700"
        animate={reduced ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] font-mono tracking-widest rotate-90 origin-center mb-2">scroll</span>
        <ChevronDown size={13} />
      </motion.div>
    </div>
  );
}

/* ── Profile Portrait Card ──────────────────────────────────── */
function ProfilePortrait({ reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto mb-2"
    >
      {/* Outer ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2.5 rounded-3xl opacity-50 blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.18) 50%, transparent 75%)',
        }}
      />

      {/* Main glass frame */}
      <div
        className="
          relative rounded-3xl p-3
          bg-[#0D0F1A]/85 backdrop-blur-2xl
          border border-white/[0.1]
          shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]
          transition-all duration-300 hover:border-purple-500/30
        "
      >
        {/* Futuristic corner crosshairs */}
        <span className="absolute -top-1 -left-1 text-[10px] text-purple-400/60 font-mono select-none">+</span>
        <span className="absolute -top-1 -right-1 text-[10px] text-blue-400/60 font-mono select-none">+</span>
        <span className="absolute -bottom-1 -left-1 text-[10px] text-purple-400/60 font-mono select-none">+</span>
        <span className="absolute -bottom-1 -right-1 text-[10px] text-blue-400/60 font-mono select-none">+</span>

        {/* Image viewport */}
        <div className="relative aspect-[4/4.3] w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.08] group">
          <img
            src={profileImg}
            alt="Intikhab Alam — Web & MERN Stack Developer"
            className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
            loading="eager"
          />

          {/* Subtle gradient overlay at bottom for pill contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090D]/80 via-transparent to-transparent pointer-events-none" />

          {/* Floating Top Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>Developer</span>
          </div>

          {/* Floating Bottom Status Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono font-medium text-emerald-400">Open to Internships</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Pakistan</span>
          </div>
        </div>

        {/* Identity bar */}
        <div className="mt-3 px-2 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-white text-base leading-tight">Intikhab Alam</h3>
            <p className="text-[11px] font-mono text-slate-400 mt-0.5">DIT — 2nd Year</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono text-purple-300">
              MERN Stack
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── IDE Code Card ──────────────────────────────────────────── */
function IDECard({ reduced }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  /* Animate lines in one-by-one */
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setVisibleLines(CODE_LINES.length); return; }

    let line = 0;
    const id = setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= CODE_LINES.length) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  }, [inView, reduced]);

  /* Blinking cursor */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="
        relative rounded-2xl overflow-hidden
        bg-[#0D0F1A]/90 backdrop-blur-xl
        border border-white/[0.1]
        shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]
      "
      style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px -20px rgba(139,92,246,0.25)' }}
    >
      {/* ── macOS title bar ── */}
      <div className="flex items-center gap-0 px-4 py-3 bg-white/[0.03] border-b border-white/[0.07]">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.6)]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.5)]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.5)]" />
        </div>

        {/* File tabs */}
        <div className="flex items-center">
          <div className="
            flex items-center gap-2 px-3 py-1 rounded-t-md
            bg-[#1A1D2E]/80 border border-white/[0.08] border-b-transparent
            -mb-[13px]
          ">
            {/* JS file icon */}
            <span className="w-3 h-3 rounded-sm bg-yellow-400/90 flex items-center justify-center">
              <span className="text-[6px] font-black text-yellow-900 leading-none">JS</span>
            </span>
            <span className="text-[11px] text-slate-300 font-mono">developer.js</span>
            <span className="text-[9px] text-slate-600 ml-1">×</span>
          </div>
        </div>

        {/* Right decoration */}
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-purple-500/60" />
          <span className="text-[9px] font-mono text-slate-600 tracking-widest">JAVASCRIPT</span>
        </div>
      </div>

      {/* ── Code area ── */}
      <div className="relative flex p-4 pt-5 overflow-x-auto">
        {/* Line numbers gutter */}
        <div className="flex-shrink-0 flex flex-col mr-5 select-none" aria-hidden>
          {CODE_LINES.map((_, i) => (
            <span
              key={i}
              className="font-mono text-[11px] leading-6 text-right"
              style={{ color: i < visibleLines ? 'rgba(100,116,139,0.6)' : 'transparent', minWidth: 16 }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code lines */}
        <div className="flex-1 min-w-0">
          {CODE_LINES.map((line, i) => (
            <div key={i} className="font-mono text-[12px] leading-6 whitespace-nowrap">
              {i < visibleLines ? (
                <span>
                  {line.tokens.map((tok, j) => (
                    <span key={j} className={tok.cls}>{tok.text}</span>
                  ))}
                  {/* Blinking cursor at the end of last visible line */}
                  {i === visibleLines - 1 && visibleLines < CODE_LINES.length && (
                    <span
                      className="inline-block w-[2px] h-[14px] ml-0.5 align-middle rounded-sm"
                      style={{
                        background: '#8B5CF6',
                        opacity: cursorOn ? 1 : 0,
                        boxShadow: '0 0 6px rgba(139,92,246,0.9)',
                        transition: 'opacity 0.1s',
                      }}
                    />
                  )}
                </span>
              ) : (
                <span className="text-transparent select-none">{'.'}</span>
              )}
            </div>
          ))}

          {/* Final steady cursor after all lines render */}
          {visibleLines >= CODE_LINES.length && (
            <div className="font-mono text-[12px] leading-6 mt-0.5">
              <span
                className="inline-block w-[2px] h-[14px] align-middle rounded-sm"
                style={{
                  background: '#8B5CF6',
                  opacity: cursorOn ? 1 : 0,
                  boxShadow: '0 0 6px rgba(139,92,246,0.9)',
                  transition: 'opacity 0.1s',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="flex items-center gap-4 px-4 py-2 bg-purple-600/10 border-t border-white/[0.05]">
        <span className="text-[9px] font-mono text-purple-400 tracking-wider">⬤ Ln {visibleLines}, Col 1</span>
        <span className="text-[9px] font-mono text-slate-600 ml-auto tracking-wider">UTF-8  ·  JavaScript</span>
      </div>

      {/* Corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 opacity-30 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(20px)' }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  return (
    <>
      {/* Global sheen keyframe — injected once */}
      <style>{`
        @keyframes sheenScroll {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>

      <section
        id="home"
        ref={sectionRef}
        className="
          relative z-10 min-h-screen flex items-center
          px-5 sm:px-8 md:px-12 lg:px-16
          pt-20 pb-12
        "
        aria-label="Hero — Intikhab Alam"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ═══ LEFT COLUMN ═══════════════════════════════════ */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">

              {/* Availability badge */}
              <AvailabilityBadge reduced={reduced} />

              {/* Sub-intro */}
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-slate-400 text-lg font-medium tracking-wide -mb-3"
              >
                Hi, I'm
              </motion.p>

              {/* Main staggered title */}
              <HeroTitle />

              {/* Role switcher */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-center gap-3 mt-1"
              >
                <span className="w-8 h-[2px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0" />
                <RoleSwitcher reduced={reduced} />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="text-slate-400 text-base md:text-[17px] leading-relaxed max-w-lg"
              >
                Passionate about building modern websites, learning new technologies, and turning ideas into practical digital experiences.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <CTAButtons reduced={reduced} />
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
                className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent origin-left"
              />

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                <SocialLinks reduced={reduced} />
              </motion.div>
            </div>

            {/* ═══ RIGHT COLUMN ══════════════════════════════════ */}
            <div className="flex flex-col items-center gap-5 order-1 lg:order-2">

              {/* Authentic Developer Portrait Frame */}
              <ProfilePortrait reduced={reduced} />

              {/* IDE Code Card */}
              <div className="w-full max-w-sm md:max-w-md lg:max-w-full">
                <IDECard reduced={reduced} />
              </div>

              {/* Quick stat pills below the card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap justify-center gap-2.5 w-full"
              >
                {[
                  { label: 'Education', value: 'DIT 2nd Year', color: 'purple' },
                  { label: 'Stack', value: 'MERN + React', color: 'blue' },
                  { label: 'Projects', value: '5+ Builds', color: 'emerald' },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className={`
                      px-4 py-2 rounded-xl text-center
                      bg-white/[0.03] border border-white/[0.07]
                      backdrop-blur-sm
                    `}
                  >
                    <div className={`text-xs font-semibold text-${color}-400 font-mono`}>{value}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Scroll indicator (bottom center) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex justify-center mt-16 lg:mt-20"
            aria-hidden
          >
            <motion.div
              animate={reduced ? {} : { y: [0, 7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-slate-700 cursor-pointer"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
              }}
            >
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-slate-700 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

