import { Coffee, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { usePageContent } from "@/context/PageContentContext";

const footerLinks = {
  Menu: ["Espresso", "Latte & Cappuccino", "Cold Brew", "Non-Coffee", "Makanan"],
  Informasi: ["Tentang Kami", "Blog Kopi", "Karier", "Partner", "Hubungi Kami"],
};

export default function FooterSection() {
  const { content } = usePageContent();
  const f = content.footer;

  const socials = [
    { icon: Instagram, href: f.instagramUrl, label: "Instagram" },
    { icon: Facebook, href: f.facebookUrl, label: "Facebook" },
    { icon: Twitter, href: f.twitterUrl, label: "Twitter" },
    { icon: Youtube, href: f.youtubeUrl, label: "Youtube" },
  ];

  return (
    <footer className="relative bg-espresso border-t border-gold/10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px opacity-50" style={{ background: "var(--gradient-gold)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center border border-gold/40">
                <Coffee size={16} className="text-gold" />
              </div>
              <span className="font-display text-xl text-cream">
                Kopi <span className="text-gold">Nusantara</span>
              </span>
            </div>
            <p className="font-serif-body text-cream/50 text-sm leading-relaxed max-w-xs italic">
              {f.tagline}
            </p>
            <div className="flex gap-3 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-cream/40 hover:border-gold hover:text-gold transition-all duration-300 hover:scale-110"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h5 className="font-ui text-xs tracking-[0.25em] uppercase text-gold font-medium">{title}</h5>
              <div className="w-6 h-px" style={{ background: "var(--gradient-gold)" }} />
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-serif-body text-cream/50 hover:text-gold transition-colors duration-300 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gold/10 px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        <p className="font-ui text-xs text-cream/30 tracking-wide">
          © {new Date().getFullYear()} Kopi Nusantara. Hak Cipta Dilindungi.
        </p>
        <div className="flex gap-5">
          {["Kebijakan Privasi", "Syarat & Ketentuan"].map((item) => (
            <a key={item} href="#" className="font-ui text-xs text-cream/30 hover:text-gold/70 transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
