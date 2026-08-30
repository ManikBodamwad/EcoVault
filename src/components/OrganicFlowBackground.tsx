"use client";

import React, { useEffect, useRef } from "react";

interface OrganicFlowBackgroundProps {
  opacity?: number;
}

export default function OrganicFlowBackground({ opacity = 0.85 }: OrganicFlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle system representing floating carbon & bio-luminescent spores
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      color: string;
      phase: number;
    }> = [];

    const colors = [
      "rgba(16, 185, 129,",  // Emerald
      "rgba(52, 211, 153,",  // Mint
      "rgba(6, 182, 212,",   // Cyan
      "rgba(245, 158, 11,"   // Amber gold
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = colors[Math.floor(Math.random() * colors.length)];
      const baseAlpha = Math.random() * 0.35 + 0.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.15, // Gentle upward drift
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        color: col,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Scroll and mouse tracking
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Wave parameters (Topography / Lidar contours)
    const waveCount = 5;
    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Ambient Liquid Aurora Glows (Soft pulsating radial lights)
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.8) * 80 + (mouseX - width / 2) * 0.08,
        height * 0.25 + Math.cos(time * 0.6) * 60 + (scrollY * 0.05) % height,
        0,
        width * 0.2,
        height * 0.25,
        width * 0.45
      );
      grad1.addColorStop(0, "rgba(16, 185, 129, 0.065)");
      grad1.addColorStop(0.5, "rgba(52, 211, 153, 0.025)");
      grad1.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 0.7) * 70,
        height * 0.65 + Math.sin(time * 0.5) * 50 - (scrollY * 0.03) % height,
        0,
        width * 0.8,
        height * 0.65,
        width * 0.4
      );
      grad2.addColorStop(0, "rgba(6, 182, 212, 0.05)");
      grad2.addColorStop(0.6, "rgba(16, 185, 129, 0.02)");
      grad2.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Organic Lidar Topography Waves (Of The Oak flow ribbons)
      ctx.save();
      for (let i = 0; i < waveCount; i++) {
        const progress = i / waveCount;
        const waveY = height * (0.2 + progress * 0.65) - (scrollY * 0.15 * (i + 1)) % (height * 1.5) + (height * 0.2);
        
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        
        // Dynamic gradient for the wave line
        const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
        lineGrad.addColorStop(0, "rgba(16, 185, 129, 0)");
        lineGrad.addColorStop(0.2, `rgba(16, 185, 129, ${0.12 - i * 0.015})`);
        lineGrad.addColorStop(0.5, `rgba(6, 182, 212, ${0.18 - i * 0.02})`);
        lineGrad.addColorStop(0.8, `rgba(52, 211, 153, ${0.12 - i * 0.015})`);
        lineGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
        ctx.strokeStyle = lineGrad;

        const segmentWidth = 18;
        const totalSegments = Math.ceil(width / segmentWidth);

        for (let j = 0; j <= totalSegments; j++) {
          const x = j * segmentWidth;
          // Complex harmonic wave calculation
          const wave1 = Math.sin(x * 0.003 + time * 1.2 + i * 1.5) * 35;
          const wave2 = Math.cos(x * 0.006 - time * 0.9 + i) * 20;
          const wave3 = Math.sin(x * 0.0015 + time * 0.4) * 15;
          const mouseDist = Math.max(0, 1 - Math.hypot(x - mouseX, waveY - mouseY) / 320);
          const mouseWave = Math.sin(time * 3 + j * 0.2) * (mouseDist * 18);

          const y = waveY + wave1 + wave2 + wave3 + mouseWave;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Draw Floating Luminescent Spores / Carbon Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(time + p.phase) * 0.2;
        p.y += p.vy - (targetScrollY - scrollY) * 0.005; // React to scroll velocity
        p.alpha = p.baseAlpha + Math.sin(time * 2 + p.phase) * 0.15;

        // Wrap around boundaries
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Draw particle halo
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        radGrad.addColorStop(0, `${p.color} ${p.alpha})`);
        radGrad.addColorStop(1, `${p.color} 0)`);
        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.fillStyle = `${p.color} ${Math.min(1, p.alpha * 1.8)})`;
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ opacity }}>
      {/* HTML5 Canvas Render Layer */}
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Fine Film Grain Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
