"use client";

import { motion } from "framer-motion";

export default function VideosPage() {
  const videos = [
   {title: " Soft Skills Basics ", url: "https://www.youtube.com/embed/Tiy2LONr050"},
    { title: "Communication Skills Basics", url: "https://www.youtube.com/embed/u16EPwFmdis" },
  {title :"Leadership & Management Basics ", url :"https://www.youtube.com/embed/mhkLc0HEtR0"}, 
  {title :"Personal Growth & Mindset", url: " https://www.youtube.com/embed/KUWn_TJTrnU"},
];

  return (
    <div>
      <h1 className="text-3xl font-bold">Video Lessons</h1>
      <p className="text-gray-400 mt-1">Watch your course videos</p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141B30] p-6 rounded-xl border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4">{video.title}</h3>
            <iframe
              src={video.url}
              className="w-full h-52 rounded-lg"
              allowFullScreen
            ></iframe>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
