import { MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WA_NUMBER = "6221555588888";

const menuItems = [
  {
    name: "Single Origin Espresso",
    origin: "Kopi Gayo, Aceh",
    desc: "Espresso pekat nan kompleks dari biji kopi arabika pilihan lereng Gayo — dengan catatan rasa karamel, cokelat dark, dan sedikit sentuhan floral yang memukau.",
    price: "Rp 35.000",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=85",
    tag: "Favorit",
  },
  {
    name: "Toraja Latte",
    origin: "Kopi Toraja, Sulawesi",
    desc: "Perpaduan sempurna espresso Toraja yang earthy dan smoky dengan susu segar yang dikukus hingga krim sempurna — disajikan dengan latte art elegan di atasnya.",
    price: "Rp 42.000",
    image:
      "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=85",
    tag: "Terlaris",
  },
  {
    name: "Cold Brew Nusantara",
    origin: "Blend Flores & Bajawa",
    desc: "Kopi flores robusta direndam dingin selama 18 jam menghasilkan cold brew yang kaya, smooth, dan memiliki rasa cokelat gelap yang panjang di akhir tegukan.",
    price: "Rp 48.000",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&q=85",
    tag: "Premium",
  },
];

export default function MenuSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-espresso"
    >
      {/* Subtle warm background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(var(--gold)/0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="section-label reveal">Menu Unggulan</p>
          <div className="gold-divider my-5 reveal reveal-delay-1" />
          <h2 className="font-display text-cream text-4xl sm:text-5xl lg:text-6xl leading-tight reveal reveal-delay-2">
            Cita Rasa <span className="text-gold italic">Terbaik</span>
          </h2>
          <p className="font-serif-body text-cream/50 text-lg sm:text-xl max-w-lg mx-auto mt-4 leading-relaxed reveal reveal-delay-3 italic">
            Dibuat dari biji kopi single origin terpilih dari seluruh
            Nusantara — setiap hidangan adalah perjalanan rasa.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className={`reveal reveal-delay-${i + 2} menu-card group relative overflow-hidden rounded-sm bg-roast cursor-pointer`}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-card-img w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "var(--gradient-card)" }}
                />

                {/* Tag badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="btn-shimmer font-ui text-xs tracking-widest uppercase font-medium px-3 py-1 rounded-sm text-espresso">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                <p className="section-label text-gold/60 mb-2">{item.origin}</p>
                <h3 className="font-display text-cream text-2xl leading-snug mb-3">
                  {item.name}
                </h3>
                <p className="font-serif-body text-cream/50 text-sm leading-relaxed mb-5 line-clamp-3">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-display text-gold text-xl font-semibold">
                    {item.price}
                  </span>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo Kopi Nusantara! Saya ingin memesan *${item.name}*. Apakah masih tersedia?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer flex items-center gap-1.5 font-ui text-xs tracking-widest uppercase font-medium px-4 py-2 rounded-sm hover:scale-105 transition-transform duration-300"
                  >
                    <MessageCircle size={11} />
                    Pesan
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 reveal">
          <a
            href="/menu"
            className="inline-block font-ui text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 rounded-sm border border-gold/40 text-gold hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            Lihat Semua Menu
          </a>
        </div>
      </div>
    </section>
  );
}
