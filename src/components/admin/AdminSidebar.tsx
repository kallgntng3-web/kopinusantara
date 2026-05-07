import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  MessageSquare,
  LogOut,
  Coffee,
  ExternalLink,
  FileText,
  Download,
} from "lucide-react";

import { useAdmin } from "@/context/AdminContext";

const links = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/menu", label: "Kelola Menu", icon: UtensilsCrossed },
  { path: "/admin/reservations", label: "Reservasi", icon: CalendarDays },
  { path: "/admin/messages", label: "Pesan Masuk", icon: MessageSquare },
  { path: "/admin/pages", label: "Edit Halaman", icon: FileText },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useAdmin();

  const unreadCount = state.messages.filter((m) => !m.read).length;

  const isActive = (link: (typeof links)[0]) => {
    if (link.exact) return location.pathname === link.path;
    return location.pathname.startsWith(link.path);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin");
  };

  const handleDownloadData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      menu: state.menuItems,
      reservations: state.reservations,
      messages: state.messages,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `kopi-nusantara-data-${new Date()
      .toISOString()
      .split("T")[0]}.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200 flex flex-col z-20">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "var(--gradient-gold)" }}
        >
          <Coffee size={14} className="text-espresso" />
        </div>

        <div>
          <p className="font-display text-sm text-gray-900 leading-none">
            Kopi Nusantara
          </p>

          <p className="font-ui text-[10px] text-gray-400 tracking-widest uppercase mt-0.5">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {links.map((link) => {
          const active = isActive(link);

          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group relative ${
                active
                  ? "bg-amber-50 text-amber-800"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {active && (
                <span
                  className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full"
                  style={{ background: "hsl(var(--gold))" }}
                />
              )}

              <link.icon
                size={17}
                className={
                  active
                    ? "text-amber-700"
                    : "text-gray-400 group-hover:text-gray-600"
                }
              />

              <span className="font-ui text-sm font-medium flex-1">
                {link.label}
              </span>

              {link.path === "/admin/messages" && unreadCount > 0 && (
                <span
                  className="flex items-center justify-center min-w-[18px] h-[18px] rounded-full text-[10px] font-bold px-1"
                  style={{
                    background: "hsl(var(--gold))",
                    color: "hsl(var(--espresso))",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 flex flex-col gap-1.5 border-t border-gray-100 pt-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
        >
          <ExternalLink size={16} />
          <span className="font-ui text-sm">Lihat Website</span>
        </a>

        <button
          onClick={handleDownloadData}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200 w-full"
        >
          <Download size={16} />
          <span className="font-ui text-sm">Download Data (JSON)</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
        >
          <LogOut size={16} />
          <span className="font-ui text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
