"use client";

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaMicrosoft } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* 🔥 AUTO LOGIN CHECK */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsub();
  }, [router]);

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        phone,
        role: "user",
        paid: false,
        createdAt: new Date(),
      });

      /* SEND WELCOME EMAIL */
      const response = await fetch("/api/send-welcome-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();
      console.log("EMAIL RESPONSE:", data);

      router.push("/account-created");

    } catch (err: any) {
      console.error("REGISTER ERROR:", err);
      setError(err.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  /* ================= SOCIAL LOGIN ================= */

  const socialLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          name: result.user.displayName,
          email: result.user.email,
          role: "user",
          paid: false,
          createdAt: new Date(),
        },
        { merge: true }
      );

      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message);
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
        bg-[#020617]
        px-4 overflow-hidden
      "
    >

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* MAIN BG */}
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
            className="absolute rounded-full bg-white/10"
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
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
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
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
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

          {/* CONTENT */}
          <div className="relative z-10 p-14 text-white">

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

            <h2
              className="
                text-6xl font-black
                leading-tight
              "
            >
              Start Your <br />

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
                Learning Journey
              </span>
            </h2>

            <p
              className="
                text-gray-300
                text-lg
                leading-relaxed
                mt-8
                max-w-lg
              "
            >
              Build modern skills, unlock premium content
              and accelerate your career with SkillsBoostHub.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-5 mt-12">

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

                <h3 className="text-4xl font-black text-blue-400">
                  25K+
                </h3>

                <p className="text-gray-300 mt-2">
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

                <h3 className="text-4xl font-black text-purple-400">
                  150+
                </h3>

                <p className="text-gray-300 mt-2">
                  Courses
                </p>
              </motion.div>
            </div>
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

          {/* HEADING */}
          <h2
            className="
              text-5xl font-black
              leading-tight
              mb-3
            "
          >
            Create Your <br />

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
            Join the next generation AI-powered learning platform.
          </p>

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm mb-4">
              {error}
            </p>
          )}

          {/* NAME */}
          <input
            className={inputStyle}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            className={inputStyle}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PHONE */}
          <input
            className={inputStyle}
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-5 top-5
                text-xs cursor-pointer
                text-gray-300
              "
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* REGISTER BUTTON */}
          <motion.button
            onClick={handleRegister}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="
              relative overflow-hidden group
              w-full py-4 rounded-2xl
              font-semibold
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
              {loading ? "Creating Account..." : "Create Account"}
            </span>
          </motion.button>

          {/* SOCIAL BUTTONS */}
          <div className="mt-6 space-y-4">

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
              onClick={() => socialLogin(microsoftProvider)}
              className={socialBtn}
            >
              <FaMicrosoft size={18} />
              Continue with Microsoft
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => socialLogin(githubProvider)}
              className={socialBtn}
            >
              <FaGithub size={20} />
              Continue with GitHub
            </motion.button>
          </div>

          {/* LOGIN */}
          <p className="text-gray-400 text-sm mt-6 text-center">

            Already have an account?{" "}

            <Link
              href="/login"
              className="
                text-blue-400
                hover:text-cyan-400
                transition
              "
            >
              Login
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