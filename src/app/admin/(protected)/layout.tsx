import { auth } from "@/auth";
import { redirect } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bella-cream lg:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1">
        {children}
      </main>
    </div>
  );
}