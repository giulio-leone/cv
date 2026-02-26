import { motion } from 'framer-motion';

export default function AuroraBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background">
            {/* 
        The "Aurora" effect uses large, highly blurred, moving radial gradients.
        We use framer-motion to slowly animate their positions and scales.
      */}

            {/* Top Left Blob - Purple/Violet */}
            <motion.div
                animate={{
                    x: ['-20%', '0%', '-10%', '-20%'],
                    y: ['-20%', '10%', '-5%', '-20%'],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[100px] opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.8) 0%, rgba(124, 58, 237, 0) 70%)',
                }}
            />

            {/* Bottom Right Blob - Blue/Cyan */}
            <motion.div
                animate={{
                    x: ['10%', '-10%', '0%', '10%'],
                    y: ['10%', '-20%', '5%', '10%'],
                    scale: [1, 1.1, 0.8, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(56, 189, 248, 0) 70%)',
                }}
            />

            {/* Center Blob - Pink/Rose */}
            <motion.div
                animate={{
                    x: ['-5%', '5%', '-10%', '-5%'],
                    y: ['-5%', '10%', '0%', '-5%'],
                    scale: [0.8, 1.1, 1, 0.8],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute top-[30%] left-[20%] w-[60%] h-[50%] rounded-full mix-blend-screen filter blur-[150px] opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(244, 63, 94, 0.6) 0%, rgba(244, 63, 94, 0) 70%)',
                }}
            />

            {/* Base dark overlay to ensure text remains readable */}
            <div className="absolute inset-0 bg-background/50 mix-blend-multiply" />
        </div>
    );
}
