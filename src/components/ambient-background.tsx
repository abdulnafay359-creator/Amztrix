"use client";

import { useEffect, useRef } from "react";

// ─── Tuning ────────────────────────────────────────────────
const CONFIG = {
  baseRadiusRatio: 0.32,  // × min(width, height)
  perspectiveRatio: 1.15, // × min(width, height)
  ringSteps: 72,          // polyline resolution per ring
  dotSizeBase: 2.2,
  dotSizeScale: 2.6,
  coreRadius: 7,
  corePulseSpeed: 0.0022,
  corePulseAmp: 0.28,
  phaseLerp: 0.02,
  velocityDecay: 0.9,
  velocityScale: 0.04,
};

// ─── Phases ────────────────────────────────────────────────
type PhaseId = "hero" | "proof" | "services" | "work" | "process" | "trust" | "cta";

interface Phase {
  id: PhaseId;
  selector: string;
  hue: number;
  sat: number;
  bright: number;
  tilt: number;      // 0–1, higher = viewed more from above
  spread: number;    // ring size multiplier
  rotation: number;  // rotation speed multiplier
  coreGlow: number;  // 0–2, core intensity
}

const PHASES: Phase[] = [
  { id: "hero",     selector: ".reference-hero",  hue:  32, sat: 0.95, bright: 0.68, tilt: 0.40, spread: 1.00, rotation: 1.00, coreGlow: 1.10 },
  { id: "proof",    selector: ".proof-section",   hue:  22, sat: 0.85, bright: 0.62, tilt: 0.50, spread: 0.90, rotation: 0.70, coreGlow: 0.85 },
  { id: "services", selector: ".service-grid",    hue:  12, sat: 0.75, bright: 0.58, tilt: 0.60, spread: 0.80, rotation: 0.60, coreGlow: 0.70 },
  { id: "work",     selector: ".dark-section",    hue: 200, sat: 0.72, bright: 0.70, tilt: 0.25, spread: 1.15, rotation: 1.40, coreGlow: 1.35 },
  { id: "process",  selector: ".process-section", hue: 162, sat: 0.65, bright: 0.64, tilt: 0.55, spread: 1.00, rotation: 0.95, coreGlow: 0.95 },
  { id: "trust",    selector: ".ownership-panel", hue: 100, sat: 0.58, bright: 0.60, tilt: 0.65, spread: 0.70, rotation: 0.50, coreGlow: 0.75 },
  { id: "cta",      selector: ".audit-banner",    hue:  32, sat: 1.00, bright: 0.72, tilt: 0.30, spread: 1.15, rotation: 1.20, coreGlow: 1.45 },
];

// ─── Rings ─────────────────────────────────────────────────
// Each ring: a circle in 3D, tilted around X and Z.
// radius: relative to base (0–1+)
// tiltX, tiltZ: baseline tilt in radians
// speed: self-rotation speed (radians per ms)
// dotCount / dotSpeed: orbiting markers per ring
interface RingDef {
  radius: number;
  tiltX: number;
  tiltZ: number;
  phase: number;
  speed: number;
  dotCount: number;
  dotSpeed: number;
}

const RING_DEFS: RingDef[] = [
  { radius: 0.42, tiltX: 0.28, tiltZ: 0.10, phase: 0.0, speed: 0.00009, dotCount: 2, dotSpeed: 0.00045 },
  { radius: 0.64, tiltX: 0.60, tiltZ: 0.32, phase: 0.45, speed: 0.00006, dotCount: 3, dotSpeed: 0.00032 },
  { radius: 0.86, tiltX: 0.92, tiltZ: 0.22, phase: 0.95, speed: 0.00004, dotCount: 2, dotSpeed: 0.00026 },
  { radius: 1.05, tiltX: 0.40, tiltZ: 0.68, phase: 1.40, speed: 0.00003, dotCount: 4, dotSpeed: 0.00021 },
];

// ─── 3D projection helper ──────────────────────────────────
// A point at angle θ on a circle → 3D → tilt → project → 2D
function projectRingPoint(
  theta: number,
  radius: number,
  tiltX: number,
  tiltZ: number,
  gRotX: number,
  gRotY: number,
  cx: number,
  cy: number,
  perspective: number
) {
  // point on circle in local XY plane
  const x0 = Math.cos(theta) * radius;
  const y0 = Math.sin(theta) * radius;

  // tilt around X
  const cX = Math.cos(tiltX), sX = Math.sin(tiltX);
  const y1 = y0 * cX;
  const z1 = y0 * sX;

  // tilt around Z
  const cZ = Math.cos(tiltZ), sZ = Math.sin(tiltZ);
  const x2 = x0 * cZ - y1 * sZ;
  const y2 = x0 * sZ + y1 * cZ;
  const z2 = z1;

  // global rotation around Y (the whole scene spins)
  const cY = Math.cos(gRotY), sY = Math.sin(gRotY);
  const x3 = x2 * cY + z2 * sY;
  const z3 = -x2 * sY + z2 * cY;
  const y3 = y2;

  // global rotation around X (the whole scene tilts)
  const cGX = Math.cos(gRotX), sGX = Math.sin(gRotX);
  const y4 = y3 * cGX - z3 * sGX;
  const z4 = y3 * sGX + z3 * cGX;
  const x4 = x3;

  // perspective projection
  const scale = perspective / (perspective + z4);
  return {
    x: cx + x4 * scale,
    y: cy + y4 * scale,
    scale,
  };
}

