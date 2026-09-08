import Navbar from "@/components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mist">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
