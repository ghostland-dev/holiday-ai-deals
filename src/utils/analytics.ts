// Analytics and tracking utilities for production monitoring

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class Analytics {
  private isInitialized = false;

  // Initialize analytics services
  init() {
    if (this.isInitialized) return;
    
    // Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        personalization_storage: 'denied'
      });
      
      (window as any).gtag('config', 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href
      });
    }

    this.isInitialized = true;
  }

  // Track custom events
  track(event: AnalyticsEvent) {
    try {
      // Google Analytics 4
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          ...event.custom_parameters
        });
      }

      // Console log for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', event);
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  // Track page views
  trackPageView(path: string, title?: string) {
    try {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('config', 'G-XXXXXXXXXX', {
          page_path: path,
          page_title: title || document.title
        });
      }
    } catch (error) {
      console.warn('Page view tracking failed:', error);
    }
  }

  // Track affiliate link clicks
  trackAffiliateClick(provider: string, dealId: string, price?: number) {
    this.track({
      action: 'affiliate_click',
      category: 'conversion',
      label: provider,
      value: price,
      custom_parameters: {
        deal_id: dealId,
        provider: provider,
        timestamp: Date.now()
      }
    });
  }

  // Track AI pack generation
  trackAIPackGeneration(preferences: any, success: boolean) {
    this.track({
      action: success ? 'ai_pack_generated' : 'ai_pack_failed',
      category: 'ai_interaction',
      label: preferences.interests || 'unknown',
      value: parseInt(preferences.budget) || 0,
      custom_parameters: {
        preferences: preferences,
        timestamp: Date.now()
      }
    });
  }

  // Track user registration
  trackUserRegistration(method: string) {
    this.track({
      action: 'sign_up',
      category: 'user_engagement',
      label: method,
      custom_parameters: {
        registration_method: method,
        timestamp: Date.now()
      }
    });
  }

  // Track search queries
  trackSearch(query: string, results_count: number) {
    this.track({
      action: 'search',
      category: 'user_behavior',
      label: query,
      value: results_count,
      custom_parameters: {
        search_term: query,
        results_count: results_count,
        timestamp: Date.now()
      }
    });
  }

  // Track newsletter subscription
  trackNewsletterSignup(email: string) {
    this.track({
      action: 'newsletter_signup',
      category: 'user_engagement',
      custom_parameters: {
        email_domain: email.split('@')[1],
        timestamp: Date.now()
      }
    });
  }

  // Track errors for monitoring
  // Identify user for tracking
  identify(userId: string, traits?: Record<string, any>) {
    try {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('config', 'G-XXXXXXXXXX', {
          user_id: userId,
          custom_map: traits
        });
      }
      
      // Store user info for future events
      if (typeof window !== 'undefined') {
        (window as any).__analytics_user = { id: userId, ...traits };
      }
    } catch (error) {
      console.warn('User identification failed:', error);
    }
  }

  // Track errors for monitoring
  trackError(error: Error, context?: string) {
    this.track({
      action: 'javascript_error',
      category: 'technical',
      label: error.message,
      custom_parameters: {
        error_name: error.name,
        error_stack: error.stack,
        context: context,
        url: window.location.href,
        user_agent: navigator.userAgent,
        timestamp: Date.now()
      }
    });
  }

  // Track performance metrics
  trackPerformance() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      this.track({
        action: 'page_load_time',
        category: 'performance',
        value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        custom_parameters: {
          dns_time: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
          connect_time: Math.round(navigation.connectEnd - navigation.connectStart),
          response_time: Math.round(navigation.responseEnd - navigation.responseStart),
          dom_ready: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
          timestamp: Date.now()
        }
      });
    }
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Auto-initialize on import
analytics.init();

// Track performance after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => analytics.trackPerformance(), 1000);
  });
}

export default analytics;