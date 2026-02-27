"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const { user, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    if (role !== "admin") router.push("/dashboard");
  }, [user, role]);

  if (role !== "admin") return null;

  return <AdminDashboard />;
}
