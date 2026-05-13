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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] px-4">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#081229] to-[#020617]" />

        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full" />

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          relative
          w-full
          max-w-6xl
          min-h-[650px]
          rounded-[40px]
          overflow-hidden
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          shadow-[0_0_100px_rgba(124,58,237,0.25)]
          grid md:grid-cols-2
        "
      >

        {/* LEFT LOGIN PANEL */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="
            relative
            z-10
            flex flex-col justify-center
            px-8 md:px-14
            py-14
            bg-[#020817]/80
          "
        >

          {/* LOGO */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-white">
              Skills<span className="text-cyan-400">Boost</span>
              <span className="text-purple-400">Hub</span>
            </h1>

            <p className="text-sm text-gray-400 mt-2 tracking-[0.25em] uppercase">
              Learn • Grow • Succeed
            </p>
          </div>

          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Welcome Back 👋
            </h2>

            <p className="text-gray-400 mt-3 text-base leading-relaxed">
              Continue your learning journey and unlock premium skills for your future career.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            className={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter your password"
            className={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          {/* LOGIN BUTTON */}
          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className={`
              w-full py-4 rounded-2xl
              font-semibold text-lg
              transition duration-300
              shadow-[0_10px_40px_rgba(124,58,237,0.35)]
              ${
                loading
                  ? "bg-purple-500/70"
                  : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:opacity-90"
              }
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-white/10" />
            <p className="text-sm text-gray-500">
              OR CONTINUE WITH
            </p>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-3 gap-4">

            <button
              onClick={() => socialLogin(googleProvider)}
              className="socialBtn"
            >
              Google
            </button>

            <button
              onClick={() => socialLogin(githubProvider)}
              className="socialBtn"
            >
              GitHub
            </button>

            <button
              onClick={() => socialLogin(microsoftProvider)}
              className="socialBtn"
            >
              Microsoft
            </button>

          </div>

          {/* REGISTER */}
          <p className="text-gray-400 text-sm mt-8 text-center">
            New here?{" "}
            <Link
              href="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition"
            >
              Create Account
            </Link>
          </p>
        </motion.div>

        {/* RIGHT PREMIUM PANEL */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="
            relative overflow-hidden
            hidden md:flex
            flex-col justify-center
            px-14 py-16
            bg-gradient-to-br
            from-[#7c3aed]
            via-[#6d28d9]
            to-[#2563eb]
            text-white
          "
        >

          {/* GLOW EFFECTS */}
          <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-pink-400/30 blur-[120px] rounded-full animate-pulse" />

          <div className="absolute bottom-[-120px] left-[-80px] w-80 h-80 bg-cyan-400/20 blur-[120px] rounded-full animate-pulse" />

          {/* FLOATING DOTS */}
          <div className="absolute top-14 right-14 w-5 h-5 rounded-full bg-white/20 animate-bounce" />

          <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full bg-white/30 animate-ping" />

          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 mb-8
              rounded-full
              bg-white/10
              border border-white/20
              backdrop-blur-xl
              text-sm font-medium
              w-fit
            "
          >
            ✨ Premium Learning Platform
          </div>

          {/* HEADING */}
          <h1 className="text-6xl font-extrabold leading-tight tracking-tight">
            Build Your
            <br />

            <span className="text-cyan-200">
              Dream Future
            </span>
          </h1>

          {/* QUOTE */}
          <p
            className="
              mt-6 text-lg
              text-white/80
              leading-relaxed
              max-w-md
            "
          >
            “Success doesn’t come from certificates.
            It comes from mastering valuable skills
            and applying them consistently.”
          </p>

          {/* STATS */}
          <div className="flex items-center gap-12 mt-14">

            <div>
              <h2 className="text-4xl font-bold">
                10K+
              </h2>

              <p className="text-white/70 text-sm mt-1">
                Active Students
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                250+
              </h2>

              <p className="text-white/70 text-sm mt-1">
                Learning Resources
              </p>
            </div>

          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}

const inputStyle =
  `
    w-full
    p-4
    rounded-2xl
    bg-white/[0.06]
    mb-5
    outline-none
    border border-white/10
    focus:ring-2
    focus:ring-purple-500
    focus:border-purple-500
    text-white
    placeholder-gray-400
    transition
    backdrop-blur-xl
  `;
