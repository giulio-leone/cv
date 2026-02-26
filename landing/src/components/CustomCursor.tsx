import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverType, setHoverType] = useState<'link' | 'card' | null>(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            const linkOrButton = target.closest('a') || target.closest('button');
            const isMagnetic = target.classList?.contains('magnetic') || target.closest('.magnetic');
            const isCard = target.closest('.glass-panel');

            if (linkOrButton || isMagnetic) {
                setIsHovering(true);
                setHoverType('link');
            } else if (isCard) {
                setIsHovering(true);
                setHoverType('card');
            } else {
                setIsHovering(false);
                setHoverType(null);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    let dotScale = 1;
    let ringScale = 1;
    let ringOpacity = 1;

    if (isHovering) {
        if (hoverType === 'link') {
            dotScale = 4.5;
            ringOpacity = 0;
        } else if (hoverType === 'card') {
            dotScale = 1.5;
            ringScale = 1.5;
            ringOpacity = 0.5;
        }
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden sm:block"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: dotScale,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[99] mix-blend-difference hidden sm:block"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: ringScale,
                    opacity: ringOpacity,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 25,
                    mass: 0.5,
                }}
            />
        </>
    );
}
