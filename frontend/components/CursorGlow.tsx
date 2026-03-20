"use client";

import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;
    let isActive = true;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleVisibility = () => {
      isActive = !document.hidden;
      if (isActive) animate();
      else cancelAnimationFrame(rafId);
    };

    const animate = () => {
      if (!isActive) return;

      // Smoother lerp
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      document.documentElement.style.setProperty("--x", `${currentX}px`);
      document.documentElement.style.setProperty("--y", `${currentY}px`);

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("visibilitychange", handleVisibility);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}