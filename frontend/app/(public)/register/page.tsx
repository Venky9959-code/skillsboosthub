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
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 overflow-hidden">
      <motion.div className="relative w-full max-w-4xl h-[650px] rounded-3xl overflow-hidden shadow-[0_0_80px_#7c3aed55]">

        {/* LEFT PANEL */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">WELCOME!</h2>
          <p className="text-sm opacity-80">
            Create your account and start your journey with us.
          </p>
        </div>

        {/* FORM */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#020617] p-12 flex flex-col justify-center text-white">
          <h2 className="text-3xl font-bold mb-2">Sign Up</h2>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <input
            className={inputStyle}
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className={inputStyle}
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className={inputStyle}
            placeholder="Phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={inputStyle}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <span
              onClick={()=>setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xs cursor-pointer text-gray-300"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <motion.button
            onClick={handleRegister}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-indigo-600"
          >
            Create Account
          </motion.button>

          {/* 🔥 ANIMATED GOOGLE STYLE BUTTONS */}
          <div className="mt-5 space-y-3">

            <motion.button
              whileHover={{scale:1.05}}
              onClick={()=>socialLogin(googleProvider)}
              className={socialBtn}
            >
              <FcGoogle size={20}/> Continue with Google
            </motion.button>

            <motion.button
              whileHover={{scale:1.05}}
              onClick={()=>socialLogin(microsoftProvider)}
              className={socialBtn}
            >
              <FaMicrosoft size={18}/> Continue with Microsoft
            </motion.button>

            <motion.button
              whileHover={{scale:1.05}}
              onClick={()=>socialLogin(githubProvider)}
              className={socialBtn}
            >
              <FaGithub size={18}/> Continue with GitHub
            </motion.button>

          </div>

          <p className="text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:underline">
              Login
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

const inputStyle =
  "w-full p-3 rounded-xl bg-white/10 mb-4 outline-none border border-white/10 focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400";

const socialBtn =
  "flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-medium";