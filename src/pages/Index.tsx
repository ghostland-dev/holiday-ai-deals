import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import DealsSection from "@/components/DealsSection";
import AIPacksSection from "@/components/AIPacksSection";
import DestinationsSection from "@/components/DestinationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import ChatSupport from "@/components/ChatSupport";
import SEOHead from "@/components/SEOHead";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { usePageTracking } from "@/components/LinkTracker";
import { monitoring } from "@/utils/monitoring";

const Index = () => {
  usePageTracking();
  
  // Initialize monitoring
  monitoring.logUserAction('page_visit', { page: 'home' });
  
  return (
    <>
      <SEOHead />
      <PerformanceMonitor />
      <div className="w-full">
        <HeroSection />
        <SearchSection />
        <section id="deals">
          <DealsSection />
        </section>
        <section id="ai-packs">
          <AIPacksSection />
        </section>
        <DestinationsSection />
        <TestimonialsSection />
        <section id="newsletter">
          <NewsletterSection />
        </section>
        <AboutSection />
      </div>
      <ChatSupport />
    </>
  );
};

export default Index;
