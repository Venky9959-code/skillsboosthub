"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [showWelcomeAnim, setShowWelcomeAnim] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcomeAnim(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] px-10 py-16">
        <div className="max-w-7xl mx-auto space-y-10">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-96" />

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#020617] via-[#0A1220] to-black" />
      <div className="absolute top-[-200px] left-[-200px] w-[480px] h-[480px] bg-blue-500/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[480px] h-[480px] bg-purple-500/20 rounded-full blur-[140px]" />

      {/* 🧱 CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-12 text-white space-y-16">

        {/* ================= HERO SECTION ================= */}
        <motion.div
          initial={showWelcomeAnim ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <h1 className="text-4xl md:text-5xl font-bold">Welcome 👋</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            This is your personal skill-development dashboard. Track your learning,
            access premium content, and grow professionally.
          </p>
        </motion.div>

        {/* ================= ACCESS CARD ================= */}
        {!profile?.paymentStatus && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-yellow-400/50 via-orange-400/40 to-pink-500/50"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-8 bg-[#0B1224]/90 backdrop-blur-xl rounded-3xl p-8">
              <div>
                <h2 className="text-2xl font-semibold">🔒 Access Locked</h2>
                <p className="text-gray-400 mt-2 max-w-xl">
                  Unlock lifetime access to all premium courses, PDFs,
                  recorded sessions, and future updates with a one-time payment.
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard/payment")}
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Unlock ₹198
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= 📊 PROGRESS WIDGETS (NEW) ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard title="Courses Completed" value="3 / 12" />
          <ProgressCard title="Hours Learned" value="18 hrs" />
          <ProgressCard title="PDFs Downloaded" value="7" />
          <ProgressCard title="Sessions Attended" value="5" />
        </div>

        {/* ================= ⏱ CONTINUE LEARNING (NEW) ================= */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">⏱ Continue Learning</h2>
            <p className="text-gray-400 mt-2">
              Resume your last active course and keep your momentum.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/courses")}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            Resume →
          </button>
        </div>

        {/* ================= QUICK ACCESS ================= */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Quick Access</h2>
            <p className="text-gray-400 text-sm mt-1">
              Jump directly into your learning resources
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Courses" desc="Soft skills, leadership & career growth" path="/dashboard/courses" locked={!profile?.paymentStatus} />
            <DashboardCard title="Recorded Sessions" desc="Request access if you missed a live class" path="/dashboard/recorded" locked={!profile?.paymentStatus} />
            <DashboardCard title="PDFs & Notes" desc="Downloadable study material" path="/dashboard/pdfs" locked={!profile?.paymentStatus} />
          </div>
        </div>

        {/* ================= 📅 RECENT ACTIVITY (NEW) ================= */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">📅 Recent Activity</h2>

          <ActivityItem text="Completed Module: Time Management" />
          <ActivityItem text="Downloaded Leadership Notes PDF" />
          <ActivityItem text="Watched Recorded Session: Communication Skills" />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ProgressCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function ActivityItem({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-gray-300">
      {text}
    </div>
  );
}

function DashboardCard({ title, desc, path, locked }: any) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => router.push(locked ? "/dashboard/payment" : path)}
      className="cursor-pointer relative p-[1px] rounded-2xl hover:bg-blue-500/30 transition"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full">
        {locked && (
          <span className="absolute top-4 right-4 text-xs bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full">
            Locked
          </span>
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ================= SKELETONS ================= */

function Skeleton({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white/10 ${className}`}>
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-white/10 space-y-4">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
