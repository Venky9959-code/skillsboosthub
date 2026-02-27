import PageTransition from "@/components/PageTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <PageTransition>
        {/* NO SIDEBAR HERE */}
        <main className="pt-16">
          {children}
        </main>
      </PageTransition>
    </div>
  );
}
