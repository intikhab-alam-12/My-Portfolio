import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Github, MessageSquare, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <footer className="relative z-10 bg-[#06070A] border-t border-white/[0.06] pt-16 pb-12 px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
        {/* Subtle Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-white/[0.06]">
            {/* Left Brand Col */}
            <div className="md:col-span-6 space-y-3">
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, '#home')}
                className="inline-flex items-center gap-0.5 font-mono text-lg font-bold select-none cursor-pointer"
                data-cursor="pointer"
              >
                <span className="text-slate-500 text-sm">&lt;</span>
                <span className="text-purple-400">&nbsp;Intikhab</span>
                <span className="text-slate-500 mx-0.5">.</span>
                <span className="text-blue-400">Alam</span>
                <span className="text-slate-500 text-sm">&nbsp;/&gt;</span>
              </a>

              <p className="text-slate-400 text-xs font-mono max-w-sm">
                Web Developer | DIT Student | Future Full-Stack Developer
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to Internships
                </span>
              </div>
            </div>

            {/* Center Quick Navigation Links */}
            <div className="md:col-span-4">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                Quick Navigation
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 py-0.5"
                      data-cursor="pointer"
                    >
                      <span className="w-1 h-1 rounded-full bg-purple-500/40" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Social Links */}
            <div className="md:col-span-2">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                Connect
              </h4>
              <div className="flex flex-col gap-2.5">
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-purple-400 transition-colors"
                  data-cursor="pointer"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                  data-cursor="pointer"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
            <div>
              © {new Date().getFullYear()} Intikhab Alam. All Rights Reserved.
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <span>Built with React &amp; Tailwind CSS</span>
              <Heart size={12} className="text-purple-500 fill-purple-500/20" />
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-[800] p-3 rounded-full bg-[#141724]/90 backdrop-blur-md border border-purple-500/40 text-purple-300 hover:text-white shadow-glow-purple cursor-pointer transition-colors"
            data-cursor="pointer"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

