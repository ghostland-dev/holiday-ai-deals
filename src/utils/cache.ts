// Client-side caching utilities for better performance

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };
    
    this.cache.set(key, item);
    
    // Also store in localStorage for persistence
    try {
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to store in localStorage:', error);
    }
  }

  get<T>(key: string): T | null {
    let item = this.cache.get(key);
    
    // If not in memory, try localStorage
    if (!item) {
      try {
        const stored = localStorage.getItem(`cache_${key}`);
        if (stored) {
          item = JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Failed to retrieve from localStorage:', error);
      }
    }

    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.delete(key);
      return null;
    }

    // Update memory cache if it was from localStorage
    if (!this.cache.has(key)) {
      this.cache.set(key, item);
    }

    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  clear(): void {
    this.cache.clear();
    
    // Clear localStorage cache items
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  getStats() {
    let totalSize = 0;
    let expiredCount = 0;
    const now = Date.now();
    
    this.cache.forEach((item) => {
      totalSize += JSON.stringify(item).length;
      if (now > item.expiry) {
        expiredCount++;
      }
    });

    return {
      itemCount: this.cache.size,
      expiredCount,
      estimatedSize: totalSize,
      memoryUsage: `${(totalSize / 1024).toFixed(2)} KB`
    };
  }

  // Cleanup expired items
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((item, key) => {
      if (now > item.expiry) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.delete(key));
    
    console.log(`[Cache] Cleaned up ${keysToDelete.length} expired items`);
  }
}

export const cache = CacheManager.getInstance();

// Auto-cleanup every 10 minutes
setInterval(() => {
  cache.cleanup();
}, 10 * 60 * 1000);

// Specific cache utilities for common use cases
export const dealCache = {
  set: (deals: any[], ttl = 2 * 60 * 1000) => cache.set('deals', deals, ttl), // 2 minutes
  get: () => cache.get<any[]>('deals'),
  clear: () => cache.delete('deals')
};

export const searchCache = {
  set: (query: string, results: any[], ttl = 5 * 60 * 1000) => 
    cache.set(`search_${query.toLowerCase()}`, results, ttl), // 5 minutes
  get: (query: string) => cache.get<any[]>(`search_${query.toLowerCase()}`),
  clear: () => {
    // Clear all search cache items from localStorage
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_search_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear search cache:', error);
    }
  }
};

export const destinationCache = {
  set: (destinations: any[], ttl = 30 * 60 * 1000) => 
    cache.set('destinations', destinations, ttl), // 30 minutes
  get: () => cache.get<any[]>('destinations'),
  clear: () => cache.delete('destinations')
};

export const userPreferencesCache = {
  set: (prefs: any, ttl = 24 * 60 * 60 * 1000) => 
    cache.set('user_preferences', prefs, ttl), // 24 hours
  get: () => cache.get<any>('user_preferences'),
  clear: () => cache.delete('user_preferences')
};

export default cache;