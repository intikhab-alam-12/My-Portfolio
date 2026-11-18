import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ExternalLink, Github, Eye, X, Check, Copy, Sparkles,
  Layers, ArrowUpRight, Code, Laptop, Terminal, Cpu, Globe
} from 'lucide-react';
import { projects, projectCategories } from '../data/projects';
import { personalInfo } from '../data/portfolioData';
import { SectionHeading } from './About';
import { SectionDivider } from './illustrations';

/* ══════════════════════════════════════════════════════════════
   BESPOKE PROJECT UI PREVIEW MOCKUPS (NO FAKE SCREENSHOTS)
══════════════════════════════════════════════════════════════ */

function BusinessWebsiteMockup() {
  return (
    <div className="w-full h-48 bg-[#0B0D14] rounded-lg p-3 flex flex-col justify-between overflow-hidden relative border border-white/[0.05] select-none">
      {/* Mini Browser Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
        </div>
        <div className="text-[9px] font-mono text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.04]">
          https://enterprise.corp
        </div>
        <div className="flex items-center gap-1 text-[9px] text-cyan-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Responsive
        </div>
      </div>

      {/* Mock Content Layout */}
      <div className="grid grid-cols-12 gap-2 my-auto">
        <div className="col-span-7 flex flex-col justify-center space-y-1.5">
          <div className="w-3/4 h-2 rounded bg-gradient-to-r from-blue-400/80 to-cyan-400/80" />
          <div className="w-full h-1.5 rounded bg-white/[0.1]" />
          <div className="w-5/6 h-1.5 rounded bg-white/[0.06]" />
          <div className="pt-1 flex gap-1.5">
            <span className="w-12 h-3.5 rounded bg-blue-500/20 border border-blue-500/40 text-[8px] font-mono text-blue-300 flex items-center justify-center">
              Explore
            </span>
            <span className="w-10 h-3.5 rounded bg-white/[0.05] border border-white/[0.08] text-[8px] font-mono text-slate-400 flex items-center justify-center">
              Specs
            </span>
          </div>
        </div>
        <div className="col-span-5 grid grid-cols-2 gap-1.5">
          <div className="rounded bg-white/[0.04] border border-white/[0.06] p-1.5 flex flex-col justify-center items-center">
            <span className="text-[9px] font-mono text-blue-400 font-bold">100%</span>
            <span className="text-[7px] text-slate-500 uppercase">Mobile</span>
          </div>
          <div className="rounded bg-white/[0.04] border border-white/[0.06] p-1.5 flex flex-col justify-center items-center">
            <span className="text-[9px] font-mono text-cyan-400 font-bold">Grid</span>
            <span className="text-[7px] text-slate-500 uppercase">Flexbox</span>
          </div>
          <div className="col-span-2 rounded bg-white/[0.03] border border-white/[0.05] p-1 text-[7px] font-mono text-slate-400 text-center">
            CSS3 Variables + HTML5
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[8px] font-mono text-slate-600">
        <span>Desktop / Tablet / Mobile Auto-Detect</span>
        <span className="text-cyan-400">Zero CSS Bloat</span>
      </div>
    </div>
  );
}

