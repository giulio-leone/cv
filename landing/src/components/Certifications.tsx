import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const topCerts = [
  'AWS GenAI Developer Pro',
  'Azure AI Engineer',
  'Oracle OCI GenAI Pro',
  'IBM Data Science Pro',
  'MongoDB Associate Dev',
  'Google Cybersecurity',
  'Meta Back-End Dev',
  'Oracle AI Vector Search',
];

const categories = [
  { name: 'AI & GenAI', count: 28, color: 'from-white to-[#888888]' },
  { name: 'Database', count: 11, color: 'from-[#aaaaaa] to-[#555555]' },
  { name: 'Data & ML', count: 7, color: 'from-[#cccccc] to-[#777777]' },
  { name: 'Cloud', count: 7, color: 'from-[#bbbbbb] to-[#666666]' },
  { name: 'Security', count: 4, color: 'from-[#999999] to-[#444444]' },
  { name: 'Other', count: 9, color: 'from-[#777777] to-[#333333]' },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gradient lowercase tracking-tight mb-4"
        >
          certifications.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-text-muted text-center mb-16 text-sm uppercase tracking-[0.2em] font-medium"
        >
          Microsoft · AWS · Oracle · IBM · Google · MongoDB · Meta
        </motion.p>

        {/* Category bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
              className="group flex items-center gap-4 p-4 rounded-2xl glass-panel transition-all duration-500 hover:bg-white/5"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-black text-sm font-black shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500`}>
                {cat.count}
              </div>
              <span className="text-sm font-semibold tracking-wide text-text-primary group-hover:text-white transition-colors">{cat.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Top certs pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="flex flex-wrap justify-center gap-3"
        >
          {topCerts.map((cert) => (
            <span
              key={cert}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-white/5 border border-white/10 text-text-muted hover:border-white/40 hover:text-white transition-colors duration-300 cursor-default"
            >
              {cert}
            </span>
          ))}
          <a
            href="https://github.com/giulio-leone/cv/blob/main/data/certifications.json"
            target="_blank"
            rel="noopener"
            className="px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-white text-black hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          >
            +58 more
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
