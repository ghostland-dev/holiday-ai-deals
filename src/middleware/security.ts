// Security middleware and utilities for production
import { env } from '@/utils/environment';
import { monitoring } from '@/utils/monitoring';

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(private config: RateLimitConfig) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Get existing requests for this identifier
    const existingRequests = this.requests.get(identifier) || [];
    
    // Filter out old requests
    const recentRequests = existingRequests.filter(timestamp => timestamp > windowStart);
    
    // Check if under limit
    if (recentRequests.length >= this.config.maxRequests) {
      monitoring.reportMetric('rate_limit_exceeded', 1, { identifier });
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }
  
  cleanup() {
    const now = Date.now();
    for (const [identifier, requests] of this.requests.entries()) {
      const validRequests = requests.filter(timestamp => 
        timestamp > now - this.config.windowMs
      );
      
      if (validRequests.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, validRequests);
      }
    }
  }
}

// Rate limiters for different endpoints
export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
});

export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
});

export const searchRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30,
});

// Cleanup rate limiters periodically
setInterval(() => {
  apiRateLimiter.cleanup();
  authRateLimiter.cleanup();
  searchRateLimiter.cleanup();
}, 5 * 60 * 1000); // Every 5 minutes

// Input validation and sanitization
export class InputValidator {
  static sanitizeString(input: string, maxLength = 1000): string {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  }
  
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 320;
  }
  
  static isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
  
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  static sanitizeSearchQuery(query: string): string {
    return this.sanitizeString(query, 200)
      .replace(/[^\w\s\-.,!?]/g, '') // Allow only word chars, spaces, and basic punctuation
      .replace(/\s+/g, ' '); // Normalize whitespace
  }
  
  static validateDealData(deal: any): string[] {
    const errors: string[] = [];
    
    if (!deal.title || typeof deal.title !== 'string' || deal.title.length < 3) {
      errors.push('Title must be at least 3 characters');
    }
    
    if (!deal.description || typeof deal.description !== 'string' || deal.description.length < 10) {
      errors.push('Description must be at least 10 characters');
    }
    
    if (typeof deal.price !== 'number' || deal.price <= 0) {
      errors.push('Price must be a positive number');
    }
    
    if (typeof deal.original_price !== 'number' || deal.original_price <= deal.price) {
      errors.push('Original price must be greater than current price');
    }
    
    if (!deal.destination || typeof deal.destination !== 'string') {
      errors.push('Destination is required');
    }
    
    if (!deal.image_url || !this.isValidUrl(deal.image_url)) {
      errors.push('Valid image URL is required');
    }
    
    return errors;
  }
}

// CSRF protection
export class CSRFProtection {
  private static tokens: Set<string> = new Set();
  
  static generateToken(): string {
    const token = crypto.randomUUID();
    this.tokens.add(token);
    
    // Cleanup old tokens after 1 hour
    setTimeout(() => {
      this.tokens.delete(token);
    }, 60 * 60 * 1000);
    
    return token;
  }
  
  static validateToken(token: string): boolean {
    return this.tokens.has(token);
  }
  
  static removeToken(token: string): void {
    this.tokens.delete(token);
  }
}

// Content Security Policy
export const getCSPHeader = (): string => {
  const nonce = crypto.randomUUID();
  
  const policies = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://js.stripe.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.travelai.com wss://api.travelai.com https://www.google-analytics.com",
    "frame-src 'self' https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  
  return policies.join('; ');
};

// Security headers
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    'Content-Security-Policy': getCSPHeader(),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  };
};

// API request security wrapper
export const secureApiRequest = async (
  url: string,
  options: RequestInit = {},
  rateLimiter?: RateLimiter
): Promise<Response> => {
  // Rate limiting
  if (rateLimiter) {
    const clientId = localStorage.getItem('client_id') || 'anonymous';
    if (!rateLimiter.isAllowed(clientId)) {
      throw new Error('Rate limit exceeded');
    }
  }
  
  // Add security headers
  const headers = {
    ...options.headers,
    'X-Requested-With': 'XMLHttpRequest',
  };
  
  // Add CSRF token for state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method?.toUpperCase() || '')) {
    const csrfToken = sessionStorage.getItem('csrf_token');
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
  }
  
  const startTime = performance.now();
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    const duration = performance.now() - startTime;
    monitoring.logApiCall(url, duration, response.status);
    
    return response;
  } catch (error) {
    const duration = performance.now() - startTime;
    monitoring.logApiCall(url, duration, 0);
    throw error;
  }
};

// Initialize security on page load
export const initializeSecurity = () => {
  // Generate client ID for rate limiting
  if (!localStorage.getItem('client_id')) {
    localStorage.setItem('client_id', crypto.randomUUID());
  }
  
  // Generate CSRF token
  if (!sessionStorage.getItem('csrf_token')) {
    sessionStorage.setItem('csrf_token', CSRFProtection.generateToken());
  }
  
  // Set up security event listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Disable right-click in production
    if (env.isProduction()) {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    }
    
    // Monitor for potential XSS attempts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'SCRIPT' && !element.hasAttribute('nonce')) {
              monitoring.reportError({
                message: 'Potential XSS attempt detected',
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: new Date(),
                sessionId: monitoring.getSessionInfo().sessionId,
                buildVersion: env.get('APP_VERSION'),
                environment: env.get('NODE_ENV'),
              });
            }
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
  
  monitoring.reportMetric('security_initialized', 1);
};