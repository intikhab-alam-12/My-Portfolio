/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08090D',
          primary: '#08090D',
          secondary: '#0D0F17',
          tertiary: '#131622',
        },
        surface: {
          DEFAULT: '#11131C',
          card: '#11131C',
          cardHover: '#161926',
          elevated: '#1A1D2D',
          muted: '#1E2235',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.16)',
          glow: 'rgba(139, 92, 246, 0.3)',
        },
        accent: {
          purple: {
            DEFAULT: '#8B5CF6',
            light: '#A78BFA',
            dark: '#7C3AED',
            glow: 'rgba(139, 92, 246, 0.45)',
          },
          blue: {
            DEFAULT: '#3B82F6',
            light: '#60A5FA',
            dark: '#2563EB',
            glow: 'rgba(59, 130, 246, 0.45)',
          },
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          highlight: '#EDE9FE',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.18) 0%, rgba(59, 130, 246, 0.08) 35%, transparent 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'purple-blue': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'aurora': 'aurora 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        aurora: {
          from: { backgroundPosition: '0% 50%' },
          to: { backgroundPosition: '200% 50%' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'glow-blue': '0 0 35px -5px rgba(59, 130, 246, 0.35)',
        'glow-dual': '0 0 50px -10px rgba(139, 92, 246, 0.3), 0 0 50px -10px rgba(59, 130, 246, 0.2)',
      }
    },
  },
  plugins: [],
}

