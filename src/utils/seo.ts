// SEO utilities for dynamic meta tag management and structured data

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  noindex?: boolean;
}

export class SEOManager {
  private static instance: SEOManager;
  
  static getInstance() {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  updatePageSEO(config: SEOConfig) {
    // Update title
    document.title = config.title;
    
    // Update or create meta tags
    this.updateMetaTag('description', config.description);
    
    if (config.keywords) {
      this.updateMetaTag('keywords', config.keywords);
    }
    
    if (config.author) {
      this.updateMetaTag('author', config.author);
    }

    if (config.noindex) {
      this.updateMetaTag('robots', 'noindex, nofollow');
    } else {
      this.updateMetaTag('robots', 'index, follow');
    }

    // Update Open Graph tags
    this.updateOpenGraphTags(config);
    
    // Update Twitter Card tags
    this.updateTwitterTags(config);
    
    // Update canonical URL
    this.updateCanonicalUrl(config.url);
  }

  private updateMetaTag(name: string, content: string) {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  private updateOpenGraphTags(config: SEOConfig) {
    this.updatePropertyTag('og:title', config.title);
    this.updatePropertyTag('og:description', config.description);
    this.updatePropertyTag('og:type', config.type || 'website');
    
    if (config.url) {
      this.updatePropertyTag('og:url', config.url);
    }
    
    if (config.image) {
      this.updatePropertyTag('og:image', config.image);
      this.updatePropertyTag('og:image:alt', config.title);
    }
    
    this.updatePropertyTag('og:site_name', 'TravelAI');
    this.updatePropertyTag('og:locale', 'fr_FR');
  }

  private updateTwitterTags(config: SEOConfig) {
    this.updateMetaTag('twitter:card', 'summary_large_image');
    this.updateMetaTag('twitter:title', config.title);
    this.updateMetaTag('twitter:description', config.description);
    this.updateMetaTag('twitter:site', '@travelai');
    
    if (config.image) {
      this.updateMetaTag('twitter:image', config.image);
    }
  }

  private updatePropertyTag(property: string, content: string) {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  private updateCanonicalUrl(url?: string) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url || window.location.href.split('#')[0];
  }

  generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
    
    this.injectStructuredData('breadcrumb-schema', schema);
  }

  generateArticleSchema(article: {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
  }) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.description,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "TravelAI",
        "logo": {
          "@type": "ImageObject",
          "url": "https://travelai.com/logo.png"
        }
      },
      "datePublished": article.publishedDate,
      "dateModified": article.modifiedDate || article.publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.url
      }
    };

    if (article.image) {
      schema["image"] = {
        "@type": "ImageObject",
        "url": article.image
      };
    }
    
    this.injectStructuredData('article-schema', schema);
  }

  generateTravelAgencySchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "TravelAI",
      "description": "Intelligence artificielle pour trouver les meilleurs deals de voyage",
      "url": "https://travelai.com",
      "logo": "https://travelai.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33-1-23-45-67-89",
        "contactType": "Customer Service",
        "availableLanguage": "French"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Avenue des Champs-Élysées",
        "addressLocality": "Paris",
        "postalCode": "75008",
        "addressCountry": "FR"
      },
      "sameAs": [
        "https://facebook.com/travelai",
        "https://twitter.com/travelai",
        "https://instagram.com/travelai"
      ]
    };
    
    this.injectStructuredData('organization-schema', schema);
  }

  generateTravelOfferSchema(offer: {
    name: string;
    description: string;
    price: number;
    currency: string;
    destination: string;
    validFrom: string;
    validThrough: string;
    provider: string;
  }) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "TravelOffer",
      "name": offer.name,
      "description": offer.description,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": offer.price,
        "priceCurrency": offer.currency
      },
      "destination": {
        "@type": "Place",
        "name": offer.destination
      },
      "validFrom": offer.validFrom,
      "validThrough": offer.validThrough,
      "offeredBy": {
        "@type": "TravelAgency",
        "name": offer.provider
      }
    };
    
    this.injectStructuredData('travel-offer-schema', schema);
  }

  private injectStructuredData(id: string, schema: any) {
    // Remove existing schema with same ID
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
    
    // Add new schema
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  generateSitemap() {
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/blog', priority: '0.8', changefreq: 'weekly' },
      { url: '/contact', priority: '0.6', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>https://travelai.com${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('')}
</urlset>`;

    return sitemap;
  }
}

export const seoManager = SEOManager.getInstance();