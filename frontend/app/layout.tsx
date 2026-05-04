"use client";

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import RazorpayLoader from "@/components/RazorpayLoader";
import NavbarWrapper from "@/components/NavbarWrapper";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import TopLoader from "@/components/TopLoader";
import Footer from "@/components/Footer";
import BackgroundParticles from "@/components/BackgroundParticles";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Detect dashboard home
  const disableEffects = pathname.startsWith("/dashboard/home");

  // Dynamic cursor lighting background
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.className} bg-white text-black dark:bg-[#0B1224] dark:text-white overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <AuthProvider>
            <TopLoader />
            <RazorpayLoader />

            {/* ✅ GLOBAL PARTICLES (FIXED POSITION + CORRECT LAYER) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <BackgroundParticles />
            </div>

            {/* ✅ DISABLE EFFECTS ONLY FOR DASHBOARD HOME */}
            {!disableEffects && <CursorGlow />}

            {!disableEffects && (
              <div className="background-mesh fixed inset-0 -z-10" />
            )}

            {!disableEffects && (
              <div className="ambient-glow fixed inset-0 -z-10" />
            )}

            {/* FIXED NAVBAR */}
            <NavbarWrapper />

            {/* PAGE CONTENT WITH ADVANCED TRANSITIONS */}
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pt-16 will-change-transform relative z-10 min-h-screen"
              >
                {children}
              </motion.main>
            </AnimatePresence>
          </AuthProvider>
        </ThemeProvider>
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}