"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function NotificationsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [user]);

  const markRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), { read: true });
  };

  return (
    <div className="text-white max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      {items.map(n => (
        <div
          key={n.id}
          onClick={() => markRead(n.id)}
          className={`p-4 rounded-lg mb-3 cursor-pointer border ${
            n.read ? "bg-white/5" : "bg-blue-900/40 border-blue-500"
          }`}
        >
          <h3 className="font-semibold">{n.title}</h3>
          <p className="text-gray-300 text-sm">{n.message}</p>
        </div>
      ))}
    </div>
  );
}
