import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '7+', label: 'Years Experience' },
  { value: '66+', label: 'Certifications' },
  { value: 'EU', label: 'Citizen' },
  { value: '0', label: 'Days Notice' },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
              className="text-center p-6 rounded-2xl bg-glass border border-glass-border backdrop-blur-sm"
            >
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-text-muted mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
