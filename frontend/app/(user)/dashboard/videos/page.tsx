"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

export default function VideosPage() {
  const videos = [
    {
      title: "Soft Skills Basics",
      url: "https://www.youtube.com/embed/Tiy2LONr050",
      duration: "12:45",
      description: "Build confidence and master communication fundamentals.",
    },
    {
      title: "Communication Skills Basics",
      url: "https://www.youtube.com/embed/u16EPwFmdis",
      duration: "18:20",
      description: "Improve clarity, tone and impactful speaking.",
    },
    {
      title: "Leadership & Management Basics",
      url: "https://www.youtube.com/embed/mhkLc0HEtR0",
      duration: "22:10",
      description: "Learn how to lead teams and inspire growth.",
    },
    {
      title: "Personal Growth & Mindset",
      url: "https://www.youtube.com/embed/KUWn_TJTrnU",
      duration: "15:35",
      description: "Develop discipline, focus and winning mindset.",
    },
  ];

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative max-w-7xl mx-auto  px-6 md:px-10 pt-2 pb-12 text-white space-y-12">

      <PageHeader
        title="Trending Lessons"
        subtitle="Watch top learning sessions curated for you."
        icon="🔥"
      />

      {/* TRENDING AUTO-SCROLL */}
      <div className="mt-12 overflow-hidden">
        <motion.div
          animate={!paused ? { x: ["0%", "-50%"] } : {}}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
          className="flex gap-8 w-max"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...videos, ...videos].map((video, i) => (
            <TiltCard
              key={i}
              video={video}
              onPlay={() => setActiveVideo(video.url)}
            />
          ))}
        </motion.div>
      </div>

      {/* AI RECOMMENDED ROW */}
      <div className="mt-20">
        <h2 className="text-xl font-semibold mb-6">🤖 AI Recommended For You</h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
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
              transition={{ duration: 0.5 }}
            >
              <TiltCard
                video={video}
                onPlay={() => setActiveVideo(video.url)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
              onClick={() => setActiveVideo(null)}
            />

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative w-[90%] md:w-[70%] aspect-video bg-black rounded-2xl overflow-hidden z-50"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-lg text-sm"
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

/* 3D TILT CARD */
function TiltCard({ video, onPlay }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  function handleMouseMove(e: any) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08 }}
      className="w-[280px] h-[360px] bg-[#111827] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
    >
      <div className="relative h-[200px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
        <div className="text-4xl">▶</div>

        <div className="absolute bottom-2 right-2 text-xs bg-black/80 px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{video.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-3">
          {video.description}
        </p>

        <button
          onClick={onPlay}
          className="mt-3 bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold"
        >
          ▶ Play
        </button>
      </div>
    </motion.div>
  );
}