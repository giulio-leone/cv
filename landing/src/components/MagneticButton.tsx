import { useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
}

export default function MagneticButton({ children, className = '', href, onClick }: MagneticButtonProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const commonProps = {
        onMouseMove: handleMouse,
        onMouseLeave: reset,
        animate: { x: position.x, y: position.y },
        transition: { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.1 },
        onClick: onClick,
        className: `relative flex items-center justify-center magnetic inline-block outline-none ${className}`
    };

    if (href) {
        return (
            <motion.a href={href} {...commonProps}>
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button type="button" {...commonProps}>
            {children}
        </motion.button>
    );
}