function ApiProjectMockup() {
  return (
    <div className="w-full h-48 bg-[#090C12] rounded-lg p-3 flex flex-col justify-between overflow-hidden relative border border-white/[0.05] select-none font-mono">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 text-[10px] text-amber-400">
          <Terminal size={11} />
          <span>REST API Endpoint Stream</span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          200 OK
        </span>
      </div>

      {/* Mock Payload Stream */}
      <div className="space-y-1 text-[9px] leading-tight my-auto">
        <div className="text-slate-500">// Asynchronous Fetch Execution</div>
        <div className="text-purple-300">
          <span className="text-blue-400">await</span> fetch(<span className="text-amber-300">"/api/v1/resource"</span>)
        </div>
        <div className="pl-2 border-l border-amber-500/30 text-slate-400 space-y-0.5 mt-1">
          <div>status: <span className="text-emerald-400">200</span>, latency: <span className="text-amber-300">42ms</span></div>
          <div>payload: <span className="text-slate-300">[{'{"id": 101, "valid": true}'}]</span></div>
          <div>client_cache: <span className="text-cyan-400">debounced (300ms)</span></div>
        </div>
      </div>

      {/* Pipeline Status */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[8px] text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          Async / Await Flow
        </span>
        <span className="text-amber-400/90">Error Boundary Active</span>
      </div>
    </div>
  );
}

function ReactProjectMockup() {
  return (
    <div className="w-full h-48 bg-[#0B0D15] rounded-lg p-3 flex flex-col justify-between overflow-hidden relative border border-white/[0.05] select-none">
      {/* React Tree Inspector Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 font-mono">
          <span className="text-purple-400 font-bold">&lt;/&gt;</span>
          <span>React.js Virtual DOM Tree</span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
          Hooks Active
        </span>
      </div>

      {/* Component Tree View */}
      <div className="my-auto space-y-1.5 font-mono text-[9px]">
        <div className="flex items-center gap-2">
          <span className="text-purple-400">&lt;App&gt;</span>
          <span className="text-[7px] text-slate-600 px-1 py-0.2 bg-white/[0.03] rounded">Root Container</span>
        </div>
        <div className="pl-3 border-l border-purple-500/30 space-y-1">
          <div className="flex items-center justify-between text-slate-300">
            <span>&lt;StateProvider value={'{state}'} /&gt;</span>
            <span className="text-[8px] text-cyan-400">useState</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>&lt;InteractiveComponent /&gt;</span>
            <span className="text-[8px] text-emerald-400">useEffect</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>&lt;CustomHookWatcher /&gt;</span>
            <span className="text-[8px] text-amber-400">useMemo</span>
          </div>
        </div>
        <div className="text-purple-400">&lt;/App&gt;</div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[8px] font-mono text-slate-500">
        <span className="text-cyan-400">Unidirectional Data Flow</span>
        <span>Memoized Handlers</span>
      </div>
    </div>
  );
}

function NextjsProjectMockup() {
  return (
    <div className="w-full h-48 bg-[#0D0B18] rounded-lg p-3 flex flex-col justify-between overflow-hidden relative border border-white/[0.05] select-none font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 text-[10px] text-white">
          <span className="px-1 py-0.2 rounded bg-white text-black font-black text-[8px]">N</span>
          <span>Next.js App Router Architecture</span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[8px] bg-violet-500/10 text-violet-300 border border-violet-500/20">
          Hybrid SSR / Client
        </span>
      </div>

      {/* File-Based Routing Map */}
      <div className="my-auto space-y-1.5 text-[9px]">
        <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
          <span className="text-slate-300">app/layout.jsx</span>
          <span className="text-[8px] text-violet-400">Server Component</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
          <span className="text-slate-300">app/page.jsx</span>
          <span className="text-[8px] text-blue-400">Static / ISR</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/[0.05]">
          <span className="text-slate-300">app/api/route.js</span>
          <span className="text-[8px] text-emerald-400">Edge API Handlers</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[8px] text-slate-500">
        <span className="text-violet-300">Core Web Vitals Optimized</span>
        <span className="text-emerald-400">Fast TTFB</span>
      </div>
    </div>
  );
}

function PortfolioMockup() {
  return (
    <div className="w-full h-48 bg-[#08090D] rounded-lg p-3 flex flex-col justify-between overflow-hidden relative border border-white/[0.05] select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1 text-[10px] font-mono text-purple-300">
          <Sparkles size={11} className="text-purple-400" />
          <span>Awwwards Obsidian Portfolio</span>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
          v1.0 Live
        </span>
      </div>

      {/* Mock Visual Experience */}
      <div className="my-auto relative p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-600/30 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-600/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-heading font-bold text-white mb-0.5">Intikhab Alam</div>
            <div className="text-[8px] font-mono text-slate-400">MERN Stack Developer · DIT 2nd Year</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-heading font-bold text-[10px] text-white shadow-glow-purple">
            IA
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[8px] font-mono text-slate-500">
        <span className="text-purple-400">60 FPS Framer Motion</span>
        <span className="text-blue-400">Tailwind Glassmorphism</span>
      </div>
    </div>
  );
}

function getProjectMockup(id) {
  switch (id) {
    case 'responsive-business-website':
      return <BusinessWebsiteMockup />;
    case 'javascript-api-project':
      return <ApiProjectMockup />;
    case 'react-project':
      return <ReactProjectMockup />;
    case 'nextjs-project':
      return <NextjsProjectMockup />;
    case 'personal-portfolio-website':
      return <PortfolioMockup />;
    default:
      return <PortfolioMockup />;
  }
}

/* ══════════════════════════════════════════════════════════════
   3D PERSPECTIVE TILT CARD COMPONENT
══════════════════════════════════════════════════════════════ */
function ProjectCard({ project, onSelectProject, onShowToast }) {
  const cardRef = useRef(null);

  // Mouse tilt animation coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLiveDemoClick = (e) => {
    e.preventDefault();
    if (project.liveUrl && project.liveUrl !== '#' && project.liveUrl !== '') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      onShowToast(`Live Demo deployment is currently being updated for "${project.title}". Check @${personalInfo.contact.githubUsername} on GitHub!`);
    }
  };

  const handleSourceCodeClick = (e) => {
    e.preventDefault();
    if (project.repoUrl && project.repoUrl !== '#' && project.repoUrl !== '') {
      window.open(project.repoUrl, '_blank', 'noopener,noreferrer');
    } else {
      onShowToast(`Repository source code is being prepared for "${project.title}". View @${personalInfo.contact.githubUsername} on GitHub.`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl glass-card border border-white/[0.08] hover:border-purple-500/40 p-5 flex flex-col justify-between transition-colors duration-300 shadow-glass"
    >
      {/* Top Banner & Mockup */}
      <div>
        <div className="mb-4 overflow-hidden rounded-xl">
          {getProjectMockup(project.id)}
        </div>

        {/* Category & Year */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {project.year}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {project.tagline}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-300 border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSourceCodeClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-colors"
            data-cursor="pointer"
            title="View Source Code"
          >
            <Github size={13} />
            <span>Code</span>
          </button>

          <button
            onClick={handleLiveDemoClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-colors"
            data-cursor="pointer"
            title="View Live Demo"
          >
            <ExternalLink size={13} />
            <span>Live</span>
          </button>
        </div>

        <button
          onClick={() => onSelectProject(project)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 hover:text-purple-200 px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all duration-200"
          data-cursor="pointer"
        >
          <Eye size={13} />
          <span>Details</span>
        </button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROJECT DETAILS MODAL
══════════════════════════════════════════════════════════════ */
function ProjectModal({ project, onClose, onShowToast }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#0F111A] border border-white/[0.1] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden"
        >
          {/* Subtle Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            data-cursor="pointer"
          >
            <X size={18} />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
              {project.category} · {project.year}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-3">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mt-1">{project.tagline}</p>
          </div>

          {/* Mockup Preview */}
          <div className="mb-6 rounded-xl overflow-hidden border border-white/[0.06]">
            {getProjectMockup(project.id)}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Overview &amp; Architecture
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Key Engineering Features
            </h4>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] text-purple-200 border border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-3">
              <a
                href={project.repoUrl || personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-colors"
                data-cursor="pointer"
              >
                <Github size={15} />
                <span>GitHub Repository</span>
              </a>

              <button
                onClick={() => {
                  if (project.liveUrl) {
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  } else {
                    onShowToast(`Live Demo deployment is currently being updated for "${project.title}". Check @${personalInfo.contact.githubUsername} on GitHub!`);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-glow-purple transition-all"
                data-cursor="pointer"
              >
                <ExternalLink size={15} />
                <span>Live Preview</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════
   TOAST NOTIFICATION COMPONENT
══════════════════════════════════════════════════════════════ */
function ToastNotification({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[1100] max-w-md p-4 rounded-xl glass-card border border-purple-500/30 bg-[#121420]/95 backdrop-blur-xl shadow-glow-purple flex items-start gap-3"
      >
        <Sparkles size={16} className="text-purple-400 flex-shrink-0 mt-0.5 animate-pulse" />
        <div className="flex-1 text-xs text-slate-200 leading-relaxed font-sans">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors"
          data-cursor="pointer"
        >
          <X size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PROJECTS COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const categories = ['All Projects', 'React / Next.js', 'Vanilla JavaScript', 'HTML / CSS'];

  const filteredProjects = selectedCategory === 'All' || selectedCategory === 'All Projects'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className="relative z-10 py-24 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16"
      aria-label="Things I've Built"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-[700px] h-[350px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Portfolio Showcase"
          title="Things I've"
          highlight="Built"
          subtitle="Real projects crafted with clean code, responsive layouts, and performance in mind."
        />

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                relative px-4 py-2 rounded-xl text-xs font-mono font-medium transition-colors duration-200
                ${(selectedCategory === cat || (cat === 'All Projects' && selectedCategory === 'All'))
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'}
              `}
              data-cursor="pointer"
            >
              {(selectedCategory === cat || (cat === 'All Projects' && selectedCategory === 'All')) && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/40 to-blue-600/40 border border-purple-500/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={setSelectedProject}
                onShowToast={setToastMessage}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub repos callout strip */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono text-slate-500">
            More experimental builds, components &amp; challenges are continuously committed on GitHub.
          </p>
        </div>

        {/* Section Divider */}
        <SectionDivider variant="circuit" className="mt-14 opacity-70" />
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onShowToast={setToastMessage}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </section>
  );
}

