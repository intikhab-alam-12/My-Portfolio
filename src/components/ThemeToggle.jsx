import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`
        relative inline-flex items-center justify-center gap-2 p-2 rounded-xl
        border transition-all duration-300 select-none
        ${
          isDark
            ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] hover:border-purple-500/40 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
            : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.1] hover:border-purple-600/40 text-purple-700 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
        }
        ${className}
      `}
      data-cursor="pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -12, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun size={18} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          ) : (
            <Moon size={18} className="text-purple-600 drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
          )}
        </motion.div>
      </AnimatePresence>

      {showLabel && (
        <span className="text-xs font-mono font-medium">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </motion.button>
  );
}
