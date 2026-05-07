import { X, Truck } from "lucide-react";
import { useBanner } from "@/hooks/useBanner";

const WA_NUMBER = "6221555588888";

export default function PromoBanner() {
  const { bannerVisible, dismissBanner } = useBanner();

  if (!bannerVisible) return null;

  return (
    <div
      className="relative flex items-center justify-center h-10 px-10 overflow-hidden"
      style={{ background: "var(--gradient-gold)" }}
    >
      {/* Shimmer sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 bottom-0 w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--gold-shine)/0.6), transparent)",
            animation: "shimmer 3s infinite",
          }}
        />
      </div>

      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo! Saya ingin mengklaim gratis ongkir untuk pembelian pertama saya.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-ui text-xs sm:text-sm font-semibold tracking-wide text-espresso hover:underline underline-offset-2 transition-all duration-200 relative z-10"
      >
        <Truck size={14} className="shrink-0" />
        <span>
          Gratis Ongkir untuk pembelian pertama —{" "}
          <span className="underline font-bold">Pesan sekarang!</span>
        </span>
      </a>

      <button
        onClick={dismissBanner}
        aria-label="Tutup banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-sm text-espresso/70 hover:text-espresso transition-colors duration-200"
      >
        <X size={14} />
      </button>
    </div>
  );
}
