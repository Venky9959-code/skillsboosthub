"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, profile } = useAuth();

  // ✅ NEW: animation state (NO logic change elsewhere)
  const [learningAnimation, setLearningAnimation] = useState<any>(null);

  // ✅ LOAD LOTTIE JSON FROM PUBLIC FOLDER
  useEffect(() => {
    fetch("/learning1.json")
      .then((res) => res.json())
      .then((data) => setLearningAnimation(data))
      .catch((err) =>
        console.error("Failed to load learning animation", err)
      );
  }, []);

  /* ================= HANDLERS ================= */

  // Always safe: landing page never auto-redirects
  const handleStartLearning = () => {
    if (!user) {
      router.push("/register");
    } else {
      router.push("/dashboard/home");
    }
  };

  const handleExploreCourses = () => {
    document
      .getElementById("courses")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLearnMore = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (profile?.paymentStatus !== "paid") {
      router.push("/dashboard/payment");
    } else {
      router.push("/dashboard/courses");
    }
  };

  const handleJoinNow = () => {
    if (!user) {
      router.push("/register");
    } else if (profile?.paymentStatus !== "paid") {
      router.push("/dashboard/payment");
    } else {
      router.push("/dashboard/home");
    }
  };

  return (
    <div className="text-white">

      {/* ================= HERO ================= */}
      <section
        className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 
        flex items-center justify-center px-6 pt-10"
      >
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Empowering Students with{" "}
              <span className="text-blue-400">Future-Ready Skills</span>
            </h1>

            <p className="mt-5 text-lg text-gray-300">
              Learn soft skills, leadership, communication, and career growth — all in one platform.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleStartLearning}
                className="bg-blue-600 px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Start Learning
              </button>

              <button
                onClick={handleExploreCourses}
                className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Explore Courses
              </button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {learningAnimation && (
              <Lottie
                animationData={learningAnimation}
                loop
                className="max-w-md"
              />
            )}
          </motion.div>

        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section
        id="courses"
        className="min-h-screen bg-[#0F1629] px-6 py-20 flex items-center justify-center"
      >
        <div className="max-w-7xl w-full text-center">

          <h2 className="text-4xl font-bold mb-10">
            Our <span className="text-blue-400">Courses</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Soft Skills", icon: "💬" },
              { title: "Communication Skills", icon: "🗣️" },
              { title: "Team Management", icon: "👥" },
              { title: "Leadership", icon: "⭐" },
              { title: "Time Management", icon: "⏳" },
              { title: "Technical Fundamentals", icon: "💻" },
            ].map((c, i) => (
              <motion.div
                key={i}
                className="bg-white/10 p-8 rounded-xl hover:scale-105 transition"
              >
                <div className="text-5xl mb-4">{c.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{c.title}</h3>

                <button
                  onClick={handleLearnMore}
                  className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PAYMENT BANNER ================= */}
      {user && profile?.paymentStatus !== "paid" && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black 
          px-6 py-3 rounded-xl shadow-lg flex gap-4 items-center z-50"
        >
          <span className="font-semibold">
            Unlock all courses with one payment!
          </span>
          <button
            onClick={() => router.push("/dashboard/payment")}
            className="bg-black text-white px-4 py-1 rounded"
          >
            Pay Now
          </button>
        </div>
      )}

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            One Payment → Lifetime Access
          </h2>

          <button
            onClick={handleJoinNow}
            className="bg-yellow-400 text-black px-10 py-3 rounded-xl font-semibold 
              hover:bg-yellow-300 transition shadow-lg"
          >
            Join Now
          </button>
        </div>
      </section>

    </div>
  );
}
