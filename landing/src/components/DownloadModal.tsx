import { motion, AnimatePresence } from 'framer-motion';
import content from '../data/content.json';

const BASE = 'https://github.com/giulio-leone/cv/raw/main/output';

const downloads = content.downloads.map((d) => ({
  label: d.label,
  href: `${BASE}/${d.filename}`,
  recommended: !!d.badge,
  badge: d.badge,
}));

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
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
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
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
              className="glass-panel rounded-2xl p-8 w-full max-w-md pointer-events-auto border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Download CV</h3>
                <button
                  onClick={onClose}
                  className="text-text-muted hover:text-white transition-colors p-1"
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
                    className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                      d.recommended
                        ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">{d.label}</span>
                        {d.badge && (
                          <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                            {d.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-text-muted group-hover:text-white transition-colors flex-shrink-0"
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
