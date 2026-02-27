"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const refDoc = doc(db, "users", user.uid);
      const snap = await getDoc(refDoc);

      if (snap.exists()) {
        const d = snap.data();
        setProfile({
          name: d.name || "",
          email: d.email || user.email,
          phone: d.phone || "",
          photo: d.photo || "",
          paymentStatus: d.paymentStatus || "unpaid",
          notificationSettings: {
            inApp: d.notificationSettings?.inApp ?? true,
            email: d.notificationSettings?.email ?? true,
            sound: d.notificationSettings?.sound ?? true,
          },
        });
      }
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  /* ---------------- PHOTO UPLOAD (FIXED) ---------------- */
  const handlePhotoUpload = async (file: File) => {
    if (!user) return;

    try {
      setUploading(true);
      setSavedMsg("");

      // 🔥 FIX 1: unique path to avoid cache issues
      const photoRef = ref(
        storage,
        `profile-photos/${user.uid}-${Date.now()}`
      );

      await uploadBytes(photoRef, file);
      const url = await getDownloadURL(photoRef);

      // 🔥 FIX 2: force re-render with new URL
      setProfile((prev: any) => ({
        ...prev,
        photo: url,
      }));
    } catch (err) {
      console.error(err);
      alert("❌ Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- SAVE PROFILE ---------------- */
  const saveProfile = async () => {
    if (!user || !profile) return;

    try {
      setSaving(true);
      setSavedMsg("");

      await updateDoc(doc(db, "users", user.uid), {
        name: profile.name,
        phone: profile.phone,
        photo: profile.photo,
        notificationSettings: profile.notificationSettings,
        updatedAt: new Date(),
      });

      setSavedMsg("✅ Profile saved successfully");
    } catch {
      alert("❌ Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;
  if (loading || !profile)
    return <p className="text-center mt-20 text-gray-400">Loading profile…</p>;

  const isPaid = profile.paymentStatus === "paid";

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex justify-center px-4 bg-gradient-to-br from-[#020617] to-[#0A1220] text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl mt-12"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <span
            className={`px-4 py-1 rounded-full text-sm ${
              isPaid
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {isPaid ? "🏆 Lifetime Member" : "🔒 Not Activated"}
          </span>
        </div>

        {/* AVATAR CENTERED */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative">
            <img
              key={profile.photo} // 🔥 FIX 3: force image refresh
              src={
                profile.photo ||
                "https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
              }
              className="w-24 h-24 rounded-full object-cover border border-white/20"
            />

            {uploading && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full text-sm">
                Uploading…
              </span>
            )}
          </div>

          <label className="mt-3 cursor-pointer">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                e.target.files && handlePhotoUpload(e.target.files[0])
              }
            />
            <span className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
              Change Photo
            </span>
          </label>
        </div>

        {/* FORM */}
        <Field label="Full Name">
          <input
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            className={inputStyle}
          />
        </Field>

        <Field label="Email">
          <input
            value={profile.email}
            readOnly
            className={`${inputStyle} bg-gray-800 opacity-70`}
          />
        </Field>

        <Field label="Phone Number">
          <input
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
            className={inputStyle}
          />
        </Field>

        {/* NOTIFICATIONS */}
        <div className="border-t border-white/10 pt-6 mt-6">
          <h3 className="font-semibold mb-4">Notification Settings</h3>

          {["inApp", "email", "sound"].map((k) => (
            <Toggle
              key={k}
              label={
                k === "inApp"
                  ? "In-App Notifications"
                  : k === "email"
                  ? "Email Notifications"
                  : "Notification Sound"
              }
              checked={profile.notificationSettings[k]}
              onChange={(v) =>
                setProfile({
                  ...profile,
                  notificationSettings: {
                    ...profile.notificationSettings,
                    [k]: v,
                  },
                })
              }
            />
          ))}
        </div>

        {savedMsg && (
          <p className="text-green-400 text-sm text-center mt-4">
            {savedMsg}
          </p>
        )}

        <motion.button
          onClick={saveProfile}
          disabled={saving || uploading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className={`w-full mt-6 py-3 rounded-xl font-semibold transition ${
            saving || uploading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function Field({ label, children }: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, checked, onChange }: any) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span className="text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition ${
          checked ? "bg-blue-500" : "bg-gray-600"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full transform transition ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

const inputStyle =
  "w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/40 transition-all text-white";
