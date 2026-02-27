import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  baseY: number;
  r: number;
  layer: number;
  phase: number;
  pulse: number;
}

interface Synapse {
  from: number;
  to: number;
  weight: number;
  signal: number;
  speed: number;
}

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
    let nodes: Node[] = [];
    let synapses: Synapse[] = [];
    let dpr = 1;
    const mouse = { x: -1000, y: -1000 };

    const computeColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        node: isDark ? [255, 255, 255] : [15, 17, 23],
        synapse: isDark ? [255, 255, 255] : [15, 17, 23],
        glow: isDark ? [255, 255, 255] : [80, 90, 120],
      };
    };
    let cachedColors = computeColors();

    const observer = new MutationObserver(() => { cachedColors = computeColors(); });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      const w = window.innerWidth;
      const h = window.innerHeight;

      nodes = [];
      synapses = [];

      // Neural network layers: 5–7 vertical columns
      const layerCount = w < 640 ? 5 : 7;
      const nodesPerLayer = w < 640 ? [3, 4, 5, 4, 3] : [3, 5, 6, 7, 6, 5, 3];
      const layerSpacing = w / (layerCount + 1);

      for (let l = 0; l < layerCount; l++) {
        const count = nodesPerLayer[l];
        const x = layerSpacing * (l + 1);
        const sectionH = h * 0.7;
        const startY = h * 0.15;

        for (let n = 0; n < count; n++) {
          const y = startY + (sectionH / (count + 1)) * (n + 1);
          nodes.push({
            x: x + (Math.random() - 0.5) * layerSpacing * 0.3,
            y,
            baseY: y,
            r: l === 0 || l === layerCount - 1 ? 2.5 : Math.random() * 1.5 + 2,
            layer: l,
            phase: Math.random() * Math.PI * 2,
            pulse: 0,
          });
        }
      }

      // Create synapses: connect each node to nodes in the next layer
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = 0; j < nodes.length; j++) {
          const n2 = nodes[j];
          if (n2.layer === n1.layer + 1) {
            // Skip some connections for sparsity
            if (Math.random() < 0.55) {
              synapses.push({
                from: i,
                to: j,
                weight: Math.random() * 0.6 + 0.2,
                signal: Math.random(),
                speed: Math.random() * 0.003 + 0.002,
              });
            }
          }
        }
      }
    };

    let time = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const c = cachedColors;
      time += 0.016;

      // Gentle vertical drift for nodes
      for (const node of nodes) {
        node.y = node.baseY + Math.sin(time * 0.5 + node.phase) * 4;
      }

      // Advance signal positions
      for (const s of synapses) {
        s.signal += s.speed;
        if (s.signal > 1) s.signal -= 1;
      }

      // Draw synapses (connections)
      for (const s of synapses) {
        const n1 = nodes[s.from];
        const n2 = nodes[s.to];

        // Base line
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = `rgba(${c.synapse[0]},${c.synapse[1]},${c.synapse[2]},${(0.04 + s.weight * 0.04).toFixed(3)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Traveling signal dot
        const sx = n1.x + (n2.x - n1.x) * s.signal;
        const sy = n1.y + (n2.y - n1.y) * s.signal;
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.glow[0]},${c.glow[1]},${c.glow[2]},${(0.15 + s.weight * 0.2).toFixed(2)})`;
        ctx.fill();
      }

      // Draw nodes
      for (const node of nodes) {
        // Glow halo
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 4);
        grad.addColorStop(0, `rgba(${c.glow[0]},${c.glow[1]},${c.glow[2]},0.06)`);
        grad.addColorStop(1, `rgba(${c.glow[0]},${c.glow[1]},${c.glow[2]},0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        const pulse = 0.3 + Math.sin(time * 1.2 + node.phase) * 0.1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.node[0]},${c.node[1]},${c.node[2]},${pulse.toFixed(2)})`;
        ctx.fill();

        // Mouse proximity glow
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 150) {
          const factor = 1 - mDist / 150;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.glow[0]},${c.glow[1]},${c.glow[2]},${(factor * 0.15).toFixed(3)})`;
          ctx.fill();
        }
      }

      // Mouse-to-nearest-node connection lines
      if (mouse.x > 0 && mouse.y > 0) {
        for (const node of nodes) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(${c.synapse[0]},${c.synapse[1]},${c.synapse[2]},${(0.08 * (1 - dist / 120)).toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
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
      observer.disconnect();
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
