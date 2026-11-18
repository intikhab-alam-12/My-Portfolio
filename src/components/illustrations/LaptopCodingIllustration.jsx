import { motion } from 'framer-motion';

/**
 * LaptopCodingIllustration
 * Premium isometric/perspective SVG laptop with animated MERN code lines,
 * compilation pulse, status badges, and floating technology nodes.
 */
export default function LaptopCodingIllustration({ className = '' }) {
  return (
    <div className={`relative w-full max-w-md mx-auto aspect-[16/10] select-none ${className}`}>
      {/* Dynamic Ambient Background Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full opacity-40 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(56,189,248,0.2) 60%, transparent 80%)',
        }}
      />

      <svg
        viewBox="0 0 540 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="laptopLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2333" />
            <stop offset="100%" stopColor="#0D1017" />
          </linearGradient>

          <linearGradient id="laptopScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B0E14" />
            <stop offset="100%" stopColor="#05070B" />
          </linearGradient>

          <linearGradient id="keyboardBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#171A26" />
            <stop offset="50%" stopColor="#252B3D" />
            <stop offset="100%" stopColor="#171A26" />
          </linearGradient>

          <linearGradient id="accentGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="270" cy="290" rx="210" ry="20" fill="#000000" fillOpacity="0.45" filter="url(#softGlow)" />

        {/* ========================================================
            1. Laptop Base / Keyboard Deck
            ======================================================== */}
        <g id="laptop-base">
          {/* Main Wedge Base */}
          <path
            d="M 90 265 L 450 265 L 430 286 L 110 286 Z"
            fill="url(#keyboardBaseGrad)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.2"
          />

          {/* Front Beveled Lip */}
          <path
            d="M 110 286 L 430 286 L 420 292 L 120 292 Z"
            fill="#0F121A"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {/* Front Notch */}
          <rect x="250" y="286" width="40" height="2.5" rx="1" fill="rgba(255,255,255,0.25)" />

          {/* Keyboard Recess */}
          <path
            d="M 130 267 L 410 267 L 396 279 L 144 279 Z"
            fill="#080A0F"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.8"
          />

          {/* Key Rows Simulation */}
          <g opacity="0.35" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3">
            <line x1="148" y1="270" x2="392" y2="270" />
            <line x1="145" y1="273" x2="395" y2="273" />
            <line x1="143" y1="276" x2="397" y2="276" />
          </g>

          {/* Touchpad */}
          <polygon
            points="230,280 310,280 306,285 234,285"
            fill="#141724"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
        </g>

        {/* ========================================================
            2. Laptop Screen & Bezel (Upright)
            ======================================================== */}
        <g id="laptop-screen">
          {/* Back Hinge Connection */}
          <rect x="210" y="260" width="120" height="6" rx="2" fill="#11141F" stroke="rgba(255,255,255,0.1)" />

          {/* Screen Outer Aluminum Shell */}
          <rect
            x="110"
            y="50"
            width="320"
            height="212"
            rx="12"
            fill="url(#laptopLidGrad)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />

          {/* Inner Display Glass */}
          <rect
            x="122"
            y="62"
            width="296"
            height="188"
            rx="6"
            fill="url(#laptopScreenGrad)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {/* Top Bezel Webcam & Indicator */}
          <circle cx="270" cy="56" r="2" fill="#0A0C12" />
          <circle cx="270" cy="56" r="0.8" fill="#38BDF8" opacity="0.8" />
          <circle cx="277" cy="56" r="0.8" fill="#10B981" />

          {/* Window Title Bar */}
          <rect x="122" y="62" width="296" height="20" rx="6" fill="#111522" />
          {/* Window Controls */}
          <circle cx="134" cy="72" r="3" fill="#EF4444" opacity="0.85" />
          <circle cx="144" cy="72" r="3" fill="#F59E0B" opacity="0.85" />
          <circle cx="154" cy="72" r="3" fill="#10B981" opacity="0.85" />

          {/* Tab Pill */}
          <rect x="170" y="65" width="100" height="14" rx="3" fill="#1A2033" stroke="rgba(255,255,255,0.08)" />
          <text x="180" y="75" fill="#94A3B8" fontSize="7" fontFamily="monospace">server.js - MERN</text>

          {/* Status Indicator on Window Bar */}
          <text x="365" y="75" fill="#34D399" fontSize="7" fontFamily="monospace">● RUNNING</text>

          {/* ====================================================
              Code Lines & Syntax Highlighting
              ==================================================== */}
          <g transform="translate(132, 92)" fontFamily="monospace" fontSize="7.5">
            {/* Line 1 */}
            <text x="0" y="0" fill="#64748B" fontSize="6.5">01</text>
            <text x="16" y="0" fill="#C084FC">import</text>
            <text x="46" y="0" fill="#F8FAFC">express</text>
            <text x="82" y="0" fill="#C084FC">from</text>
            <text x="105" y="0" fill="#34D399">'express'</text>
            <text x="146" y="0" fill="#94A3B8">;</text>

            {/* Line 2 */}
            <text x="0" y="13" fill="#64748B" fontSize="6.5">02</text>
            <text x="16" y="13" fill="#C084FC">import</text>
            <text x="46" y="13" fill="#F8FAFC">mongoose</text>
            <text x="88" y="13" fill="#C084FC">from</text>
            <text x="111" y="13" fill="#34D399">'mongoose'</text>
            <text x="157" y="13" fill="#94A3B8">;</text>

            {/* Line 3 */}
            <text x="0" y="26" fill="#64748B" fontSize="6.5">03</text>
            <text x="16" y="26" fill="#38BDF8">const</text>
            <text x="42" y="26" fill="#FBBF24">app</text>
            <text x="60" y="26" fill="#94A3B8">=</text>
            <text x="70" y="26" fill="#60A5FA">express()</text>
            <text x="116" y="26" fill="#94A3B8">;</text>

            {/* Line 4 - API Route */}
            <text x="0" y="39" fill="#64748B" fontSize="6.5">04</text>
            <text x="16" y="39" fill="#FBBF24">app</text>
            <text x="31" y="39" fill="#94A3B8">.</text>
            <text x="36" y="39" fill="#60A5FA">get</text>
            <text x="52" y="39" fill="#94A3B8">(</text>
            <text x="56" y="39" fill="#34D399">'/api/developer'</text>
            <text x="130" y="39" fill="#94A3B8">, (</text>
            <text x="140" y="39" fill="#F8FAFC">req, res</text>
            <text x="176" y="39" fill="#94A3B8">) =&gt; {'{'}</text>

            {/* Line 5 - Payload */}
            <text x="0" y="52" fill="#64748B" fontSize="6.5">05</text>
            <text x="24" y="52" fill="#F8FAFC">res</text>
            <text x="38" y="52" fill="#94A3B8">.</text>
            <text x="42" y="52" fill="#60A5FA">json</text>
            <text x="60" y="52" fill="#94A3B8">({'{'}</text>
            <text x="68" y="52" fill="#93C5FD">name:</text>
            <text x="96" y="52" fill="#34D399">'Intikhab Alam'</text>
            <text x="168" y="52" fill="#94A3B8">, </text>
            <text x="174" y="52" fill="#93C5FD">role:</text>
            <text x="200" y="52" fill="#34D399">'MERN'</text>
            <text x="230" y="52" fill="#94A3B8">{'}'});</text>

            {/* Line 6 */}
            <text x="0" y="65" fill="#64748B" fontSize="6.5">06</text>
            <text x="16" y="65" fill="#94A3B8">{'}'});</text>

            {/* Terminal Drawer in Bottom of Screen */}
            <rect x="-4" y="76" width="284" height="42" rx="4" fill="#07090E" stroke="rgba(255,255,255,0.06)" />
            <text x="4" y="86" fill="#64748B" fontSize="6.5">TERMINAL - bash</text>
            <text x="4" y="98" fill="#10B981" fontSize="7">$ vite build --mode production</text>
            <text x="4" y="110" fill="#38BDF8" fontSize="7">✓ 1970 modules transformed in 8.7s</text>
          </g>

          {/* Screen Light Reflection Gradient */}
          <path
            d="M 122 62 L 230 62 L 150 250 L 122 250 Z"
            fill="url(#accentGlowGrad)"
            opacity="0.04"
          />
        </g>

        {/* ========================================================
            3. Floating Tech Badges (Framed with Framer Motion)
            ======================================================== */}
        {/* Node.js Badge */}
        <motion.g
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="40" y="100" width="80" height="28" rx="6" fill="#0F172A" stroke="#22C55E" strokeWidth="1" opacity="0.9" />
          <circle cx="54" cy="114" r="5" fill="#22C55E" />
          <text x="64" y="118" fill="#E2E8F0" fontSize="8" fontWeight="600" fontFamily="sans-serif">Node.js</text>
        </motion.g>

        {/* React.js Badge */}
        <motion.g
          animate={{ y: [4, -5, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="420" y="85" width="82" height="28" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" opacity="0.9" />
          <circle cx="434" cy="99" r="5" fill="#38BDF8" />
          <text x="445" y="103" fill="#E2E8F0" fontSize="8" fontWeight="600" fontFamily="sans-serif">React 18</text>
        </motion.g>

        {/* MongoDB Badge */}
        <motion.g
          animate={{ y: [-3, 5, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="415" y="210" width="85" height="28" rx="6" fill="#0F172A" stroke="#10B981" strokeWidth="1" opacity="0.9" />
          <circle cx="429" cy="224" r="5" fill="#10B981" />
          <text x="440" y="228" fill="#E2E8F0" fontSize="8" fontWeight="600" fontFamily="sans-serif">MongoDB</text>
        </motion.g>

        {/* Express API Badge */}
        <motion.g
          animate={{ y: [3, -4, 3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="35" y="195" width="85" height="28" rx="6" fill="#0F172A" stroke="#A855F7" strokeWidth="1" opacity="0.9" />
          <circle cx="49" cy="209" r="5" fill="#A855F7" />
          <text x="59" y="213" fill="#E2E8F0" fontSize="8" fontWeight="600" fontFamily="sans-serif">Express API</text>
        </motion.g>
      </svg>
    </div>
  );
}
