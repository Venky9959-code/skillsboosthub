import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "next-themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-transparent text-black dark:text-white">
        <PageTransition>
          {/* NO SIDEBAR HERE */}
          <main className="pt-2">
            <div className="max-w-7xl mx-auto space-y-16">
              {children}
            </div>
          </main>
        </PageTransition>
      </div>
    </ThemeProvider>
  );
}