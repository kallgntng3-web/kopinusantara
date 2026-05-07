import { createContext, useState, ReactNode } from "react";

interface BannerContextType {
  bannerVisible: boolean;
  dismissBanner: () => void;
  headerHeight: number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BannerContext = createContext<BannerContextType>({
  bannerVisible: true,
  dismissBanner: () => {},
  headerHeight: 112,
});

export function BannerProvider({ children }: { children: ReactNode }) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const dismissBanner = () => setBannerVisible(false);
  const headerHeight = bannerVisible ? 112 : 72;

  return (
    <BannerContext.Provider value={{ bannerVisible, dismissBanner, headerHeight }}>
      {children}
    </BannerContext.Provider>
  );
}
