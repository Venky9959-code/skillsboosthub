"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { updateDoc } from "firebase/firestore"
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
  role: "admin" | "user" | null; // ✅ ADDED
  notifications: NotificationItem[];
  unreadCount: number;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  role: null, // ✅ ADDED
  notifications: [],
  unreadCount: 0,
  loading: true,
});

const updateLearningStreak = async () => {
  if(!user) return

  const today = new Date().toDateString()

  if(profile?.lastLearningDate !== today){

    const newStreak =
      profile?.lastLearningDate === new Date(Date.now()-86400000).toDateString()
      ? profile.streakCount + 1
      : 1

    await updateDoc(doc(db,"users",user.uid),{
      streakCount:newStreak,
      lastLearningDate:today
    })
  }
}

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

            if (settings.sound && unread > 0) {
              const audio = new Audio("/notification.mp3");
              audio.play().catch(() => {});
            }
          });

          try {
            await fetch("/api/login-alert", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: firebaseUser.uid,
                email: firebaseUser.email,
              }),
            });
          } catch (err) {
            console.error("Login email failed:", err);
          }
        }

        else {
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

          try {
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
          } catch (err) {
            console.error("Welcome notification failed:", err);
          }

          try {
            await fetch("/api/send-welcome-mail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: firebaseUser.email,
                name: firebaseUser.displayName || "Student",
              }),
            });
          } catch (err) {
            console.error("Welcome email failed:", err);
          }
        }
      }

      else {
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
        role: profile?.role || null, // ✅ ADDED
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