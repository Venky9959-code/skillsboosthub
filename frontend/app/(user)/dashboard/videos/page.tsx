"use client";

import { useAuth } from "@/context/AuthContext";
import {
  motion,
 AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function VideosPage() {
  const { profile } = useAuth();
  const isPaidUser = profile?.paymentStatus === "paid";

  const videos = [
    {
      title: "Soft Skills Basics",
      url: "https://www.youtube.com/embed/Tiy2LONr050",
      duration: "12:45",
      description: "Build confidence...",
      isPremium: false,
    },
    {
      title: "Communication Skills Basics",
      url: "https://www.youtube.com/embed/u16EPwFmdis",
      duration: "18:20",
      description: "Improve clarity...",
      isPremium: true,
    },
    {
      title: "Leadership & Management Basics",
      url: "https://www.youtube.com/embed/mhkLc0HEtR0",
      duration: "22:10",
      description: "Learn leadership...",
      isPremium: true,
    },
    {
      title: "Personal Growth & Mindset",
      url: "https://www.youtube.com/embed/KUWn_TJTrnU",
      duration: "15:35",
      description:
        "Develop discipline, focus and winning mindset.",
      isPremium: false,
    },
  ];

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        {/* Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#081229] to-[#020617]" />

        {/* Glow Effects */}
        <div className="absolute top-[-200px] left-[-120px] w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full" />

        <div className="absolute bottom-[-200px] right-[-120px] w-[500px] h-[500px] bg-purple-500/20 blur-[160px] rounded-full" />

        {/* Premium Grid */}
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* PAGE CONTAINER */}
      <div className="relative z-10 w-full px-6 md:px-12 xl:px-16 pt-10 pb-24">

        {/* HEADER */}
        <div className="mb-12">
          <PageHeader
            title="Trending Lessons"
            subtitle="Watch top learning sessions curated for you."
            icon="🔥"
          />
        </div>

        {/* TRENDING SECTION */}
        <div className="relative overflow-hidden pb-10">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none" />

          <motion.div
            animate={!paused ? { x: [0, -1320] } : {}}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: "linear",
            }}
            className="flex gap-10 w-max px-16 py-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {[...videos, ...videos].map((video, i) => (
              <TiltCard
                key={i}
                video={video}
                onPlay={() => setActiveVideo(video.url)}
                isPaidUser={isPaidUser}
              />
            ))}
          </motion.div>
        </div>

        {/* AI SECTION */}
        <div className="mt-24">

          {/* SECTION HEADER */}
          <div className="flex items-center gap-4 mb-12">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(59,130,246,0.4)]">
              🤖
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-300 to-purple-400 bg-clip-text text-transparent">
                AI Recommended For You
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Personalized lessons based on your interests
              </p>
            </div>
          </div>

          {/* GRID */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid sm:grid-cols-2 xl:grid-cols-4 gap-10"
          >
            {videos.map((video, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <TiltCard
                  video={video}
                  onPlay={() => setActiveVideo(video.url)}
                  isPaidUser={isPaidUser}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* VIDEO MODAL */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              {/* BACKDROP */}
              <div
                className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                onClick={() => setActiveVideo(null)}
              />

              {/* MODAL */}
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(59,130,246,0.35)]"
              >

                {/* CLOSE */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm backdrop-blur-lg transition"
                >
                  ✕
                </button>

                {/* VIDEO */}
                <iframe
                  src={`${activeVideo}?autoplay=1`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* PREMIUM VIDEO CARD */
function TiltCard({ video, onPlay, isPaidUser }: any) {

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const isLocked = video.isPremium && !isPaidUser;

  const videoId = video.url.split("/embed/")[1];
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  function handleClick() {
    if (isLocked) {
      alert("🔒 This is a premium video. Please upgrade.");
      return;
    }

    onPlay();
  }

  return (
    <motion.div
      style={{ rotateX, rotateY }}

      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}

      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}

      whileHover={{
        scale: 1.04,
        y: -6,
      }}

      className="
        group relative
        w-[320px]
        bg-white/[0.03]
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        overflow-visible
        shadow-[0_8px_40px_rgba(0,0,0,0.25)]
        hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]
        transition duration-500
        flex flex-col
      "
    >

      {/* Glow Border */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />

      {/* THUMBNAIL */}
      <div className="relative h-[190px] rounded-t-3xl overflow-hidden">

        <img
          src={thumbnail}
          className={`w-full h-full object-cover transition duration-700 ${
            isLocked
              ? "blur-sm brightness-50"
              : "group-hover:scale-110"
          }`}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* LOCK */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

            <div className="text-5xl mb-3">
              🔒
            </div>

            <p className="text-sm font-medium tracking-wide">
              Premium Content
            </p>
          </div>
        )}

        {/* PLAY BUTTON */}
        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">

            <div
              onClick={handleClick}
              className="
                w-16 h-16
                rounded-full
                bg-white/20
                backdrop-blur-xl
                border border-white/20
                flex items-center justify-center
                text-2xl
                hover:scale-110
                transition duration-300
                shadow-[0_0_40px_rgba(255,255,255,0.25)]
              "
            >
              ▶
            </div>
          </div>
        )}

        {/* DURATION */}
        <div className="absolute bottom-3 right-3 text-xs bg-black/70 backdrop-blur-lg px-3 py-1 rounded-full border border-white/10">
          {video.duration}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">

        <h3 className="font-bold text-xl leading-snug">
          {video.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-2 mt-3 leading-relaxed">
          {video.description}
        </p>

        <div className="mt-auto pt-6">

          <button
            onClick={handleClick}
            className={`w-full py-3 rounded-2xl text-sm font-semibold transition duration-300 ${
              isLocked
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:opacity-90 shadow-lg"
            }`}
          >
            {isLocked
              ? "🔒 Premium Access"
              : "▶ Watch Now"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}