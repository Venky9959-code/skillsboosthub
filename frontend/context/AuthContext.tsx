"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: any;
};

type UserProfile = {
  role: "admin" | "user";
  paymentStatus: "paid" | "unpaid";
  notificationSettings?: {
    inApp: boolean;
    email: boolean;
    sound: boolean;
  };
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  notifications: [],
  unreadCount: 0,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeNotifications: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          const paymentStatus =
            data.paymentStatus === "paid" || data.paid === true
              ? "paid"
              : "unpaid";

          const settings = data.notificationSettings ?? {
            inApp: true,
            email: true,
            sound: true,
          };

          setProfile({
            role: data.role || "user",
            paymentStatus,
            notificationSettings: settings,
          });

          // 🔔 REAL-TIME NOTIFICATION LISTENER (MISSING PART)
          const q = query(
            collection(db, "notifications"),
            where("userId", "==", firebaseUser.uid),
            orderBy("createdAt", "desc")
          );

          unsubscribeNotifications = onSnapshot(q, (snap) => {
            const list: NotificationItem[] = [];
            let unread = 0;

            snap.forEach((doc) => {
              const n = { id: doc.id, ...doc.data() } as NotificationItem;
              list.push(n);
              if (!n.read) unread++;
            });

            setNotifications(list);
            setUnreadCount(unread);

            // 🔊 PLAY SOUND FOR NEW NOTIFICATION
            if (settings.sound && unread > 0) {
              const audio = new Audio("/notification.mp3");
              audio.play().catch(() => {});
            }
          });
        } else {
          // 👤 CREATE USER PROFILE
          const newProfile: UserProfile = {
            role: "user",
            paymentStatus: "unpaid",
            notificationSettings: {
              inApp: true,
              email: true,
              sound: true,
            },
          };

          await setDoc(ref, {
            role: "user",
            paid: false,
            email: firebaseUser.email,
            createdAt: new Date(),
            notificationSettings: newProfile.notificationSettings,
          });

          setProfile(newProfile);

          // 📩 WELCOME NOTIFICATION
          await fetch("/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "register",
              userId: firebaseUser.uid,
              email: firebaseUser.email,
              title: "Welcome to SkillsBoostHub 🎉",
              message:
                "Your account has been created successfully. Complete payment to unlock lifetime access.",
            }),
          });
        }
      } else {
        setProfile(null);
        setNotifications([]);
        setUnreadCount(0);
      }

      setLoading(false);
    });

    return () => {
      unsubAuth();
      if (unsubscribeNotifications) unsubscribeNotifications();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        notifications,
        unreadCount,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
