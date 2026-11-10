import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { personalInfo } from '../data/portfolioData';
import ThemeToggle from './ThemeToggle';

/* ─── Config ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',      href: '#home' },
  { label: 'About',     href: '#about' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Contact',   href: '#contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

/* ─── Smooth scroll helper ───────────────────────────────────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}

/* ─── Logo component ─────────────────────────────────────────── */
function Logo() {
  return (
    <motion.a
      href="#home"
      onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
      className="flex items-center gap-2 font-mono text-sm md:text-base font-medium leading-none select-none cursor-pointer group"
      aria-label="Go to top — Intikhab Alam"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      data-cursor="pointer"
    >
      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-purple-500/40 shadow-[0_0_10px_rgba(139,92,246,0.3)] flex-shrink-0">
        <img src="/profile.jpg" alt="Intikhab Alam" className="w-full h-full object-cover object-top" />
      </div>
      <div className="flex items-center gap-0.5">
        <span className="text-slate-500 text-xs">&lt;</span>
        <span className="text-purple-400 font-semibold">&nbsp;Intikhab</span>
        <span className="text-slate-500 mx-0.5">.</span>
        <span className="text-blue-400 font-semibold">Alam</span>
        <span className="text-slate-500 text-xs">&nbsp;/&gt;</span>
      </div>
    </motion.a>
  );
}

/* ─── Desktop nav link with animated underline ───────────────── */
function NavLink({ link, isActive, onClick }) {
  return (
    <motion.a
      href={link.href}
      onClick={(e) => { e.preventDefault(); onClick(link.href.slice(1)); }}
      className={`
        relative px-1 py-1 text-sm font-medium transition-colors duration-200 cursor-pointer
        ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
      `}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      data-cursor="pointer"
      aria-current={isActive ? 'page' : undefined}
    >
      {link.label}
      {/* Active animated pill underline */}
      {isActive && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
            boxShadow: '0 0 8px 2px rgba(139,92,246,0.5)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

/* ─── Mobile drawer link ─────────────────────────────────────── */
function MobileLink({ link, index, isActive, onClick }) {
  return (
    <motion.a
      href={link.href}
      onClick={(e) => { e.preventDefault(); onClick(link.href.slice(1)); }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`
        flex items-center gap-3 px-6 py-4 text-lg font-medium border-b border-white/[0.05]
        transition-colors duration-150 cursor-pointer
        ${isActive ? 'text-purple-300' : 'text-slate-300 hover:text-white'}
      `}
      data-cursor="pointer"
      aria-current={isActive ? 'page' : undefined}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200"
        style={{ background: isActive ? '#8B5CF6' : 'rgba(255,255,255,0.15)' }}
      />
      {link.label}
    </motion.a>
  );
}

/* ─── Hire Me — magnetic button ─────────────────────────────── */
function HireMeButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="
        relative hidden md:inline-flex items-center gap-2 px-4 py-1.5
        rounded-lg text-sm font-semibold text-white overflow-hidden
        border border-purple-500/40
        bg-gradient-to-r from-purple-600/20 to-blue-600/15
        hover:from-purple-600/35 hover:to-blue-600/25
        hover:border-purple-400/60 hover:shadow-[0_0_20px_-4px_rgba(139,92,246,0.4)]
        transition-all duration-200 cursor-pointer
      "
      data-cursor="pointer"
      aria-label="Hire Intikhab — scroll to contact"
    >
      {/* Shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 opacity-0 hover:opacity-100"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />
      <span className="relative">Hire Me</span>
    </motion.button>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Close drawer on ESC */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((id) => {
    scrollTo(id);
    setMenuOpen(false);
  }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`
          fixed top-0 left-0 right-0 z-[500] transition-all duration-300
          ${scrolled
            ? 'bg-[#08090D]/80 backdrop-blur-md border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent border-b border-transparent'}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo />

          {/* Center desktop links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7" aria-label="Site sections">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                isActive={activeId === link.href.slice(1)}
                onClick={handleNavClick}
              />
            ))}
          </nav>

          {/* Right: Theme Toggle + Hire Me + hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />
            <HireMeButton onClick={() => handleNavClick('contact')} />

            {/* Hamburger (mobile only) */}
            <motion.button
              className="md:hidden relative z-10 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              data-cursor="pointer"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Glassmorphic Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[490] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="
                fixed top-0 right-0 bottom-0 z-[495] w-72 md:hidden
                bg-[#0D0F17]/95 backdrop-blur-xl
                border-l border-white/[0.08]
                flex flex-col pt-20 pb-8
                shadow-[-20px_0_60px_rgba(0,0,0,0.5)]
              "
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Purple gradient accent */}
              <div
                aria-hidden
                className="absolute top-0 right-0 w-40 h-40 opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Links */}
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <MobileLink
                    key={link.href}
                    link={link}
                    index={i}
                    isActive={activeId === link.href.slice(1)}
                    onClick={handleNavClick}
                  />
                ))}
              </nav>

              {/* CTA in drawer */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-auto px-6"
              >
                <div className="mb-3">
                  <ThemeToggle showLabel className="w-full justify-center py-2.5" />
                </div>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="
                    w-full py-3 rounded-xl text-sm font-semibold text-white
                    bg-gradient-to-r from-purple-600 to-blue-600
                    hover:from-purple-500 hover:to-blue-500
                    shadow-[0_0_20px_rgba(139,92,246,0.3)]
                    transition-all duration-200
                  "
                  data-cursor="pointer"
                >
                  Hire Me
                </button>

                {/* Quick contact links */}
                <div className="flex items-center justify-center gap-4 mt-5">
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-purple-400 transition-colors font-mono"
                    data-cursor="pointer"
                  >
                    GitHub
                  </a>
                  <span className="text-slate-700">·</span>
                  <a
                    href={personalInfo.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-green-400 transition-colors font-mono"
                    data-cursor="pointer"
                  >
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

