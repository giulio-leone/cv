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
  { name: 'AI & GenAI', count: 28, color: 'from-accent to-accent-2' },
  { name: 'Database', count: 11, color: 'from-purple-400 to-pink-500' },
  { name: 'Data & ML', count: 7, color: 'from-emerald-400 to-teal-500' },
  { name: 'Cloud', count: 7, color: 'from-orange-400 to-amber-500' },
  { name: 'Security', count: 4, color: 'from-red-400 to-rose-500' },
  { name: 'Other', count: 9, color: 'from-gray-400 to-gray-500' },
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent"
        >
          66+ Certifications
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-text-muted text-center mb-12 text-sm"
        >
          Microsoft · AWS · Oracle · IBM · Google · MongoDB · Meta
        </motion.p>

        {/* Category bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-glass border border-glass-border"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-xs font-bold`}>
                {cat.count}
              </div>
              <span className="text-sm text-text-muted">{cat.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Top certs pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {topCerts.map((cert) => (
            <span
              key={cert}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-glass-border text-text-muted hover:border-accent/30 hover:text-accent transition-colors"
            >
              {cert}
            </span>
          ))}
          <a
            href="https://github.com/giulio-leone/cv/blob/main/data/certifications.json"
            target="_blank"
            rel="noopener"
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-accent hover:underline"
          >
            +58 more →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
