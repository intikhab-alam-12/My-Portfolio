import { motion } from 'framer-motion';

const CODE_SYMBOLS = [
  { text: '{ }', top: '15%', left: '8%', color: 'text-purple-400/40 dark:text-purple-400/30', size: 'text-lg md:text-xl', dur: 4.5, delay: 0 },
  { text: '</>', top: '22%', right: '10%', color: 'text-blue-400/40 dark:text-blue-400/30', size: 'text-xl md:text-2xl', dur: 5.2, delay: 0.5 },
  { text: '=>', top: '55%', left: '5%', color: 'text-cyan-400/35 dark:text-cyan-400/25', size: 'text-base md:text-lg', dur: 3.8, delay: 1 },
  { text: 'async', top: '65%', right: '8%', color: 'text-emerald-400/35 dark:text-emerald-400/25', size: 'text-xs md:text-sm', dur: 4.8, delay: 1.2 },
  { text: '0101', top: '80%', left: '12%', color: 'text-violet-400/30 dark:text-violet-400/20', size: 'text-xs font-mono', dur: 5.5, delay: 0.8 },
  { text: '[ ...state ]', top: '85%', right: '14%', color: 'text-amber-400/30 dark:text-amber-400/20', size: 'text-xs font-mono', dur: 4.2, delay: 1.5 },
];

export default function FloatingCodeElements({ reduced = false }) {
  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
      {CODE_SYMBOLS.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute font-mono font-bold ${item.color} ${item.size}`}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
          }}
          animate={{
            y: [-12, 12, -12],
            rotate: [-4, 4, -4],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}
