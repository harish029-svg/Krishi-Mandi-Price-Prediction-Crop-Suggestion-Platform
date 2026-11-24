"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";

function subscribeReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener?.("change", callback);
  return () => mq.removeEventListener?.("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * AgriLivingEnvironment
 * 
 * High-performance living agricultural environment featuring:
 * 1. Multi-layered depth parallax (sky, distant trees, main field, foreground crops)
 * 2. Organic wind simulation swaying foreground crops & grass blades via lightweight Canvas
 * 3. Golden-hour atmospheric lighting, drifting volumetric haze, & breathing sunbeams
 * 4. Ambient floating golden pollen / sunlight motes drifting with the wind
 * 5. Full responsiveness, GPU acceleration, mobile battery optimization, & prefers-reduced-motion support
 */
export default function AgriLivingEnvironment({
  mode = "hero", // "hero" | "fullscreen"
  showAtmosphere = true,
  showParticles = true,
  showCrops = true,
  interactive = true,
  className = "",
  children,
}) {
  const containerRef = useRef(null);
  const bgLayerRef = useRef(null);
  const atmosphereLayerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  // Parallax coordinates (smooth lerped)
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isVisible = useRef(true);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (isReducedMotion) return;

    // 1. Pause when not visible in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Pause when tab is hidden
    const handleVisibility = () => {
      isVisible.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // 3. Mouse movement tracking for desktop parallax
    const handlePointerMove = (e) => {
      if (!interactive) return;
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      mousePos.current.targetX = nx;
      mousePos.current.targetY = ny;
    };

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouch && interactive) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (!isTouch && interactive) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
    };
  }, [interactive, isReducedMotion]);

  // Canvas wind & crops & pollen loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let stalks = [];
    let particles = [];

    const initSimulation = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      stalks = [];
      if (showCrops) {
        const stalkCount = Math.floor(width / (width < 640 ? 12 : 9));
        for (let i = 0; i < stalkCount; i++) {
          const x = (i / stalkCount) * width + (Math.random() - 0.5) * 14;
          const tier = Math.random() < 0.35 ? 0 : Math.random() < 0.75 ? 1 : 2;
          const stalkHeight =
            tier === 0
              ? 35 + Math.random() * 30
              : tier === 1
              ? 60 + Math.random() * 45
              : 95 + Math.random() * 55;

          const baseAngle = (Math.random() - 0.5) * 0.15;
          const flexFactor = 0.8 + Math.random() * 0.6;
          const phaseOffset = Math.random() * Math.PI * 2;
          const widthBase = tier === 2 ? 2.5 + Math.random() * 1.5 : 1.5 + Math.random();

          let color;
          let tipColor;
          if (tier === 0) {
            color = "rgba(18, 55, 33, 0.7)";
            tipColor = "rgba(35, 90, 52, 0.8)";
          } else if (tier === 1) {
            color = "rgba(28, 85, 48, 0.85)";
            tipColor = "rgba(180, 160, 75, 0.9)";
          } else {
            color = "rgba(42, 115, 65, 0.9)";
            tipColor = "rgba(220, 195, 100, 0.95)";
          }

          stalks.push({
            x,
            tier,
            height: stalkHeight,
            baseAngle,
            flexFactor,
            phaseOffset,
            widthBase,
            color,
            tipColor,
            hasHead: tier >= 1 && Math.random() > 0.3,
            headLength: 12 + Math.random() * 14,
          });
        }
      }

      particles = [];
      if (showParticles) {
        const particleCount = width < 640 ? 18 : 36;
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.2 + Math.random() * 2.2,
            speedY: -0.15 - Math.random() * 0.35,
            speedX: 0.3 + Math.random() * 0.6,
            wobbleSpeed: 0.8 + Math.random() * 1.5,
            wobbleAmp: 0.5 + Math.random() * 1.2,
            phase: Math.random() * Math.PI * 2,
            opacity: 0.25 + Math.random() * 0.55,
            glow: Math.random() > 0.5,
          });
        }
      }
    };

    initSimulation();

    const handleResize = () => {
      initSimulation();
    };
    window.addEventListener("resize", handleResize);

    const startTime = performance.now();

    const render = (now) => {
      animFrameId.current = requestAnimationFrame(render);

      if (!isVisible.current) return;

      const elapsed = (now - startTime) * 0.001;

      // Parallax smooth interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      const nx = mousePos.current.x;
      const ny = mousePos.current.y;

      // Update background and atmosphere layer transforms directly without React render
      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translate3d(${nx * -10}px, ${ny * -8}px, 0) scale(1.06)`;
      }
      if (atmosphereLayerRef.current) {
        atmosphereLayerRef.current.style.transform = `translate3d(${nx * -16}px, ${ny * -12}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // Wind calculation
      const baseWindWave = Math.sin(elapsed * 1.4) * 0.18 + Math.cos(elapsed * 0.7) * 0.12;
      const gustEffect = Math.sin(elapsed * 0.4) > 0.6 ? 0.15 * Math.sin(elapsed * 2.5) : 0;
      const mouseWind = nx * 0.06;
      const totalGlobalWind = baseWindWave + gustEffect + mouseWind;

      // Draw crops & grass stalks
      if (showCrops && stalks.length > 0) {
        const baseY = height + 5;

        for (let i = 0; i < stalks.length; i++) {
          const s = stalks[i];

          const localWind =
            totalGlobalWind * s.flexFactor +
            Math.sin(elapsed * 1.8 + s.x * 0.008 + s.phaseOffset) * 0.12 * s.flexFactor;

          const currentAngle = s.baseAngle + localWind;
          const startX = s.x;
          const startY = baseY;

          const tipX = startX + Math.sin(currentAngle) * s.height;
          const tipY = startY - Math.cos(currentAngle) * s.height;

          const ctrlX = startX + Math.sin(currentAngle * 0.5) * (s.height * 0.55);
          const ctrlY = startY - Math.cos(currentAngle * 0.5) * (s.height * 0.55);

          const stalkGrad = ctx.createLinearGradient(startX, startY, tipX, tipY);
          stalkGrad.addColorStop(0, s.color);
          stalkGrad.addColorStop(1, s.tipColor);

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
          ctx.strokeStyle = stalkGrad;
          ctx.lineWidth = s.widthBase;
          ctx.lineCap = "round";
          ctx.stroke();

          if (s.hasHead) {
            const headAngle = currentAngle + Math.sin(elapsed * 2.2 + s.phaseOffset) * 0.08;
            const headEndX = tipX + Math.sin(headAngle) * s.headLength;
            const headEndY = tipY - Math.cos(headAngle) * s.headLength;

            ctx.beginPath();
            ctx.moveTo(tipX, tipY);
            ctx.lineTo(headEndX, headEndY);
            ctx.strokeStyle = s.tipColor;
            ctx.lineWidth = s.widthBase * 1.8;
            ctx.lineCap = "round";
            ctx.stroke();

            ctx.beginPath();
            const midEarX = (tipX + headEndX) * 0.5;
            const midEarY = (tipY + headEndY) * 0.5;
            const perpX = -Math.cos(headAngle) * 4;
            const perpY = -Math.sin(headAngle) * 4;
            ctx.moveTo(midEarX - perpX, midEarY - perpY);
            ctx.lineTo(midEarX + perpX, midEarY + perpY);
            ctx.strokeStyle = "rgba(240, 220, 130, 0.6)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw floating golden dust / pollen particles
      if (showParticles && particles.length > 0) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.y += p.speedY;
          p.x += p.speedX + Math.sin(elapsed * p.wobbleSpeed + p.phase) * p.wobbleAmp;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x > width + 10) {
            p.x = -10;
          }

          const currentAlpha =
            p.opacity * (0.8 + 0.2 * Math.sin(elapsed * 2 + p.phase));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.glow) {
            ctx.fillStyle = `rgba(255, 235, 170, ${currentAlpha})`;
            ctx.shadowColor = "rgba(255, 200, 80, 0.8)";
            ctx.shadowBlur = 6;
          } else {
            ctx.fillStyle = `rgba(240, 215, 140, ${currentAlpha * 0.7})`;
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [showCrops, showParticles, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`agri-living-environment-root ${
        mode === "fullscreen" ? "agri-env-fullscreen" : "agri-env-hero"
      } ${className}`}
      aria-hidden="true"
    >
      {/* LAYER 1: High-resolution Base Field Photograph with Smooth Depth Scale */}
      <div
        ref={bgLayerRef}
        className="agri-env-layer agri-env-base-bg"
        style={{
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
        }}
      >
        <Image
          src="/Gemini_Generated_Image_umhnn9umhnn9umhn.png"
          alt="Golden hour agricultural field with lush green crops"
          fill
          priority
          sizes="100vw"
          className="agri-env-photo object-cover object-[center_54%]"
          quality={85}
        />
      </div>

      {/* LAYER 2: Atmospheric Drifting Golden Cloud & Sky Haze */}
      {showAtmosphere && (
        <div
          ref={atmosphereLayerRef}
          className="agri-env-layer agri-env-atmosphere"
          style={{
            transition: "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
        >
          <div className="agri-env-sky-clouds" />
          <div className="agri-env-golden-glow" />
          <div className="agri-env-sunbeams" />
        </div>
      )}

      {/* LAYER 3: Interactive Wind-Swayed Crops & Golden Dust Motes Canvas */}
      <div className="agri-env-layer agri-env-canvas-container">
        <canvas
          ref={canvasRef}
          className="agri-env-canvas"
        />
      </div>

      {/* Foreground gradient blend to ensure crop base merges seamlessly */}
      <div className="agri-env-bottom-blend" />

      {children}
    </div>
  );
}
