import { createContext, useContext, useState, ReactNode, useCallback } from "react";

/* ── Types ── */
export interface HeroContent {
  label: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ratingText: string;
  ratingLabel: string;
  bgImage: string;
}

export interface WhyUsCard {
  title: string;
  desc: string;
}

export interface WhyUsContent {
  label: string;
  heading: string;
  subtitle: string;
  cards: WhyUsCard[];
}

export interface HourRow {
  day: string;
  time: string;
}

export interface LocationContent {
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: HourRow[];
  mapsUrl: string;
}

export interface FooterContent {
  tagline: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
}

export interface PageContent {
  hero: HeroContent;
  whyUs: WhyUsContent;
  location: LocationContent;
  footer: FooterContent;
}

/* ── Defaults (match hardcoded values in components) ── */
// eslint-disable-next-line react-refresh/only-export-components
export const DEFAULT_CONTENT: PageContent = {
  hero: {
    label: "Kopi Pilihan Nusantara",
    titleLine1: "Setiap Tegukan,",
    titleLine2: "Sebuah Cerita",
    subtitle: "Dari pegunungan Aceh hingga lereng Toraja — kami hadirkan cita rasa kopi Indonesia terbaik di setiap cangkir.",
    ctaPrimary: "Pesan Sekarang",
    ctaSecondary: "Selengkapnya",
    ratingText: "4.9/5",
    ratingLabel: "Berdasarkan 200+ ulasan Google",
    bgImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920&q=85",
  },
  whyUs: {
    label: "Mengapa Kami Berbeda",
    heading: "Keunggulan Kami",
    subtitle: "Tiga pilar yang menjadikan Kopi Nusantara pilihan utama para pecinta kopi sejati.",
    cards: [
      {
        title: "Biji Kopi Pilihan",
        desc: "Kami hanya menggunakan biji kopi single origin grade 1 dari perkebunan terbaik Indonesia — dipetik tangan, diproses dengan cermat untuk menjaga cita rasa autentiknya.",
      },
      {
        title: "Barista Berpengalaman",
        desc: "Tim barista kami telah memenangkan berbagai kompetisi nasional. Setiap cangkir diracik dengan presisi dan penuh dedikasi untuk memastikan kesempurnaan di setiap tegukan.",
      },
      {
        title: "Suasana Nyaman",
        desc: "Interior kami dirancang dengan sentuhan tradisional Nusantara yang elegan — tempat sempurna untuk beristirahat, bekerja, atau berbincang dalam kehangatan yang sesungguhnya.",
      },
    ],
  },
  location: {
    address: "Jl. Sudirman No. 88, Lantai 1",
    city: "Jakarta Pusat, DKI Jakarta 10220",
    phone: "+62 21 5555 8888",
    email: "info@kopinusantara.id",
    hours: [
      { day: "Senin – Jumat", time: "07.00 – 22.00" },
      { day: "Sabtu – Minggu", time: "08.00 – 23.00" },
      { day: "Hari Libur Nasional", time: "09.00 – 21.00" },
    ],
    mapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJl.%20Jend.%20Sudirman%2C%20Jakarta!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid",
  },
  footer: {
    tagline:
      "Menghadirkan cita rasa kopi terbaik dari seluruh Nusantara — dengan keanggunan, kehangatan, dan dedikasi penuh.",
    instagramUrl: "https://instagram.com/kopinusantara",
    facebookUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
  },
};

const STORAGE_KEY = "kn_page_content";

function loadContent(): PageContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    // Deep merge: ensure new default fields are not missing
    const saved = JSON.parse(raw) as Partial<PageContent>;
    return {
      hero: { ...DEFAULT_CONTENT.hero, ...saved.hero },
      whyUs: {
        ...DEFAULT_CONTENT.whyUs,
        ...saved.whyUs,
        cards: saved.whyUs?.cards ?? DEFAULT_CONTENT.whyUs.cards,
      },
      location: {
        ...DEFAULT_CONTENT.location,
        ...saved.location,
        hours: saved.location?.hours ?? DEFAULT_CONTENT.location.hours,
      },
      footer: { ...DEFAULT_CONTENT.footer, ...saved.footer },
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

/* ── Context ── */
interface PageContentContextType {
  content: PageContent;
  save: (next: PageContent) => void;
  reset: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PageContentContext = createContext<PageContentContextType>({
  content: DEFAULT_CONTENT,
  save: () => {},
  reset: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const usePageContent = () => useContext(PageContentContext);

export function PageContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PageContent>(loadContent);

  const save = useCallback((next: PageContent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setContent(next);
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(DEFAULT_CONTENT);
  }, []);

  return (
    <PageContentContext.Provider value={{ content, save, reset }}>
      {children}
    </PageContentContext.Provider>
  );
}
