import HeroSection from "@/components/HeroSection";
import DealsSection from "@/components/DealsSection";
import AIPacksSection from "@/components/AIPacksSection";
import DestinationsSection from "@/components/DestinationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <section id="deals">
        <DealsSection />
      </section>
      <section id="ai-packs">
        <AIPacksSection />
      </section>
      <DestinationsSection />
      <TestimonialsSection />
      <AboutSection />
    </div>
  );
};

export default Index;
