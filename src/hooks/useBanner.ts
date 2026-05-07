import { useContext } from "react";
import { BannerContext } from "@/context/BannerContext";

export const useBanner = () => useContext(BannerContext);
