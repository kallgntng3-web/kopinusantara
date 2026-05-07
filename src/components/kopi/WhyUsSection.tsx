import { Award, Coffee, Armchair } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { usePageContent } from "@/context/PageContentContext";

const ICONS = [Coffee, Award, Armchair];

export default function WhyUsSection() {
  const sectionRef = useScrollReveal();
  const { content } = usePageContent();
  const w = content.whyUs;

  return (
    <section
      id="keunggulan"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "var(--gradient-cream)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--espresso)) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-20">
          <p className="section-label reveal">{w.label}</p>
          <div className="gold-divider my-5 reveal reveal-delay-1" />
          <h2 className="font-display text-espresso text-4xl sm:text-5xl lg:text-6xl leading-tight reveal reveal-delay-2">
            {w.heading}
          </h2>
          <p className="font-serif-body text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto mt-4 leading-relaxed reveal reveal-delay-3 italic">
            {w.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {w.cards.map((card, i) => {
            const Icon = ICONS[i] ?? Coffee;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 2} group relative bg-cream rounded-sm p-8 lg:p-10 border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:shadow-[0_12px_40px_hsl(var(--espresso)/0.12)] hover:-translate-y-1`}
              >
                <div className="absolute top-0 left-8 right-8 h-px gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-300">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-display text-espresso text-2xl mb-3 leading-snug">{card.title}</h3>
                <div className="w-8 h-px bg-gold/40 mb-4" />
                <p className="font-serif-body text-muted-foreground leading-relaxed text-base">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
