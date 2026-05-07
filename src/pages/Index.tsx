import SiteHeader from "@/components/kopi/SiteHeader";
import HeroSection from "@/components/kopi/HeroSection";
import WhyUsSection from "@/components/kopi/WhyUsSection";
import StatsSection from "@/components/kopi/StatsSection";
import MenuSection from "@/components/kopi/MenuSection";
import TestimonialsSection from "@/components/kopi/TestimonialsSection";
import InstagramSection from "@/components/kopi/InstagramSection";
import ReservationSection from "@/components/kopi/ReservationSection";
import LocationSection from "@/components/kopi/LocationSection";
import FooterSection from "@/components/kopi/FooterSection";

const Index = () => {
  return (
    <div className="w-full min-h-screen">
      <SiteHeader />
      <HeroSection />
      <WhyUsSection />
      <StatsSection />
      <MenuSection />
      <TestimonialsSection />
      <InstagramSection />
      <ReservationSection />
      <LocationSection />
      <FooterSection />
    </div>
  );
};

export default Index;
