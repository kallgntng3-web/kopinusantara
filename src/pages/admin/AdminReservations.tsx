import { Fragment, useState } from "react";
import { CalendarDays, Clock, Users, ChevronDown, Search, Download } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin, Reservation, ReservationStatus } from "@/context/AdminContext";

const STATUS_CONFIG: Record<ReservationStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  confirmed: { label: "Dikonfirmasi", className: "bg-green-50 text-green-700 border border-green-200" },
  cancelled: { label: "Dibatalkan", className: "bg-red-50 text-red-600 border border-red-200" },
};

const FILTER_OPTIONS: { value: ReservationStatus | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "cancelled", label: "Dibatalkan" },
];

function StatusDropdown({
  currentStatus,
  onChange,
}: {
  currentStatus: ReservationStatus;
  onChange: (s: ReservationStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[currentStatus];
  const others = (["pending", "confirmed", "cancelled"] as ReservationStatus[]).filter(
    (s) => s !== currentStatus
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-ui text-xs font-medium transition-all duration-200 ${cfg.className}`}
      >
        {cfg.label}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-[130px]">
            {others.map((s) => {
              const c = STATUS_CONFIG[s];
              return (
                <button
                  key={s}
                  onClick={() => { onChange(s); setOpen(false); }}
                  className="w-full flex items-center px-3 py-2 font-ui text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <span className={`px-2 py-0.5 rounded-full font-medium ${c.className}`}>{c.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function formatCreatedAt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) + " · " +
    d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default function AdminReservations() {
  const { state, dispatch } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "semua">("semua");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleDownloadCSV = () => {
    const headers = ["Nama", "No HP", "Tanggal", "Jam", "Tamu", "Status", "Catatan", "Dibuat"];
    const rows = state.reservations.map((r) => [
      r.name, r.phone, r.date, r.time, r.guests, r.status, r.notes,
      new Date(r.createdAt).toLocaleString("id-ID"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reservasi-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const today = new Date().toISOString().split("T")[0];

  const filtered = state.reservations
    .filter((r) => {
      const matchStatus = statusFilter === "semua" || r.status === statusFilter;
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search);
      return matchStatus && matchSearch;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleStatusChange = (id: string, status: ReservationStatus) => {
    dispatch({ type: "UPDATE_RESERVATION_STATUS", id, status });
  };

  const counts = {
    pending: state.reservations.filter((r) => r.status === "pending").length,
    confirmed: state.reservations.filter((r) => r.status === "confirmed").length,
    cancelled: state.reservations.filter((r) => r.status === "cancelled").length,
    today: state.reservations.filter((r) => r.date === today).length,
  };

  return (
    <AdminLayout title="Kelola Reservasi" subtitle={`${counts.today} reservasi hari ini`}>
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Hari Ini", value: counts.today, className: "bg-blue-50 text-blue-700 border border-blue-100" },
          { label: "Pending", value: counts.pending, className: "bg-yellow-50 text-yellow-700 border border-yellow-100" },
          { label: "Konfirmasi", value: counts.confirmed, className: "bg-green-50 text-green-700 border border-green-100" },
          { label: "Batal", value: counts.cancelled, className: "bg-red-50 text-red-600 border border-red-100" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.className}`}>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="font-ui text-xs font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau nomor HP..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg font-ui text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-amber-400 transition-colors"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg font-ui text-xs font-medium transition-all duration-200 ${
                statusFilter === opt.value
                  ? "text-amber-800"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-amber-300"
              }`}
              style={statusFilter === opt.value ? { background: "var(--gradient-gold)" } : {}}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-ui text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:border-amber-400 hover:text-amber-700 transition-all duration-200 whitespace-nowrap"
        >
          <Download size={14} />
          Download CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Tamu</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Jadwal</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Tamu</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Dibuat</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 font-ui text-sm">
                    Tidak ada reservasi ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((r: Reservation) => (
                  <Fragment key={r.id}>
                    <tr
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                    >
                      <td className="px-4 py-3">
                        <p className="font-ui text-sm font-medium text-gray-800">{r.name}</p>
                        <p className="font-ui text-xs text-gray-400">{r.phone}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <CalendarDays size={12} className="text-gray-400 shrink-0" />
                          <span className="font-ui text-sm">{formatDate(r.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 mt-0.5">
                          <Clock size={12} className="shrink-0" />
                          <span className="font-ui text-xs">{r.time} WIB</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Users size={12} className="text-gray-400 shrink-0" />
                          <span className="font-ui text-sm">{r.guests} orang</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="font-ui text-xs text-gray-400">{formatCreatedAt(r.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <StatusDropdown
                          currentStatus={r.status}
                          onChange={(s) => handleStatusChange(r.id, s)}
                        />
                      </td>
                    </tr>
                    {/* Expanded row for notes */}
                    {expanded === r.id && (
                      <tr className="bg-amber-50/40">
                        <td colSpan={5} className="px-4 py-3">
                          <div className="flex flex-wrap gap-4 text-xs font-ui">
                            <div>
                              <span className="text-gray-400 uppercase tracking-wider">Jadwal: </span>
                              <span className="text-gray-700 font-medium">{formatDate(r.date)}, {r.time} · {r.guests} orang</span>
                            </div>
                            {r.notes && (
                              <div>
                                <span className="text-gray-400 uppercase tracking-wider">Catatan: </span>
                                <span className="text-gray-700">{r.notes}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <p className="font-ui text-xs text-gray-400">
            Menampilkan {filtered.length} dari {state.reservations.length} reservasi
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
