"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function NotificationToast({ notification, onClose }: any) {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-50 bg-[#0B1224] border border-blue-500/40 backdrop-blur-xl text-white px-6 py-4 rounded-xl shadow-2xl"
        >
          <div className="flex justify-between gap-6">
            <div>
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-sm text-gray-400">
                {notification.message}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}