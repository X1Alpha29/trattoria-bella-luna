import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-bella-cream lg:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}