import { useEffect, useState } from "react";
import { X, Tag, Send } from "lucide-react";

const STORAGE_KEY = "kopi_discount_popup_dismissed";
const WA_NUMBER = "6221555588888";

export default function DiscountPopup() {
  const isAdmin = window.location.pathname.startsWith("/admin");
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show on admin pages or if already dismissed
    if (isAdmin || sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setMounted(true), 10);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isAdmin]);

  const handleDismiss = () => {
    setMounted(false);
    setTimeout(() => setVisible(false), 400);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const msg = encodeURIComponent(
      `Halo Kopi Nusantara! Nama saya *${name}* (${phone}). Saya ingin mengklaim diskon 10% untuk order pertama saya. Terima kasih!`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(handleDismiss, 2500);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-espresso/70 transition-opacity duration-400 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleDismiss}
        style={{ backdropFilter: "blur(4px)" }}
      />

      {/* Modal */}
      <div
        className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md transition-all duration-400 ${
          mounted ? "opacity-100 scale-100 translate-y-[-50%]" : "opacity-0 scale-95 translate-y-[-45%]"
        }`}
      >
        <div className="relative bg-roast border border-gold/20 rounded-sm overflow-hidden shadow-[0_24px_80px_hsl(21_100%_5%/0.7)]">
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "var(--gradient-gold)" }} />

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-20 p-1.5 rounded-sm text-cream/40 hover:text-cream/80 hover:bg-gold/10 transition-all duration-200"
          >
            <X size={16} />
          </button>

          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=50')",
              backgroundSize: "cover",
            }}
          />

          <div className="relative z-10 p-7 sm:p-8">
            {!submitted ? (
              <>
                {/* Icon + headline */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 mb-4"
                    style={{ background: "var(--gradient-gold)" }}>
                    <Tag size={22} className="text-espresso" />
                  </div>
                  <p className="section-label mb-2">Penawaran Eksklusif</p>
                  <h2 className="font-display text-cream text-3xl sm:text-4xl leading-tight">
                    Diskon{" "}
                    <span
                      style={{
                        background: "var(--gradient-gold)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      10%
                    </span>
                    <br />
                    <span className="italic text-2xl sm:text-3xl">Order Pertamamu!</span>
                  </h2>
                  <p className="font-serif-body text-cream/50 text-sm mt-2 leading-relaxed italic">
                    Masukkan data kamu dan dapatkan kode diskon eksklusif langsung via WhatsApp.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Nama lengkap kamu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-espresso/60 border border-gold/20 text-cream placeholder-cream/30 font-ui text-sm px-4 py-3 rounded-sm outline-none focus:border-gold/50 transition-colors duration-300"
                  />
                  <input
                    type="tel"
                    placeholder="Nomor HP (cth: 08123456789)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-espresso/60 border border-gold/20 text-cream placeholder-cream/30 font-ui text-sm px-4 py-3 rounded-sm outline-none focus:border-gold/50 transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    className="btn-shimmer flex items-center justify-center gap-2 font-ui text-sm tracking-[0.15em] uppercase font-semibold py-3.5 rounded-sm text-espresso hover:scale-[1.02] transition-transform duration-300 mt-1"
                  >
                    <Send size={14} />
                    Klaim Diskon via WhatsApp
                  </button>
                </form>

                <p className="font-ui text-center text-cream/25 text-[11px] tracking-wide mt-3">
                  Berlaku untuk pelanggan baru · Minimal order Rp 50.000
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Send size={24} className="text-espresso" />
                </div>
                <h3 className="font-display text-cream text-2xl mb-2">Terima Kasih!</h3>
                <p className="font-serif-body text-cream/60 italic text-base leading-relaxed">
                  Cek WhatsApp kamu untuk kode diskon 10% eksklusif dari kami.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
