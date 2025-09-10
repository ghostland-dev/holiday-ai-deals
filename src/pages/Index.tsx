import HeroSection from "@/components/HeroSection";
import DealsSection from "@/components/DealsSection";
import AIPacksSection from "@/components/AIPacksSection";
import DestinationsSection from "@/components/DestinationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import ChatSupport from "@/components/ChatSupport";
import SEOHead from "@/components/SEOHead";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const Index = () => {
  return (
    <>
      <SEOHead />
      <PerformanceMonitor />
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
        <NewsletterSection />
        <AboutSection />
      </div>
      <ChatSupport />
    </>
  );
};

export default Index;
