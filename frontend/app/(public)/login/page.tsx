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

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaMicrosoft } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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
    <div
      className="
        relative min-h-screen
        flex items-center justify-center
        overflow-hidden
        bg-[#020617]
        px-4 py-10
      "
    >

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* BASE */}
        <div className="absolute inset-0 bg-[#020617]" />

        {/* BLUE GLOW */}
        <div
          className="
            absolute top-[-250px] left-[-150px]
            w-[600px] h-[600px]
            bg-blue-500/15
            blur-[160px]
            rounded-full
          "
        />

        {/* PURPLE GLOW */}
        <div
          className="
            absolute bottom-[-250px] right-[-150px]
            w-[600px] h-[600px]
            bg-purple-500/15
            blur-[160px]
            rounded-full
          "
        />

        {/* GRID */}
        <div
          className="
            absolute inset-0 opacity-[0.03]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-[size:80px_80px]
          "
        />

        {/* PARTICLES */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + i,
            }}
            className="
              absolute rounded-full
              bg-white/10
            "
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}

        className="
          relative overflow-hidden
          w-full max-w-6xl
          min-h-[720px]
          rounded-[40px]
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-3xl
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        "
      >

        {/* LEFT VISUAL SIDE */}
        <div
          className="
            absolute inset-y-0 left-0
            hidden lg:flex
            w-1/2
            overflow-hidden
            items-center justify-center
          "
        >

          {/* IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            className="
              absolute inset-0
              w-full h-full
              object-cover
              scale-[1.02]
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-br
              from-[#020617]/90
              via-[#020617]/70
              to-purple-900/40
            "
          />

          {/* GLOW */}
          <div
            className="
              absolute top-[-120px] right-[-120px]
              w-[300px] h-[300px]
              bg-cyan-400/20
              blur-[120px]
              rounded-full
            "
          />

          <div
            className="
              absolute bottom-[-120px] left-[-120px]
              w-[300px] h-[300px]
              bg-purple-500/20
              blur-[120px]
              rounded-full
            "
          />

          {/* CONTENT */}
          <div className="relative z-10 p-14 text-white">

            {/* BADGE */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 5,
              }}

              className="
                inline-flex items-center gap-3
                px-5 py-2 rounded-full
                bg-white/10
                border border-white/10
                backdrop-blur-xl
                mb-8
              "
            >

              <div
                className="
                  w-2 h-2 rounded-full
                  bg-green-400 animate-pulse
                "
              />

              <span className="text-sm">
                AI Powered Learning
              </span>
            </motion.div>

            {/* HEADING */}
            <h2
              className="
                text-5xl xl:text-6xl
                font-black
                leading-tight
              "
            >
              Welcome <br />

              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-400
                  to-purple-500
                  bg-clip-text text-transparent
                  animate-gradient bg-[length:200%_200%]
                "
              >
                Back Again
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-gray-300
                text-lg
                leading-relaxed
                mt-8
                max-w-lg
              "
            >
              Continue learning with premium resources,
              modern tools and AI-powered growth.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-5 mt-10">

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}

                className="
                  rounded-3xl
                  bg-white/10
                  border border-white/10
                  backdrop-blur-2xl
                  p-6
                "
              >

                <h3 className="text-3xl font-black text-blue-400">
                  25K+
                </h3>

                <p className="text-gray-300 mt-1 text-sm">
                  Learners
                </p>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}

                className="
                  rounded-3xl
                  bg-white/10
                  border border-white/10
                  backdrop-blur-2xl
                  p-6
                "
              >

                <h3 className="text-3xl font-black text-purple-400">
                  150+
                </h3>

                <p className="text-gray-300 mt-1 text-sm">
                  Courses
                </p>
              </motion.div>
            </div>

            {/* QUOTE CARD */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 6,
              }}

              className="
                mt-10
                rounded-3xl
                bg-white/10
                border border-white/10
                backdrop-blur-2xl
                p-6
              "
            >

              <p
                className="
                  text-gray-200
                  leading-relaxed
                  text-base
                "
              >
                “Empowering learners with modern skills,
                premium education and real-world growth.”
              </p>
            </motion.div>
          </div>
        </div>

        {/* FORM SIDE */}
        <div
          className="
            relative lg:ml-auto
            w-full lg:w-1/2
            min-h-[720px]
            p-8 md:p-14
            flex flex-col justify-center
            text-white
          "
        >

          {/* LOGO */}
          <div className="mb-8">

            <h1 className="text-4xl font-extrabold">

              <span className="text-white">
                Skills
              </span>

              <span className="text-cyan-400">
                Boost
              </span>

              <span className="text-purple-400">
                Hub
              </span>
            </h1>

            <p
              className="
                text-sm text-gray-400
                mt-2 tracking-[0.25em]
                uppercase
              "
            >
              Learn • Grow • Succeed
            </p>
          </div>

          {/* HEADING */}
          <h2
            className="
              text-5xl font-black
              leading-tight
              mb-3
            "
          >
            Login To Your <br />

            <span
              className="
                bg-gradient-to-r
                from-blue-400
                via-cyan-400
                to-purple-500
                bg-clip-text text-transparent
                animate-gradient bg-[length:200%_200%]
              "
            >
              Account
            </span>
          </h2>

          {/* SUBTITLE */}
          <p
            className="
              text-gray-400
              mb-8
              leading-relaxed
            "
          >
            Access your dashboard and continue your learning journey.
          </p>

          {/* ERROR */}
          {error && (
            <div
              className="
                mb-4 text-sm
                text-red-400
                bg-red-500/10
                border border-red-500/20
                px-4 py-3 rounded-2xl
              "
            >
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
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleLogin()
              }
            />

            <span
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute right-5 top-5
                text-xs cursor-pointer
                text-gray-300
              "
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end mb-6">

            <Link
              href="/forgot-password"
              className="
                text-sm text-blue-400
                hover:text-cyan-400
                transition
              "
            >
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <motion.button
            onClick={handleLogin}
            disabled={loading}

            whileHover={{
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.97,
            }}

            className="
              relative overflow-hidden group
              w-full py-4 rounded-2xl
              font-semibold text-lg
              bg-gradient-to-r
              from-blue-500
              via-cyan-500
              to-purple-500
              shadow-[0_20px_50px_rgba(59,130,246,0.35)]
            "
          >

            {/* SHINE */}
            <div
              className="
                absolute top-0 left-[-100%]
                w-full h-full
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
                skew-x-12
                group-hover:left-[120%]
                transition-all duration-1000
              "
            />

            <span className="relative z-10">

              {loading
                ? "Logging in..."
                : "Login"}
            </span>
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
          <div className="space-y-4">

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => socialLogin(googleProvider)}
              className={socialBtn}
            >

              <FcGoogle size={22} />

              Continue with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => socialLogin(githubProvider)}
              className={socialBtn}
            >

              <FaGithub size={20} />

              Continue with GitHub
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => socialLogin(microsoftProvider)}
              className={socialBtn}
            >

              <FaMicrosoft size={18} />

              Continue with Microsoft
            </motion.button>
          </div>

          {/* REGISTER */}
          <p
            className="
              text-gray-400 text-sm
              mt-8 text-center
            "
          >

            New here?{" "}

            <Link
              href="/register"
              className="
                text-purple-400
                hover:text-purple-300
                font-medium transition
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const inputStyle =
  "w-full p-4 rounded-2xl bg-white/[0.05] mb-4 outline-none border border-white/10 focus:border-blue-500/50 focus:bg-white/[0.07] focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition duration-300 text-white placeholder-gray-400 backdrop-blur-xl";

const socialBtn =
  "group relative overflow-hidden flex items-center justify-center gap-3 w-full py-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-xl transition duration-300 font-medium";