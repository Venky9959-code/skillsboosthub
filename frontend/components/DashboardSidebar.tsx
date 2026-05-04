"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default function DashboardSidebar() {
  const router = useRouter();

  const menu = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Courses", path: "/dashboard/courses", icon: "📚" },
    { label: "Recorded", path: "/dashboard/recorded", icon: "🎥" },
    { label: "PDFs", path: "/dashboard/pdfs", icon: "📄" },
    { label: "Profile", path: "/dashboard/profile", icon: "👤" },
  ];

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-10">
        Skills<span className="text-blue-400">Boost</span>Hub
      </h2>

      <nav className="space-y-3">
        {menu.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.path)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                       hover:bg-white/10 transition"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-500/20 text-red-400 py-3 rounded-xl hover:bg-red-500/30 transition"
      >
        Logout
      </button>
    </aside>
  );
}
