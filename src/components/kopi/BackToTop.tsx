import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't render on admin pages
  if (window.location.pathname.startsWith("/admin")) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      className="fixed z-40 flex items-center justify-center w-10 h-10 rounded-sm border border-gold/40 bg-espresso/90 backdrop-blur-sm text-gold hover:scale-110 hover:border-gold hover:bg-espresso transition-all duration-300"
      style={{
        bottom: "5.5rem",
        right: "1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.85)",
        pointerEvents: visible ? "all" : "none",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s, border-color 0.2s",
        boxShadow: "0 4px 20px hsl(var(--gold)/0.15)",
      }}
    >
      <ChevronUp size={18} />
    </button>
  );
}
