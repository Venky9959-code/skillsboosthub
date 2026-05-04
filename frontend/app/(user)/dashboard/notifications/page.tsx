"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext";
import NotificationToast from "@/components/NotificationToast";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loadingData, setLoadingData] = useState(true);
  const [toast, setToast] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  /* 🔔 Ask Notification Permission Once */
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  /* 🔔 REAL-TIME LISTENER */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      data.sort(
        (a: any, b: any) =>
          (b.createdAt?.seconds || 0) -
          (a.createdAt?.seconds || 0)
      );

      setNotifications(data);
      setLoadingData(false);

      // Detect newest unread
      const newestUnread = data.find((n: any) => !n.read) as any;

      if (newestUnread) {
        // Toast
        setToast(newestUnread);
        setTimeout(() => setToast(null), 4000);

        // Sound
        if (audioRef.current) {
          audioRef.current.play().catch(() => {});
        }

        // Browser Push
        if (
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification(newestUnread.title, {
            body: newestUnread.message,
            icon: "/logo.png",
          });
        }

        // Mark only this one as read (prevent loop)
        await updateDoc(
          doc(db, "notifications", newestUnread.id),
          { read: true }
        );
      }
    });

    return () => unsubscribe();
  }, [user]);

  const deleteNotification = async (id: string) => {
    await deleteDoc(doc(db, "notifications", id));
  };

  const markAllAsRead = async () => {
    for (const n of notifications) {
      if (!n.read) {
        await updateDoc(doc(db, "notifications", n.id), {
          read: true,
        });
      }
    }
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => !n.read);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading notifications...
      </div>
    );
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500/40 bg-green-500/10";
      case "warning":
        return "border-yellow-500/40 bg-yellow-500/10";
      default:
        return "border-blue-500/40 bg-blue-500/10";
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto  px-6 md:px-10 pt-2 pb-12 text-white space-y-12">

      {/* 🔊 SOUND */}
      <audio ref={audioRef} src="/notification.mp3" preload="auto" />

      {/* 🔥 TOAST */}
      <NotificationToast
        notification={toast}
        onClose={() => setToast(null)}
      />

      {/* HEADER */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Notifications 🔔</h1>
          <p className="text-gray-400 mt-2">
            Stay updated with announcements
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-400 hover:text-white"
          >
            Mark all as read
          </button>

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === "all"
                ? "bg-blue-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === "unread"
                ? "bg-blue-600"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* EMPTY */}
      {filteredNotifications.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-xl mb-2">No notifications</p>
          <p className="text-sm">You're all caught up 🎉</p>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-6">
        {filteredNotifications.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border rounded-2xl p-6 backdrop-blur-xl ${getTypeStyle(
              item.type || "info"
            )}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <button
                onClick={() => deleteNotification(item.id)}
                className="text-xs text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>

            <p className="text-gray-300 text-sm mb-3">
              {item.message}
            </p>

            <span className="text-xs text-gray-400">
              {item.createdAt?.seconds
                ? new Date(
                    item.createdAt.seconds * 1000
                  ).toLocaleString()
                : ""}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}