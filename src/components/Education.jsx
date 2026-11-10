import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, CalendarDays, BookOpen, Award, ChevronRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionHeading } from './About';

/* ══════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════ */

const COURSEWORK = [
  {
    title: 'Programming Fundamentals',
    desc: 'Core programming logic, algorithms, and problem-solving using structured and procedural paradigms.',
    icon: '{ }',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    title: 'Web Technologies & Architectures',
    desc: 'HTML5, CSS3, JavaScript, responsive design principles, and browser-based application development.',
    icon: '</>',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    title: 'Relational Databases & SQL',
    desc: 'Entity-relationship modeling, SQL query writing, normalization, and MS Access database systems.',
    icon: '⊞',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    title: 'Data Structures',
    desc: 'Arrays, linked lists, stacks, queues, and trees — foundations for efficient algorithm design.',
    icon: '⬡',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    title: 'Computer Networks & IT Tools',
    desc: 'Networking fundamentals, protocols, OSI model, and professional office productivity software.',
    icon: '⬡',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

/* ══════════════════════════════════════════════════════════════
   ANIMATED TIMELINE LINE  (scroll-linked progress)
══════════════════════════════════════════════════════════════ */
function TimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px]" aria-hidden>
      {/* Track */}
      <div className="absolute inset-0 bg-white/[0.05] rounded-full" />
      {/* Animated fill */}
      <motion.div
        className="absolute inset-x-0 top-0 rounded-full origin-top"
        style={{
          scaleY,
          background: 'linear-gradient(to bottom, #8B5CF6, #3B82F6)',
          boxShadow: '0 0 10px rgba(139,92,246,0.5)',
          bottom: 0,
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TIMELINE NODE
══════════════════════════════════════════════════════════════ */
function TimelineNode({ inView }) {
  return (
    <div className="absolute left-4 md:left-6 top-6 z-10" aria-hidden>
      {/* Pulsing outer ring */}
      {inView && (
        <span className="absolute -inset-1.5 rounded-full animate-ping bg-purple-500/30" />
      )}
      {/* Main dot */}
      <div
        className="relative w-5 h-5 rounded-full border-2 border-purple-500 bg-[#08090D] flex items-center justify-center"
        style={{ boxShadow: '0 0 14px rgba(139,92,246,0.7)' }}
      >
        <div className="w-2 h-2 rounded-full bg-purple-400" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COURSEWORK PILL
══════════════════════════════════════════════════════════════ */
function CourseworkCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative p-4 rounded-xl
        bg-white/[0.025] hover:bg-white/[0.045]
        border ${item.border} hover:border-opacity-50
        backdrop-blur-sm
        transition-all duration-300
        hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon badge */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center`}>
          <span className={`text-xs font-mono font-bold ${item.color}`}>{item.icon}</span>
        </div>
        <div className="min-w-0">
          <h4 className={`font-heading font-semibold text-sm ${item.color} mb-1`}>{item.title}</h4>
          <p className="text-slate-500 text-[12px] leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EDUCATION CARD
══════════════════════════════════════════════════════════════ */
function EducationCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { education } = personalInfo;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20, scale: 0.97 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="
        relative ml-14 md:ml-20 rounded-2xl overflow-hidden
        bg-white/[0.025] border border-white/[0.1]
        backdrop-blur-xl
      "
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px -20px rgba(139,92,246,0.2)' }}
    >
      {/* Top gradient accent strip */}
      <div
        aria-hidden
        className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4)' }}
      />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Degree icon */}
            <div
              className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/25"
              style={{ boxShadow: '0 0 20px rgba(139,92,246,0.2)' }}
            >
              <GraduationCap size={22} className="text-purple-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base md:text-xl leading-tight">
                {education.degree}
              </h3>
              <p className="text-slate-500 text-xs font-mono mt-0.5">
                Technical Board · Academic Program
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex flex-col items-end gap-2">
            <span className="
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-amber-500/12 border border-amber-500/25
              text-amber-300 text-[10px] font-mono font-semibold uppercase tracking-wider
            ">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {education.status}
            </span>
            <span className="
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-purple-500/10 border border-purple-500/20
              text-purple-300 text-[10px] font-mono
            ">
              {education.year}
            </span>
          </div>
        </div>

        {/* Meta pills row */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {[
            { icon: CalendarDays, text: education.period,       color: 'text-blue-400'   },
            { icon: BookOpen,     text: education.year,         color: 'text-purple-400' },
            { icon: Award,        text: education.status,       color: 'text-amber-400'  },
          ].map(({ icon: Icon, text, color }) => (
            <div
              key={text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-xs font-mono text-slate-400"
            >
              <Icon size={12} className={color} />
              {text}
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
          {education.description}
        </p>

        {/* Coursework divider */}
        <div className="flex items-center gap-3 mb-5">
          <span
            className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em]"
            style={{
              background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Core Coursework
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
        </div>

        {/* Coursework grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COURSEWORK.map((item, i) => (
            <CourseworkCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Self-learning callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="
            mt-6 p-4 rounded-xl
            bg-gradient-to-r from-purple-500/8 to-blue-500/5
            border border-purple-500/15
            flex items-center gap-3
          "
        >
          <div className="flex-shrink-0 p-2 rounded-lg bg-purple-500/15 border border-purple-500/20">
            <ChevronRight size={14} className="text-purple-400" />
          </div>
          <div>
            <p className="text-xs font-mono font-semibold text-purple-300 mb-0.5">Self-Directed Learning</p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Actively building beyond the curriculum — React.js, Next.js, MongoDB, Framer Motion, GSAP, and modern full-stack architecture through personal projects and open-source exploration.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Corner ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 opacity-20 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(20px)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 opacity-15 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)', filter: 'blur(20px)' }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EDUCATION COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Education() {
  const ref = useRef(null);
  const nodeInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      className="relative z-10 py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16"
      aria-label="Education & Academic Background"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Education"
          title="Education &"
          highlight="Academic Background"
          subtitle="Formal studies in Information Technology combined with rigorous self-directed learning."
        />

        {/* Timeline container */}
        <div ref={ref} className="relative">
          {/* Animated scroll-linked line */}
          <TimelineLine />

          {/* Timeline node */}
          <TimelineNode inView={nodeInView} />

          {/* Main education card */}
          <EducationCard />
        </div>

        {/* Learning journey note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-xs font-mono text-slate-700 tracking-widest">
            ✦ &nbsp; Education is a journey, not a destination &nbsp; ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}

