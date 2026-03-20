"use client";

import { useState } from "react";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export default function BroadcastPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  const sendBroadcast = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));

    for (const userDoc of usersSnapshot.docs) {
      await addDoc(collection(db, "notifications"), {
        userId: userDoc.id,
        title,
        message,
        type,
        read: false,
        createdAt: serverTimestamp(),
      });
    }

    alert("Broadcast sent to all users");
  };

  return (
    <div className="min-h-screen p-10 text-white bg-[#020617]">
      <h1 className="text-3xl font-bold mb-6">
        Admin Broadcast Panel
      </h1>

      <input
        placeholder="Title"
        className="block w-full mb-4 p-3 bg-white/10 rounded-lg"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Message"
        className="block w-full mb-4 p-3 bg-white/10 rounded-lg"
        onChange={(e) => setMessage(e.target.value)}
      />

      <select
        className="mb-4 p-2 bg-white/10 rounded-lg"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
      </select>

      <button
        onClick={sendBroadcast}
        className="bg-blue-600 px-6 py-3 rounded-lg"
      >
        Send Broadcast
      </button>
    </div>
  );
}