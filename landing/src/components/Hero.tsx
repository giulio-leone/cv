import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* High-end ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        {/* Status pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel text-white text-xs uppercase tracking-widest font-semibold mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          Available for UAE opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-4 text-gradient lowercase"
        >
          Giulio Leone.
        </motion.h1>

        {/* Role */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xl sm:text-2xl text-text-muted mb-10 font-light max-w-2xl"
        >
          Crafting intelligent systems. Senior{' '}
          <span className="text-white font-medium">AI Engineer</span>{' '}
          specializing in Generative AI, RAG, and LLM orchestration.
        </motion.p>

        {/* Tags */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {['RAG Systems', 'Agentic AI', 'LLM Integration', 'Generative UI', 'Full-Stack'].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium glass-panel text-text-muted hover:text-white hover:bg-white/10 transition-all duration-500 cursor-default"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
        >
          <MagneticButton>
            <a
              href="https://github.com/giulio-leone/cv/raw/main/output/cv-en.pdf"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-black bg-white overflow-hidden transition-transform duration-500 hover:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wide">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
                Download Résumé
              </span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#downloads"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-white glass-panel hover:bg-white/5 transition-all duration-500 text-sm uppercase tracking-wide"
            >
              View Alternate Versions
            </a>
          </MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-24 text-text-muted/40"
        >
          <div className="w-5 h-8 rounded-full border border-white/20 mx-auto flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
