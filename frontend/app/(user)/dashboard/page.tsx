"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

const clickSound =
  typeof Audio !== "undefined" ? new Audio("/click.mp3") : null;

export default function DashboardPage() {
  const { user, profile, loading, unreadCount } = useAuth();
  const router = useRouter();

  const nextSession: any = null; // ✅ ADDED (fix error)

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading) {
    return <div className="min-h-screen grid place-items-center">Loading…</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* PARALLAX BLOBS */}
      <motion.div
        className="absolute -top-60 -left-60 w-[520px] h-[520px] bg-blue-500/5 rounded-full blur-[150px]"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-60 -right-60 w-[520px] h-[520px] bg-purple-500/5 rounded-full blur-[150px]"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <h1 className="text-4xl font-bold animate-wave">Welcome Onboard👋</h1>
          <p className="text-gray-400 mt-2">
            Your personal skill-development dashboard
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <Stat title="Access" value={profile?.paymentStatus === "paid" ? "Active" : "Locked"} />
          <Stat title="Notifications" value={unreadCount.toString()} />
          <Stat title="Courses" value="12+" />
          <Stat title="Progress" value="Coming Soon" />
        </div>

        {/* ACTION CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Courses" icon="📚" path="/dashboard/courses" />
          <Card title="Recorded Sessions" icon="🎥" path="/dashboard/recorded" />
          <Card title="PDFs & Notes" icon="📄" path="/dashboard/pdfs" />
        </div>

        {/* ✅ MOVED INSIDE RETURN */}
        {nextSession && (

          <motion.div className="rounded-2xl bg-white/10 p-6">

            <h3 className="text-xl font-semibold">
              Next Live Session
            </h3>

            <p className="text-gray-400">
              {nextSession.title}
            </p>

            <p className="text-sm">
              {nextSession.date} • {nextSession.time}
            </p>

            <a
              href={nextSession.meetingLink}
              className="text-blue-400"
            >
              Join Session
            </a>

          </motion.div>

        )}

      </div>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </motion.div>
  );
}

function Card({ title, icon, path }: any) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ rotateX: 6, rotateY: -6 }}
      onClick={() => {
        clickSound?.play();
        router.push(path);
      }}
      className="cursor-glow bg-white/10 backdrop-blur-xl p-6 rounded-2xl cursor-pointer transition"
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </motion.div>
  );
}