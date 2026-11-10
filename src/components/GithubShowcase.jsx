import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Github, GitPullRequest, GitBranch, Star, Code2, ExternalLink,
  Users, FolderGit2, Calendar, Sparkles, Activity, ArrowUpRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionHeading } from './About';

/* ══════════════════════════════════════════════════════════════
   MOCK CONTRIBUTION HEATMAP GRID (52 WEEKS x 7 DAYS AESTHETIC)
══════════════════════════════════════════════════════════════ */
function ContributionHeatmap() {
  // Generate 28 columns (weeks) x 7 rows (days) with authentic activity variance
  const weeks = 28;
  const days = 7;

  // Preset intensities (0 = empty, 1 = subtle, 2 = medium, 3 = high, 4 = super active)
  const getCellColor = (val) => {
    switch (val) {
      case 1:
        return 'bg-purple-900/40 border-purple-800/30';
      case 2:
        return 'bg-purple-700/60 border-purple-600/40';
      case 3:
        return 'bg-purple-500/80 border-purple-400/50';
      case 4:
        return 'bg-emerald-400 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]';
      default:
        return 'bg-white/[0.03] border-white/[0.04]';
    }
  };

  // Deterministic pattern so it renders consistent on SSR/hydration
  const grid = [];
  for (let c = 0; c < weeks; c++) {
    const col = [];
    for (let r = 0; r < days; r++) {
      // Deterministic pseudo-randomness based on coordinate
      const seed = (c * 7 + r * 13) % 17;
      let intensity = 0;
      if (seed === 1 || seed === 6 || seed === 9) intensity = 1;
      else if (seed === 3 || seed === 11) intensity = 2;
      else if (seed === 7 || seed === 14) intensity = 3;
      else if (c > 20 && (seed === 2 || seed === 8)) intensity = 4;
      col.push(intensity);
    }
    grid.push(col);
  }

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
      <div className="min-w-[540px] flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
          <div className="flex items-center gap-1.5 text-purple-300">
            <Activity size={12} className="text-purple-400" />
            <span>Contributions &amp; Development Cadence</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.03]" />
            <div className="w-2.5 h-2.5 rounded-sm bg-purple-900/40" />
            <div className="w-2.5 h-2.5 rounded-sm bg-purple-700/60" />
            <div className="w-2.5 h-2.5 rounded-sm bg-purple-500/80" />
            <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="flex gap-1 justify-between">
          {grid.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-1">
              {col.map((intensity, rowIdx) => (
                <div
                  key={rowIdx}
                  title={`Activity index: ${intensity}`}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm border transition-colors hover:scale-125 hover:z-10 ${getCellColor(
                    intensity
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN GITHUB SHOWCASE COMPONENT
══════════════════════════════════════════════════════════════ */
export default function GithubShowcase() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Safe fetch from GitHub API with graceful fallback
  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const res = await fetch('https://api.github.com/users/intikhab-alam-12');
        if (!res.ok) throw new Error('API rate limit or network unreachable');
        const data = await res.json();
        if (isMounted) {
          setProfile({
            avatar: data.avatar_url,
            name: data.name || personalInfo.name,
            login: data.login || 'intikhab-alam-12',
            bio: data.bio || 'Web & MERN Stack Developer | DIT Student',
            publicRepos: data.public_repos ?? 5,
            followers: data.followers ?? 1,
            following: data.following ?? 1,
            location: data.location || personalInfo.location.display,
            url: data.html_url || 'https://github.com/intikhab-alam-12',
          });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          // Graceful fallback to verified authentic data
          setProfile({
            avatar: null,
            name: personalInfo.name,
            login: 'intikhab-alam-12',
            bio: 'Web Developer, MERN Stack Developer & DIT Student',
            publicRepos: 5,
            followers: 1,
            following: 2,
            location: 'Pakistan',
            url: 'https://github.com/intikhab-alam-12',
          });
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="relative z-10 py-16 md:py-24 px-5 sm:px-8 md:px-12 lg:px-16"
      aria-label="GitHub Showcase"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Open Source & Repositories"
          title="More Code Lives on"
          highlight="GitHub"
          subtitle="Explore continuous source code updates, component experiments, and development history."
        />

        {/* High-Impact Glassmorphic Banner Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl glass-card border border-white/[0.1] p-6 sm:p-10 overflow-hidden shadow-glass"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Profile Identity Row */}
                <div className="flex items-center gap-4 mb-4">
                  {loading ? (
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.05] animate-pulse border border-white/[0.08]" />
                  ) : (
                    <img
                      src={profile?.avatar || '/profile.jpg'}
                      alt={profile?.name || 'Intikhab Alam'}
                      className="w-16 h-16 rounded-2xl border-2 border-purple-500/40 object-cover object-top shadow-glow-purple"
                    />
                  )}

                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">
                      {profile?.name || 'Intikhab Alam'}
                    </h3>
                    <a
                      href={profile?.url || 'https://github.com/intikhab-alam-12'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 mt-0.5"
                    >
                      <Github size={13} />
                      <span>@{profile?.login || 'intikhab-alam-12'}</span>
                    </a>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {profile?.bio}
                </p>

                {/* Stats Pills */}
                <div className="grid grid-cols-3 gap-2.5 mb-8 font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <div className="text-base font-bold text-purple-300">
                      {profile?.publicRepos ?? '5+'}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Repositories</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <div className="text-base font-bold text-blue-300">
                      {profile?.followers ?? '1'}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Followers</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <div className="text-base font-bold text-emerald-300">
                      {profile?.location || 'Pakistan'}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Location</div>
                  </div>
                </div>
              </div>

              {/* Magnetic CTA Button */}
              <motion.a
                href="https://github.com/intikhab-alam-12"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-glow-dual transition-all"
                data-cursor="pointer"
              >
                <Github size={18} />
                <span>Explore My GitHub Profile</span>
                <ArrowUpRight size={16} />
              </motion.a>
            </div>

            {/* Right Graphic Column: Interactive Heatmap & Terminal Preview */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Contribution Activity Grid */}
              <ContributionHeatmap />

              {/* Featured Repository Highlight Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
                    <FolderGit2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-white flex items-center gap-2">
                      <span>intikhab-alam-12 / portfolio</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                        Public
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Awwwards-level React + Vite developer portfolio with Framer Motion &amp; GSAP.
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-purple-400">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span>Main</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

