import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import CookieConsent from "./components/CookieConsent";
import PWAInstaller from "./components/PWAInstaller";
import PerformanceMonitor from "./components/PerformanceMonitor";
import LazyWrapper, { 
  LazyUserDashboard, 
  LazyAdminDashboard, 
  LazyBlog, 
  LazyContact, 
  LazyPrivacyPolicy, 
  LazyTerms 
} from "./components/LazyLoad";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <div className="min-h-screen flex flex-col">
              <PerformanceMonitor />
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/privacy" element={
                    <LazyWrapper>
                      <LazyPrivacyPolicy />
                    </LazyWrapper>
                  } />
                  <Route path="/terms" element={
                    <LazyWrapper>
                      <LazyTerms />
                    </LazyWrapper>
                  } />
                  <Route path="/contact" element={
                    <LazyWrapper>
                      <LazyContact />
                    </LazyWrapper>
                  } />
                  <Route path="/blog" element={
                    <LazyWrapper>
                      <LazyBlog />
                    </LazyWrapper>
                  } />
                  <Route path="/dashboard" element={
                    <LazyWrapper>
                      <LazyUserDashboard />
                    </LazyWrapper>
                  } />
                  <Route path="/admin" element={
                    <LazyWrapper>
                      <LazyAdminDashboard />
                    </LazyWrapper>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <CookieConsent />
              <PWAInstaller />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
