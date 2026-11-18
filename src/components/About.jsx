import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2, Server, Plug, Braces, Database, GitBranch,
  MapPin, GraduationCap, Wifi, Copy, Check, Sparkles, Layers, Cpu
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/intikhab-alam.jpg';
import { TechEcosystemOrbital, SectionDivider } from './illustrations';

/* ══════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════ */

/* Bio paragraphs with highlighted keyword spans */
const BIO_PARAGRAPHS = [
  {
    text: "I am a dedicated {Web and Frontend Developer} currently pursuing my {Diploma in Information Technology (DIT)} in Pakistan. With a solid academic foundation in computer science fundamentals and practical software tools, I focus on turning ideas into clean, intuitive, and interactive digital experiences.",
  },
  {
    text: "My primary frontend toolkit centers around {React.js}, modern {JavaScript (ES6+)}, and {Tailwind CSS}. I place high value on clean component architecture, responsive mobile-first layouts, and smooth 60fps micro-interactions that elevate user experience without adding unnecessary bloat.",
  },
  {
    text: "Driven by curiosity and a commitment to {continuous learning}, I am actively expanding into full-stack development within the MERN ecosystem — engineering server routes with {Node.js} and {Express}, designing document schemas in {MongoDB}, and exploring hybrid rendering in {Next.js}.",
  },
  {
    text: "Beyond writing code, I practice disciplined engineering habits: semantic {HTML5} for accessibility and SEO, structured {Git} workflows for version control on {GitHub}, and clear code organization that makes collaborative development seamless.",
  },
  {
    text: "I am actively seeking {internship opportunities} and {junior developer roles} where I can contribute my frontend skills, tackle challenging real-world problems, and continue growing alongside experienced engineering teams.",
  },
];

/* Developer spec entries */
const SPECS = [
  { key: 'name',         value: '"Intikhab Alam"',          valueClass: 'text-emerald-300' },
  { key: 'focus',        value: '"Web & MERN Stack"',        valueClass: 'text-sky-300'    },
  { key: 'education',    value: '"DIT — 2nd Year"',          valueClass: 'text-amber-300'  },
  { key: 'based_in',     value: '"Pakistan"',                valueClass: 'text-pink-300'   },
  { key: 'learning',     value: '["MongoDB", "Next.js"]',    valueClass: 'text-violet-300' },
  { key: 'availability', value: '"Open to Internships"',     valueClass: 'text-emerald-400'},
];

