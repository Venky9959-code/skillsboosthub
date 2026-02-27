"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  if (!user || user.role !== "admin") {
    router.push("/dashboard"); // redirect users
    return null;
  }

  return <>{children}</>;
}
