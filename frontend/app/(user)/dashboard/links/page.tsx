"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaWhatsapp, FaTelegramPlane, FaGlobe } from "react-icons/fa";

const linkCategories = [
  {
    title: "Community",
    items: [
      {
        name: "Join WhatsApp Community",
        url: "https://chat.whatsapp.com/",
        icon: "whatsapp",
        badge: "Popular",
      },
      {
        name: "Telegram Updates Channel",
        url: "https://t.me/",
        icon: "telegram",
        badge: "New",
      },
    ],
  },
  {
    title: "Career Resources",
    items: [
      {
        name: "Interview Preparation Guide",
        url: "https://example.com",
        icon: "web",
      },
      {
        name: "Resume Building Template",
        url: "https://example.com",
        icon: "web",
        badge: "Popular",
      },
    ],
  },
];

export default function LinksPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "whatsapp":
        return <FaWhatsapp className="text-green-400 text-xl" />;
      case "telegram":
        return <FaTelegramPlane className="text-blue-400 text-xl" />;
      default:
        return <FaGlobe className="text-purple-400 text-xl" />;
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto  px-6 md:px-10 pt-2 pb-12 text-white space-y-12">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        
        <h1 className="text-4xl font-bold">Useful Links 🔗</h1>
        <p className="text-gray-400 mt-2">
          Important communities, tools & resources
        </p>
      </motion.div>

     <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-2 pb-12 text-white space-y-12">
        {linkCategories.map((category, index) => (
          <div key={index}>

            <h2 className="text-2xl font-semibold mb-6 text-blue-400">
              {category.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {category.items.map((link, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>

                  <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 group-hover:border-white/20">

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getIcon(link.icon)}
                        <h3 className="text-lg font-semibold">
                          {link.name}
                        </h3>
                      </div>

                      {link.badge && (
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            link.badge === "Popular"
                              ? "bg-yellow-400 text-black"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 text-sm mt-4">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-white transition"
                      >
                        Visit →
                      </a>

                      <button
                        onClick={() => copyToClipboard(link.url)}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {copied === link.url ? "Copied!" : "Copy Link"}
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}