export default function SectionDivider({
  variant = 'wave',
  className = '',
  flip = false,
}) {
  const transform = flip ? 'rotate(180deg)' : 'none';

  if (variant === 'slant') {
    return (
      <div className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${className}`} style={{ transform }}>
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 md:h-16 block"
        >
          <defs>
            <linearGradient id="slantLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <polygon points="0,0 1200,60 0,60" fill="currentColor" opacity="0.04" />
          <line x1="0" y1="0" x2="1200" y2="60" stroke="url(#slantLineGrad)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (variant === 'circuit') {
    return (
      <div className={`relative w-full overflow-hidden leading-none select-none pointer-events-none py-2 ${className}`} style={{ transform }}>
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-6 sm:h-8 block"
        >
          <path
            d="M 0 20 L 300 20 L 340 35 L 560 35 L 580 20 L 720 20 L 740 5 L 940 5 L 960 20 L 1200 20"
            fill="none"
            stroke="rgba(139,92,246,0.25)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />
          <circle cx="340" cy="35" r="3" fill="#8B5CF6" />
          <circle cx="580" cy="20" r="3" fill="#3B82F6" />
          <circle cx="740" cy="5" r="3" fill="#10B981" />
          <circle cx="960" cy="20" r="3" fill="#A855F7" />
        </svg>
      </div>
    );
  }

  // Default: modern smooth wave
  return (
    <div className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${className}`} style={{ transform }}>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-10 sm:h-14 md:h-20 block"
      >
        <defs>
          <linearGradient id="waveLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 40 C 300 80 500 0 800 45 C 1000 70 1100 20 1200 40"
          fill="none"
          stroke="url(#waveLineGrad)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
