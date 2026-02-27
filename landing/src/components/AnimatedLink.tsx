import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

interface AnimatedLinkProps {
    href: string;
    target?: string;
    rel?: string;
    children: string; // The text to animate
    className?: string;
    icon?: React.ReactNode;
}

export default function AnimatedLink({ href, target, rel, children, className = '', icon }: AnimatedLinkProps) {
    const [isHovered, setIsHovered] = useState(false);

    const DURATION = 0.25;
    const STAGGER = 0.02;
    const chars = useMemo(() => children.split(''), [children]);

    return (
        <a
            href={href}
            target={target}
            rel={rel}
            className={`relative inline-flex items-center gap-3 overflow-hidden group cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {icon && (
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {icon}
                </span>
            )}
            <div className="relative overflow-hidden inline-[flex]">
                {/* Top Text (moves up) */}
                <div className="flex">
                    {chars.map((char, i) => (
                        <motion.span
                            key={`top-${i}`}
                            className="inline-block whitespace-pre"
                            animate={{ y: isHovered ? '-100%' : '0%' }}
                            transition={{
                                duration: DURATION,
                                ease: [0.76, 0, 0.24, 1], // easeInOut elegant
                                delay: STAGGER * i,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                {/* Bottom Text (moves in from bottom) */}
                <div className="absolute inset-0 flex" aria-hidden="true">
                    {chars.map((char, i) => (
                        <motion.span
                            key={`bottom-${i}`}
                            className="inline-block whitespace-pre text-foreground"
                            initial={{ y: '100%' }}
                            animate={{ y: isHovered ? '0%' : '100%' }}
                            transition={{
                                duration: DURATION,
                                ease: [0.76, 0, 0.24, 1],
                                delay: STAGGER * i,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
            </div>
        </a>
    );
}
