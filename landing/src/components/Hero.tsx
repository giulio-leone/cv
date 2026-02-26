import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const containerRef = useRef(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [0, 150]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  // 3D Tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if ((window as any).preloaderDone) {
      controls.start("visible");
    } else {
      window.addEventListener('preloaderComplete', () => {
        controls.start("visible");
      });
    }
  }, [controls]);

  // Cinematic reveal animation variant
  const revealVariant = {
    hidden: { y: '120%', rotate: 2 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any, // Custom elegant cubic-bezier
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        // Wait just a tiny bit after preloader before starting text
        delayChildren: 0.1,
      }
    }
  };

  // Reusable component for the cinematic mask reveal
  const CinematicText = ({ text, className = "" }: { text: string, className?: string }) => (
    <div className="overflow-hidden inline-block leading-tight">
      <motion.div variants={revealVariant} className={`inline-block origin-bottom-left ${className}`}>
        {text}
      </motion.div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden perspective-[1000px]"
    >
      <motion.div
        style={{ y, opacity, rotateX: springRotateX, rotateY: springRotateY }}
        className="text-center z-10 max-w-5xl mx-auto transform-style-3d relative"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center justify-center"
        >
          {/* Subtle Tagline */}
          <div className="mb-6 overflow-hidden">
            <motion.p
              variants={revealVariant}
              className="text-text-muted/80 font-serif italic text-lg md:text-xl"
            >
              Transforming Ideas into Intelligent Systems
            </motion.p>
          </div>

          {/* Epic Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4 flex flex-col items-center">
            <CinematicText text="Giulio Leone." className="text-gradient drop-shadow-2xl lowercase pr-2" />
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-text-muted mb-10 tracking-tight flex flex-col items-center">
            <CinematicText text="Senior AI Engineer" className="font-serif italic text-white" />
            <span className="flex gap-3 overflow-hidden mt-2 font-sans tracking-normal">
              <motion.span variants={revealVariant}>Focus in</motion.span>
              <motion.span variants={revealVariant} className="text-white font-serif italic pr-1">RAG</motion.span>
              <motion.span variants={revealVariant}>&</motion.span>
              <motion.span variants={revealVariant} className="text-white font-serif italic pr-1">LLM Systems</motion.span>
            </span>
          </h2>

          <div className="overflow-hidden mt-4">
            <motion.p
              variants={revealVariant}
              className="max-w-2xl mx-auto text-text-muted/80 text-lg md:text-xl font-light mb-12 leading-relaxed"
            >
              7+ years bridging the gap between cutting-edge artificial intelligence and robust, scalable full-stack applications.
            </motion.p>
          </div>

          {/* Actions - Using Magnetic Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center overflow-hidden pt-4">
            <motion.div variants={revealVariant} className="z-20 relative">
              <MagneticButton>
                <a
                  href="https://github.com/giulio-leone/cv/raw/main/output/cv-en.pdf"
                  className="inline-flex items-center justify-center px-10 py-5 bg-white text-background font-bold rounded-full hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] uppercase tracking-wide text-sm gap-3"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                  Download Résumé
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div variants={revealVariant} className="z-20 relative">
              <MagneticButton>
                <a
                  href="#downloads"
                  className="inline-flex items-center justify-center px-10 py-5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors glass-panel backdrop-blur-md uppercase tracking-wide text-sm"
                >
                  Alternate Versions
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Extreme smooth scroll indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] uppercase font-semibold tracking-widest text-text-muted/50">Scroll or Drag</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/0 via-white/50 to-white/0 overflow-hidden relative">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-1/2 bg-white rounded-full shadow-[0_0_10px_white]"
          />
        </div>
      </motion.div>
    </section>
  );
}
