"use client";

import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    // ❌ Disable on touch devices (important for mobile)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth inertia (lerp)
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      document.documentElement.style.setProperty("--x", `${currentX}px`);
      document.documentElement.style.setProperty("--y", `${currentY}px`);

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return null; // visual fully controlled via CSS
}
