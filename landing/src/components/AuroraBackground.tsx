export default function AuroraBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
            {/* CSS-only aurora blobs — offloaded to compositor thread */}
            <div
                className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[140px] opacity-40 animate-aurora-1"
                style={{ background: 'radial-gradient(circle, var(--aurora-violet) 0%, rgba(124, 58, 237, 0) 70%)' }}
            />
            <div
                className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[160px] opacity-28 animate-aurora-2"
                style={{ background: 'radial-gradient(circle, var(--aurora-cyan) 0%, rgba(56, 189, 248, 0) 70%)' }}
            />
            <div
                className="absolute top-[30%] left-[20%] w-[60%] h-[50%] rounded-full mix-blend-screen filter blur-[185px] opacity-25 animate-aurora-3"
                style={{ background: 'radial-gradient(circle, var(--aurora-rose) 0%, rgba(244, 63, 94, 0) 70%)' }}
            />
            {/* Tonal overlay: tames aurora intensity and protects foreground legibility */}
            <div className="absolute inset-0 bg-background/24 mix-blend-multiply" />
        </div>
    );
}