export function AmbientBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0, height = 0;

    // Interpolated phase state
    let phase: Phase = PHASES[0];
    let hue: number = phase.hue;
    let sat: number = phase.sat;
    let bright: number = phase.bright;
    let tilt: number = phase.tilt;
    let spread: number = phase.spread;
    let rotationMult: number = phase.rotation;
    let coreGlow: number = phase.coreGlow;

    // Input state
    let mouseX = 0, mouseY = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0;

    let raf = 0;
    let cancelled = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseX = width / 2;
      mouseY = height / 2;
    };

    const currentPhase = (): Phase => {
      const mid = window.innerHeight * 0.5;
      for (const p of PHASES) {
        const el = document.querySelector(p.selector);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) return p;
      }
      return phase;
    };

    const draw = (t: number) => {
      if (cancelled) return;

      // ─── Velocity ────────────────────────────────
      const y = window.scrollY;
      velocity = velocity * CONFIG.velocityDecay + Math.abs(y - lastScrollY) * 0.1;
      lastScrollY = y;
      const excite = Math.min(1, velocity * CONFIG.velocityScale);

      // ─── Phase transition ────────────────────────
      const next = currentPhase();
      if (next.id !== phase.id) {
        phase = next;
        wrap.dataset.phase = next.id;
      }
      hue = lerp(hue, phase.hue, CONFIG.phaseLerp);
      sat = lerp(sat, phase.sat, CONFIG.phaseLerp);
      bright = lerp(bright, phase.bright, CONFIG.phaseLerp);
      tilt = lerp(tilt, phase.tilt, CONFIG.phaseLerp);
      spread = lerp(spread, phase.spread, CONFIG.phaseLerp);
      rotationMult = lerp(rotationMult, phase.rotation, CONFIG.phaseLerp);
      coreGlow = lerp(coreGlow, phase.coreGlow, CONFIG.phaseLerp);

      ctx.clearRect(0, 0, width, height);

      // ─── Setup ───────────────────────────────────
      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height) * CONFIG.baseRadiusRatio;
      const perspective = Math.min(width, height) * CONFIG.perspectiveRatio;

      // Global Y rotation: time × rotation-mult + scroll excite + mouse parallax
      const mouseNormX = (mouseX - width / 2) / width;
      const mouseNormY = (mouseY - height / 2) / height;
      const gRotY = t * 0.00010 * rotationMult + excite * t * 0.00005 + mouseNormX * 0.35;
      const gRotX = mouseNormY * 0.22 + Math.sin(t * 0.0004) * 0.04;

      // Phase tilt lifts the whole thing
      const tiltOffset = (tilt - 0.5) * 0.55;

      // ─── Rings ───────────────────────────────────
      for (const ring of RING_DEFS) {
        const r = baseR * ring.radius * spread;
        const localRot = t * ring.speed + ring.phase;
        const effTiltX = ring.tiltX + tiltOffset;

        // Ring outline
        ctx.beginPath();
        for (let i = 0; i <= CONFIG.ringSteps; i++) {
          const theta = (i / CONFIG.ringSteps) * Math.PI * 2 + localRot;
          const p = projectRingPoint(theta, r, effTiltX, ring.tiltZ, gRotX, gRotY, cx, cy, perspective);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        const ringAlpha = 0.28 + excite * 0.22 + (bright - 0.5) * 0.25;
        ctx.strokeStyle = `hsla(${hue}, ${sat * 100}%, ${bright * 100}%, ${ringAlpha})`;
        ctx.lineWidth = 0.9 + excite * 0.4;
        ctx.stroke();

        // Orbiting dots on this ring
        for (let d = 0; d < ring.dotCount; d++) {
          const theta =
            (d / ring.dotCount) * Math.PI * 2 +
            t * ring.dotSpeed * (1 + excite * 2.5) +
            localRot;

          const p = projectRingPoint(theta, r, effTiltX, ring.tiltZ, gRotX, gRotY, cx, cy, perspective);

          const dotR = CONFIG.dotSizeBase + p.scale * CONFIG.dotSizeScale;
          const dotAlpha = Math.min(1, p.scale * 1.15) * (0.82 + excite * 0.18);

          // Soft glow behind dot
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, dotR * 5);
          grad.addColorStop(0, `hsla(${hue}, ${sat * 100}%, ${bright * 100}%, ${dotAlpha * 0.55})`);
          grad.addColorStop(0.5, `hsla(${hue}, ${sat * 100}%, ${bright * 100}%, ${dotAlpha * 0.15})`);
          grad.addColorStop(1, `hsla(${hue}, ${sat * 100}%, ${bright * 100}%, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotR * 5, 0, Math.PI * 2);
          ctx.fill();

          // Solid dot
          ctx.fillStyle = `hsla(${hue}, ${sat * 100}%, ${bright * 100}%, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ─── Central core ────────────────────────────
      const pulse = 1 + Math.sin(t * CONFIG.corePulseSpeed) * CONFIG.corePulseAmp * coreGlow;
      const coreR = CONFIG.coreRadius * pulse;
      const coreAlpha = Math.min(1.2, 0.75 * coreGlow + excite * 0.25);

      // Core halo
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 14);
      coreGrad.addColorStop(0, `hsla(${hue}, ${sat * 100}%, ${Math.min(1, bright + 0.15) * 100}%, ${coreAlpha})`);
      coreGrad.addColorStop(0.25, `hsla(${hue}, ${sat * 100}%, ${bright * 100}%, ${coreAlpha * 0.35})`);
      coreGrad.addColorStop(1, `hsla(${hue}, ${sat * 100}%, ${bright * 100}%, 0)`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 14, 0, Math.PI * 2);
      ctx.fill();

      // Solid core
      ctx.fillStyle = `hsla(${hue}, ${sat * 100}%, ${Math.min(1, bright + 0.22) * 100}%, 1)`;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = width / 2;
      mouseY = height / 2;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="ambient-background" data-phase="hero" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}