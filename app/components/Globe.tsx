"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Dot {
  pos: Point3D;   // unit-sphere position (rotated each frame)
  orig: Point3D;  // original unit-sphere position (never mutated)
}

// Convert spherical coords to a unit-sphere cartesian point
function spherical(lat: number, lon: number): Point3D {
  const cosLat = Math.cos(lat);
  return {
    x: cosLat * Math.cos(lon),
    y: Math.sin(lat),
    z: cosLat * Math.sin(lon),
  };
}

// Rotate a point around the Y axis (yaw) and X axis (pitch)
function rotate(p: Point3D, yaw: number, pitch: number): Point3D {
  // Yaw (Y axis)
  const x1 = p.x * Math.cos(yaw) + p.z * Math.sin(yaw);
  const z1 = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw);
  // Pitch (X axis)
  const y2 = p.y * Math.cos(pitch) - z1 * Math.sin(pitch);
  const z2 = p.y * Math.sin(pitch) + z1 * Math.cos(pitch);
  return { x: x1, y: y2, z: z2 };
}

// Build lat/lon dot grid on a sphere
function buildDots(): Dot[] {
  const dots: Dot[] = [];
  const latSteps = 28;
  const lonSteps = 56;
  for (let i = 0; i <= latSteps; i++) {
    const lat = -Math.PI / 2 + (Math.PI * i) / latSteps;
    // Fewer dots near poles (natural density)
    const count = Math.max(1, Math.round(lonSteps * Math.cos(lat)));
    for (let j = 0; j < count; j++) {
      const lon = (2 * Math.PI * j) / count;
      const p = spherical(lat, lon);
      dots.push({ pos: { ...p }, orig: { ...p } });
    }
  }
  return dots;
}

// Build great-circle arc lines: parallels + meridians
function buildLines(): Point3D[][] {
  const lines: Point3D[][] = [];
  const SEG = 64;

  // Parallels at every 30 degrees latitude
  for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
    const lat = (latDeg * Math.PI) / 180;
    const arc: Point3D[] = [];
    for (let i = 0; i <= SEG; i++) {
      arc.push(spherical(lat, (2 * Math.PI * i) / SEG));
    }
    lines.push(arc);
  }
  // Meridians at every 30 degrees longitude
  for (let lonDeg = 0; lonDeg < 360; lonDeg += 30) {
    const lon = (lonDeg * Math.PI) / 180;
    const arc: Point3D[] = [];
    for (let i = 0; i <= SEG; i++) {
      arc.push(spherical(-Math.PI / 2 + (Math.PI * i) / SEG, lon));
    }
    lines.push(arc);
  }
  return lines;
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = buildDots();
    const lines = buildLines();

    // Rotation state
    let yaw = 0.4;
    let pitch = 0.2;
    let velYaw = 0.003;
    let velPitch = 0;

    // Drag state
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    // Mouse / touch interaction
    function onMouseDown(e: MouseEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velYaw = 0;
      velPitch = 0;
    }
    function onMouseMove(e: MouseEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      velYaw = dx * 0.007;
      velPitch = dy * 0.007;
      yaw += velYaw;
      pitch += velPitch;
      pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch));
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onMouseUp() {
      dragging = false;
    }
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      dragging = true;
      lastX = t.clientX;
      lastY = t.clientY;
      velYaw = 0;
      velPitch = 0;
    }
    function onTouchMove(e: TouchEvent) {
      if (!dragging) return;
      const t = e.touches[0];
      const dx = t.clientX - lastX;
      const dy = t.clientY - lastY;
      velYaw = dx * 0.007;
      velPitch = dy * 0.007;
      yaw += velYaw;
      pitch += velPitch;
      pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch));
      lastX = t.clientX;
      lastY = t.clientY;
    }
    function onTouchEnd() {
      dragging = false;
    }

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let raf: number;

    function draw() {
      const W = canvas!.width;
      const H = canvas!.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.42;

      ctx!.clearRect(0, 0, W, H);

      // Auto-spin when not dragging
      if (!dragging) {
        yaw += velYaw;
        // Dampen any pitch velocity
        velPitch *= 0.92;
        pitch += velPitch;
        pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch));
        // Restore auto-spin velocity gently
        if (Math.abs(velYaw) < 0.003) velYaw += (0.003 - velYaw) * 0.05;
      }

      // ── GLOW background for the sphere ──
      const grd = ctx!.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.1);
      grd.addColorStop(0, "rgba(167,139,250,0.07)");
      grd.addColorStop(1, "rgba(7,11,18,0)");
      ctx!.fillStyle = grd;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx!.fill();

      // ── GRID LINES ──
      for (const arc of lines) {
        let started = false;
        ctx!.beginPath();
        for (const p of arc) {
          const r = rotate(p, yaw, pitch);
          const sx = cx + r.x * R;
          const sy = cy - r.y * R;
          const visible = r.z >= -0.1;
          if (!visible) { started = false; continue; }
          if (!started) { ctx!.moveTo(sx, sy); started = true; }
          else ctx!.lineTo(sx, sy);
        }
        // Opacity based on facing: front lines brighter
        const alpha = 0.08 + 0.06 * Math.max(0, arc[Math.floor(arc.length / 2)] ?
          rotate(arc[Math.floor(arc.length / 2)], yaw, pitch).z : 0);
        ctx!.strokeStyle = `rgba(167,139,250,${alpha.toFixed(3)})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      // ── DOTS ──
      for (const dot of dots) {
        const r = rotate(dot.orig, yaw, pitch);
        if (r.z < 0) continue; // back-face cull

        const sx = cx + r.x * R;
        const sy = cy - r.y * R;

        // Depth-based size and brightness
        const depth = (r.z + 1) / 2; // 0..1
        const radius = 0.8 + depth * 1.4;
        const alpha = 0.25 + depth * 0.75;

        ctx!.beginPath();
        ctx!.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(167,139,250,${alpha.toFixed(3)})`;
        ctx!.fill();
      }

      // ── EQUATOR HIGHLIGHT ──
      ctx!.beginPath();
      for (let i = 0; i <= 128; i++) {
        const lon = (2 * Math.PI * i) / 128;
        const p = spherical(0, lon);
        const r = rotate(p, yaw, pitch);
        if (r.z < 0) continue;
        const sx = cx + r.x * R;
        const sy = cy - r.y * R;
        if (i === 0) ctx!.moveTo(sx, sy);
        else ctx!.lineTo(sx, sy);
      }
      ctx!.strokeStyle = "rgba(167,139,250,0.25)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      raf = requestAnimationFrame(draw);
    }

    // Resize handler — keep canvas sharp on any container size
    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      aria-label="Interactive globe visualization"
      role="img"
      style={{ display: "block" }}
    />
  );
}
