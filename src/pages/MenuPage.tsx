import { useState, useMemo, useEffect, useRef } from "react";
import { MessageCircle, Flame, Sparkles } from "lucide-react";
import SiteHeader from "@/components/kopi/SiteHeader";
import FooterSection from "@/components/kopi/FooterSection";
import { useBanner } from "@/hooks/useBanner";
import { useAdmin, AdminMenuItem, MenuCategory } from "@/context/AdminContext";

const WA_NUMBER = "6221555588888";

type Category = "Semua" | MenuCategory;
const categories: Category[] = ["Semua", "Kopi Panas", "Kopi Dingin", "Non-Kopi", "Makanan Ringan"];

function formatPrice(raw: string) {
  const num = parseInt(raw.replace(/\D/g, ""), 10);
  if (isNaN(num)) return raw;
  return `Rp ${num.toLocaleString("id-ID")}`;
}

function buildWALink(name: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Halo Kopi Nusantara! Saya ingin memesan *${name}*. Apakah tersedia sekarang?`
  )}`;
}

function MenuCard({ item, index }: { item: AdminMenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px) scale(0.98)";
    const t = setTimeout(() => {
      if (!el) return;
      el.style.transition = `opacity 0.45s ease ${index * 50}ms, transform 0.45s ease ${index * 50}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
    }, 20);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      ref={ref}
      className="menu-card group bg-roast rounded-sm overflow-hidden border border-gold/10 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-60 overflow-hidden">
        <img
          src={item.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=85"}
          alt={item.name}
          className="menu-card-img w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 50%, hsl(var(--roast)/0.85) 100%)" }}
        />
        {item.badge && (
          <div className="absolute top-3 left-3 z-10">
            {item.badge === "Best Seller" ? (
              <span className="btn-shimmer flex items-center gap-1 font-ui text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-sm text-espresso">
                <Flame size={10} />
                Best Seller
              </span>
            ) : (
              <span className="flex items-center gap-1 font-ui text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-sm bg-espresso/90 text-gold border border-gold/40">
                <Sparkles size={10} />
                New
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <span className="section-label text-gold/50">{item.category}</span>
        <h3 className="font-display text-cream text-xl leading-snug group-hover:text-gold transition-colors duration-300">
          {item.name}
        </h3>
        <p className="font-serif-body text-cream/50 text-sm leading-relaxed flex-1 italic">
          {item.description}
        </p>
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-gold/10">
          <span className="font-display text-gold text-lg font-semibold">
            {formatPrice(item.price)}
          </span>
          <a
            href={buildWALink(item.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 btn-shimmer font-ui text-[11px] tracking-widest uppercase font-semibold px-3.5 py-2 rounded-sm hover:scale-105 transition-transform duration-300 text-espresso shrink-0"
          >
            <MessageCircle size={13} />
            Pesan WA
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const { state } = useAdmin();
  const [activeCategory, setActiveCategory] = useState<Category>("Semua");
  const [filterKey, setFilterKey] = useState(0);
  const { headerHeight } = useBanner();

  // Only show active items from AdminContext
  const activeItems = useMemo(
    () => state.menuItems.filter((m) => m.active),
    [state.menuItems]
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "Semua") return activeItems;
    return activeItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, activeItems]);

  const counts = useMemo(() => {
    const result: Record<Category, number> = { Semua: activeItems.length } as Record<Category, number>;
    categories.slice(1).forEach((cat) => {
      result[cat as Category] = activeItems.filter((item) => item.category === cat).length;
    });
    return result;
  }, [activeItems]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setFilterKey((k) => k + 1);
  };

  return (
    <div className="w-full min-h-screen bg-espresso">
      <SiteHeader />

      {/* Page Hero */}
      <div className="relative overflow-hidden" style={{ paddingTop: headerHeight }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.07,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
          <p className="section-label animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
            Menu Kami
          </p>
          <div className="gold-divider my-5" />
          <h1
            className="font-display text-cream text-4xl sm:text-5xl lg:text-6xl leading-tight animate-fade-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Koleksi{" "}
            <span
              className="italic"
              style={{
                background: "var(--gradient-gold)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Cita Rasa
            </span>
          </h1>
          <p
            className="font-serif-body text-cream/50 text-lg sm:text-xl max-w-md mx-auto mt-4 leading-relaxed italic animate-fade-up"
            style={{ animationDelay: "0.35s", opacity: 0 }}
          >
            Dari biji kopi single origin hingga kudapan premium — semuanya dirancang untuk menyempurnakan momen Anda.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div
        className="sticky z-40 border-y border-gold/10"
        style={{ top: headerHeight, backgroundColor: "hsl(var(--espresso))", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative shrink-0 flex items-center gap-2 font-ui text-xs tracking-widest uppercase font-medium px-5 py-2.5 rounded-sm transition-all duration-300 ${
                    isActive
                      ? "text-espresso shadow-gold"
                      : "text-cream/50 hover:text-cream/80 hover:bg-gold/5"
                  }`}
                  style={isActive ? { background: "var(--gradient-gold)" } : {}}
                >
                  {cat}
                  <span className={`text-[10px] font-normal ${isActive ? "text-espresso/70" : "text-cream/30"}`}>
                    ({counts[cat]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center gap-4 mb-8">
          <p className="font-ui text-cream/30 text-sm tracking-wide shrink-0">
            <span className="text-gold font-medium">{filteredItems.length}</span> produk
            {activeCategory !== "Semua" && (
              <span className="text-cream/20"> · {activeCategory}</span>
            )}
          </p>
          <div className="h-px flex-1 bg-gold/10" />
        </div>

        <div key={filterKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif-body text-cream/30 text-lg italic">Tidak ada produk di kategori ini.</p>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
