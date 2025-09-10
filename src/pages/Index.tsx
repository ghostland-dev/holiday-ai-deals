import HeroSection from "@/components/HeroSection";
import DealsSection from "@/components/DealsSection";
import AIPacksSection from "@/components/AIPacksSection";

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
    </div>
  );
};

export default Index;
