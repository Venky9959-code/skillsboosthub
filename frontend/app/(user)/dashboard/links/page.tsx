"use client";

import { motion } from "framer-motion";

export default function UsefulLinksPage() {
  const usefulLinks = [
    { title: "Learn English Grammar", link: "https://www.englishgrammar.org" },
    { title: "W3Schools Programming", link: "https://www.w3schools.com" },
    { title: "Study Abroad Guide", link: "https://leapscholar.com" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Useful Links</h1>
      <p className="text-gray-400 mt-1">Access important websites</p>

      <ul className="mt-8 space-y-4">
        {usefulLinks.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#141B30] p-4 rounded-lg border border-white/10 hover:bg-white/5 transition"
          >
            <a href={item.link} target="_blank" className="text-blue-400 underline">
              {item.title}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
