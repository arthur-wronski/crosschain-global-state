import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (canvasWidth: number, canvasHeight: number) => void;
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesArrayRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numberOfParticles = 75;
    const maxDistance = 150;

    // Set initial canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle class with explicit type annotations
    class ParticleImpl implements Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      // Draw particle as a block
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      // Update particle position
      update(canvasWidth: number, canvasHeight: number) {
        if (this.x + this.size > canvasWidth || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y + this.size > canvasHeight || this.y < 0) {
          this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }

    // Initialize particles
    const initParticles = () => {
      if (!canvas) return;

      particlesArrayRef.current = [];
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 5;
        const x = Math.random() * (canvas.width - size * 2);
        const y = Math.random() * (canvas.height - size * 2);
        const speedX = Math.random() - 1;
        const speedY = Math.random() - 1;
        particlesArrayRef.current.push(new ParticleImpl(x, y, size, speedX, speedY));
      }
    };

    // Draw connecting lines between nearby particles
    const connectParticles = () => {
      if (!ctx) return;

      const particles = particlesArrayRef.current;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(
              particles[a].x + particles[a].size / 2, 
              particles[a].y + particles[a].size / 2
            );
            ctx.lineTo(
              particles[b].x + particles[b].size / 2, 
              particles[b].y + particles[b].size / 2
            );
            ctx.stroke();
          }
        }
      }
    };

    // Animate the canvas
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArrayRef.current.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      connectParticles();
      requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="dynamic-bg" 
      className="absolute inset-0 z-0" 
    />
  );
}