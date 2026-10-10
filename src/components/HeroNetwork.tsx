"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hot: boolean };
type Ripple = { x: number; y: number; t: number };

const LINK = 130; // vzdialenosť, do ktorej sa body spájajú
const MOUSE = 190; // dosah kurzora
const ORANGE = "249, 122, 31";

/**
 * Sieť bodov ako v logu WebPoint. Body sa pripájajú ku kurzoru,
 * klik vyšle vlnu, ktorá ich rozhodí.
 */
export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const ripples: Ripple[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    function build() {
      const rect = host!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.max(36, Math.round((w * h) / 13000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.1 + Math.random() * 1.6,
        hot: Math.random() < 0.12,
      }));
    }

    function step() {
      ctx!.clearRect(0, 0, w, h);

      for (const n of nodes) {
        // jemné pritiahnutie ku kurzoru
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE && d > 1) {
            n.vx += (dx / d) * 0.012;
            n.vy += (dy / d) * 0.012;
          }
        }
        // vlny po kliknutí
        for (const rp of ripples) {
          const dx = n.x - rp.x;
          const dy = n.y - rp.y;
          const d = Math.hypot(dx, dy);
          const front = rp.t * 9;
          if (Math.abs(d - front) < 24 && d > 1) {
            n.vx += (dx / d) * 0.9;
            n.vy += (dy / d) * 0.9;
          }
        }
        // trenie + minimálny pohyb
        n.vx *= 0.97;
        n.vy *= 0.97;
        const speed = Math.hypot(n.vx, n.vy);
        if (speed < 0.12) {
          n.vx += (Math.random() - 0.5) * 0.04;
          n.vy += (Math.random() - 0.5) * 0.04;
        }
        if (speed > 3) {
          n.vx *= 3 / speed;
          n.vy *= 3 / speed;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // čiary medzi bodmi
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * 0.16})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // oranžové spojenia ku kurzoru
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (d < MOUSE) {
            ctx!.strokeStyle = `rgba(${ORANGE},${(1 - d / MOUSE) * 0.75})`;
            ctx!.lineWidth = 1.2;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(n.x, n.y);
            ctx!.stroke();
          }
        }
      }

      // body
      for (const n of nodes) {
        const near = mouse.active && Math.hypot(mouse.x - n.x, mouse.y - n.y) < MOUSE;
        ctx!.fillStyle = n.hot || near ? `rgba(${ORANGE},0.95)` : "rgba(255,255,255,0.55)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, near ? n.r + 1.2 : n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // kruhy vĺn
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.t += 1;
        const radius = rp.t * 9;
        const alpha = Math.max(0, 1 - rp.t / 70);
        ctx!.strokeStyle = `rgba(${ORANGE},${alpha * 0.8})`;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(rp.x, rp.y, radius, 0, Math.PI * 2);
        ctx!.stroke();
        if (alpha <= 0) ripples.splice(i, 1);
      }
    }

    function loop() {
      step();
      raf = visible ? requestAnimationFrame(loop) : 0;
    }

    function local(e: PointerEvent) {
      const rect = host!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const p = local(e);
      mouse.x = p.x;
      mouse.y = p.y;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      ripples.push({ x: p.x, y: p.y, t: 0 });
    };

    build();
    if (reduced) {
      step();
      return;
    }

    const ro = new ResizeObserver(() => build());
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden />;
}
