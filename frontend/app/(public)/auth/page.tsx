"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthPage() {
  const router = useRouter();

  // 🔁 TOGGLE STATE (UI ONLY)
  const [isRegister, setIsRegister] = useState(false);

  // 🔐 LOGIN STATE (UNCHANGED)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 📝 REGISTER STATE (UNCHANGED)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

      router.push("/account-created");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <motion.div
        className="relative w-full max-w-4xl h-[560px] rounded-3xl overflow-hidden shadow-[0_0_80px_#7c3aed55]"
      >
        {/* SLIDING PURPLE PANEL */}
        <motion.div
          animate={{ x: isRegister ? "-100%" : "0%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-12 flex flex-col justify-center z-20"
        >
          <h2 className="text-4xl font-bold mb-4">
            {isRegister ? "WELCOME BACK!" : "HELLO FRIEND!"}
          </h2>
          <p className="text-sm opacity-80 mb-6">
            {isRegister
              ? "Login with your credentials"
              : "Create an account to get started"}
          </p>

          <button
            onClick={() => setIsRegister(!isRegister)}
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition"
          >
            {isRegister ? "Login" : "Sign Up"}
          </button>
        </motion.div>

        {/* LOGIN FORM */}
        <motion.div
          animate={{ x: isRegister ? "-100%" : "0%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute left-0 w-1/2 h-full bg-[#020617] p-12 flex flex-col justify-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Login</h2>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

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
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="px-3 text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <SocialButton label="Google" icon="🟢" onClick={() => socialLogin(new GoogleAuthProvider())} />
          <SocialButton label="GitHub" icon="🐙" onClick={() => socialLogin(new GithubAuthProvider())} />
          <SocialButton label="Microsoft" icon="🪟" onClick={() => socialLogin(new OAuthProvider("microsoft.com"))} />
        </motion.div>

        {/* REGISTER FORM */}
        <motion.div
          animate={{ x: isRegister ? "0%" : "100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute right-0 w-1/2 h-full bg-[#020617] p-12 flex flex-col justify-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>

          <input placeholder="Full Name" className={inputStyle} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" className={inputStyle} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Phone" className={inputStyle} onChange={(e) => setPhone(e.target.value)} />
          <input placeholder="Password" type="password" className={inputStyle} onChange={(e) => setPassword(e.target.value)} />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SocialButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full mb-3 py-3 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-3"
    >
      <span>{icon}</span>
      Continue with {label}
    </button>
  );
}

const inputStyle =
  "w-full p-3 rounded-xl bg-white/10 mb-4 outline-none border border-white/10 text-white placeholder-gray-400";
