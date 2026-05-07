import { UtensilsCrossed, CalendarDays, MessageSquare, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/context/AdminContext";
import { useNavigate } from "react-router-dom";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  onClick,
}: {
  label: string;
  value: number | string;
  sub: string;
  icon: React.ElementType;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left w-full group"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-ui text-xs text-gray-400 font-medium tracking-wide uppercase mb-1">{label}</p>
        <p className="font-display text-gray-900 text-3xl font-bold leading-none mb-1">{value}</p>
        <p className="font-ui text-xs text-gray-400">{sub}</p>
      </div>
      <TrendingUp size={14} className="text-gray-300 group-hover:text-amber-400 transition-colors mt-1 shrink-0" />
    </button>
  );
}

export default function AdminDashboard() {
  const { state } = useAdmin();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const todayReservations = state.reservations.filter((r) => r.date === today);
  const unreadMessages = state.messages.filter((m) => !m.read).length;
  const activeMenu = state.menuItems.filter((m) => m.active).length;
  const pendingReservations = state.reservations.filter((r) => r.status === "pending");

  return (
    <AdminLayout title="Dashboard" subtitle="Selamat datang kembali, Admin">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Menu Aktif"
          value={activeMenu}
          sub={`dari ${state.menuItems.length} total produk`}
          icon={UtensilsCrossed}
          color="bg-amber-50 text-amber-600"
          onClick={() => navigate("/admin/menu")}
        />
        <StatCard
          label="Reservasi Hari Ini"
          value={todayReservations.length}
          sub={`${todayReservations.filter((r) => r.status === "confirmed").length} dikonfirmasi`}
          icon={CalendarDays}
          color="bg-blue-50 text-blue-600"
          onClick={() => navigate("/admin/reservations")}
        />
        <StatCard
          label="Pesan Belum Dibaca"
          value={unreadMessages}
          sub={`dari ${state.messages.length} total pesan`}
          icon={MessageSquare}
          color="bg-green-50 text-green-600"
          onClick={() => navigate("/admin/messages")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-ui font-semibold text-gray-800 text-sm flex items-center gap-2">
              <CalendarDays size={15} className="text-blue-500" />
              Reservasi Menunggu Konfirmasi
            </h2>
            <button
              onClick={() => navigate("/admin/reservations")}
              className="font-ui text-xs text-amber-600 hover:text-amber-800 font-medium"
            >
              Lihat semua
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingReservations.length === 0 ? (
              <p className="font-ui text-sm text-gray-400 text-center py-8">Tidak ada reservasi pending</p>
            ) : (
              pendingReservations.slice(0, 4).map((r) => (
                <div key={r.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Clock size={13} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-sm font-medium text-gray-800 truncate">{r.name}</p>
                    <p className="font-ui text-xs text-gray-400">
                      {r.date} · {r.time} · {r.guests} orang
                    </p>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full font-ui text-[11px] font-medium">
                    Pending
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-ui font-semibold text-gray-800 text-sm flex items-center gap-2">
              <MessageSquare size={15} className="text-green-500" />
              Pesan Terbaru
            </h2>
            <button
              onClick={() => navigate("/admin/messages")}
              className="font-ui text-xs text-amber-600 hover:text-amber-800 font-medium"
            >
              Lihat semua
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {state.messages.length === 0 ? (
              <p className="font-ui text-sm text-gray-400 text-center py-8">Belum ada pesan</p>
            ) : (
              state.messages.slice(0, 4).map((m) => (
                <div key={m.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.read ? "bg-gray-300" : "bg-green-500"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-ui text-sm truncate ${m.read ? "text-gray-500" : "text-gray-800 font-medium"}`}>
                        {m.name}
                      </p>
                    </div>
                    <p className="font-ui text-xs text-gray-400 truncate">{m.subject}</p>
                  </div>
                  {m.read ? (
                    <CheckCircle2 size={14} className="text-gray-300 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle size={14} className="text-green-400 shrink-0 mt-0.5" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
