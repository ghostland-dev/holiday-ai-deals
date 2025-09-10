// Production monitoring, error tracking, and health checks

import { analytics } from './analytics';
import { env } from './environment';

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  userAgent: string;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  buildVersion: string;
  environment: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class MonitoringService {
  private static instance: MonitoringService;
  private sessionId: string;
  private errorQueue: ErrorReport[] = [];
  private metricsQueue: PerformanceMetric[] = [];
  private isOnline: boolean = navigator.onLine;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.setupErrorHandlers();
    this.setupPerformanceMonitoring();
    this.setupNetworkMonitoring();
    this.startHealthChecks();
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        sessionId: this.sessionId,
        buildVersion: env.get('APP_VERSION'),
        environment: env.get('NODE_ENV')
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        sessionId: this.sessionId,
        buildVersion: env.get('APP_VERSION'),
        environment: env.get('NODE_ENV')
      });
    });

    // React error boundary integration
    window.addEventListener('react-error', ((event: CustomEvent) => {
      this.reportError({
        message: event.detail.error.message,
        stack: event.detail.error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        sessionId: this.sessionId,
        buildVersion: env.get('APP_VERSION'),
        environment: env.get('NODE_ENV')
      });
    }) as EventListener);
  }

  private setupPerformanceMonitoring() {
    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.reportMetric('LCP', lastEntry.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          this.reportMetric('FID', (entry as any).processingStart - entry.startTime);
        });
      }).observe({ type: 'first-input', buffered: true });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const layoutEntry = entry as any;
          if (!layoutEntry.hadRecentInput) {
            clsValue += layoutEntry.value;
          }
        }
        this.reportMetric('CLS', clsValue);
      }).observe({ type: 'layout-shift', buffered: true });

      // Navigation timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          this.reportMetric('TTFB', navigation.responseStart - navigation.fetchStart);
          this.reportMetric('FCP', navigation.responseEnd - navigation.fetchStart);
          this.reportMetric('Load', navigation.loadEventEnd - navigation.fetchStart);
        }, 0);
      });
    }
  }

  private setupNetworkMonitoring() {
    // Online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueues();
      this.reportMetric('network-status', 1, { status: 'online' });
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.reportMetric('network-status', 0, { status: 'offline' });
    });

    // Network quality monitoring
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.reportMetric('network-quality', 1, {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      });

      connection.addEventListener('change', () => {
        this.reportMetric('network-quality', 1, {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        });
      });
    }
  }

  private startHealthChecks() {
    // Periodic health check
    setInterval(() => {
      this.performHealthCheck();
    }, 60000); // Every minute

    // Page visibility monitoring
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.reportMetric('page-visibility', 1, { state: 'visible' });
      } else {
        this.reportMetric('page-visibility', 0, { state: 'hidden' });
      }
    });
  }

  private async performHealthCheck() {
    const healthMetrics = {
      memory: this.getMemoryUsage(),
      storage: await this.getStorageUsage(),
      activeConnections: this.getActiveConnections(),
      timestamp: Date.now()
    };

    this.reportMetric('health-check', 1, healthMetrics);

    // Check for memory leaks
    if (healthMetrics.memory.usedJSHeapSize > 100 * 1024 * 1024) { // 100MB
      this.reportError({
        message: 'Potential memory leak detected',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        sessionId: this.sessionId,
        buildVersion: env.get('APP_VERSION'),
        environment: env.get('NODE_ENV')
      });
    }
  }

  private getMemoryUsage() {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return { usedJSHeapSize: 0, totalJSHeapSize: 0, jsHeapSizeLimit: 0 };
  }

  private async getStorageUsage() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        return await navigator.storage.estimate();
      } catch (error) {
        return { usage: 0, quota: 0 };
      }
    }
    return { usage: 0, quota: 0 };
  }

  private getActiveConnections(): number {
    // Count active fetch requests, WebSocket connections, etc.
    return (window as any).__activeConnections || 0;
  }

  reportError(error: ErrorReport) {
    console.error('[Monitoring] Error reported:', error);
    
    // Track error in analytics
    analytics.trackError(new Error(error.message), 'monitoring');

    if (this.isOnline) {
      this.sendErrorReport(error);
    } else {
      this.errorQueue.push(error);
    }
  }

  reportMetric(name: string, value: number, metadata?: Record<string, any>) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: new Date(),
      metadata: {
        ...metadata,
        sessionId: this.sessionId,
        url: window.location.href
      }
    };

    if (this.isOnline) {
      this.sendMetric(metric);
    } else {
      this.metricsQueue.push(metric);
    }
  }

  private async sendErrorReport(error: ErrorReport) {
    try {
      // Send to your monitoring service (Sentry, LogRocket, etc.)
      if (env.get('SENTRY_DSN')) {
        // Sentry integration would go here
      }

      // Send to custom endpoint
      await fetch(env.getApiUrl('/api/monitoring/errors'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      });
    } catch (sendError) {
      console.warn('[Monitoring] Failed to send error report:', sendError);
      // Add back to queue for retry
      this.errorQueue.push(error);
    }
  }

  private async sendMetric(metric: PerformanceMetric) {
    try {
      await fetch(env.getApiUrl('/api/monitoring/metrics'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      });
    } catch (error) {
      console.warn('[Monitoring] Failed to send metric:', error);
      // Add back to queue for retry
      this.metricsQueue.push(metric);
    }
  }

  private async flushQueues() {
    // Send queued errors
    while (this.errorQueue.length > 0) {
      const error = this.errorQueue.shift();
      if (error) {
        await this.sendErrorReport(error);
      }
    }

    // Send queued metrics
    while (this.metricsQueue.length > 0) {
      const metric = this.metricsQueue.shift();
      if (metric) {
        await this.sendMetric(metric);
      }
    }
  }

  // Public methods for manual reporting
  logUserAction(action: string, metadata?: Record<string, any>) {
    this.reportMetric('user-action', 1, {
      action,
      ...metadata
    });
  }

  logApiCall(endpoint: string, duration: number, status: number) {
    this.reportMetric('api-call', duration, {
      endpoint,
      status,
      success: status >= 200 && status < 300
    });
  }

  logPageView(path: string, loadTime?: number) {
    this.reportMetric('page-view', loadTime || 0, {
      path,
      referrer: document.referrer,
      timestamp: Date.now()
    });
  }

  getSessionInfo() {
    return {
      sessionId: this.sessionId,
      isOnline: this.isOnline,
      errorCount: this.errorQueue.length,
      metricsCount: this.metricsQueue.length
    };
  }
}

// Export singleton instance
export const monitoring = MonitoringService.getInstance();

// Auto-start monitoring
if (typeof window !== 'undefined') {
  // Track initial page load
  window.addEventListener('load', () => {
    monitoring.logPageView(window.location.pathname, performance.now());
  });
}

export default monitoring;