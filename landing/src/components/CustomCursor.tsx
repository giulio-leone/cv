import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let dotScale = 1;
        let ringScale = 1;
        let ringOpacity = 1;

        const onMouseMove = (e: MouseEvent) => {
            dot.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0) scale(${dotScale})`;
            ring.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0) scale(${ringScale})`;
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isLink = target.closest('a') || target.closest('button') || target.closest('.magnetic');
            const isCard = target.closest('.glass-panel');

            if (isLink) {
                dotScale = 4.5;
                ringScale = 1;
                ringOpacity = 0;
            } else if (isCard) {
                dotScale = 1.5;
                ringScale = 1.5;
                ringOpacity = 0.5;
            } else {
                dotScale = 1;
                ringScale = 1;
                ringOpacity = 1;
            }
            ring.style.opacity = String(ringOpacity);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden sm:block"
                style={{ willChange: 'transform' }}
            />
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[99] mix-blend-difference hidden sm:block"
                style={{ willChange: 'transform, opacity', transition: 'opacity 0.3s ease' }}
            />
        </>
    );
}
