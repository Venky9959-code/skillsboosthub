"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UserProfile {
  role?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, loading } = useAuth() as {
    profile: UserProfile | null;
    loading: boolean;
  };

  const router = useRouter();

  useEffect(() => {
    if (!loading && profile?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [loading, profile, router]);

  if (loading || profile?.role !== "admin") return null;

  return <>{children}</>;
}