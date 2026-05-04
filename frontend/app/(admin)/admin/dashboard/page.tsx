"use client";

import { motion } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext";

export default function AdminDashboard() {
  const { profile } = useAuth();

  if (profile?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Access Denied
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen text-white p-6 md:p-10"
    >
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Monitor users, payments, and approvals
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Users" value="120" />
        <StatCard title="Paid Users" value="45" />
        <StatCard title="Revenue" value="₹39,999" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-2 gap-6">
        <AdminAction
          title="Recorded Session Requests"
          desc="Approve or reject student recording requests"
          href="/admin/recorded"
        />
        <AdminAction
          title="Manage Courses"
          desc="Add or update course content"
          href="/admin/courses"
        />
      </div>
    </motion.div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#141B30] p-6 rounded-2xl border border-white/10">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function AdminAction({
  title,
  desc,
  href,
}: {
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2">{desc}</p>
    </a>
  );
}
