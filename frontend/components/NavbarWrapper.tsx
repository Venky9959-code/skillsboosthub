"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  const shouldHide =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  // ✅ HOOKS MUST ALWAYS RUN
  useEffect(() => {
    if (shouldHide) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldHide]);

  // ✅ RETURN AFTER HOOKS
  if (shouldHide) return null;

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl bg-white/5
        border-b border-white/10
      "
    >
      <Navbar />
    </motion.div>
  );
}
