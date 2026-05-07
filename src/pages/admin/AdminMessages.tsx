import { useState } from "react";
import { Mail, MailOpen, Phone, User, X, CheckCheck, Circle, Download } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin, Message } from "@/context/AdminContext";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  const days = Math.floor(hrs / 24);
  return `${days} hari lalu`;
}

interface MessageDetailProps {
  message: Message;
  onClose: () => void;
  onToggleRead: (id: string, read: boolean) => void;
}

function MessageDetail({ message, onClose, onToggleRead }: MessageDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-gray-900 text-lg leading-tight">{message.subject}</h3>
            <p className="font-ui text-xs text-gray-400 mt-1">{timeAgo(message.createdAt)}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0">
            <X size={17} />
          </button>
        </div>

        {/* Sender info */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
              <User size={13} className="text-amber-700" />
            </div>
            <span className="font-ui text-sm font-medium text-gray-700">{message.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Mail size={13} className="shrink-0 text-gray-400" />
            <a href={`mailto:${message.email}`} className="font-ui text-sm hover:text-amber-700 transition-colors">
              {message.email}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Phone size={13} className="shrink-0 text-gray-400" />
            <a href={`tel:${message.phone}`} className="font-ui text-sm hover:text-amber-700 transition-colors">
              {message.phone}
            </a>
          </div>
        </div>

        {/* Message body */}
        <div className="px-6 py-5">
          <p className="font-ui text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{message.body}</p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <button
            onClick={() => { onToggleRead(message.id, !message.read); onClose(); }}
            className="flex items-center gap-2 font-ui text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
          >
            {message.read ? (
              <><Circle size={14} /> Tandai Belum Dibaca</>
            ) : (
              <><CheckCheck size={14} /> Tandai Sudah Dibaca</>
            )}
          </button>
          <a
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-ui text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--gradient-gold)", color: "hsl(var(--espresso))" }}
          >
            <Mail size={14} />
            Balas Email
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminMessages() {
  const { state, dispatch } = useAdmin();
  const [filter, setFilter] = useState<"semua" | "belum" | "sudah">("semua");
  const [selected, setSelected] = useState<Message | null>(null);

  const unreadCount = state.messages.filter((m) => !m.read).length;

  const filtered = state.messages
    .filter((m) => {
      if (filter === "belum") return !m.read;
      if (filter === "sudah") return m.read;
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const toggleRead = (id: string, read: boolean) => {
    dispatch({ type: "MARK_MESSAGE_READ", id, read });
  };

  const handleDownloadCSV = () => {
    const headers = ["Nama", "Email", "No HP", "Subjek", "Pesan", "Status", "Tanggal"];
    const rows = state.messages.map((m) => [
      m.name, m.email, m.phone, m.subject, m.body,
      m.read ? "Sudah Dibaca" : "Belum Dibaca",
      new Date(m.createdAt).toLocaleString("id-ID"),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pesan-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) toggleRead(msg.id, true);
  };

  return (
    <AdminLayout
      title="Pesan Masuk"
      subtitle={unreadCount > 0 ? `${unreadCount} pesan belum dibaca` : "Semua pesan sudah dibaca"}
    >
      {/* Filter tabs + download */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex gap-1 flex-wrap flex-1">
          {[
            { value: "semua", label: `Semua (${state.messages.length})` },
            { value: "belum", label: `Belum Dibaca (${unreadCount})` },
            { value: "sudah", label: `Sudah Dibaca (${state.messages.length - unreadCount})` },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value as typeof filter)}
              className={`px-3 py-1.5 rounded-lg font-ui text-xs font-medium transition-all duration-200 ${
                filter === opt.value
                  ? "text-amber-800"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-amber-300"
              }`}
              style={filter === opt.value ? { background: "var(--gradient-gold)" } : {}}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-ui text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:border-amber-400 hover:text-amber-700 transition-all duration-200 whitespace-nowrap"
        >
          <Download size={14} />
          Download CSV
        </button>
      </div>

      {/* Message list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <MailOpen size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="font-ui text-sm text-gray-400">Tidak ada pesan</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((msg) => (
              <button
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`w-full flex items-start gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-gray-50 ${!msg.read ? "bg-amber-50/30" : ""}`}
              >
                {/* Unread dot */}
                <div className="mt-1.5 shrink-0">
                  {msg.read ? (
                    <MailOpen size={16} className="text-gray-300" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`font-ui text-sm truncate ${msg.read ? "text-gray-500 font-normal" : "text-gray-900 font-semibold"}`}>
                      {msg.name}
                    </p>
                    <span className="font-ui text-xs text-gray-400 shrink-0">{timeAgo(msg.createdAt)}</span>
                  </div>
                  <p className={`font-ui text-sm truncate mb-1 ${msg.read ? "text-gray-400" : "text-gray-700 font-medium"}`}>
                    {msg.subject}
                  </p>
                  <p className="font-ui text-xs text-gray-400 truncate">{msg.body}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <p className="font-ui text-xs text-gray-400">
            {filtered.length} pesan ditampilkan
          </p>
        </div>
      </div>

      {/* Message detail modal */}
      {selected && (
        <MessageDetail
          message={selected}
          onClose={() => setSelected(null)}
          onToggleRead={toggleRead}
        />
      )}
    </AdminLayout>
  );
}
