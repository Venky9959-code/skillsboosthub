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
  const [loadingRequest, setLoadingRequest] = useState(true);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const isPaid = profile?.paymentStatus === "paid";

  /* 🔁 FETCH EXISTING REQUEST */
  useEffect(() => {
    if (!user) return;

    const fetchRequest = async () => {
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

      setLoadingRequest(false);
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

  if (loading || loadingRequest) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading recorded sessions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1220] to-[#020617] text-white p-6 md:p-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Recorded Classes 🎥
        </h1>
        <p className="text-gray-400 mt-2">
          Watch sessions you missed — responsibly & meaningfully
        </p>
      </motion.div>

      {/* LOCKED INFO */}
      {!isPaid && (
        <div className="bg-yellow-400 text-black p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <p className="font-semibold mb-4 md:mb-0">
            🔒 Recorded sessions are available only after unlocking the course
          </p>
          <button
            onClick={() => router.push("/dashboard/payment")}
            className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Unlock Now
          </button>
        </div>
      )}

      {/* VIDEOS GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {recordedVideos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg ${
              requestStatus !== "approved" ? "opacity-50 blur-[1px]" : ""
            }`}
          >
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
              ></iframe>
            ) : (
              <div className="h-56 flex items-center justify-center bg-black/40 rounded-xl">
                <span className="text-lg font-semibold">
                  🔒 Awaiting Approval
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* REQUEST SECTION */}
      {isPaid && (
        <>
          <div className="mt-16 border-t border-white/10 pt-10"></div>

          <h2 className="text-2xl font-bold mb-2">
            Missed a Live Session?
          </h2>
          <p className="text-gray-400 mb-6">
            Tell us the reason. Access is provided responsibly.
          </p>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 max-w-xl">
            {!submitted ? (
              <>
                <textarea
                  placeholder="Explain why you missed the session..."
                  className="w-full p-4 h-32 rounded-lg bg-white/20 outline-none text-gray-200 focus:ring-2 focus:ring-blue-500 transition"
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>

                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Request
                </button>
              </>
            ) : (
              <>
                {requestStatus === "pending" && (
                  <p className="text-yellow-400 text-lg font-medium">
                    ⏳ Request submitted. Awaiting admin approval.
                  </p>
                )}
                {requestStatus === "approved" && (
                  <p className="text-green-400 text-lg font-medium">
                    ✅ Request approved. You can now watch recordings.
                  </p>
                )}
                {requestStatus === "rejected" && (
                  <p className="text-red-400 text-lg font-medium">
                    ❌ Request rejected. Please contact support.
                  </p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
