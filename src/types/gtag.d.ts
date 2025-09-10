// Google Analytics gtag type declarations
declare global {
  function gtag(
    command: 'config' | 'event' | 'consent',
    targetId: string | 'default' | 'update',
    config?: {
      page_path?: string;
      page_title?: string;
      page_location?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
      analytics_storage?: 'granted' | 'denied';
      ad_storage?: 'granted' | 'denied';
      personalization_storage?: 'granted' | 'denied';
      [key: string]: any;
    }
  ): void;
}

export {};