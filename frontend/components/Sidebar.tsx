"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { profile } = useAuth();
  const isPaid = profile?.paymentStatus === "paid";
  const role = profile?.role;

  const links = [
    { href: "/dashboard/home", label: "🏠 Home", free: true },
    { href: "/dashboard/courses", label: "📚 Courses", free: false },
    { href: "/dashboard/pdfs", label: "📄 PDFs & Notes", free: false },
    { href: "/dashboard/videos", label: "🎥 Videos", free: false },
    { href: "/dashboard/links", label: "🔗 Useful Links", free: true },
    { href: "/dashboard/recorded", label: "🕒 Recorded Classes", free: false },
    { href: "/dashboard/profile", label: "👤 Profile", free: true },
  ];

  return (
    <aside className="w-64 bg-[#0A1220] border-r border-white/10 min-h-[calc(100vh-4rem)] p-6">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        {links.map((item) => {
          const locked = !item.free && !isPaid;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg transition ${
                locked
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label} {locked && "🔒"}
            </Link>
          );
        })}

        {role === "admin" && (
          <>
            <div className="mt-6 text-sm text-gray-400">Admin</div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 rounded-lg text-yellow-300 hover:bg-yellow-500/10 transition"
            >
              🛠 Admin Dashboard
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
