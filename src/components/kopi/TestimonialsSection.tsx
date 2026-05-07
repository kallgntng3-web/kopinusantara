import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Rizky Ananda",
    role: "Food Blogger",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    review:
      "Kopi Nusantara adalah pengalaman kopi terbaik yang pernah saya rasakan di Indonesia. Single origin Gayo mereka? Luar biasa kompleks — karamel, dark chocolate, dan floral dalam satu cangkir. Ini bukan sekadar kopi, ini seni.",
    rating: 5,
  },
  {
    name: "Sari Wijayanti",
    role: "Pengusaha",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    review:
      "Tempat meeting favorit saya! Suasananya hangat dan elegan, kopinya konsisten sempurna, dan stafnya sangat ramah. Toraja Latte mereka selalu berhasil membuat hari saya lebih baik. Highly recommended!",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Desainer Kreatif",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
    review:
      "Cold Brew Nusantara adalah yang terbaik di kota ini. Smooth, rich, dan aftertaste-nya panjang banget. Saya ke sini minimal 3x seminggu — sudah seperti rumah sendiri. Konsep dan desain interiornya juga memukau.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--gradient-cream)" }}
    >
      {/* Subtle decorative element */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-30"
        style={{ background: "var(--gradient-gold)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="section-label reveal">Kata Mereka</p>
          <div className="gold-divider my-5 reveal reveal-delay-1" />
          <h2 className="font-display text-espresso text-4xl sm:text-5xl lg:text-6xl leading-tight reveal reveal-delay-2">
            Pelanggan <span className="italic text-gold">Kami Berbicara</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i + 2} testimonial-card rounded-sm p-7 lg:p-8 flex flex-col gap-4 relative`}
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-gold/20 absolute top-6 right-6 fill-gold/10"
              />

              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Review text */}
              <p className="font-serif-body text-espresso/80 leading-relaxed text-base italic flex-1">
                "{t.review}"
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-gold/30" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold/30"
                  loading="lazy"
                />
                <div>
                  <p className="font-display text-espresso text-base leading-tight">
                    {t.name}
                  </p>
                  <p className="font-ui text-xs tracking-widest uppercase text-muted-foreground mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
