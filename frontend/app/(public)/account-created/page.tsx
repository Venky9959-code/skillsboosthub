"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function AccountCreatedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1220] to-[#020617] px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl text-white shadow-2xl text-center"
      >

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle size={72} className="text-green-400" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">
          Account Created 🎉
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Your SkillsBoostHub account has been successfully created.
        </p>

        {/* Info box */}
        <div className="bg-white/10 border border-white/10 rounded-xl p-4 mb-6 text-sm text-gray-300">
          You can now log in and start exploring courses, track progress,
          and build your career with us.
        </div>

        {/* Button */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
          <Link
            href="/login"
            className="block w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Go to Login
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}
