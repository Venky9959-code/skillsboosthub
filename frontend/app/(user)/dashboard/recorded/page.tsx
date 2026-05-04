"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

export default function RecordedClassesPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [requestStatus, setRequestStatus] = useState<
    "pending" | "approved" | "rejected" | null
  >(null);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const isPaid = profile?.paymentStatus === "paid";

  /* 🔁 FETCH EXISTING REQUEST (SAFE VERSION) */
  useEffect(() => {
    if (!user) return;

    const fetchRequest = async () => {
      try {
        const q = query(
          collection(db, "recordedRequests"),
          where("uid", "==", user.uid)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          const data = snap.docs[0].data();
          setRequestStatus(data.status);
          setSubmitted(true);
        }
      } catch (error) {
        console.error("Error fetching recorded request:", error);
      }
    };

    fetchRequest();
  }, [user]);

  const recordedVideos = [
    {
      title: "Soft Skills – Introduction",
      url: "https://www.youtube.com/embed/7-4Zq8I0sLs",
      date: "10 Jan 2025",
    },
    {
      title: "Communication Skills – Module 1",
      url: "https://www.youtube.com/embed/q5W8ELP3Lz8",
      date: "12 Jan 2025",
    },
  ];

  /* 📨 SUBMIT REQUEST */
  const handleSubmit = async () => {
    if (!reason.trim() || !user) return;

    await addDoc(collection(db, "recordedRequests"), {
      uid: user.uid,
      name: profile?.name || "Student",
      email: user.email,
      reason,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    setSubmitted(true);
    setRequestStatus("pending");
  };

  /* ✅ ONLY WAIT FOR AUTH LOADING */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading recorded sessions...
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto  px-6 md:px-10 pt-2 pb-12 text-white space-y-12">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold">
          Recorded Classes 🎥
        </h1>
        <p className="text-gray-400 mt-2">
          Access missed sessions with approval
        </p>
      </motion.div>

      {/* LOCKED BANNER */}
      {!isPaid && (
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 mb-12">
          <div className="bg-[#0B1224] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between">
            <p className="font-semibold mb-4 md:mb-0">
              🔒 Recorded sessions require premium access
            </p>
            <button
              onClick={() => router.push("/dashboard/payment")}
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
              Unlock Now
            </button>
          </div>
        </div>
      )}

      {/* VIDEO GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {recordedVideos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="p-[1px] rounded-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                <h3 className="text-xl font-semibold mb-1">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Uploaded on {video.date}
                </p>

                {requestStatus === "approved" ? (
                  <iframe
                    src={video.url}
                    className="w-full h-56 rounded-xl"
                    allowFullScreen
                  />
                ) : (
                  <div className="relative h-56 flex items-center justify-center bg-black/40 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 backdrop-blur-md bg-black/40"></div>
                    <span className="relative z-10 text-lg font-semibold">
                      🔒 Awaiting Approval
                    </span>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* REQUEST SECTION */}
      {isPaid && (
        <>
          <div className="mt-20 border-t border-white/10 pt-12"></div>

          <h2 className="text-3xl font-bold mb-3">
            Missed a Live Session?
          </h2>
          <p className="text-gray-400 mb-8">
            Submit your reason to request recording access.
          </p>

          <div className="max-w-2xl p-[1px] rounded-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30">
            <div className="bg-[#0B1224] backdrop-blur-xl border border-white/10 rounded-3xl p-8">

              {!submitted ? (
                <>
                  <textarea
                    placeholder="Explain why you missed the session..."
                    className="w-full p-4 h-32 rounded-xl bg-white/10 outline-none text-gray-200 focus:ring-2 focus:ring-blue-500 transition"
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>

                  <button
                    onClick={handleSubmit}
                    className="mt-6 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
                  >
                    Submit Request
                  </button>
                </>
              ) : (
                <div className="text-lg font-medium">
                  {requestStatus === "pending" && (
                    <p className="text-yellow-400">
                      ⏳ Request submitted. Awaiting approval.
                    </p>
                  )}
                  {requestStatus === "approved" && (
                    <p className="text-green-400">
                      ✅ Request approved. You can now watch recordings.
                    </p>
                  )}
                  {requestStatus === "rejected" && (
                    <p className="text-red-400">
                      ❌ Request rejected. Please contact support.
                    </p>
                  )}
                </div>
              )}

            </div>
          </div>
        </>
      )}
    </div>
  );
}