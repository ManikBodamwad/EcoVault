"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrganicFlowBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Setup Three.js Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8faf9, 0.015);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 12, 38);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Clear any existing children before appending
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 2. Create Volumetric 3D Wave Mesh (Atlas Motion by Lusion style)
    const gridWidth = 90;
    const gridHeight = 90;
    const gridSegments = 60;
    const planeGeo = new THREE.PlaneGeometry(gridWidth, gridHeight, gridSegments, gridSegments);
    planeGeo.rotateX(-Math.PI / 2.2);

    const count = planeGeo.attributes.position.count;
    const colors = new Float32Array(count * 3);

    // Gradient colors: Deep Emerald to Cyan & Mint
    const colorEmerald = new THREE.Color(0x10b981);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorMint = new THREE.Color(0x34d399);

    const posAttr = planeGeo.attributes.position;
    const originalPositions = posAttr.clone();

    for (let i = 0; i < count; i++) {
      const x = posAttr.getX(i);
      const ratio = (x + gridWidth / 2) / gridWidth;
      const c = ratio < 0.5 
        ? colorEmerald.clone().lerp(colorCyan, ratio * 2)
        : colorCyan.clone().lerp(colorMint, (ratio - 0.5) * 2);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    planeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom Wireframe/Points hybrid material for glowing Lidar terrain
    const wireframeMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.32
    });

    const waveMesh = new THREE.Mesh(planeGeo, wireframeMat);
    waveMesh.position.set(0, -6, -10);
    scene.add(waveMesh);

    // 3. Floating 3D Luminescent Spores & Carbon Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 80;
      particlePos[i * 3 + 1] = Math.random() * 40 - 10;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const c = Math.random() > 0.5 ? colorEmerald : colorCyan;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;

      particleSpeeds[i] = Math.random() * 0.04 + 0.015;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Texture sprite for soft circular particle glow
    const canvasPoint = document.createElement("canvas");
    canvasPoint.width = 64;
    canvasPoint.height = 64;
    const cCtx = canvasPoint.getContext("2d");
    if (cCtx) {
      const grad = cCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(52, 211, 153, 0.8)");
      grad.addColorStop(0.8, "rgba(16, 185, 129, 0.15)");
      grad.addColorStop(1, "rgba(16, 185, 129, 0)");
      cCtx.fillStyle = grad;
      cCtx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvasPoint);

    const particleMat = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Interaction, Scroll and Mouse Listeners
    let targetScrollY = 0;
    let currentScrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // 5. Animation Render Loop (Continuous scroll tracking across entire page)
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth interpolation for scroll & mouse with fluid momentum
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Camera continuously travels through 3D space as you scroll
      camera.position.y = 12 - (currentScrollY * 0.012);
      camera.position.x = mouseX * 4;
      camera.position.z = 38 + (currentScrollY * 0.003);
      camera.rotation.x = -0.22 - (mouseY * 0.08) - (currentScrollY * 0.00015);
      camera.rotation.y = -mouseX * 0.06;

      // Animate 3D Wave vertices (Lidar contour ripples)
      const positions = posAttr.array as Float32Array;
      const origs = originalPositions.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ox = origs[i3];
        const oz = origs[i3 + 2];

        // Complex multi-frequency wave math
        const wave1 = Math.sin(ox * 0.15 + time * 1.5 + oz * 0.1) * 2.8;
        const wave2 = Math.cos(ox * 0.08 - time * 0.9 + oz * 0.18) * 1.6;
        const wave3 = Math.sin(ox * 0.03 + time * 0.4) * 2.2;
        
        // Mouse disturbance ripple
        const distToMouse = Math.hypot(ox - mouseX * 25, oz - mouseY * 25);
        const mouseRipple = Math.sin(time * 4 - distToMouse * 0.3) * Math.max(0, 2.5 - distToMouse * 0.1);

        positions[i3 + 1] = origs[i3 + 1] + wave1 + wave2 + wave3 + mouseRipple;
      }
      posAttr.needsUpdate = true;

      // Animate floating particles
      const pPositions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pPositions[i3 + 1] += particleSpeeds[i] + (targetScrollY - currentScrollY) * 0.0005;
        pPositions[i3] += Math.sin(time * 0.8 + i) * 0.02;

        // Reset particle on top exit
        if (pPositions[i3 + 1] > 35) {
          pPositions[i3 + 1] = -15;
          pPositions[i3] = (Math.random() - 0.5) * 80;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      planeGeo.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full block" />

      {/* Luminous Ambient Aurora Glows (Atlas Motion style deep light pools) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/3" />
      <div className="absolute top-1/2 right-10 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-emerald-400/8 rounded-full blur-[150px] pointer-events-none" />

      {/* Film Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
