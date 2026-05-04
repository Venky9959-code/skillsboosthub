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
          ${scrolled
            ? "h-14 backdrop-blur-3xl bg-white/70 dark:bg-[#0B1224]/70 shadow-xl"
            : "h-16 bg-white/50 dark:bg-[#0B1224]/50"}
          border-b border-white/10
        `}
      >
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-10 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/dashboard/home" className="flex items-center gap-2 group relative">
            <div className="relative">
              <Image src="/logo.png" alt="SkillsBoostHub" width={34} height={34} />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
            </div>
            <span className="text-lg font-bold tracking-wide group-hover:text-blue-400 transition">
              Skills<span className="text-blue-400">Boost</span>Hub
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
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
                      ${locked
                        ? "text-gray-500 cursor-not-allowed"
                        : "text-gray-300 hover:text-white"}
                    `}
                  >
                    {item.label} {locked && "🔒"}

                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute -bottom-2 left-0 right-0 h-[2px] 
                        bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      />
                    )}
                  </Link>
                </MagneticButton>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {mounted && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-lg hover:rotate-12 transition"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </motion.button>
            )}

            {/* Notification */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/dashboard/notifications")}
              className="relative text-lg"
            >
              🔔
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white px-1.5 rounded-full"
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
                className="relative w-9 h-9 rounded-full 
                bg-gradient-to-br from-blue-500 to-purple-600
                flex items-center justify-center text-sm font-bold
                shadow-lg hover:shadow-blue-500/40 transition"
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
                    className="absolute right-0 mt-3 w-48 
                     bg-white/95 dark:bg-[#0B1224]/95 backdrop-blur-2xl
                      border border-white/10 rounded-xl overflow-hidden
                      shadow-2xl"
                  >
                    <Link href="/dashboard/profile" className="block px-4 py-3 hover:bg-white/10">
                      Profile
                    </Link>

                    <Link href="/dashboard/home" className="block px-4 py-3 hover:bg-white/10">
                      Dashboard
                    </Link>

                    {/* ✅ ONLY CHANGE HERE */}
                    {profile && (
                      isPaidUser ? (
                        <div className="mx-4 my-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-semibold text-center">
                          💎 Premium Active
                        </div>
                      ) : (
                        <MagneticButton>
                          <Link
                            href="/dashboard/payment"
                            className="block mx-4 my-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold text-center hover:scale-105 transition"
                          >
                            Unlock ₹198
                          </Link>
                        </MagneticButton>
                      )
                    )}

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

            {/* MOBILE BUTTON */}
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 
             bg-white/95 dark:bg-[#0B1224]/95 backdrop-blur-2xl"
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
      </motion.nav>
    </>
  );
}

export default memo(Navbar);