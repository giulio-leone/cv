import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';

const topCerts = [
  {
    name: 'AWS GenAI Developer Pro',
    color: 'rgba(255, 153, 0, 0.3)',
    border: 'rgba(255, 153, 0, 0.5)',
    icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
  {
    name: 'Azure AI Engineer',
    color: 'rgba(0, 120, 212, 0.3)',
    border: 'rgba(0, 120, 212, 0.5)',
    icon: <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M15 2H9c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zM12 11h.01M12 15h.01M12 19h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
  {
    name: 'Oracle OCI GenAI Pro',
    color: 'rgba(248, 0, 0, 0.3)',
    border: 'rgba(248, 0, 0, 0.5)',
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
  {
    name: 'IBM Data Science Pro',
    color: 'rgba(5, 48, 173, 0.3)',
    border: 'rgba(5, 48, 173, 0.5)',
    icon: <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
  {
    name: 'MongoDB Associate Dev',
    color: 'rgba(19, 170, 82, 0.3)',
    border: 'rgba(19, 170, 82, 0.5)',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
  {
    name: 'Google Cybersecurity',
    color: 'rgba(66, 133, 244, 0.3)',
    border: 'rgba(66, 133, 244, 0.5)',
    icon: <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
  {
    name: 'Meta Back-End Dev',
    color: 'rgba(6, 104, 225, 0.3)',
    border: 'rgba(6, 104, 225, 0.5)',
    icon: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
  {
    name: 'Oracle AI Vector Search',
    color: 'rgba(248, 0, 0, 0.3)',
    border: 'rgba(248, 0, 0, 0.5)',
    icon: <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  },
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-24 px-6 relative z-10">
      <motion.div style={{ y: yParallax }} className="max-w-4xl mx-auto">
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
              className="group transition-all duration-500 h-full"
            >
              <SpotlightCard className="flex items-center gap-4 p-4 h-full">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-black text-sm font-black shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500 z-20`}>
                  {cat.count}
                </div>
                <span className="text-sm font-semibold tracking-wide text-text-primary group-hover:text-white transition-colors z-20">{cat.name}</span>
              </SpotlightCard>
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
            <div
              key={cert.name}
              className="flex items-center gap-3 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-white/5 border border-white/10 text-text-muted hover:text-white transition-all duration-300 cursor-default shadow-lg"
              style={{
                boxShadow: `inset 0 0 10px ${cert.color}, 0 0 15px ${cert.color}`,
                borderColor: cert.border
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ color: cert.border }}>
                {cert.icon}
              </svg>
              {cert.name}
            </div>
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
      </motion.div>
    </section>
  );
}
