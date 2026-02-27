import { useRef } from 'react';
import { motion } from 'framer-motion';

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

interface MarqueeProps {
    speed?: number; // duration in seconds
    direction?: 'left' | 'right';
    className?: string;
}

export default function CertificationsMarquee({ speed = 40, direction = 'left', className = '' }: MarqueeProps) {
    const containerRef = useRef(null);

    return (
        <section
            ref={containerRef}
            className={`relative py-6 flex overflow-hidden w-full bg-background/50 backdrop-blur-md border-t border-white/5 z-20 ${className}`}
        >
            <div className="flex whitespace-nowrap will-change-transform w-full">
                <div
                    className="flex items-center gap-8 whitespace-nowrap animate-marquee"
                    style={{
                        animationDuration: `${speed}s`,
                        animationDirection: direction === 'left' ? 'normal' : 'reverse'
                    }}
                >
                    {topCerts.map((cert, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-gradient-to-r from-white/5 to-white/10 border text-white transition-all duration-300 shadow-xl"
                            style={{
                                boxShadow: `inset 0 0 10px ${cert.color}, 0 0 15px ${cert.color}`,
                                borderColor: cert.border
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" style={{ color: cert.border }}>
                                {cert.icon}
                            </svg>
                            {cert.name}
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {topCerts.map((cert, i) => (
                        <div
                            key={`dup-${i}`}
                            className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-gradient-to-r from-white/5 to-white/10 border text-white transition-all duration-300 shadow-xl"
                            style={{
                                boxShadow: `inset 0 0 10px ${cert.color}, 0 0 15px ${cert.color}`,
                                borderColor: cert.border
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" style={{ color: cert.border }}>
                                {cert.icon}
                            </svg>
                            {cert.name}
                        </div>
                    ))}
                    {/* Triplicate set for extreme widescreen support seamlessly */}
                    {topCerts.map((cert, i) => (
                        <div
                            key={`trip-${i}`}
                            className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold tracking-wide bg-gradient-to-r from-white/5 to-white/10 border text-white transition-all duration-300 shadow-xl"
                            style={{
                                boxShadow: `inset 0 0 10px ${cert.color}, 0 0 15px ${cert.color}`,
                                borderColor: cert.border
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" style={{ color: cert.border }}>
                                {cert.icon}
                            </svg>
                            {cert.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
