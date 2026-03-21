"use client";

/* 🔥 STATIC GENERATION HINT (PERFORMANCE) */
export const dynamic = "force-static";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import dynamicImport from "next/dynamic";

/* ✅ LOTTIE (CLIENT ONLY) */
const Lottie = dynamicImport(() => import("lottie-react"), { ssr: false });

/* ================= COUNTER COMPONENT ================= */
function Counter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const interval = 20;
    const step = Math.ceil(end / (duration / interval));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center will-change-transform"
    >
      <h4 className="text-5xl font-extrabold text-blue-400">
        {count}
        {suffix}
      </h4>
      <p className="text-gray-400 mt-2">{label}</p>
    </motion.div>
  );
}

/* ================= HERO ANIMATION VARIANTS ================= */
const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeInOut",},
  },
};

/* ================= HOME PAGE ================= */
export default function Home() {
  const [heroAnimation, setHeroAnimation] = useState<any>(null);

  /* ✅ LOAD LOTTIE JSON */
  useEffect(() => {
    fetch("/hero-animation.json")
      .then((res) => res.json())
      .then(setHeroAnimation)
      .catch(console.error);
  }, []);

  return (
    <main className="bg-[#020617] text-white overflow-x-hidden scroll-smooth">

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={120} height={100} priority />
            <h1 className="text-2xl font-bold" color="red">SkillsBoostHub</h1>
          </div>

          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link href="/register" className="btn-primary px-8 py-3 glow-hover btn-glow">
                Register
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link href="/login" className="btn-primary px-8 py-3 glow-hover btn-glow">
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center pt-28 relative overflow-hidden">
        {/* ambient glow */}
        <motion.div
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-indigo-600/10 blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="will-change-transform"
          >
            <motion.h2
              variants={heroItem}
              className="text-5xl font-extrabold leading-tight"
            >
              Learn Skills That{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Career
            </motion.h2>

            <motion.p
              variants={heroItem}
              className="mt-6 text-lg text-gray-300"
            >
              SkillsBoostHub is a premium learning platform designed to help
              students and professionals master real-world skills with hands-on learning.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-8 flex gap-4 flex-col sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="btn-primary px-8 py-3">
                  Get Started
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login" className="btn-secondary px-8 py-3">
                  Explore
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* LOTTIE */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center will-change-transform"
          >
            {heroAnimation && (
              <Lottie
                animationData={heroAnimation}
                loop
                autoplay
                className="w-[520px] max-w-full animate-float"
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Courses We Offer
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {["Web Development", "AI & ML", "Data Science"].map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#0f172a] p-6 rounded-2xl border border-white/10 will-change-transform"
              >
                <h4 className="text-xl font-semibold">{course}</h4>
                <p className="text-gray-400 mt-3">
                  Industry-ready curriculum with projects & mentorship.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUSTED COMPANIES ================= */}
      <section className="py-16 bg-black overflow-hidden border-y border-white/10">
        <motion.div
          animate={{ x: ["0%", "-90%"] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="flex gap-20 text-3xl font-bold whitespace-nowrap px-8 will-change-transform"
        >
          {[...["Google", "Amazon", "Microsoft", "Meta", "Netflix", "Adobe"],
            ...["Google", "Amazon", "Microsoft", "Meta", "Netflix", "Adobe"]].map(
            (c, i) => (
              <span key={i} className="text-gray-400 hover:text-white transition">
                {c}
              </span>
            )
          )}
        </motion.div>
      </section>

      {/* ================= COUNTERS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Our Impact in Numbers 📊
          </motion.h3>

          <div className="grid md:grid-cols-4 gap-10">
            <Counter value={2500} suffix="+" label="Students Trained" />
            <Counter value={30} suffix="+" label="Industry-Level Courses" />
            <Counter value={1200} suffix="+" label="Successful Placements" />
            <Counter value={5} label="⭐ Average Rating" />
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold mb-12 text-center"
          >
            What Our Students Say
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((r, i) => (
              <motion.div
                key={r}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#0f172a] p-6 rounded-xl text-center glow-hover card-glow border-glow will-change-transform"
              >
                <div className="flex gap-1 mb-3 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} />
                  ))}
                </div>
                <p className="text-gray-300">
                  “This platform changed my career. The learning experience is amazing!”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TOP STUDENTS ================= */}
      <section className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Top Performers
          </motion.h3>

          <div className="grid md:grid-cols-4 gap-6">
            {["Amit", "Sneha", "Rahul", "Priya"].map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                whileHover={{ scale: 1.06 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#0f172a] p-6 rounded-2xl glow-hover card-glow border-glow will-change-transform"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4" />
                <h4 className="font-semibold">{name}</h4>
                <p className="text-gray-400 text-sm">Placed Student</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-8 text-gray-400">
          <div>
            <h4 className="text-white font-bold mb-2">SkillsBoostHub</h4>
            <p>Empowering careers through skills.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2">© 2025</h4>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
