import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  SiHtml5, SiCss, SiTailwindcss, SiJavascript, SiReact,
  SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiPython,
  SiGit, SiGithub,
} from 'react-icons/si';
import { FaFileWord, FaFileExcel, FaFilePowerpoint, FaDatabase } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { skillCategories } from '../data/skills';
import { SectionHeading } from './About';

/* ══════════════════════════════════════════════════════════════
   ICON MAP — maps string identifiers → real brand icons
══════════════════════════════════════════════════════════════ */
const ICON_MAP = {
  SiHtml5:        { Icon: SiHtml5,        color: '#E34F26' },
  SiCss:          { Icon: SiCss,          color: '#1572B6' },
  SiCss3:         { Icon: SiCss,          color: '#1572B6' },
  SiTailwindcss:  { Icon: SiTailwindcss,  color: '#06B6D4' },
  SiJavascript:   { Icon: SiJavascript,   color: '#F7DF1E' },
  SiReact:        { Icon: SiReact,        color: '#61DAFB' },
  SiNextdotjs:    { Icon: SiNextdotjs,    color: '#FFFFFF' },
  SiNodedotjs:    { Icon: SiNodedotjs,    color: '#339933' },
  SiExpress:      { Icon: SiExpress,      color: '#CCCCCC' },
  TbApi:          { Icon: TbApi,          color: '#818CF8' },
  SiMongodb:      { Icon: SiMongodb,      color: '#47A248' },
  SiPython:       { Icon: SiPython,       color: '#3776AB' },
  SiGit:          { Icon: SiGit,          color: '#F05032' },
  SiGithub:       { Icon: SiGithub,       color: '#E0E0E0' },
  FaFileWord:     { Icon: FaFileWord,     color: '#2B5797' },
  FaFileExcel:    { Icon: FaFileExcel,    color: '#217346' },
  FaFilePowerpoint:{ Icon: FaFilePowerpoint, color: '#D04303' },
  FaDatabase:     { Icon: FaDatabase,     color: '#B40E5D' },
};

/* Filter tab IDs */
const FILTER_TABS = [
  { id: 'all',              label: 'All'                    },
  { id: 'frontend',        label: 'Frontend'               },
  { id: 'backend',         label: 'Backend'                },
  { id: 'languages-db',    label: 'Languages & DB'         },
  { id: 'version-control', label: 'Version Control'        },
  { id: 'office-suite',    label: 'Microsoft Office'       },
];

/* Badge colour palette per category */
const BADGE_COLOURS = {
  frontend:         'text-purple-300  bg-purple-500/12  border-purple-500/25',
  backend:          'text-blue-300    bg-blue-500/12    border-blue-500/25',
  'languages-db':   'text-emerald-300 bg-emerald-500/12 border-emerald-500/25',
  'version-control':'text-orange-300  bg-orange-500/12  border-orange-500/25',
  'office-suite':   'text-sky-300     bg-sky-500/12     border-sky-500/25',
};

/* ══════════════════════════════════════════════════════════════
   SKILL CARD — with mouse-reactive spotlight border
══════════════════════════════════════════════════════════════ */
function SkillCard({ skill, categoryId, index }) {
  const ref = useRef(null);
  const spotRef = useRef({ x: '50%', y: '50%' });
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const { Icon, color } = ICON_MAP[skill.icon] || { Icon: TbApi, color: '#8B5CF6' };
  const badgeClass = BADGE_COLOURS[categoryId] || BADGE_COLOURS.frontend;

  /* Mouse-tracking spotlight border */
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="
        group relative p-5 rounded-xl overflow-hidden
        bg-white/[0.025] hover:bg-white/[0.045]
        border border-white/[0.07]
        backdrop-blur-sm
        transition-all duration-300
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
        cursor-default
      "
      style={{
        '--mx': '50%',
        '--my': '50%',
      }}
    >
      {/* Radial spotlight border on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(200px circle at var(--mx) var(--my), rgba(139,92,246,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(120px circle at var(--mx) var(--my), rgba(139,92,246,0.12) 0%, transparent 60%)',
          borderRadius: 'inherit',
          border: '1px solid transparent',
          backgroundClip: 'padding-box',
        }}
      />

      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        {/* Brand icon */}
        <div
          className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.07] group-hover:border-white/[0.14] transition-colors duration-300"
          style={{ boxShadow: `0 0 0 0 ${color}00` }}
        >
          <Icon size={22} style={{ color }} />
        </div>

        {/* Category badge */}
        <span className={`text-[9px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeClass}`}>
          {skill.badge}
        </span>
      </div>

      {/* Skill name */}
      <h3 className="relative z-10 font-heading font-semibold text-white text-sm mb-1.5 group-hover:text-white transition-colors">
        {skill.name}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-slate-500 text-[12px] leading-relaxed group-hover:text-slate-400 transition-colors duration-300">
        {skill.description}
      </p>

      {/* Bottom icon glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-10 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse, ${color}30 0%, transparent 70%)`, filter: 'blur(8px)' }}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FILTER TABS
══════════════════════════════════════════════════════════════ */
function FilterTabs({ active, onChange }) {
  return (
    <div
      className="
        flex flex-wrap justify-center gap-2 mb-10
        p-1.5 rounded-2xl
        bg-white/[0.025] border border-white/[0.07]
        backdrop-blur-sm w-fit mx-auto
      "
      role="tablist"
      aria-label="Filter skills by category"
    >
      {FILTER_TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            relative px-4 py-1.5 rounded-xl text-xs font-medium font-mono
            transition-colors duration-200
            ${active === tab.id
              ? 'text-white'
              : 'text-slate-500 hover:text-slate-300'}
          `}
          data-cursor="pointer"
        >
          {/* Active pill background */}
          {active === tab.id && (
            <motion.span
              layoutId="skills-filter-pill"
              className="absolute inset-0 rounded-xl"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.3))' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN SKILLS COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');

  /* Build flat list of all skills with their category id */
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, categoryId: cat.id }))
  );

  const filtered = activeFilter === 'all'
    ? allSkills
    : allSkills.filter((s) => s.categoryId === activeFilter);

  return (
    <section
      id="skills"
      className="relative z-10 py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16"
      aria-label="Skills — Technologies I Work With"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 w-[400px] h-[400px] opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Technologies I"
          highlight="Work With"
          subtitle="A growing toolkit built through hands-on projects, coursework, and self-directed learning."
        />

        {/* Filter tabs */}
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        {/* Count indicator */}
        <motion.p
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-slate-600 font-mono mb-8 -mt-4"
        >
          Showing <span className="text-purple-400">{filtered.length}</span> of <span className="text-slate-500">{allSkills.length}</span> technologies
        </motion.p>

        {/* Skills grid with AnimatePresence layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((skill, i) => (
              <SkillCard
                key={`${skill.categoryId}-${skill.name}`}
                skill={skill}
                categoryId={skill.categoryId}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[11px] text-slate-700 font-mono mt-10 tracking-wide"
        >
          ✦ Skills reflect active learning &amp; hands-on project experience — no fabricated metrics
        </motion.p>
      </div>
    </section>
  );
}

