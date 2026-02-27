import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SpotlightCard from './SpotlightCard';
import { EASE_OUT_QUART } from '../lib/motion';

const stats = [
  { value: '7+', label: 'Years Experience' },
  { value: '66+', label: 'Certifications' },
  { value: 'EU', label: 'Citizen' },
  { value: '0', label: 'Days Notice' },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-24 px-6 relative z-10">
      <motion.div style={{ y: yParallax }} className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.8, ease: EASE_OUT_QUART }}
              className="transition-transform duration-500 hover:scale-105 h-full"
            >
              <SpotlightCard className="text-center p-8 h-full flex flex-col justify-center items-center">
                <div className="text-5xl sm:text-6xl font-black mb-3 text-gradient">
                  {s.value}
                </div>
                <div className="text-xs tracking-[0.2em] font-medium uppercase text-text-muted">{s.label}</div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
