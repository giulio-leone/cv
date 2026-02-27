import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import content from '../data/content.json';
import CertModal from './CertModal';

interface CertData {
  name: string;
  issuer: string;
  color: string;
  logo: string;
  fullTitle?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}

const certs: CertData[] = content.certifications.featured;

function CertCard({ cert, index, onClick }: { cert: CertData; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -3 }}
    >
      <button
        type="button"
        onClick={onClick}
        className="relative flex flex-col items-center gap-2.5 px-4 py-4 md:px-5 md:py-5 rounded-2xl border border-foreground/8 bg-foreground/[0.03] overflow-hidden transition-all duration-300 min-w-[100px] md:min-w-[120px] hover:border-foreground/14 hover:bg-foreground/[0.06] cursor-pointer w-full"
      >
        {/* Logo */}
        <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl bg-foreground/[0.06] transition-colors duration-300 group-hover:bg-foreground/[0.10] will-change-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-foreground/70 group-hover:text-foreground transition-colors duration-300" fill="currentColor">
            <path d={cert.logo} />
          </svg>
        </div>

        {/* Cert Name */}
        <span className="relative z-10 text-[11px] md:text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors text-center leading-tight">
          {cert.name}
        </span>
      </button>
    </motion.div>
  );
}

interface CertBadgesProps {
  isVisible: boolean;
}

export default function CertBadges({ isVisible }: CertBadgesProps) {
  const [count, setCount] = useState(0);
  const [selectedCert, setSelectedCert] = useState<CertData | null>(null);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const target = content.certifications.total;
    let raf: number | undefined;
    const timeout = setTimeout(() => {
      const step = () => {
        current += 2;
        if (current >= target) {
          setCount(target);
          return;
        }
        setCount(current);
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, 1200);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-wrap gap-2.5 md:gap-3 justify-center mb-4">
        {certs.map((cert, i) => (
          <CertCard key={cert.name} cert={cert} index={i} onClick={() => setSelectedCert(cert)} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="flex justify-center"
      >
        <a
          href={content.certifications.viewAllUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-xs text-text-muted hover:text-foreground/80 transition-all duration-300 uppercase tracking-widest font-medium"
        >
          <span className="font-mono text-foreground/70 group-hover:text-foreground transition-colors">{count}+</span>
          {content.certifications.viewAllLabel}
          <svg
            className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </motion.div>
      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
}
