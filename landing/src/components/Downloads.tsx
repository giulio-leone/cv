import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';
import { EASE_OUT_QUART } from '../lib/motion';

const downloads = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Résumé — English',
    meta: 'Comprehensive · 2 pages',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-en.pdf',
    primary: true,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 14.25h6m-6 3h6m-6-6h6" />
      </svg>
    ),
    title: 'Résumé — English',
    meta: 'Compact · 1 page',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-en-onepage.pdf',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v18m4-18v18" />
      </svg>
    ),
    title: 'CV — Italiano',
    meta: 'Completo · 2 pagine',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-it.pdf',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v18m4-18v18M7 10h10" />
      </svg>
    ),
    title: 'CV — Italiano',
    meta: 'Compatto · 1 pagina',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-it-onepage.pdf',
  },
];

export default function Downloads() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="downloads" ref={ref} className="py-24 px-6 relative z-10">
      <motion.div style={{ y: yParallax }} className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE_OUT_QUART }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gradient lowercase tracking-tight"
        >
          Documentation.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {downloads.map((d, i) => (
            <motion.div
              key={d.href}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: EASE_OUT_QUART }}
              className="group transition-all duration-500 hover:-translate-y-2 h-full"
            >
              <SpotlightCard
                as="a"
                href={d.href}
                className={`flex items-center gap-6 p-6 h-full ${d.primary
                  ? 'border-white/20'
                  : 'border-white/5'
                  }`}
              >
                <div className="text-text-muted group-hover:text-white transition-colors duration-500 z-20">
                  {d.icon}
                </div>
                <div className="z-20">
                  <div className="font-bold text-lg text-white group-hover:tracking-wide transition-all duration-500">
                    {d.title}
                  </div>
                  <div className="text-sm text-text-muted font-light mt-1 tracking-wide">{d.meta}</div>
                </div>
                <svg
                  className="w-5 h-5 ml-auto text-text-muted opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0 transition-all duration-500 z-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
