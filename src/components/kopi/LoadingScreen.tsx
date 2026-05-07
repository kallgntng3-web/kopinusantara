import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    // in → hold after 300ms
    const t1 = setTimeout(() => setPhase("hold"), 300);
    // hold → out after 1600ms
    const t2 = setTimeout(() => setPhase("out"), 1600);
    // done after fade finishes
    const t3 = setTimeout(() => setPhase("done"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "hsl(var(--espresso))",
        opacity: phase === "out" ? 0 : 1,
        transition: phase === "out" ? "opacity 0.6s cubic-bezier(0.4,0,0.2,1)" : "opacity 0.3s ease",
        pointerEvents: phase === "out" ? "none" : "all",
      }}
    >
      {/* Logo icon */}
      <div
        className="relative mb-6"
        style={{
          transform: phase === "in" ? "scale(0.7) translateY(16px)" : "scale(1) translateY(0)",
          opacity: phase === "in" ? 0 : 1,
          transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
        }}
      >
        {/* Pulsing glow behind logo */}
        <div
          className="absolute inset-0 rounded-full blur-xl animate-pulse"
          style={{ background: "hsl(var(--gold)/0.25)", transform: "scale(1.8)" }}
        />
        <div
          className="relative w-16 h-16 rounded-full flex items-center justify-center border border-gold/40"
          style={{ background: "var(--gradient-gold)" }}
        >
          <Coffee size={26} className="text-espresso" />
        </div>
      </div>

      {/* Brand name */}
      <div
        style={{
          transform: phase === "in" ? "translateY(20px)" : "translateY(0)",
          opacity: phase === "in" ? 0 : 1,
          transition: "transform 0.5s 0.15s cubic-bezier(0.4,0,0.2,1), opacity 0.4s 0.15s ease",
        }}
      >
        <h1 className="font-display text-cream text-3xl sm:text-4xl tracking-wide text-center">
          Kopi{" "}
          <span
            style={{
              background: "var(--gradient-gold)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nusantara
          </span>
        </h1>
      </div>

      {/* Tagline */}
      <div
        className="mt-2"
        style={{
          opacity: phase === "in" ? 0 : 0.5,
          transform: phase === "in" ? "translateY(10px)" : "translateY(0)",
          transition: "transform 0.5s 0.25s ease, opacity 0.5s 0.25s ease",
        }}
      >
        <p className="font-serif-body italic text-cream/50 text-base tracking-widest text-center">
          Setiap Tegukan, Sebuah Cerita
        </p>
      </div>

      {/* Gold loading bar */}
      <div
        className="mt-8 h-px rounded-full overflow-hidden"
        style={{ width: "80px", background: "hsl(var(--gold)/0.2)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "var(--gradient-gold)",
            width: phase === "hold" || phase === "out" ? "100%" : "0%",
            transition: "width 0.9s 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}
