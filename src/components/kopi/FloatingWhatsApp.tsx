import { MessageCircle } from "lucide-react";

const WA_NUMBER = "6221555588888";

export default function FloatingWhatsApp() {
  if (window.location.pathname.startsWith("/admin")) return null;

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        "Halo Kopi Nusantara! Saya ingin melihat menu dan melakukan pemesanan."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pesan via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 btn-shimmer font-ui text-xs tracking-widest uppercase font-semibold px-4 py-3 rounded-sm shadow-gold hover:scale-105 transition-transform duration-300 text-espresso"
    >
      <MessageCircle size={15} className="shrink-0" />
      <span className="hidden sm:inline">Pesan via WA</span>
    </a>
  );
}
