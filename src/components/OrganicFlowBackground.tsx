"use client";

import React, { useEffect, useRef } from "react";

export default function OrganicFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle system (Floating Lidar Bio-Spores & Carbon Specks)
    const particleCount = 65;
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

    const particleColors = [
      "16, 185, 129", // Emerald
      "52, 211, 153", // Mint
      "6, 182, 212",  // Cyan
      "245, 158, 11", // Amber Gold
      "132, 204, 22"  // Lime
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = particleColors[Math.floor(Math.random() * particleColors.length)];
      const baseAlpha = Math.random() * 0.55 + 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -Math.random() * 0.6 - 0.2, // Continuous upward organic drift
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        color: col,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Scroll and mouse physics
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
    const waveCount = 9;
    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth scroll & mouse interpolation with momentum
      scrollY += (targetScrollY - scrollY) * 0.09;
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Fluid Aurora Light Gradients (Of The Oak ambient washes)
      const grad1 = ctx.createRadialGradient(
        width * 0.15 + Math.sin(time * 0.7) * 120 + (mouseX - width / 2) * 0.1,
        height * 0.25 + Math.cos(time * 0.5) * 90 + (scrollY * 0.08) % height,
        0,
        width * 0.15,
        height * 0.25,
        width * 0.55
      );
      grad1.addColorStop(0, "rgba(16, 185, 129, 0.14)");
      grad1.addColorStop(0.5, "rgba(52, 211, 153, 0.06)");
      grad1.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.85 + Math.cos(time * 0.6) * 100,
        height * 0.7 + Math.sin(time * 0.4) * 80 - (scrollY * 0.05) % height,
        0,
        width * 0.85,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      grad2.addColorStop(0.5, "rgba(16, 185, 129, 0.05)");
      grad2.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const grad3 = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.9) * 80,
        height * 0.5 + Math.cos(time * 0.8) * 70,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.4
      );
      grad3.addColorStop(0, "rgba(245, 158, 11, 0.06)");
      grad3.addColorStop(0.7, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // 2. Multi-Layered Lidar Topography Waves (Of The Oak flowing contour lines)
      ctx.save();
      for (let i = 0; i < waveCount; i++) {
        const progress = i / waveCount;
        const waveY = height * (0.12 + progress * 0.8) - (scrollY * 0.22 * (i + 1)) % (height * 1.6) + (height * 0.15);
        
        ctx.beginPath();
        ctx.lineWidth = 1.6;
        
        // Dynamic color gradient for each wave contour
        const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
        lineGrad.addColorStop(0, "rgba(16, 185, 129, 0)");
        lineGrad.addColorStop(0.2, `rgba(16, 185, 129, ${0.28 - i * 0.02})`);
        lineGrad.addColorStop(0.5, `rgba(6, 182, 212, ${0.35 - i * 0.025})`);
        lineGrad.addColorStop(0.8, `rgba(52, 211, 153, ${0.28 - i * 0.02})`);
        lineGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
        ctx.strokeStyle = lineGrad;

        const segmentWidth = 14;
        const totalSegments = Math.ceil(width / segmentWidth);

        for (let j = 0; j <= totalSegments; j++) {
          const x = j * segmentWidth;
          // Harmonic wave calculation with mouse gravity
          const wave1 = Math.sin(x * 0.0028 + time * 1.4 + i * 1.2) * 45;
          const wave2 = Math.cos(x * 0.0055 - time * 1.1 + i * 0.8) * 25;
          const wave3 = Math.sin(x * 0.0012 + time * 0.6) * 20;
          const mouseDist = Math.max(0, 1 - Math.hypot(x - mouseX, waveY - mouseY) / 380);
          const mouseWave = Math.sin(time * 3.5 + j * 0.25) * (mouseDist * 28);

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

      // 3. Floating Luminescent Bio-Spores & Radiant Carbon Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(time + p.phase) * 0.35;
        p.y += p.vy - (targetScrollY - scrollY) * 0.008; // React to scroll velocity
        p.alpha = p.baseAlpha + Math.sin(time * 2.5 + p.phase) * 0.2;

        // Wrap boundaries
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Outer ambient glow
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4.5);
        radGrad.addColorStop(0, `rgba(${p.color}, ${Math.max(0, p.alpha)})`);
        radGrad.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.radius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(1, p.alpha * 2)})`;
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* HTML5 Canvas Render Layer */}
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Film Grain Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
