import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const links = [
  { icon: '🌐', label: 'Website', href: 'https://www.giulioleone.com' },
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/giulioleone1/' },
  { icon: '⚡', label: 'GitHub', href: 'https://github.com/giulio-leone/cv' },
  { icon: '✉️', label: 'Email', href: 'mailto:giulioleone097@gmail.com' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/393661410914' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-text-muted bg-clip-text text-transparent"
        >
          Let's Connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-text-muted mb-10 text-sm"
        >
          EU citizen · Immediately available · Open to UAE work visa sponsorship
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener' : undefined}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-glass-border bg-glass text-text-muted font-medium text-sm hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>{l.icon}</span>
              {l.label}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-glass-border text-xs text-text-muted/50"
        >
          Built with LaTeX · Astro · Tailwind CSS · Auto-compiled via GitHub Actions
        </motion.div>
      </div>
    </section>
  );
}
