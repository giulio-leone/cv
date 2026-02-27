import { motion, useMotionValue, useSpring, useAnimation, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import AnimatedLink from './AnimatedLink';

const links = [
  {
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/giulioleone1/'
  },
  {
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    label: 'GitHub',
    href: 'https://github.com/giulio-leone/cv'
  },
  {
    icon: (
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    href: 'mailto:giulioleone097@gmail.com'
  },
];

export default function Hero() {
  const containerRef = useRef(null);
  const controls = useAnimation();

  // No scroll logic needed for vh100 page

  // 3D Tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  // Only apply 3D transform if on desktop to avoid mobile glitches
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden perspective-[1000px]"
    >
      <motion.div
        style={{
          ...(isDesktop ? { rotateX: springRotateX, rotateY: springRotateY } : {})
        }}
        className="text-center z-10 max-w-5xl mx-auto transform-style-3d relative w-full"
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
              <MagneticButton
                href="https://github.com/giulio-leone/cv/raw/main/output/cv-en.pdf"
                className="!inline-flex items-center justify-center px-10 py-5 bg-white text-background font-bold rounded-full hover:bg-white/90 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] uppercase tracking-wide text-sm gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
                Download Résumé
              </MagneticButton>
            </motion.div>

            <motion.div variants={revealVariant} className="z-20 relative">
              <MagneticButton
                href="mailto:giulioleone097@gmail.com"
                className="!inline-flex items-center justify-center px-10 py-5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors glass-panel backdrop-blur-md uppercase tracking-wide text-sm"
              >
                Let's Talk
              </MagneticButton>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="overflow-hidden mt-12 w-full flex justify-center">
            <motion.div variants={revealVariant} className="flex gap-8 items-center z-20">
              {links.map((l) => (
                <AnimatedLink
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  icon={l.icon}
                  className="text-text-muted hover:text-white transition-colors uppercase tracking-widest text-xs font-semibold"
                >
                  {l.label}
                </AnimatedLink>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
