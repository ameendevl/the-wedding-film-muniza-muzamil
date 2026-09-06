import React, { useEffect, useRef } from 'react';

interface GoldenParticlesProps {
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  targetOpacity: number;
  opacitySpeed: number;
  hue: number;
  blur: number;
}

export const GoldenParticles: React.FC<GoldenParticlesProps> = ({
  density = 40,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate particles
    const count = Math.min(Math.floor((width * height) / 25000) + 15, density);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 0.8,
        speedY: -(Math.random() * 0.35 + 0.12), // Drift slowly upwards
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.6 + 0.1,
        targetOpacity: Math.random() * 0.7 + 0.2,
        opacitySpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        hue: 38 + Math.random() * 8, // Warm gold hues (38 - 46)
        blur: Math.random() * 4 + 1,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX;

        // Oscillate opacity for twinkling / ember glow
        p.opacity += p.opacitySpeed;
        if (p.opacity > 0.75 || p.opacity < 0.1) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw soft glowing gold ember
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        gradient.addColorStop(0, `hsla(${p.hue}, 85%, 68%, ${p.opacity})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 80%, 55%, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${className}`}
      aria-hidden="true"
    />
  );
};
