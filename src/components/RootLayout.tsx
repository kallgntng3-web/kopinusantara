import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to top on every route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return <Outlet />;
}
