import { useState } from "react";
import { Save, RotateCcw, CheckCircle2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { usePageContent, PageContent, DEFAULT_CONTENT } from "@/context/PageContentContext";

type Tab = "hero" | "whyus" | "location" | "footer";

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero / Beranda" },
  { id: "whyus", label: "Keunggulan" },
  { id: "location", label: "Lokasi & Kontak" },
  { id: "footer", label: "Footer" },
];

function Field({
  label,
  value,
  onChange,
  textarea,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="admin-input resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="admin-input"
        />
      )}
    </div>
  );
}

export default function AdminPages() {
  const { content, save, reset } = usePageContent();
  const [draft, setDraft] = useState<PageContent>(content);
  const [tab, setTab] = useState<Tab>("hero");
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof PageContent>(section: K, patch: Partial<PageContent[K]>) => {
    setDraft((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  };

  const handleSave = () => {
    save(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!confirm("Reset semua konten halaman ke nilai awal? Perubahan yang belum disimpan akan hilang.")) return;
    reset();
    setDraft(DEFAULT_CONTENT);
  };

  return (
    <AdminLayout title="Edit Halaman" subtitle="Kelola teks dan konten di seluruh halaman website">
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg font-ui text-sm font-medium transition-all duration-200 ${
              tab === t.id ? "text-amber-800" : "bg-white text-gray-500 border border-gray-200 hover:border-amber-300"
            }`}
            style={tab === t.id ? { background: "var(--gradient-gold)" } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 flex flex-col gap-5">

          {/* ── HERO ── */}
          {tab === "hero" && (
            <>
              <SectionTitle title="Hero Section" desc="Konten utama yang tampil di bagian atas halaman beranda." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Label Atas" value={draft.hero.label} onChange={(v) => update("hero", { label: v })} placeholder="Kopi Pilihan Nusantara" />
                <Field label="Rating Teks" value={draft.hero.ratingText} onChange={(v) => update("hero", { ratingText: v })} placeholder="4.9/5" />
              </div>
              <Field label="Label Rating" value={draft.hero.ratingLabel} onChange={(v) => update("hero", { ratingLabel: v })} placeholder="Berdasarkan 200+ ulasan Google" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Judul Baris 1" value={draft.hero.titleLine1} onChange={(v) => update("hero", { titleLine1: v })} placeholder="Setiap Tegukan," />
                <Field label="Judul Baris 2 (Emas Italic)" value={draft.hero.titleLine2} onChange={(v) => update("hero", { titleLine2: v })} placeholder="Sebuah Cerita" />
              </div>
              <Field label="Subjudul" value={draft.hero.subtitle} onChange={(v) => update("hero", { subtitle: v })} textarea placeholder="Deskripsi singkat..." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Teks Tombol Utama" value={draft.hero.ctaPrimary} onChange={(v) => update("hero", { ctaPrimary: v })} placeholder="Pesan Sekarang" />
                <Field label="Teks Tombol Sekunder" value={draft.hero.ctaSecondary} onChange={(v) => update("hero", { ctaSecondary: v })} placeholder="Selengkapnya" />
              </div>
              <Field label="URL Gambar Background" value={draft.hero.bgImage} onChange={(v) => update("hero", { bgImage: v })} placeholder="https://..." />
              {draft.hero.bgImage && (
                <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-100">
                  <img src={draft.hero.bgImage} alt="preview" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="font-ui text-white text-xs tracking-widest uppercase bg-black/50 px-3 py-1 rounded">Preview Background</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── WHY US ── */}
          {tab === "whyus" && (
            <>
              <SectionTitle title="Keunggulan Kami" desc="Tiga kartu fitur di bawah hero section." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Label Section" value={draft.whyUs.label} onChange={(v) => update("whyUs", { label: v })} />
                <Field label="Heading" value={draft.whyUs.heading} onChange={(v) => update("whyUs", { heading: v })} />
              </div>
              <Field label="Subjudul" value={draft.whyUs.subtitle} onChange={(v) => update("whyUs", { subtitle: v })} textarea />

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-5">
                {draft.whyUs.cards.map((card, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-3">
                    <p className="font-ui text-xs font-semibold text-amber-700 uppercase tracking-wider">
                      Kartu {i + 1}
                    </p>
                    <Field
                      label="Judul Kartu"
                      value={card.title}
                      onChange={(v) => {
                        const cards = [...draft.whyUs.cards];
                        cards[i] = { ...cards[i], title: v };
                        update("whyUs", { cards });
                      }}
                    />
                    <Field
                      label="Deskripsi Kartu"
                      textarea
                      value={card.desc}
                      onChange={(v) => {
                        const cards = [...draft.whyUs.cards];
                        cards[i] = { ...cards[i], desc: v };
                        update("whyUs", { cards });
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── LOCATION ── */}
          {tab === "location" && (
            <>
              <SectionTitle title="Lokasi & Kontak" desc="Informasi yang tampil di section lokasi dan footer." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Alamat Jalan" value={draft.location.address} onChange={(v) => update("location", { address: v })} placeholder="Jl. Sudirman No. 88" />
                <Field label="Kota & Kode Pos" value={draft.location.city} onChange={(v) => update("location", { city: v })} placeholder="Jakarta Pusat, DKI Jakarta 10220" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nomor Telepon" value={draft.location.phone} onChange={(v) => update("location", { phone: v })} placeholder="+62 21 5555 8888" type="tel" />
                <Field label="Email" value={draft.location.email} onChange={(v) => update("location", { email: v })} placeholder="info@kopinusantara.id" type="email" />
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="font-ui text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Jam Buka</p>
                <div className="flex flex-col gap-3">
                  {draft.location.hours.map((h, i) => (
                    <div key={i} className="grid grid-cols-2 gap-3">
                      <Field
                        label={`Hari ${i + 1}`}
                        value={h.day}
                        onChange={(v) => {
                          const hours = [...draft.location.hours];
                          hours[i] = { ...hours[i], day: v };
                          update("location", { hours });
                        }}
                        placeholder="Senin – Jumat"
                      />
                      <Field
                        label={`Jam ${i + 1}`}
                        value={h.time}
                        onChange={(v) => {
                          const hours = [...draft.location.hours];
                          hours[i] = { ...hours[i], time: v };
                          update("location", { hours });
                        }}
                        placeholder="07.00 – 22.00"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Field label="URL Google Maps Embed" value={draft.location.mapsUrl} onChange={(v) => update("location", { mapsUrl: v })} placeholder="https://www.google.com/maps/embed?pb=..." textarea />
            </>
          )}

          {/* ── FOOTER ── */}
          {tab === "footer" && (
            <>
              <SectionTitle title="Footer" desc="Teks dan link sosial media di footer website." />
              <Field label="Tagline Brand" textarea value={draft.footer.tagline} onChange={(v) => update("footer", { tagline: v })} />
              <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="URL Instagram" value={draft.footer.instagramUrl} onChange={(v) => update("footer", { instagramUrl: v })} placeholder="https://instagram.com/..." type="url" />
                <Field label="URL Facebook" value={draft.footer.facebookUrl} onChange={(v) => update("footer", { facebookUrl: v })} placeholder="https://facebook.com/..." type="url" />
                <Field label="URL Twitter / X" value={draft.footer.twitterUrl} onChange={(v) => update("footer", { twitterUrl: v })} placeholder="https://twitter.com/..." type="url" />
                <Field label="URL YouTube" value={draft.footer.youtubeUrl} onChange={(v) => update("footer", { youtubeUrl: v })} placeholder="https://youtube.com/..." type="url" />
              </div>
            </>
          )}
        </div>

        {/* Sticky action bar */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 font-ui text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            <RotateCcw size={14} />
            Reset ke Default
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-ui text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.01]"
            style={{ background: "var(--gradient-gold)", color: "hsl(var(--espresso))" }}
          >
            {saved ? (
              <>
                <CheckCircle2 size={15} />
                Tersimpan!
              </>
            ) : (
              <>
                <Save size={15} />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="pb-3 border-b border-gray-100">
      <h3 className="font-display text-gray-800 text-lg">{title}</h3>
      <p className="font-ui text-sm text-gray-400 mt-0.5">{desc}</p>
    </div>
  );
}
