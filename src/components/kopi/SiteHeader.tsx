import { useEffect, useState } from "react";
import { Coffee, Menu, X } from "lucide-react";
import { useBanner } from "@/hooks/useBanner";
import PromoBanner from "./PromoBanner";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Keunggulan", href: "/#keunggulan" },
  { label: "Menu", href: "/menu" },
  { label: "Reservasi", href: "/#reservasi" },
  { label: "Lokasi", href: "/#lokasi" },
];

export default function SiteHeader() {
  const { bannerVisible } = useBanner();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Promo Banner */}
      <PromoBanner />

      {/* Navbar */}
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-espresso/97 shadow-[0_2px_24px_hsl(21_100%_5%/0.5)]"
            : bannerVisible
            ? "bg-espresso/80"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center border border-gold/40 group-hover:border-gold transition-colors duration-300">
              <Coffee size={16} className="text-gold" />
            </div>
            <span className="font-display text-xl text-cream tracking-wide">
              Kopi <span className="text-gold">Nusantara</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-ui text-sm tracking-widest uppercase text-cream/70 hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <a
              href="/menu"
              className="btn-shimmer font-ui text-xs tracking-[0.2em] uppercase font-medium px-6 py-2.5 rounded-sm transition-transform duration-300 hover:scale-105"
            >
              Pesan Sekarang
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-cream p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-espresso/98 border-t border-gold/10`}
        >
          <nav className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-ui text-sm tracking-widest uppercase text-cream/70 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/menu"
              onClick={() => setMobileOpen(false)}
              className="btn-shimmer font-ui text-xs tracking-[0.2em] uppercase font-medium px-6 py-3 rounded-sm text-center mt-2"
            >
              Pesan Sekarang
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
}
