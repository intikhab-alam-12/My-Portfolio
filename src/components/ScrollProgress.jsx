import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  /* Smooth spring on raw scroll — prevents jank on fast scroll */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[9990] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
        boxShadow: '0 0 10px 2px rgba(139,92,246,0.55), 0 0 20px 4px rgba(59,130,246,0.25)',
      }}
    />
  );
}

