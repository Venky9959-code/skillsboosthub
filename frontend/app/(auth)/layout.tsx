"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          x: pathname.includes("register") ? 120 : -120,
        }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: pathname.includes("register") ? -120 : 120,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
