import { MapPin, Clock, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageContent } from "@/context/PageContentContext";

export default function LocationSection() {
  const sectionRef = useScrollReveal();
  const { content } = usePageContent();
  const loc = content.location;

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-espresso"
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-30" style={{ background: "var(--gradient-gold)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-30" style={{ background: "var(--gradient-gold)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16">
          <p className="section-label reveal">Temukan Kami</p>
          <div className="gold-divider my-5 reveal reveal-delay-1" />
          <h2 className="font-display text-cream text-4xl sm:text-5xl lg:text-6xl leading-tight reveal reveal-delay-2">
            Lokasi & <span className="text-gold italic">Jam Buka</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Info */}
          <div className="flex flex-col gap-8 reveal reveal-delay-2">
            {/* Address */}
            <div className="flex gap-4">
              <div className="mt-0.5 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-gold" />
              </div>
              <div>
                <h4 className="font-display text-cream text-lg mb-1">Alamat</h4>
                <p className="font-serif-body text-cream/60 text-base leading-relaxed">
                  {loc.address}<br />{loc.city}<br />Indonesia
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="mt-0.5 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <Clock size={16} className="text-gold" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-cream text-lg mb-3">Jam Buka</h4>
                <div className="flex flex-col gap-2">
                  {loc.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-gold/10 pb-2">
                      <span className="font-ui text-sm text-cream/50">{h.day}</span>
                      <span className="font-display text-gold text-sm">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-4">
              <div className="mt-0.5 w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-gold" />
              </div>
              <div>
                <h4 className="font-display text-cream text-lg mb-1">Kontak</h4>
                <a
                  href={`tel:${loc.phone.replace(/\s/g, "")}`}
                  className="font-serif-body text-cream/60 text-base hover:text-gold transition-colors duration-300 block"
                >
                  {loc.phone}
                </a>
                <a
                  href={`mailto:${loc.email}`}
                  className="font-serif-body text-cream/60 text-base hover:text-gold transition-colors duration-300 block"
                >
                  {loc.email}
                </a>
              </div>
            </div>

            {/* Directions CTA */}
            <a
              href={`https://maps.google.com?q=${encodeURIComponent(loc.address + ", " + loc.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer font-ui text-sm tracking-[0.2em] uppercase font-medium px-8 py-3.5 rounded-sm self-start hover:scale-105 transition-transform duration-300 mt-2"
            >
              Petunjuk Arah
            </a>
          </div>

          {/* Right: Map */}
          <div className="reveal reveal-delay-3 rounded-sm overflow-hidden border border-gold/20 shadow-deep">
            <iframe
              src={loc.mapsUrl}
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kopi Nusantara"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
