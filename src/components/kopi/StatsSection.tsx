import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 500, suffix: "+", label: "Pelanggan Puas", sublabel: "Setiap Hari" },
  { end: 15, suffix: "", label: "Varian Menu", sublabel: "Premium" },
  { end: 3, suffix: "+", label: "Tahun Pengalaman", sublabel: "Melayani Anda" },
];

function useCountUp(end: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);

  return count;
}

function StatItem({
  end,
  suffix,
  label,
  sublabel,
  started,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  sublabel: string;
  started: boolean;
  delay: number;
}) {
  const count = useCountUp(end, 1800, started);

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-8 relative"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      <span className="counter-number text-6xl lg:text-7xl font-bold tracking-tight leading-none">
        {count}
        {suffix}
      </span>
      <span className="font-display text-cream text-xl mt-3 mb-1">{label}</span>
      <span className="section-label text-gold/60 mt-1">{sublabel}</span>
    </div>
  );
}

export default function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-24 overflow-hidden"
      style={{ background: "var(--gradient-dark)" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      {/* Gold line top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--gradient-gold)", opacity: 0.4 }}
      />
      {/* Gold line bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "var(--gradient-gold)", opacity: 0.4 }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gold/20">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              started={started}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
