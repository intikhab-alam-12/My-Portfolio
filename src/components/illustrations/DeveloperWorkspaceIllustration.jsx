import { motion } from 'framer-motion';

export default function DeveloperWorkspaceIllustration({ className = '' }) {
  return (
    <div className={`relative w-full max-w-lg mx-auto aspect-[16/11] select-none ${className}`}>
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 75%)',
        }}
      />

      <svg
        viewBox="0 0 640 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="laptopBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2235" />
            <stop offset="100%" stopColor="#0F111D" />
          </linearGradient>

          <linearGradient id="screenBezelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#252A40" />
            <stop offset="100%" stopColor="#121524" />
          </linearGradient>

          <linearGradient id="screenBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B0D17" />
            <stop offset="100%" stopColor="#05070D" />
          </linearGradient>

          <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A1D2E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2A3048" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1A1D2E" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="lampLightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="purpleBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id="reactCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#61DAFB" />
            <stop offset="100%" stopColor="#00B4D8" />
          </linearGradient>

          {/* Filters */}
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Lamp Light Cone ───────────────────────────── */}
        <path
          d="M 520 80 L 400 370 L 610 370 Z"
          fill="url(#lampLightGrad)"
          className="pointer-events-none"
        />

        {/* ── Desk Surface & Shadow ─────────────────────── */}
        <ellipse cx="320" cy="380" rx="280" ry="24" fill="#000000" fillOpacity="0.45" filter="url(#glowFilter)" />
        <rect x="50" y="365" width="540" height="14" rx="7" fill="url(#deskGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="70" y1="372" x2="570" y2="372" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />

        {/* ── Background Wall Geometric Tech Grid ────────── */}
        <g opacity="0.15" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 6">
          <line x1="80" y1="60" x2="80" y2="360" />
          <line x1="160" y1="60" x2="160" y2="360" />
          <line x1="480" y1="60" x2="480" y2="360" />
          <line x1="560" y1="60" x2="560" y2="360" />
          <line x1="60" y1="120" x2="580" y2="120" />
          <line x1="60" y1="200" x2="580" y2="200" />
        </g>

        {/* ── Modern Laptop ─────────────────────────────── */}
        <g id="laptop-group">
          {/* Laptop Base Stand / Shadow */}
          <ellipse cx="320" cy="368" rx="145" ry="8" fill="#000" fillOpacity="0.5" />

          {/* Laptop Bottom Deck */}
          <path
            d="M 160 360 L 480 360 L 460 372 L 180 372 Z"
            fill="url(#laptopBodyGrad)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
          {/* Touchpad */}
          <rect x="290" y="362" width="60" height="8" rx="2" fill="#151828" stroke="rgba(255,255,255,0.06)" />

          {/* Laptop Display Bezel */}
          <rect
            x="185"
            y="130"
            width="270"
            height="225"
            rx="12"
            fill="url(#screenBezelGrad)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
          />

          {/* Web camera */}
          <circle cx="320" cy="140" r="2.5" fill="#0B0D17" stroke="#333A56" strokeWidth="1" />
          <circle cx="320" cy="140" r="1" fill="#3B82F6" />

          {/* Laptop Display Screen */}
          <rect
            x="195"
            y="150"
            width="250"
            height="195"
            rx="6"
            fill="url(#screenBgGrad)"
            stroke="rgba(139,92,246,0.3)"
            strokeWidth="1"
          />

          {/* IDE Title Bar */}
          <rect x="195" y="150" width="250" height="18" rx="6" fill="#121524" />
          {/* Mac window dots */}
          <circle cx="206" cy="159" r="3" fill="#EF4444" opacity="0.85" />
          <circle cx="215" cy="159" r="3" fill="#F59E0B" opacity="0.85" />
          <circle cx="224" cy="159" r="3" fill="#10B981" opacity="0.85" />
          <text x="320" y="162" textAnchor="middle" fill="#64748B" fontSize="7" fontFamily="JetBrains Mono, monospace">
            portfolio.js — MERN Architecture
          </text>

          {/* IDE Editor Sidebar */}
          <rect x="195" y="168" width="35" height="177" fill="#0D0F1A" />
          <rect x="200" y="176" width="25" height="4" rx="1.5" fill="#334155" />
          <rect x="200" y="184" width="20" height="3" rx="1" fill="#1E293B" />
          <rect x="200" y="190" width="22" height="3" rx="1" fill="#1E293B" />
          <rect x="200" y="196" width="18" height="3" rx="1" fill="#1E293B" />

          {/* IDE Code Area */}
          <g transform="translate(238, 178)">
            {/* Line 1 */}
            <text x="0" y="8" fill="#A78BFA" fontSize="8" fontFamily="JetBrains Mono, monospace">const</text>
            <text x="28" y="8" fill="#60A5FA" fontSize="8" fontFamily="JetBrains Mono, monospace">developer</text>
            <text x="76" y="8" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono, monospace">=</text>
            <text x="85" y="8" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono, monospace">{'{'}</text>

            {/* Line 2 */}
            <text x="10" y="20" fill="#E2E8F0" fontSize="7.5" fontFamily="JetBrains Mono, monospace">name:</text>
            <text x="38" y="20" fill="#34D399" fontSize="7.5" fontFamily="JetBrains Mono, monospace">"Intikhab Alam"</text>
            <text x="110" y="20" fill="#64748B" fontSize="7.5" fontFamily="JetBrains Mono, monospace">,</text>

            {/* Line 3 */}
            <text x="10" y="32" fill="#E2E8F0" fontSize="7.5" fontFamily="JetBrains Mono, monospace">role:</text>
            <text x="36" y="32" fill="#38BDF8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">"MERN Developer"</text>
            <text x="114" y="32" fill="#64748B" fontSize="7.5" fontFamily="JetBrains Mono, monospace">,</text>

            {/* Line 4 */}
            <text x="10" y="44" fill="#E2E8F0" fontSize="7.5" fontFamily="JetBrains Mono, monospace">stack:</text>
            <text x="40" y="44" fill="#FCD34D" fontSize="7.5" fontFamily="JetBrains Mono, monospace">['Mongo', 'React']</text>
            <text x="115" y="44" fill="#64748B" fontSize="7.5" fontFamily="JetBrains Mono, monospace">,</text>

            {/* Line 5 */}
            <text x="10" y="56" fill="#E2E8F0" fontSize="7.5" fontFamily="JetBrains Mono, monospace">status:</text>
            <text x="46" y="56" fill="#10B981" fontSize="7.5" fontFamily="JetBrains Mono, monospace">"Available"</text>

            {/* Line 6 */}
            <text x="0" y="68" fill="#F8FAFC" fontSize="8" fontFamily="JetBrains Mono, monospace">{'};'}</text>
          </g>

          {/* IDE Terminal Pane */}
          <rect x="235" y="258" width="200" height="80" rx="3" fill="#060810" stroke="rgba(255,255,255,0.06)" />
          <rect x="235" y="258" width="200" height="12" fill="#0E1220" />
          <text x="242" y="266" fill="#64748B" fontSize="6.5" fontFamily="JetBrains Mono, monospace">TERMINAL — zsh</text>
          <text x="242" y="280" fill="#10B981" fontSize="7" fontFamily="JetBrains Mono, monospace">➜  portfolio git:(main)</text>
          <text x="242" y="292" fill="#94A3B8" fontSize="7" fontFamily="JetBrains Mono, monospace">$ npm run build:success</text>
          <text x="242" y="304" fill="#A78BFA" fontSize="7" fontFamily="JetBrains Mono, monospace">✓ 1965 modules transformed.</text>
          <text x="242" y="316" fill="#38BDF8" fontSize="7" fontFamily="JetBrains Mono, monospace">🚀 Live at intikhab.dev</text>

          {/* Blinking Terminal Cursor */}
          <rect x="340" y="310" width="5" height="8" fill="#38BDF8">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* ── Coffee Mug with Animated Steam ────────────── */}
        <g id="coffee-mug" transform="translate(110, 310)">
          {/* Mug shadow */}
          <ellipse cx="25" cy="55" rx="20" ry="4" fill="#000" fillOpacity="0.4" />
          {/* Handle */}
          <path d="M 38 20 C 50 20 50 42 38 42" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Mug body */}
          <rect x="10" y="14" width="30" height="38" rx="5" fill="#1E1B4B" stroke="#8B5CF6" strokeWidth="1.5" />
          {/* Coffee surface */}
          <ellipse cx="25" cy="15" rx="14" ry="4" fill="#3E2723" />
          {/* Code symbol on mug */}
          <text x="25" y="35" textAnchor="middle" fill="#A78BFA" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
            &lt;/&gt;
          </text>
          {/* Rising Steam Paths */}
          <path d="M 20 10 Q 17 0 22 -8 T 20 -18" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M 20 10 Q 17 0 22 -8 T 20 -18; M 20 10 Q 23 0 18 -8 T 20 -18; M 20 10 Q 17 0 22 -8 T 20 -18" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M 28 8 Q 32 -2 27 -10 T 30 -22" stroke="rgba(167,139,250,0.4)" strokeWidth="1.2" strokeLinecap="round" fill="none">
            <animate attributeName="d" values="M 28 8 Q 32 -2 27 -10 T 30 -22; M 28 8 Q 25 -2 30 -10 T 28 -22; M 28 8 Q 32 -2 27 -10 T 30 -22" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" />
          </path>
        </g>

        {/* ── Modern Desk Lamp ──────────────────────────── */}
        <g id="desk-lamp" transform="translate(515, 200)">
          {/* Base */}
          <ellipse cx="25" cy="165" rx="22" ry="6" fill="#151828" stroke="#8B5CF6" strokeWidth="1.5" />
          {/* Arm bottom segment */}
          <line x1="25" y1="162" x2="20" y2="90" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
          {/* Elbow Joint */}
          <circle cx="20" cy="90" r="5" fill="#8B5CF6" />
          {/* Arm top segment */}
          <line x1="20" y1="90" x2="-5" y2="40" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          {/* Lamp Head Joint */}
          <circle cx="-5" cy="40" r="4" fill="#8B5CF6" />
          {/* Shade */}
          <path d="M -25 25 L 15 35 L -10 55 Z" fill="#2E1065" stroke="#A78BFA" strokeWidth="1.5" />
          {/* Lamp Bulb Glow */}
          <circle cx="-5" cy="48" r="6" fill="#FFFFFF" filter="url(#glowFilter)" />
        </g>

        {/* ── Floating Tech Nodes & Orbitals ────────────── */}

        {/* Node 1: React Atom */}
        <g transform="translate(130, 80)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="130 80; 130 72; 130 80"
            dur="4s"
            repeatCount="indefinite"
          />
          {/* Backdrop bubble */}
          <circle cx="24" cy="24" r="26" fill="#0B0F1E" stroke="rgba(97,218,251,0.4)" strokeWidth="1.5" filter="url(#glowFilter)" />
          {/* React ellipses */}
          <ellipse cx="24" cy="24" rx="16" ry="6" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0 24 24)" />
          <ellipse cx="24" cy="24" rx="16" ry="6" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="16" ry="6" fill="none" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 24 24)" />
          <circle cx="24" cy="24" r="2.5" fill="#61DAFB" />
        </g>

        {/* Node 2: Node.js Hexagon */}
        <g transform="translate(470, 70)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="470 70; 470 78; 470 70"
            dur="4.5s"
            repeatCount="indefinite"
          />
          <circle cx="24" cy="24" r="24" fill="#0B1510" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" filter="url(#glowFilter)" />
          {/* Hexagon */}
          <polygon points="24,12 34,18 34,30 24,36 14,30 14,18" fill="none" stroke="#22C55E" strokeWidth="1.8" />
          <text x="24" y="27" textAnchor="middle" fill="#22C55E" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="bold">JS</text>
        </g>

        {/* Node 3: MongoDB Leaf */}
        <g transform="translate(90, 210)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="90 210; 90 202; 90 210"
            dur="5s"
            repeatCount="indefinite"
          />
          <circle cx="20" cy="20" r="22" fill="#0B1A12" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" filter="url(#glowFilter)" />
          <path d="M 20 8 C 24 14 28 20 20 32 C 12 20 16 14 20 8 Z" fill="#10B981" />
          <line x1="20" y1="12" x2="20" y2="30" stroke="#064E3B" strokeWidth="1" />
        </g>

        {/* Node 4: Express / API Node */}
        <g transform="translate(500, 200)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="500 200; 500 192; 500 200"
            dur="4.2s"
            repeatCount="indefinite"
          />
          <circle cx="20" cy="20" r="22" fill="#140D24" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" filter="url(#glowFilter)" />
          <text x="20" y="24" textAnchor="middle" fill="#C084FC" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="bold">API</text>
        </g>

        {/* ── Floating Code Symbols ───────────────────────── */}
        <text x="200" y="90" fill="rgba(139,92,246,0.5)" fontSize="18" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
          <animate attributeName="y" values="90;82;90" dur="3.8s" repeatCount="indefinite" />
          {'{ }'}
        </text>

        <text x="410" y="85" fill="rgba(59,130,246,0.5)" fontSize="16" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
          <animate attributeName="y" values="85;92;85" dur="4.2s" repeatCount="indefinite" />
          &lt;/&gt;
        </text>

        <text x="320" y="60" fill="rgba(16,185,129,0.45)" fontSize="14" fontFamily="JetBrains Mono, monospace" fontWeight="bold">
          <animate attributeName="y" values="60;52;60" dur="3.2s" repeatCount="indefinite" />
          =&gt;
        </text>
      </svg>
    </div>
  );
}
