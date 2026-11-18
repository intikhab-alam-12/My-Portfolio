import { motion } from 'framer-motion';

export default function TechEcosystemOrbital({ className = '' }) {
  return (
    <div className={`relative w-full max-w-md mx-auto aspect-square select-none ${className}`}>
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(59,130,246,0.2) 60%, transparent 80%)',
        }}
      />

      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="orbitGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="centerCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <filter id="orbitalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Outer Orbital Ring 1 (Radius 210) ─────────── */}
        <circle
          cx="250"
          cy="250"
          r="210"
          stroke="url(#orbitGrad1)"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          fill="none"
        />

        {/* ── Mid Orbital Ring 2 (Radius 145) ───────────── */}
        <circle
          cx="250"
          cy="250"
          r="145"
          stroke="url(#orbitGrad2)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          fill="none"
        />

        {/* ── Inner Orbital Ring 3 (Radius 85) ──────────── */}
        <circle
          cx="250"
          cy="250"
          r="85"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          strokeDasharray="3 5"
          fill="none"
        />

        {/* ── Radial Connector Axis Rays ────────────────── */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
          <line x1="250" y1="30" x2="250" y2="470" />
          <line x1="30" y1="250" x2="470" y2="250" />
          <line x1="95" y1="95" x2="405" y2="405" strokeDasharray="3 4" />
          <line x1="95" y1="405" x2="405" y2="95" strokeDasharray="3 4" />
        </g>

        {/* ── Animated Rotating Group (Outer Orbit) ─────── */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            dur="45s"
            repeatCount="indefinite"
          />

          {/* Satellite: React (Top) */}
          <g transform="translate(250, 40)">
            <circle cx="0" cy="0" r="22" fill="#0A0E1A" stroke="#61DAFB" strokeWidth="1.5" filter="url(#orbitalGlow)" />
            <ellipse cx="0" cy="0" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(0)" />
            <ellipse cx="0" cy="0" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60)" />
            <ellipse cx="0" cy="0" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120)" />
            <circle cx="0" cy="0" r="2" fill="#61DAFB" />
          </g>

          {/* Satellite: Node.js (Bottom) */}
          <g transform="translate(250, 460)">
            <circle cx="0" cy="0" r="22" fill="#0A150E" stroke="#22C55E" strokeWidth="1.5" filter="url(#orbitalGlow)" />
            <polygon points="0,-10 9,-5 9,5 0,10 -9,5 -9,-5" fill="none" stroke="#22C55E" strokeWidth="1.5" />
            <text x="0" y="3" textAnchor="middle" fill="#22C55E" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">NODE</text>
          </g>

          {/* Satellite: MongoDB (Left) */}
          <g transform="translate(40, 250)">
            <circle cx="0" cy="0" r="22" fill="#0A1510" stroke="#10B981" strokeWidth="1.5" filter="url(#orbitalGlow)" />
            <path d="M 0 -10 C 4 -4 7 2 0 10 C -7 2 -4 -4 0 -10 Z" fill="#10B981" />
          </g>

          {/* Satellite: Express (Right) */}
          <g transform="translate(460, 250)">
            <circle cx="0" cy="0" r="22" fill="#140F24" stroke="#A855F7" strokeWidth="1.5" filter="url(#orbitalGlow)" />
            <text x="0" y="3.5" textAnchor="middle" fill="#C084FC" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">EXPRESS</text>
          </g>
        </g>

        {/* ── Animated Rotating Group (Mid Orbit - Reverse) ── */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 250 250"
            to="0 250 250"
            dur="32s"
            repeatCount="indefinite"
          />

          {/* Satellite: JavaScript */}
          <g transform="translate(147, 147)">
            <circle cx="0" cy="0" r="18" fill="#1C1808" stroke="#FACC15" strokeWidth="1.5" />
            <text x="0" y="3.5" textAnchor="middle" fill="#FACC15" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="bold">JS</text>
          </g>

          {/* Satellite: Tailwind CSS */}
          <g transform="translate(353, 353)">
            <circle cx="0" cy="0" r="18" fill="#0A1820" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="0" y="3.5" textAnchor="middle" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="bold">CSS</text>
          </g>

          {/* Satellite: REST API */}
          <g transform="translate(353, 147)">
            <circle cx="0" cy="0" r="18" fill="#1A0D28" stroke="#EC4899" strokeWidth="1.5" />
            <text x="0" y="3" textAnchor="middle" fill="#F472B6" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">API</text>
          </g>

          {/* Satellite: Git */}
          <g transform="translate(147, 353)">
            <circle cx="0" cy="0" r="18" fill="#1C0F0A" stroke="#F97316" strokeWidth="1.5" />
            <text x="0" y="3" textAnchor="middle" fill="#FB923C" fontSize="7" fontFamily="JetBrains Mono, monospace" fontWeight="bold">GIT</text>
          </g>
        </g>

        {/* ── Central Pulsating Core ─────────────────────── */}
        <g transform="translate(250, 250)">
          {/* Pulsing Aura Rings */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="#8B5CF6" strokeWidth="1">
            <animate attributeName="r" values="46;58;46" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="62" fill="none" stroke="#3B82F6" strokeWidth="0.8">
            <animate attributeName="r" values="58;72;58" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.05;0.4" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Solid Core Circle */}
          <circle cx="0" cy="0" r="42" fill="#0B0D17" stroke="url(#centerCoreGrad)" strokeWidth="2.5" filter="url(#orbitalGlow)" />
          
          {/* Inner Accent */}
          <circle cx="0" cy="0" r="32" fill="url(#centerCoreGrad)" opacity="0.18" />

          {/* Core Branding */}
          <text x="0" y="-8" textAnchor="middle" fill="#A78BFA" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="semibold">
            &lt; DEV /&gt;
          </text>
          <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Space Grotesk, sans-serif" fontWeight="bold">
            MERN
          </text>
          <text x="0" y="18" textAnchor="middle" fill="#38BDF8" fontSize="7" fontFamily="JetBrains Mono, monospace">
            ECOSYSTEM
          </text>
        </g>
      </svg>
    </div>
  );
}
