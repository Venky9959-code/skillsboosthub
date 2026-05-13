"use client";

import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

import MagneticButton from "@/components/MagneticButton";
import CommandSearch from "@/components/CommandSearch";
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
  const isPaidUser = profile?.paymentStatus === "paid";

  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 inset-x-0 z-50
          transition-all duration-500
          border-b border-white/10

          ${
            scrolled
              ? "h-16 backdrop-blur-2xl bg-[#020617]/80 shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
              : "h-20 bg-[#020617]/60 backdrop-blur-xl"
          }
        `}
      >
        {/* Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 left-20 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />

          <div className="absolute -top-20 right-20 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/dashboard/home"
            className="flex items-center gap-4 group relative"
          >
            {/* LOGO IMAGE */}
            <div className="relative">

              <Image
  src="/logo-new.png"
  alt="SkillsBoostHub"
  width={58}
  height={58}
  priority
  className="object-contain drop-shadow-[0_0_18px_rgba(59,130,246,0.7)] transition duration-300 group-hover:scale-105"
/>

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>

            {/* BRAND */}
            <div className="flex flex-col leading-tight">

              <h1 className="text-[30px] font-extrabold tracking-tight">

                <span className="text-white">
                  Skills
                </span>

                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Boost
                </span>

                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Hub
                </span>

              </h1>

              <p className="text-[11px] uppercase tracking-[4px] text-gray-400">
                Learn • Grow • Succeed
              </p>

            </div>
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
                    className={`
                      relative text-sm font-medium tracking-wide
                      transition-all duration-300

                      ${
                        locked
                          ? "text-gray-500 cursor-not-allowed"
                          : active
                          ? "text-white"
                          : "text-gray-300 hover:text-white"
                      }
                    `}
                  >
                    <span className="relative z-10">
                      {item.label} {locked && "🔒"}
                    </span>

                    {/* ACTIVE GLOW */}
                    {active && (
                      <>
                        <motion.span
                          layoutId="nav-underline"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                          className="absolute -bottom-2 left-0 right-0 h-[2px]
                          bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        />

                        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full -z-10" />
                      </>
                    )}
                  </Link>
                </MagneticButton>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* THEME */}
            {mounted && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="w-10 h-10 rounded-full
                bg-white/5 border border-white/10
                flex items-center justify-center
                backdrop-blur-xl hover:bg-white/10
                transition duration-300"
              >
                <span className="text-lg">
                  {theme === "dark" ? "🌙" : "☀️"}
                </span>
              </motion.button>
            )}

            {/* NOTIFICATIONS */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/dashboard/notifications")}
              className="relative w-10 h-10 rounded-full
              bg-white/5 border border-white/10
              flex items-center justify-center
              backdrop-blur-xl hover:bg-white/10
              transition duration-300"
            >
              🔔

              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 text-[10px]
                  bg-red-500 text-white px-1.5 py-0.5 rounded-full"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            {/* AVATAR */}
            <div ref={avatarRef} className="relative">

              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setAvatarOpen(v => !v)}
                className="relative w-11 h-11 rounded-full
                bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600
                flex items-center justify-center text-sm font-bold
                shadow-[0_0_25px_rgba(59,130,246,0.45)]
                hover:scale-105 transition duration-300"
              >
                {profile?.name?.[0] || "U"}
              </motion.button>

              <AnimatePresence>
                {avatarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-4 w-56
                    bg-[#0B1224]/95 backdrop-blur-2xl
                    border border-white/10 rounded-2xl overflow-hidden
                    shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                  >

                    <div className="px-4 py-4 border-b border-white/5">
                      <p className="text-sm font-semibold text-white">
                        {profile?.name || "User"}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                         {user?.email || "Welcome back"}
                      </p>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-3 hover:bg-white/5 transition"
                    >
                      👤 Profile
                    </Link>

                    <Link
                      href="/dashboard/home"
                      className="block px-4 py-3 hover:bg-white/5 transition"
                    >
                      🏠 Dashboard
                    </Link>
{/* PREMIUM */}
{profile && (
  isPaidUser ? (
    <div className="px-4 mt-4">
      <div
        className="
          flex items-center justify-center gap-3
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r from-emerald-500/20 to-green-500/10
          border border-emerald-400/20
          text-emerald-400
          font-semibold
          text-lg
          shadow-[0_0_25px_rgba(16,185,129,0.15)]
        "
      >
        <span className="text-xl">💎</span>

        <span>Premium Active</span>
      </div>
    </div>
  ) : (
    <MagneticButton>
      <Link
        href="/dashboard/payment"
        className="
          block mx-4 mt-4
          bg-gradient-to-r from-yellow-400 to-orange-500
          text-black px-4 py-3 rounded-2xl
          font-semibold text-center
          shadow-lg hover:scale-[1.02]
          transition duration-300
        "
      >
        Unlock Premium ₹198
      </Link>
    </MagneticButton>
  )
)}

{/* LOGOUT */}
<button
  onClick={handleLogout}
  className="
    w-full
    flex items-center gap-3
    px-5 py-4 mt-4
    text-red-400
    hover:bg-red-500/10
    hover:text-red-300
    transition duration-300
    text-lg font-medium
    rounded-xl
  "
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-3l-3-3m3 3l-3 3m3-3H9"
    />
  </svg>

  <span>Logout</span>
</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MOBILE BUTTON */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden w-10 h-10 rounded-full
              bg-white/5 border border-white/10
              flex items-center justify-center
              backdrop-blur-xl"
            >
              ☰
            </motion.button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10
              bg-[#0B1224]/95 backdrop-blur-2xl"
            >
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-sm
                  text-gray-300 hover:bg-white/5 transition"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default memo(Navbar);