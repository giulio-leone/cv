import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MarqueeProps {
    items: string[];
    speed?: number; // duration in seconds
    direction?: 'left' | 'right';
    className?: string;
}

export default function Marquee({ items, speed = 30, direction = 'left', className = '' }: MarqueeProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect on scroll: scroll down -> marquee moves left/right slightly faster
    const xTransform = useTransform(
        scrollYProgress,
        [0, 1],
        direction === 'left' ? [0, -150] : [0, 150]
    );

    return (
        <section
            ref={containerRef}
            className={`relative py-12 flex overflow-hidden w-full bg-background border-y border-white/5 ${className}`}
        >
            <motion.div
                style={{ x: xTransform }}
                className="flex whitespace-nowrap will-change-transform"
            >
                <div
                    className="flex whitespace-nowrap animate-marquee"
                    style={{
                        animationDuration: `${speed}s`,
                        animationDirection: direction === 'left' ? 'normal' : 'reverse'
                    }}
                >
                    {items.map((item, i) => (
                        <span
                            key={i}
                            className="px-8 text-5xl md:text-8xl font-black uppercase text-transparent tracking-tighter"
                            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
                        >
                            {item}
                            <span className="inline-block mx-8 text-accent/50 font-serif italic text-3xl md:text-6xl align-middle" style={{ WebkitTextStroke: '0' }}>✧</span>
                        </span>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {items.map((item, i) => (
                        <span
                            key={`dup-${i}`}
                            className="px-8 text-5xl md:text-8xl font-black uppercase text-transparent tracking-tighter"
                            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}
                        >
                            {item}
                            <span className="inline-block mx-8 text-accent/50 font-serif italic text-3xl md:text-6xl align-middle" style={{ WebkitTextStroke: '0' }}>✧</span>
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
