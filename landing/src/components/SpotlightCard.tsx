import { useState } from 'react';

interface SpotlightCardBaseProps {
    children: React.ReactNode;
    className?: string;
}

type SpotlightDivProps = SpotlightCardBaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> & {
    as?: 'div';
};

type SpotlightAnchorProps = SpotlightCardBaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    as: 'a';
};

type SpotlightCardProps = SpotlightDivProps | SpotlightAnchorProps;

export default function SpotlightCard(props: SpotlightCardProps) {
    const { children, className = '' } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (isFocused) return;

        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const baseClass = `relative overflow-hidden rounded-2xl glass-panel border border-glass-border bg-white/[0.02] shadow-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04] ${className}`;

    const content = (
        <>
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
                }}
            />

            {/* Glow border overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 z-10" />

            <div className="relative z-20 h-full">{children}</div>
        </>
    );

    if (props.as === 'a') {
        const { as: _as, ...rest } = props;
        return (
            <a
                {...rest}
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={baseClass}
            >
                {content}
            </a>
        );
    }

    const { as: _as, ...rest } = props;

    return (
        <div
            {...rest}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={baseClass}
        >
            {content}
        </div>
    );
}
