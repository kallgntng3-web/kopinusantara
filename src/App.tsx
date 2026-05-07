import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { routers } from "./router";
import { BannerProvider } from "@/context/BannerContext";
import { AdminProvider } from "@/context/AdminContext";
import { PageContentProvider } from "@/context/PageContentContext";
import FloatingWhatsApp from "@/components/kopi/FloatingWhatsApp";
import DiscountPopup from "@/components/kopi/DiscountPopup";
import LoadingScreen from "@/components/kopi/LoadingScreen";
import BackToTop from "@/components/kopi/BackToTop";

const queryClient = new QueryClient();

const App = () => {
  const router = createBrowserRouter(routers);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PageContentProvider>
          <AdminProvider>
            <BannerProvider>
              <LoadingScreen />
              <Toaster />
              <Sonner />
              <RouterProvider router={router} />
              <FloatingWhatsApp />
              <DiscountPopup />
              <BackToTop />
            </BannerProvider>
          </AdminProvider>
        </PageContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
