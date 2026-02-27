import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

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

interface CertModalProps {
  cert: CertData | null;
  onClose: () => void;
}

export default function CertModal({ cert, onClose }: CertModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!cert) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>('button')?.focus());
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previousFocus.current?.focus();
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={cert.fullTitle ?? cert.name}
            className="relative w-full max-w-md premium-panel rounded-2xl border border-foreground/10 p-6 md:p-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors text-foreground/50 hover:text-foreground"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-foreground/[0.06] shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-foreground/70" fill="currentColor">
                  <path d={cert.logo} />
                </svg>
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-foreground leading-snug pr-6">
                  {cert.fullTitle ?? cert.name}
                </h2>
                <p className="text-sm text-text-muted mt-0.5">{cert.issuer}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {cert.issueDate && (
                  <div className="px-3 py-2.5 rounded-xl bg-foreground/[0.03] border border-foreground/6">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-medium block mb-0.5">Issued</span>
                    <span className="text-sm font-medium text-foreground">{cert.issueDate}</span>
                  </div>
                )}
                {cert.expiryDate && (
                  <div className="px-3 py-2.5 rounded-xl bg-foreground/[0.03] border border-foreground/6">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-medium block mb-0.5">Expires</span>
                    <span className="text-sm font-medium text-foreground">{cert.expiryDate}</span>
                  </div>
                )}
              </div>

              {cert.credentialId && (
                <div className="px-3 py-2.5 rounded-xl bg-foreground/[0.03] border border-foreground/6">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-medium block mb-0.5">Credential ID</span>
                  <span className="text-xs font-mono text-foreground/80 break-all">{cert.credentialId}</span>
                </div>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-medium block mb-2">Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-foreground/[0.05] text-foreground/70 border border-foreground/6"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-foreground/90 hover:scale-[1.02] transition-all duration-300"
              >
                Verify Credential
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
