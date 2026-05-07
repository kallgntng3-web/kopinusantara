import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAdmin } from "@/context/AdminContext";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const { state } = useAdmin();

  if (!state.authed) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 ml-60 min-h-screen flex flex-col">
        {/* Page header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-display text-gray-900 text-xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="font-ui text-sm text-gray-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </header>

        {/* Page body */}
        <div className="flex-1 px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
