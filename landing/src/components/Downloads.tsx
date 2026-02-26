import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const downloads = [
  {
    icon: '📄',
    title: 'CV — English',
    meta: 'Full · 2 pages',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-en.pdf',
    primary: true,
  },
  {
    icon: '📋',
    title: 'CV — English',
    meta: 'Compact · 1 page',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-en-onepage.pdf',
  },
  {
    icon: '🇮🇹',
    title: 'CV — Italiano',
    meta: 'Completo · 2 pagine',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-it.pdf',
  },
  {
    icon: '🇮🇹',
    title: 'CV — Italiano',
    meta: 'Compatto · 1 pagina',
    href: 'https://github.com/giulio-leone/cv/raw/main/output/cv-it-onepage.pdf',
  },
];

export default function Downloads() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="downloads" ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent"
        >
          Download CV
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {downloads.map((d, i) => (
            <motion.a
              key={d.href}
              href={d.href}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`group flex items-center gap-4 p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)] ${
                d.primary
                  ? 'bg-accent/5 border-accent/30 hover:border-accent/50'
                  : 'bg-glass border-glass-border hover:border-accent/30'
              }`}
            >
              <span className="text-3xl">{d.icon}</span>
              <div>
                <div className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {d.title}
                </div>
                <div className="text-sm text-text-muted">{d.meta}</div>
              </div>
              <svg
                className="w-5 h-5 ml-auto text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
