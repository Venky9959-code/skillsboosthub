import { useAuth } from "@/context/AuthContext";

export default function DashboardStats() {
  const { profile, unreadCount } = useAuth();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard title="Access" value={profile?.paymentStatus === "paid" ? "Active" : "Locked"} />
      <StatCard title="Notifications" value={unreadCount.toString()} />
      <StatCard title="Courses" value="12+" />
      <StatCard title="Progress" value="Coming Soon" />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
