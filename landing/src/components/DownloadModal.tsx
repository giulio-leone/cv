import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import content from '../data/content.json';

const BASE = 'https://github.com/giulio-leone/cv/raw/main/output';

const downloads = content.downloads
  .map((d) => ({
    label: d.label,
    href: `${BASE}/${d.filename}`,
    recommended: !!d.badge,
    badge: typeof d.badge === 'string' ? d.badge.trim() : '',
  }))
  .sort((a, b) => Number(b.recommended) - Number(a.recommended));

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActive = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    } else {
      panel?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousActive?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="download-modal-title"
              tabIndex={-1}
              className="glass-panel rounded-2xl p-8 w-full max-w-md pointer-events-auto border border-glass-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 id="download-modal-title" className="text-xl font-semibold text-foreground">Download CV</h3>
                <button
                  onClick={onClose}
                  className="text-text-muted hover:text-foreground transition-colors p-1"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Download Options */}
              <div className="flex flex-col gap-3">
                {downloads.map((d) => (
                  <a
                    key={d.label}
                    href={d.href}
                    download
                    onClick={() => onClose()}
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      d.recommended
                        ? 'border-foreground/25 bg-foreground/8 hover:bg-foreground/12 hover:border-foreground/35'
                        : 'border-foreground/10 bg-foreground/4 hover:bg-foreground/8 hover:border-foreground/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-medium text-sm">{d.label}</span>
                        {d.badge && (
                          <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-foreground/12 text-text-muted">
                            {d.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-text-muted group-hover:text-foreground transition-colors flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
