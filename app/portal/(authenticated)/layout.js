import AdminNav from "@/components/admin/AdminNav";

export default function AuthenticatedAdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-deepblack">
      <AdminNav />
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
