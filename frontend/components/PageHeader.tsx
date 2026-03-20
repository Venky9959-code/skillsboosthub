"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10 space-y-3"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-3xl">{icon}</div>}

        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      {subtitle && (
        <p className="text-gray-400 max-w-2xl">
          {subtitle}
        </p>
      )}

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4" />
    </motion.div>
  );
}