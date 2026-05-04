"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await sendPasswordResetEmail(auth, email);

      setSuccess("Password reset link sent to your email 📩");
    } catch (err: any) {
      setError("Unable to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1220] to-[#020617] px-4">

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl text-white shadow-2xl"
      >

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Forgot Password 🔐
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Enter your email to receive a reset link
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="text-green-400 text-sm mb-4 text-center">
            {success}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReset()}
        />

        {/* Button */}
        <motion.button
          onClick={handleReset}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30"
          }`}
        >
          {loading ? "Sending link..." : "Send Reset Link"}
        </motion.button>

        {/* Footer */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Back to Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

const inputStyle =
  "w-full p-3 rounded-xl bg-white/20 mb-4 outline-none border border-white/10 focus:ring-2 focus:ring-blue-500/40 transition-all text-white placeholder-gray-400";
