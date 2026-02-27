"use client";

import { MouseEvent, ReactNode } from "react";

export default function RippleButton({
  children,
  className = "",
  ...props
}: any) {
  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");

    const size = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "ripple";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <button
      {...props}
      onClick={(e) => {
        createRipple(e);
        props.onClick?.(e);
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </button>
  );
}
