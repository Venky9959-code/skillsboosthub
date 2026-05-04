"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth(); // ✅ FIX

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // 🔥 WAIT FOR AUTH FIRST (CRITICAL FIX)
  useEffect(() => {
    if (authLoading) return;
    if (!user?.uid) return;

    const loadProfile = async () => {
      try {
        console.log("🔍 Fetching profile for UID:", user.uid);

        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          const d = snap.data();
          setProfile({
            name: d.name || "",
            email: d.email || user.email,
            phone: d.phone || "",
            photo: d.photo || "",
            paymentStatus: d.paymentStatus || "unpaid",
          });
        } else {
          // create empty profile
          setProfile({
            name: "",
            email: user.email,
            phone: "",
            photo: "",
            paymentStatus: "unpaid",
          });
        }

      } catch (err) {
        console.error("❌ Firestore load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, authLoading]); // ✅ FIX

  // 🔥 PHOTO UPLOAD
  const handlePhotoUpload = async (file: File) => {
    if (!user?.uid) return;

    try {
      setUploading(true);

      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);

      const storageRef = ref(
        storage,
        `profile/${user.uid}-${Date.now()}`
      );

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      console.log("✅ Uploaded URL:", url);

      await setDoc(
        doc(db, "users", user.uid),
        { photo: url },
        { merge: true }
      );

      setProfile((prev: any) => ({
        ...prev,
        photo: url,
      }));

    } catch (err) {
      console.error("❌ Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // 🔥 SAVE PROFILE
  const saveProfile = async () => {
    if (!user?.uid) {
      console.log("❌ No UID");
      return;
    }

    try {
      setSaving(true);

      console.log("💾 Saving:", profile);

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: profile.name || "",
          phone: profile.phone || "",
          email: user.email || "",
          photo: profile.photo || "",
          paymentStatus: profile.paymentStatus || "unpaid",
          updatedAt: new Date(),
        },
        { merge: true }
      );

      console.log("✅ Saved successfully");

      setEditMode(false);
    } catch (err) {
      console.error("❌ Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  // 🔥 WAIT FOR AUTH (CRITICAL UI FIX)
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Checking authentication...
      </div>
    );
  }

  if (!user) return null;

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  const isPaid = profile.paymentStatus === "paid";

  const completion =
    [profile.name, profile.email, profile.phone, profile.photo].filter(Boolean)
      .length * 25;

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 px-4 text-white">

      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-44 rounded-2xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#2563eb] relative"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 z-20">
            <div className="relative w-36 h-36 rounded-full border-[6px] border-[#0B1224] overflow-hidden shadow-[0_0_60px_rgba(124,58,237,0.9)]">
              <img
                src={
                  preview ||
                  profile.photo ||
                  `https://ui-avatars.com/api/?name=${profile.name}`
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* CARD */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl pt-28 pb-8 px-6 text-center space-y-5"
        >

          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-400 text-sm">{profile.email}</p>
          <p className="text-gray-400 text-sm">{profile.phone || "No phone added"}</p>

          <span className={`text-xs px-4 py-1 rounded-full ${
            isPaid ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
          }`}>
            {isPaid ? "Premium Account" : "Trial Account"}
          </span>

          <div>
            <p className="text-xs text-gray-400 mb-1">
              Profile Completion {completion}%
            </p>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          {/* PHOTO BUTTON */}
          <div>
            <input
              type="file"
              id="photoUpload"
              hidden
              onChange={(e) =>
                e.target.files && handlePhotoUpload(e.target.files[0])
              }
            />
            <button
              onClick={() => document.getElementById("photoUpload")?.click()}
              className="px-4 py-1 text-sm bg-purple-600 rounded-full"
            >
              Update Profile Photo
            </button>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="text-sm text-blue-400"
          >
            {editMode ? "Cancel Edit" : "Edit Profile"}
          </button>

          <div className="space-y-3 text-left">
            <Field label="Full Name">
              <input
                disabled={!editMode}
                value={profile?.name || ""}
                onChange={(e) =>
                  setProfile((prev: any) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className={inputStyle}
              />
            </Field>

            <Field label="Mobile Number">
              <input
                disabled={!editMode}
                value={profile?.phone || ""}
                onChange={(e) =>
                  setProfile((prev: any) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className={inputStyle}
              />
            </Field>
          </div>

          {editMode && (
            <button
              onClick={saveProfile}
              className="w-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#2563eb] py-2 rounded-full"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}

        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <div>
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      {children}
    </div>
  );
}

const inputStyle =
  "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50";