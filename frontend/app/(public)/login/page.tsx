"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await signInWithEmailAndPassword(auth, email, password);

      router.push("/dashboard");

    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (provider: any) => {
    try {
      setLoading(true);
      setError("");

      await signInWithPopup(auth, provider);

      router.push("/dashboard");

    } catch {
      setError("Social login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 overflow-hidden">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl h-[520px] rounded-3xl overflow-hidden shadow-[0_0_80px_#7c3aed55]"
      >
        {/* PURPLE PANEL */}
        <motion.div
          initial={{ x: 120 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 clip-path-login text-white p-12 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold mb-4">WELCOME BACK!</h2>
          <p className="text-sm opacity-80">
            Login to continue your journey and access your dashboard.
          </p>
        </motion.div>

        {/* LOGIN FORM */}
        <motion.div
          initial={{ x: -120 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-y-0 left-0 w-1/2 bg-[#020617] p-12 flex flex-col justify-center text-white"
        >
          <h2 className="text-3xl font-bold mb-2">Login</h2>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`w-full py-3 rounded-xl font-semibold ${
              loading
                ? "bg-purple-400"
                : "bg-gradient-to-r from-purple-500 to-indigo-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <p className="text-gray-400 text-sm mt-6">
            New here?{" "}
            <Link href="/register" className="text-purple-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

const inputStyle =
  "w-full p-3 rounded-xl bg-white/10 mb-4 outline-none border border-white/10 focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400";