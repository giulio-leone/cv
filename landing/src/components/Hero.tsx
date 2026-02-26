import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Gradient glow behind hero */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-accent-2/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl text-center">
        {/* Status pill */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Available for UAE opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-br from-white via-white to-text-muted bg-clip-text text-transparent"
        >
          Giulio Leone
        </motion.h1>

        {/* Role */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-text-muted mb-6"
        >
          Senior{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent font-semibold">
            AI Engineer
          </span>{' '}
          — Generative AI & LLM Systems
        </motion.p>

        {/* Tags */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {['RAG Systems', 'Agentic AI', 'LLM Integration', 'Generative UI', 'Full-Stack', 'Python', 'React / Next.js'].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md text-xs font-medium bg-glass border border-glass-border text-text-muted hover:border-accent/30 hover:text-accent transition-colors duration-300"
              >
                {tag}
              </span>
            ),
          )}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://github.com/giulio-leone/cv/raw/main/output/cv-en.pdf"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(14,165,233,0.3)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-2 opacity-100" />
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </span>
          </a>
          <a
            href="#downloads"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-text-muted border border-glass-border bg-glass hover:border-accent/40 hover:text-accent transition-all duration-300"
          >
            All versions ↓
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 text-text-muted/40"
        >
          <div className="w-6 h-10 rounded-full border-2 border-current mx-auto flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-current"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
