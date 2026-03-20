"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfilePage() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
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
      }
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  /* ---------------- PHOTO UPLOAD (FIXED CLEAN) ---------------- */
  const handlePhotoUpload = async (file: File) => {
    if (!user) return;

    try {
      setUploading(true);

      const photoRef = ref(
        storage,
        `profile-photos/${user.uid}-${Date.now()}`
      );

      await uploadBytes(photoRef, file);
      const url = await getDownloadURL(photoRef);

      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        photo: url,
        updatedAt: new Date(),
      });

      // Update state
      setProfile((prev: any) => ({
        ...prev,
        photo: url,
      }));

    } catch (err) {
      console.error(err);
      alert("Photo upload failed");
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    if (!user || !profile) return;

    setSaving(true);

    await updateDoc(doc(db, "users", user.uid), {
      name: profile.name,
      phone: profile.phone,
      photo: profile.photo,
      updatedAt: new Date(),
    });

    setSaving(false);
    setSavedMsg("Profile updated");
  };

  if (!user) return null;
  if (loading || !profile)
    return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  const isPaid = profile.paymentStatus === "paid";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-2">
      <div className="w-full max-w-md bg-[#1A1A1A] rounded-xl p-10 shadow-lg">

        {/* PROFILE PHOTO */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              key={profile.photo || "default"}
              src={
                profile.photo
                  ? profile.photo + "?t=" + Date.now()
                  : "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile.name || "User")
              }
              className="w-24 h-24 rounded-full object-cover border border-white/20"
            />

            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full text-xs">
                Uploading...
              </div>
            )}
          </div>

          <label className="mt-3 text-sm text-orange-400 cursor-pointer hover:underline">
            Change Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                e.target.files && handlePhotoUpload(e.target.files[0])
              }
            />
          </label>

          <h2 className="mt-4 text-lg font-semibold">
            {profile.name}
          </h2>

          <p className="text-gray-400 text-sm">
            {profile.email}
          </p>

          <span
            className={`mt-2 text-xs px-3 py-1 rounded-full ${
              isPaid
                ? "bg-orange-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {isPaid ? "Premium Member" : "Basic User"}
          </span>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            placeholder="Full Name"
            className={inputStyle}
          />

          <input
            value={profile.email}
            readOnly
            className={`${inputStyle} opacity-60`}
          />

          <input
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
            placeholder="Phone Number"
            className={inputStyle}
          />
        </div>

        {savedMsg && (
          <p className="text-green-400 text-sm mt-4 text-center">
            {savedMsg}
          </p>
        )}

        <button
          onClick={saveProfile}
          disabled={saving || uploading}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg font-medium transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}

const inputStyle =
  "w-full bg-[#2A2A2A] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition";