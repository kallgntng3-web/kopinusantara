import { useEffect, useRef } from "react";
import { ChevronDown, Star } from "lucide-react";
import { usePageContent } from "@/context/PageContentContext";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const { content } = usePageContent();
  const h = content.hero;

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="beranda"
      className="relative w-full h-screen min-h-[680px] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] parallax-bg"
        style={{
          backgroundImage: `url('${h.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
      <div className="absolute inset-0 bg-espresso/50" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <div className="section-label opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {h.label}
        </div>

        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="gold-divider" />
        </div>

        {/* Star Rating */}
        <div
          className="opacity-0 animate-fade-in flex flex-col items-center gap-1.5"
          style={{ animationDelay: "0.45s" }}
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={16}
                className={i <= 4 ? "fill-gold text-gold" : "text-gold"}
                style={i === 5 ? { clipPath: "inset(0 10% 0 0)", fill: "hsl(var(--gold))" } : {}}
              />
            ))}
            <span
              className="font-display text-lg ml-2 font-semibold"
              style={{
                background: "var(--gradient-gold)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {h.ratingText}
            </span>
          </div>
          <p className="font-ui text-xs tracking-widest uppercase text-cream/40">{h.ratingLabel}</p>
        </div>

        {/* Main Heading */}
        <h1
          className="font-display text-cream text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.05] tracking-tight opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {h.titleLine1}
          <br />
          <span
            className="italic"
            style={{
              background: "var(--gradient-gold)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {h.titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-serif-body text-cream/70 text-xl sm:text-2xl max-w-xl leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: "0.75s", fontStyle: "italic" }}
        >
          {h.subtitle}
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 mt-2 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.95s" }}
        >
          <a
            href="/menu"
            className="btn-shimmer font-ui text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 rounded-sm shadow-gold hover:scale-105 transition-transform duration-300"
          >
            {h.ctaPrimary}
          </a>
          <a
            href="/#keunggulan"
            className="font-ui text-sm tracking-[0.2em] uppercase font-medium px-10 py-4 rounded-sm border border-cream/30 text-cream hover:border-gold hover:text-gold transition-all duration-300"
          >
            {h.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 bounce-soft">
        <span className="section-label text-cream/40">Scroll</span>
        <ChevronDown size={20} className="text-gold/60" />
      </div>
    </section>
  );
}
