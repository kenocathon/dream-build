export const metadata = {
  title: "Admin Dashboard | Dream Build Luxury Glass",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-deepblack">
      {children}
    </div>
  );
}