/* Focus area cards */
const FOCUS_CARDS = [
  {
    icon: Code2,
    title: 'Frontend Development',
    desc: 'Building pixel-perfect, responsive UIs with React, Tailwind CSS, and modern CSS primitives.',
    accent: 'from-purple-500/15 to-blue-500/10',
    glow: 'hover:shadow-[0_0_28px_-6px_rgba(139,92,246,0.4)]',
    border: 'hover:border-purple-500/40',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
  },
  {
    icon: Server,
    title: 'Backend Development',
    desc: 'Designing server-side logic, REST endpoints, and middleware pipelines with Node.js & Express.',
    accent: 'from-blue-500/15 to-cyan-500/10',
    glow: 'hover:shadow-[0_0_28px_-6px_rgba(59,130,246,0.4)]',
    border: 'hover:border-blue-500/40',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
  {
    icon: Plug,
    title: 'REST APIs',
    desc: 'Integrating and authoring RESTful APIs — JSON payloads, CRUD patterns, and clean route design.',
    accent: 'from-cyan-500/15 to-teal-500/10',
    glow: 'hover:shadow-[0_0_28px_-6px_rgba(6,182,212,0.4)]',
    border: 'hover:border-cyan-500/40',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
  },
  {
    icon: Braces,
    title: 'Modern JavaScript',
    desc: 'ES6+, async/await, Promises, closures, and modular architecture for clean, maintainable code.',
    accent: 'from-yellow-500/15 to-amber-500/10',
    glow: 'hover:shadow-[0_0_28px_-6px_rgba(234,179,8,0.35)]',
    border: 'hover:border-yellow-500/40',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-500/10',
  },
  {
    icon: Database,
    title: 'Databases',
    desc: 'Working with MongoDB document schemas and relational database concepts using MS Access & SQL.',
    accent: 'from-emerald-500/15 to-green-500/10',
    glow: 'hover:shadow-[0_0_28px_-6px_rgba(16,185,129,0.4)]',
    border: 'hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: GitBranch,
    title: 'Git & GitHub',
    desc: 'Version control workflows, branching strategies, commits, pull requests, and remote collaboration.',
    accent: 'from-orange-500/15 to-red-500/10',
    glow: 'hover:shadow-[0_0_28px_-6px_rgba(249,115,22,0.4)]',
    border: 'hover:border-orange-500/40',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
  },
];

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

/* Render a bio string with {highlighted} keyword segments */
function BioText({ text }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <p className="text-slate-400 leading-relaxed text-base md:text-[17px]">
      {parts.map((part, i) => {
        if (part.startsWith('{') && part.endsWith('}')) {
          const word = part.slice(1, -1);
          return (
            <span key={i} className="text-slate-200 font-medium">
              {word}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

/* Fade-up wrapper triggered by scroll */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Section heading pattern shared by About/Skills/Education */
export function SectionHeading({ eyebrow, title, highlight, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className="text-center mb-14 md:mb-18">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold tracking-[0.22em] uppercase text-purple-400 mb-4"
        >
          <span className="w-5 h-px bg-purple-500/60" />
          {eyebrow}
          <span className="w-5 h-px bg-purple-500/60" />
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
      >
        {title}{' '}
        {highlight && (
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #8B5CF6 50%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {highlight}
          </span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-slate-500 text-base max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SPEC CARD  (JSON Inspector)
══════════════════════════════════════════════════════════════ */
function SpecCard() {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleCopy = () => {
    const text = `const developer = {\n${SPECS.map(s => `  ${s.key}: ${s.value}`).join(',\n')}\n};`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="
        relative rounded-2xl overflow-hidden
        bg-[#0D0F1A]/90 backdrop-blur-xl
        border border-white/[0.08]
      "
      style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), 0 0 50px -20px rgba(139,92,246,0.2)' }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[11px] font-mono text-slate-500">developer.spec.json</span>
        </div>
        <button
          onClick={handleCopy}
          className="
            flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono
            text-slate-500 hover:text-slate-200
            bg-white/[0.03] hover:bg-white/[0.07]
            border border-white/[0.06] hover:border-white/[0.12]
            transition-all duration-150
          "
          data-cursor="pointer"
          aria-label="Copy to clipboard"
        >
          {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code body */}
      <div className="p-5 font-mono text-[13px] leading-7">
        <div className="text-purple-400">const <span className="text-blue-300">developer</span> <span className="text-slate-400">= {'{'}</span></div>
        {SPECS.map((spec, i) => (
          <div key={spec.key} className="pl-5">
            <span className="text-sky-200/80">{spec.key}</span>
            <span className="text-slate-500">: </span>
            <span className={spec.valueClass}>{spec.value}</span>
            {i < SPECS.length - 1 && <span className="text-slate-600">,</span>}
          </div>
        ))}
        <div className="text-slate-400">{'}'}<span className="text-slate-600">;</span></div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-purple-600/10 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          <Wifi size={9} className="text-emerald-400" />
          <span className="text-[9px] font-mono text-emerald-400 tracking-wider">ONLINE · AVAILABLE</span>
        </div>
        <span className="text-[9px] font-mono text-slate-600 tracking-wider">JSON · Pakistan</span>
      </div>

      {/* Ambient corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)', filter: 'blur(18px)' }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOCUS CARD
══════════════════════════════════════════════════════════════ */
function FocusCard({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative p-5 rounded-xl
        bg-white/[0.025] hover:bg-white/[0.045]
        border border-white/[0.07] ${card.border}
        bg-gradient-to-br ${card.accent}
        backdrop-blur-sm
        transition-all duration-300 ${card.glow}
        cursor-default
      `}
    >
      {/* Icon */}
      <div className={`inline-flex p-2.5 rounded-lg ${card.iconBg} mb-3`}>
        <Icon size={18} className={card.iconColor} />
      </div>

      <h3 className="font-heading font-semibold text-white text-sm mb-1.5">{card.title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>

      {/* Hover glow dot */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-3 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', filter: 'blur(10px)' }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN ABOUT COMPONENT
══════════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16"
      aria-label="About Intikhab Alam"
    >
      {/* Subtle section glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] opacity-20"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <SectionHeading
          eyebrow="About Me"
          title="Getting to"
          highlight="Know Me"
          subtitle="A developer building purposeful digital products one commit at a time."
        />

        {/* Two-column: Bio + Spec Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">

          {/* LEFT — Bio paragraphs */}
          <div className="flex flex-col gap-6">
            {/* Location + availability row */}
            <FadeUp delay={0.05}>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-400">
                  <MapPin size={11} className="text-purple-400" /> Pakistan
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {personalInfo.availability}
                </span>
              </div>
            </FadeUp>

            {BIO_PARAGRAPHS.map((para, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.1}>
                <BioText text={para.text} />
              </FadeUp>
            ))}

            {/* Quick personal facts strip */}
            <FadeUp delay={0.3}>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { icon: GraduationCap, label: 'Education', value: 'DIT — 2nd Year', color: 'text-purple-400' },
                  { icon: MapPin,        label: 'Location',  value: 'Pakistan',         color: 'text-blue-400'   },
                  { icon: Code2,         label: 'Focus',     value: 'React & MERN',     color: 'text-cyan-400'   },
                  { icon: Sparkles,      label: 'Status',    value: 'In Progress',       color: 'text-emerald-400'},
                ].map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/[0.06]"
                  >
                    <Icon size={15} className={`flex-shrink-0 ${color}`} />
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-600 font-mono">{label}</div>
                      <div className="text-xs text-slate-300 font-medium truncate">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT — Identity Header + Spec Card */}
          <div className="flex flex-col gap-4">
            <FadeUp delay={0.15}>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D0F1A]/80 border border-white/[0.08] backdrop-blur-xl shadow-lg">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-purple-500/40 flex-shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <img src={profileImg} alt="Intikhab Alam" className="w-full h-full object-cover object-top" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-white text-base truncate">Intikhab Alam</h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">DIT 2nd Year · MERN Developer</p>
                  <p className="text-[11px] text-purple-300 font-mono mt-1">Pakistan · Open to Internships</p>
                </div>
              </div>
            </FadeUp>
            <SpecCard />
          </div>
        </div>

        {/* Full-Stack MERN Architecture Ecosystem Card */}
        <FadeUp delay={0.2} className="mb-16">
          <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden bg-gradient-to-br from-purple-900/10 via-black/40 to-blue-900/10 border border-white/[0.08] backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300">
                  <Cpu size={13} className="text-purple-400" />
                  <span>Architecture & Integration</span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                  Full-Stack <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">MERN Ecosystem</span>
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Engineering complete client-to-cloud workflows — fluid frontend interfaces in React.js, high-throughput REST APIs and middleware with Node.js and Express, connected to document databases with MongoDB.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-xs font-mono text-purple-300 font-semibold">Client Tier</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">React, Tailwind, ES6+</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-xs font-mono text-blue-300 font-semibold">Server & DB</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Node, Express, MongoDB</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <TechEcosystemOrbital className="max-w-[340px] sm:max-w-[380px]" />
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Focus area cards grid */}
        <FadeUp delay={0}>
          <h3 className="font-heading font-semibold text-white text-lg mb-6 text-center">
            What I'm{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              focused on
            </span>
          </h3>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FOCUS_CARDS.map((card, i) => (
            <FocusCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Section Bottom Divider */}
        <SectionDivider variant="wave" className="mt-16 opacity-75" />
      </div>
    </section>
  );
}

