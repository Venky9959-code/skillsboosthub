"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
      scale: shouldReduceMotion ? 1 : 0.98,
      filter: shouldReduceMotion ? "none" : "blur(8px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -18,
      scale: shouldReduceMotion ? 1 : 0.98,
      filter: shouldReduceMotion ? "none" : "blur(6px)",
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1], // premium cubic-bezier
        }}
        className="h-full will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}