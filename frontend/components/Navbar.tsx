"use client";

import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useTheme } from "next-themes";

import MagneticButton from "@/components/MagneticButton";
import CommandSearch from "@/components/CommandSearch";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase/firebaseConfig";

const navItems = [
  { label: "Home", href: "/dashboard/home", free: true },
  { label: "Courses", href: "/dashboard/courses", free: false },
  { label: "PDFs", href: "/dashboard/pdfs", free: false },
  { label: "Videos", href: "/dashboard/videos", free: false },
  { label: "Links", href: "/dashboard/links", free: true },
  { label: "Recorded", href: "/dashboard/recorded", free: false },
  { label: "Profile", href: "/dashboard/profile", free: true },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile } = useAuth();
  const { theme, setTheme } = useTheme();

  const isPaid = profile?.paymentStatus === "paid";

  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const avatarRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid),
      where("read", "==", false)
    );

    const unsub = onSnapshot(q, snap => {
      setUnreadCount(snap.docs.length);
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <>
      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      <motion.nav
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="
          fixed top-0 inset-x-0 z-50 h-16
          bg-[#0B1224]/60 backdrop-blur-2xl
          border-b border-white/10
          will-change-opacity
        "
      >
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/dashboard/home" className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="SkillsBoostHub" width={34} height={34} />
            <span className="text-lg font-bold group-hover:text-blue-400 transition">
              Skills<span className="text-blue-400">Boost</span>Hub
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => {
              const locked = !item.free && !isPaid;
              const active = pathname === item.href;

              return (
                <MagneticButton key={item.href}>
                  <Link
                    href={locked ? "#" : item.href}
                    className={`relative text-sm font-medium transition-colors ${
                      locked
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label} {locked && "🔒"}

                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute -bottom-2 left-0 right-0 h-[2px] bg-blue-400 rounded-full"
                      />
                    )}
                  </Link>
                </MagneticButton>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {mounted && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-lg"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/dashboard/notifications")}
              className="relative text-lg"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white px-1.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {/* AVATAR */}
            <div ref={avatarRef} className="relative">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setAvatarOpen(v => !v)}
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold"
              >
                {profile?.name?.[0] || "U"}
              </motion.button>

              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="
                      absolute right-0 mt-3 w-44
                      bg-[#0B1224]/95 backdrop-blur-xl
                      border border-white/10 rounded-xl overflow-hidden
                      shadow-2xl
                    "
                  >
                    <Link href="/dashboard/profile" className="block px-4 py-3 hover:bg-white/10">
                      Profile
                    </Link>

                    <Link href="/dashboard/home" className="block px-4 py-3 hover:bg-white/10">
                      Dashboard
                    </Link>

                    <MagneticButton>
                      <Link
                        href="/dashboard/payment"
                        className="block mx-4 my-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-center"
                      >
                        Unlock ₹198
                      </Link>
                    </MagneticButton>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MOBILE */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden text-xl"
            >
              ☰
            </motion.button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="md:hidden border-t border-white/10 bg-[#0B1224]/90"
            >
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-sm text-gray-300 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      </motion.nav>
    </>
  );
}

export default memo(Navbar);
