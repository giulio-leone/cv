import { useEffect, useRef } from 'react';

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mouse = { x: -1000, y: -1000 };

    const getColor = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        particle: isDark ? 'rgba(255,255,255,' : 'rgba(15,17,23,',
        line: isDark ? 'rgba(255,255,255,' : 'rgba(15,17,23,',
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const init = () => {
      resize();
      const area = window.innerWidth * window.innerHeight;
      const count = Math.min(Math.floor(area / 25000), 50);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
      }));
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const colors = getColor();
      const maxDist = 180;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${colors.particle}0.18)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${colors.line}${(0.06 * (1 - dist / maxDist)).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `${colors.line}${(0.10 * (1 - mDist / 200)).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', onMouseMove);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
