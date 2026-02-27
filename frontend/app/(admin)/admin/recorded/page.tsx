"use client";

import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminRecordedRequests() {
  const { profile } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snap = await getDocs(collection(db, "recordedRequests"));
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  if (profile?.role !== "admin") {
    return <p className="text-red-400">Access Denied</p>;
  }

  const updateStatus = async (
    req: any,
    status: "approved" | "rejected"
  ) => {
    await updateDoc(doc(db, "recordedRequests", req.id), {
      status,
      recordingUrl:
        status === "approved"
          ? "https://your-recording-link.com"
          : "",
    });

    if (status === "approved") {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "recorded_approved",
          userId: req.userId,
          email: req.email,
          title: "Recorded Session Approved 🎥",
          message:
            "Your request has been approved. You can now watch the recorded session.",
        }),
      });
    }

    alert("Updated");
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Recorded Session Requests
      </h1>

      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r.id} className="bg-white/10 p-4 rounded-xl">
            <p><strong>Name:</strong> {r.name}</p>
            <p><strong>Email:</strong> {r.email}</p>
            <p><strong>Reason:</strong> {r.reason}</p>
            <p><strong>Status:</strong> {r.status}</p>

            {r.status === "pending" && (
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => updateStatus(r, "approved")}
                  className="bg-green-600 px-4 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(r, "rejected")}
                  className="bg-red-600 px-4 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
