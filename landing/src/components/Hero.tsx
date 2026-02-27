import { motion, useMotionValue, useSpring, useAnimation, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import AnimatedLink from './AnimatedLink';
import DownloadModal from './DownloadModal';
import CertBadges from './CertBadges';
import content from '../data/content.json';
import { EASE_OUT_QUART } from '../lib/motion';

// Icon map for social links
const iconMap: Record<string, JSX.Element> = {
  linkedin: (
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  whatsapp: (
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  website: (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

export default function Hero() {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [showModal, setShowModal] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);

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
    const startAnimations = () => {
      controls.start("visible");
      setAnimationsStarted(true);
    };

    if (window.preloaderDone) {
      startAnimations();
      return;
    }

    const handler = () => startAnimations();
    window.addEventListener('preloaderComplete', handler);

    // Safety fallback: force animations after 3s even if preloader event was missed
    const fallback = setTimeout(() => startAnimations(), 3000);

    return () => {
      window.removeEventListener('preloaderComplete', handler);
      clearTimeout(fallback);
    };
  }, [controls]);

  // Cinematic reveal animation variant
  const revealVariant = {
    hidden: { y: '120%', rotate: 2 },
    visible: {
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: EASE_OUT_QUART,
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
      className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden perspective-1000"
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
              className="text-text-muted font-serif italic text-lg md:text-xl"
            >
              {content.hero.tagline}
            </motion.p>
          </div>

          {/* Epic Main Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-2 md:mb-4 flex flex-col items-center">
            <CinematicText text={content.hero.name} className="text-gradient drop-shadow-2xl lowercase pr-2" />
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-text-muted mb-6 md:mb-10 tracking-tight flex flex-col items-center">
            <CinematicText text={content.hero.title} className="font-serif italic text-foreground" />
            <span className="flex gap-2 sm:gap-3 overflow-hidden mt-1 md:mt-2 font-sans tracking-normal">
              {content.hero.specializations.map((spec, i) => (
                <span key={spec} className="flex gap-2 sm:gap-3">
                  {i > 0 && <motion.span variants={revealVariant} className="text-text-muted">·</motion.span>}
                  <motion.span variants={revealVariant} className="text-foreground font-serif italic pr-1">{spec}</motion.span>
                </span>
              ))}
            </span>
          </h2>

          <div className="overflow-hidden mt-2 md:mt-4">
            <motion.p
              variants={revealVariant}
              className="max-w-2xl mx-auto text-text-muted text-base md:text-xl font-light mb-6 md:mb-8 leading-relaxed px-4"
            >
              {content.hero.description}
            </motion.p>
          </div>

          {/* Certification Badges — Cinematic 3D Interactive */}
          <div className="mb-6 md:mb-8 w-full">
            <CertBadges isVisible={animationsStarted} />
          </div>

          {/* Actions - Using Magnetic Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center overflow-hidden pt-2 md:pt-4 w-full px-6">
            <motion.div variants={revealVariant} className="z-20 relative">
              <MagneticButton
                onClick={() => setShowModal(true)}
                className="!inline-flex items-center justify-center px-10 py-5 bg-foreground text-background font-bold rounded-full hover:bg-foreground/90 transition-colors shadow-xl hover:shadow-2xl uppercase tracking-wide text-sm gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
                {content.hero.ctaPrimary}
              </MagneticButton>
            </motion.div>

            <motion.div variants={revealVariant} className="z-20 relative">
              <MagneticButton
                href={content.hero.ctaSecondaryUrl}
                className="!inline-flex items-center justify-center px-10 py-5 border border-foreground/20 text-foreground font-semibold rounded-full hover:bg-foreground/5 transition-colors glass-panel backdrop-blur-md uppercase tracking-wide text-sm gap-3"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {content.hero.ctaSecondary}
              </MagneticButton>
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="overflow-hidden mt-8 md:mt-12 w-full flex justify-center">
            <motion.div variants={revealVariant} className="flex flex-wrap gap-6 md:gap-8 items-center justify-center z-20">
              {content.links.map((l) => (
                <AnimatedLink
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  icon={iconMap[l.type]}
                  className="text-text-muted hover:text-foreground transition-colors uppercase tracking-widest text-xs font-semibold"
                >
                  {l.label}
                </AnimatedLink>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Download Modal */}
      <DownloadModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
