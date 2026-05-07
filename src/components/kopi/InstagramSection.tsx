import { Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=480&q=85",
    alt: "Espresso hitam pekat",
    likes: "1.2k",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=480&q=85",
    alt: "Latte art",
    likes: "987",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=480&q=85",
    alt: "Cold brew segar",
    likes: "2.1k",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=480&q=85",
    alt: "Flat white",
    likes: "756",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=480&q=85",
    alt: "Croissant premium",
    likes: "1.5k",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=480&q=85",
    alt: "Cappuccino hangat",
    likes: "892",
  },
];

export default function InstagramSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-28 overflow-hidden bg-espresso"
    >
      {/* Gold line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "var(--gradient-gold)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14">
          <p className="section-label reveal">Ikuti Kami</p>
          <div className="gold-divider my-5 reveal reveal-delay-1" />
          <h2 className="font-display text-cream text-4xl sm:text-5xl lg:text-[52px] leading-tight reveal reveal-delay-2">
            Di{" "}
            <span
              className="italic"
              style={{
                background: "var(--gradient-gold)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Instagram
            </span>
          </h2>
          <a
            href="https://instagram.com/kopinusantara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-ui text-sm text-cream/40 hover:text-gold transition-colors duration-300 mt-3 reveal reveal-delay-3"
          >
            <Instagram size={14} />
            @kopinusantara
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 reveal reveal-delay-2">
          {instagramPosts.map((post, i) => (
            <a
              key={post.id}
              href="https://instagram.com/kopinusantara"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square overflow-hidden bg-roast rounded-sm ${
                i === 0 ? "sm:col-span-1" : ""
              }`}
            >
              {/* Photo */}
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "hsl(var(--espresso)/0.75)" }}>
                <Instagram size={22} className="text-gold" />
                <span className="font-display text-cream text-sm">
                  {post.likes} suka
                </span>
              </div>

              {/* Gold corner accent */}
              <div
                className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderTopColor: "hsl(var(--gold))",
                  borderRightColor: "hsl(var(--gold))",
                  borderLeft: "20px solid transparent",
                  borderBottom: "20px solid transparent",
                }}
              />
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-10 reveal">
          <a
            href="https://instagram.com/kopinusantara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-ui text-sm tracking-[0.2em] uppercase font-medium px-8 py-3.5 rounded-sm border border-gold/30 text-gold hover:border-gold hover:bg-gold/5 transition-all duration-300"
          >
            <Instagram size={15} />
            Ikuti @kopinusantara
          </a>
        </div>
      </div>
    </section>
  );
}
