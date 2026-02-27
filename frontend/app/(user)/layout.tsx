import Navbar from "../../components/Navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="pt-16 min-h-screen w-full overflow-x-hidden bg-[#020617]">
  {children}
</main>


    </>
  );
}
