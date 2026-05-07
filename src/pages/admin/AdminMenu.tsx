import { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, ImageOff, Download } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin, AdminMenuItem, MenuCategory, MenuBadge } from "@/context/AdminContext";

const CATEGORIES: MenuCategory[] = ["Kopi Panas", "Kopi Dingin", "Non-Kopi", "Makanan Ringan"];
const BADGES: { value: MenuBadge; label: string }[] = [
  { value: null, label: "Tidak ada" },
  { value: "Best Seller", label: "Best Seller" },
  { value: "New", label: "New" },
];

const EMPTY_FORM: Omit<AdminMenuItem, "id"> = {
  name: "",
  category: "Kopi Panas",
  price: "",
  image: "",
  description: "",
  badge: null,
  active: true,
};

function formatPrice(raw: string) {
  const num = parseInt(raw.replace(/\D/g, ""), 10);
  if (isNaN(num)) return raw;
  return `Rp ${num.toLocaleString("id-ID")}`;
}

interface MenuModalProps {
  item: Omit<AdminMenuItem, "id"> & { id?: string };
  isEdit: boolean;
  onClose: () => void;
  onSave: (item: Omit<AdminMenuItem, "id"> & { id?: string }) => void;
}

function MenuModal({ item, isEdit, onClose, onSave }: MenuModalProps) {
  const [form, setForm] = useState(item);

  const set = (key: keyof typeof form, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl border border-gray-200 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-display text-gray-900 text-lg">{isEdit ? "Edit Produk" : "Tambah Produk Baru"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-sm font-medium text-gray-700">Nama Produk *</label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
              placeholder="cth: Signature Espresso"
              className="admin-input"
            />
          </div>

          {/* Category + Badge row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-ui text-sm font-medium text-gray-700">Kategori *</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value as MenuCategory)}
                className="admin-input"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-ui text-sm font-medium text-gray-700">Badge</label>
              <select
                value={form.badge ?? ""}
                onChange={(e) => set("badge", e.target.value || null)}
                className="admin-input"
              >
                {BADGES.map((b) => <option key={String(b.value)} value={b.value ?? ""}>{b.label}</option>)}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-sm font-medium text-gray-700">Harga (Rp) *</label>
            <input
              value={form.price}
              onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))}
              required
              placeholder="cth: 35000"
              type="number"
              min="0"
              className="admin-input"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-sm font-medium text-gray-700">URL Foto</label>
            <input
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="admin-input"
            />
            {form.image && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100 mt-1">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="font-ui text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Deskripsi singkat produk..."
              className="admin-input resize-none"
            />
          </div>

          {/* Active toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-ui text-sm font-medium text-gray-700">Status Aktif</p>
              <p className="font-ui text-xs text-gray-400">Produk akan ditampilkan di menu publik</p>
            </div>
            <button
              type="button"
              onClick={() => set("active", !form.active)}
              className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 ${form.active ? "bg-amber-400" : "bg-gray-300"}`}
              style={{ height: "22px" }}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${form.active ? "translate-x-5" : "translate-x-0.5"}`}
                style={{ transition: "transform 0.2s" }}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg font-ui text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg font-ui text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--gradient-gold)", color: "hsl(var(--espresso))" }}
            >
              {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminMenu() {
  const { state, dispatch } = useAdmin();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<MenuCategory | "Semua">("Semua");
  const [modal, setModal] = useState<{ open: boolean; item: Omit<AdminMenuItem, "id"> & { id?: string }; isEdit: boolean } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = state.menuItems.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Semua" || item.category === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd = () => setModal({ open: true, item: { ...EMPTY_FORM }, isEdit: false });
  const openEdit = (item: AdminMenuItem) => setModal({ open: true, item, isEdit: true });
  const closeModal = () => setModal(null);

  const handleDownloadCSV = () => {
    const headers = ["Nama", "Kategori", "Harga", "Badge", "Status", "Deskripsi", "URL Foto"];
    const rows = state.menuItems.map((m) => [
      m.name, m.category, m.price, m.badge ?? "", m.active ? "Aktif" : "Nonaktif", m.description, m.image,
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `menu-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = (form: Omit<AdminMenuItem, "id"> & { id?: string }) => {
    if (form.id) {
      dispatch({ type: "UPDATE_MENU", item: form as AdminMenuItem });
    } else {
      dispatch({
        type: "ADD_MENU",
        item: { ...form, id: Date.now().toString() } as AdminMenuItem,
      });
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_MENU", id });
    setDeleteConfirm(null);
  };

  return (
    <AdminLayout title="Kelola Menu" subtitle={`${state.menuItems.filter((m) => m.active).length} produk aktif`}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama produk..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg font-ui text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-1 flex-wrap">
          {(["Semua", ...CATEGORIES] as (MenuCategory | "Semua")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg font-ui text-xs font-medium transition-all duration-200 ${
                filterCat === cat
                  ? "text-amber-800"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-amber-300"
              }`}
              style={filterCat === cat ? { background: "var(--gradient-gold)" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add + Download buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-ui text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:border-amber-400 hover:text-amber-700 transition-all duration-200"
          >
            <Download size={14} />
            CSV
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-ui text-sm font-semibold whitespace-nowrap transition-all hover:opacity-90"
            style={{ background: "var(--gradient-gold)", color: "hsl(var(--espresso))" }}
          >
            <Plus size={15} />
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Produk</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Badge</th>
                <th className="text-left px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400 font-ui text-sm">
                    Tidak ada produk ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageOff size={14} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-ui text-sm font-medium text-gray-800 truncate max-w-[180px]">{item.name}</p>
                          <p className="font-ui text-xs text-gray-400 truncate max-w-[180px]">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-ui text-xs">{item.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-ui text-sm font-medium text-gray-700">{formatPrice(item.price)}</span>
                    </td>
                    <td className="px-4 py-3">
                      {item.badge ? (
                        <span
                          className="px-2 py-0.5 rounded-md font-ui text-xs font-medium"
                          style={
                            item.badge === "Best Seller"
                              ? { background: "hsl(var(--gold)/0.15)", color: "hsl(var(--gold))" }
                              : { background: "rgb(219 234 254)", color: "rgb(29 78 216)" }
                          }
                        >
                          {item.badge}
                        </span>
                      ) : (
                        <span className="text-gray-300 font-ui text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full font-ui text-xs font-medium ${item.active ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                        {item.active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <p className="font-ui text-xs text-gray-400">
            Menampilkan {filtered.length} dari {state.menuItems.length} produk
          </p>
        </div>
      </div>

      {/* Menu Modal */}
      {modal?.open && (
        <MenuModal
          item={modal.item}
          isEdit={modal.isEdit}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirm Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-xl border border-gray-200 shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-display text-gray-900 text-lg text-center mb-2">Hapus Produk?</h3>
            <p className="font-ui text-sm text-gray-500 text-center mb-6">
              Produk ini akan dihapus secara permanen dan tidak dapat dikembalikan.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-lg font-ui text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-lg font-ui text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
