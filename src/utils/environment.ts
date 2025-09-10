// Environment configuration and validation

export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  API_BASE_URL: string;
  GEMINI_API_KEY?: string;
  GOOGLE_ANALYTICS_ID?: string;
  SENTRY_DSN?: string;
  BOOKING_AFFILIATE_ID?: string;
  SKYSCANNER_AFFILIATE_ID?: string;
  EXPEDIA_AFFILIATE_ID?: string;
  AGODA_AFFILIATE_ID?: string;
  PUSH_NOTIFICATION_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  RECAPTCHA_SITE_KEY?: string;
  APP_VERSION: string;
  APP_NAME: string;
  APP_DOMAIN: string;
}

class EnvironmentManager {
  private static instance: EnvironmentManager;
  private env: Environment;

  private constructor() {
    this.env = this.loadEnvironment();
    this.validateRequired();
  }

  static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  private loadEnvironment(): Environment {
    return {
      NODE_ENV: (import.meta.env.NODE_ENV || 'development') as Environment['NODE_ENV'],
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.travelai.com',
      GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
      GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX',
      SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
      BOOKING_AFFILIATE_ID: import.meta.env.VITE_BOOKING_AFFILIATE_ID || 'travelai_booking',
      SKYSCANNER_AFFILIATE_ID: import.meta.env.VITE_SKYSCANNER_AFFILIATE_ID || 'travelai_sky',
      EXPEDIA_AFFILIATE_ID: import.meta.env.VITE_EXPEDIA_AFFILIATE_ID || 'travelai_exp',
      AGODA_AFFILIATE_ID: import.meta.env.VITE_AGODA_AFFILIATE_ID || 'travelai_agoda',
      PUSH_NOTIFICATION_KEY: import.meta.env.VITE_PUSH_NOTIFICATION_KEY,
      SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
      APP_NAME: import.meta.env.VITE_APP_NAME || 'TravelAI',
      APP_DOMAIN: import.meta.env.VITE_APP_DOMAIN || 'travelai.com'
    };
  }

  private validateRequired() {
    const requiredInProduction = [
      'API_BASE_URL',
      'APP_DOMAIN'
    ];

    if (this.env.NODE_ENV === 'production') {
      const missing = requiredInProduction.filter(key => !this.env[key as keyof Environment]);
      if (missing.length > 0) {
        console.error('Missing required environment variables:', missing);
      }
    }
  }

  get(key: keyof Environment): any {
    return this.env[key];
  }

  isDevelopment(): boolean {
    return this.env.NODE_ENV === 'development';
  }

  isProduction(): boolean {
    return this.env.NODE_ENV === 'production';
  }

  getAffiliateId(provider: 'booking' | 'skyscanner' | 'expedia' | 'agoda'): string {
    const mappings = {
      booking: this.env.BOOKING_AFFILIATE_ID,
      skyscanner: this.env.SKYSCANNER_AFFILIATE_ID,
      expedia: this.env.EXPEDIA_AFFILIATE_ID,
      agoda: this.env.AGODA_AFFILIATE_ID
    };

    return mappings[provider] || `travelai_${provider}`;
  }

  getApiUrl(endpoint: string): string {
    return `${this.env.API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
  }

  generateAffiliateLink(provider: string, baseUrl: string, dealId?: string): string {
    const affiliateId = this.getAffiliateId(provider as any);
    const separator = baseUrl.includes('?') ? '&' : '?';
    
    let affiliateParams = `${separator}affiliate_id=${affiliateId}&utm_source=travelai&utm_medium=affiliate&utm_campaign=deals`;
    
    if (dealId) {
      affiliateParams += `&utm_content=${dealId}`;
    }

    // Add timestamp for tracking
    affiliateParams += `&timestamp=${Date.now()}`;

    return baseUrl + affiliateParams;
  }

  // Feature flags for gradual rollout
  isFeatureEnabled(feature: string): boolean {
    const featureFlags = {
      'ai-packs-v2': this.env.NODE_ENV === 'development',
      'push-notifications': true,
      'offline-mode': true,
      'advanced-filters': true,
      'price-alerts': this.env.NODE_ENV !== 'development',
      'social-login': true,
      'premium-features': true
    };

    return featureFlags[feature as keyof typeof featureFlags] ?? false;
  }

  getAppInfo() {
    return {
      name: this.env.APP_NAME,
      version: this.env.APP_VERSION,
      domain: this.env.APP_DOMAIN,
      environment: this.env.NODE_ENV
    };
  }
}

export const env = EnvironmentManager.getInstance();