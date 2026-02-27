"use client";

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import RazorpayLoader from "@/components/RazorpayLoader";
import NavbarWrapper from "@/components/NavbarWrapper";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import { AnimatePresence, motion } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[#0B1224] text-white overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <AuthProvider>
            <RazorpayLoader />
            <CursorGlow />

            {/* FIXED NAVBAR */}
            <NavbarWrapper />

            {/* PAGE CONTENT + TRANSITIONS */}
            <AnimatePresence mode="wait">
              <motion.main
                key="page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="pt-16 will-change-opacity"
              >
                {children}
              </motion.main>
            </AnimatePresence>

          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
