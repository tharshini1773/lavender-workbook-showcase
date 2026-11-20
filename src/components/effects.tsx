import { useState, useEffect, useRef, ReactNode } from "react";

/**
 * Interactive canvas particle system with ethereal violet/lavender stardust.
 * Reacts softly to mouse movements. Low CPU footprint.
 */
export function InteractiveParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000, radius: 120 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Particle pool
    const count = Math.min(Math.floor((width * height) / 18000), 55);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      color: string;
    }> = [];

    const colors = [
      "rgba(147, 51, 234, ", // purple
      "rgba(192, 132, 252, ", // lavender
      "rgba(216, 180, 254, ", // light violet
      "rgba(168, 85, 247, ",  // violet
    ];

    for (let i = 0; i < count; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: 1.5 + Math.random() * 2.5,
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;

        // Wrap edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repelling interaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
          const force = (1 - mDist / mouse.radius) * 1.5;
          p.x += (mdx / mDist) * force * 2;
          p.y += (mdy / mDist) * force * 2;
          p.alpha = Math.min(p.baseAlpha + 0.3, 0.9);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(168, 85, 247, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pointer-events-none absolute inset-0 z-0 ${className}`} 
      aria-hidden="true" 
    />
  );
}

/**
 * 3D Tilt Card Component.
 * Calculates cursor distance and applies perspective tilt and dynamic light glare.
 */
export function TiltCard({ 
  children, 
  className = "",
  glare = true 
}: { 
  children: ReactNode; 
  className?: string;
  glare?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform, 
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease" 
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {glare && (
        <div 
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(216, 180, 254, 0.45) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

/**
 * Custom smooth trailing cursor for desktop.
 * Dual-ring futuristic purple aura.
 */
export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target && target.closest("a, button, input, textarea, .cursor-pointer, [role='button']")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let frameId: number;
    const animateTrail = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      frameId = requestAnimationFrame(animateTrail);
    };
    frameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(frameId);
    };
  }, [pos.x, pos.y, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Central pointer glow dot */}
      <div 
        className="pointer-events-none fixed z-[9999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(168,85,247,0.8)] transition-transform duration-75"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        aria-hidden="true"
      />
      {/* Trailing ambient glass ring */}
      <div 
        className={`pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 transition-all duration-300 ${
          isHovering 
            ? "h-12 w-12 bg-primary/15 backdrop-blur-[1px] border-primary scale-110 shadow-[0_0_24px_rgba(168,85,247,0.4)]" 
            : "h-8 w-8 bg-primary/5"
        }`}
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
        aria-hidden="true"
      />
    </>
  );
}

/**
 * Animated Ambient Gradient Orb
 */
export function FloatingOrb({ 
  color = "violet", 
  size = "350px", 
  className = "",
  style = {} 
}: { 
  color?: string; 
  size?: string; 
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div 
      className={`pointer-events-none absolute rounded-full filter blur-[80px] opacity-25 animate-pulse ${className}`}
      style={{
        width: size,
        height: size,
        background: color === "violet" 
          ? "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(216, 180, 254, 0) 70%)"
          : "radial-gradient(circle, rgba(192, 132, 252, 0.7) 0%, rgba(147, 51, 234, 0) 70%)",
        animationDuration: "7s",
        ...style
      }}
      aria-hidden="true"
    />
  );
}
