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
      description: "Develop discipline, focus and winning mindset.",
      isPremium: false,
    },
  ];

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-2 pb-12 text-white space-y-12">

      <PageHeader
        title="Trending Lessons"
        subtitle="Watch top learning sessions curated for you."
        icon="🔥"
      />

      {/* TRENDING */}
      <div className="mt-12 overflow-hidden">
        <motion.div
          animate={!paused ? { x: ["0%", "-50%"] } : {}}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex gap-8 w-max"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...videos, ...videos].map((video, i) => (
            <TiltCard
              key={i}
              video={video}
              onPlay={() => setActiveVideo(video.url)}
              isPaidUser={isPaidUser}   // ✅ FIXED
            />
          ))}
        </motion.div>
      </div>

      {/* AI SECTION */}
      <div className="mt-20">
        <h2 className="text-xl font-semibold mb-6">🤖 AI Recommended For You</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
                isPaidUser={isPaidUser}   // ✅ FIXED
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setActiveVideo(null)}
            />

            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative w-[95%] md:w-[75%] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-sm"
              >
                ✕
              </button>

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
  );
}

/* 🔥 PREMIUM CARD WITH LOCK */
function TiltCard({ video, onPlay, isPaidUser }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

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
      whileHover={{ scale: 1.05 }}
      className="group w-[280px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl cursor-pointer flex flex-col"
    >
      {/* THUMBNAIL */}
      <div className="relative h-[180px] overflow-hidden">

        <img
          src={thumbnail}
          className={`w-full h-full object-cover transition duration-500 ${
            isLocked ? "blur-sm brightness-50" : "group-hover:scale-110"
          }`}
        />

        {/* LOCK OVERLAY */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-sm">Premium</p>
          </div>
        )}

        {/* PLAY BUTTON */}
        {!isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              onClick={handleClick}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-2xl"
            >
              ▶
            </div>
          </div>
        )}

        <div className="absolute bottom-2 right-2 text-xs bg-black/80 px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{video.title}</h3>

        <p className="text-sm text-gray-400 line-clamp-2 mt-1">
          {video.description}
        </p>

        <div className="mt-auto pt-3">
          <button
            onClick={handleClick}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
              isLocked
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500"
            }`}
          >
            {isLocked ? "🔒 Premium" : "▶ Watch Now"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}