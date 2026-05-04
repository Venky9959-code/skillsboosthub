"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CommandSearch({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mx-auto mt-40 max-w-xl bg-[#0B1224] border border-white/10 rounded-xl p-4"
      >
        <input
          autoFocus
          placeholder="Search courses, PDFs, videos…"
          className="w-full bg-transparent outline-none text-white px-2 py-3"
        />
        <p className="text-xs text-gray-400 mt-2">Press Esc to close</p>
      </motion.div>
    </div>
  );
}
