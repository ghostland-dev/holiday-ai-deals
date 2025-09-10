import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitals monitoring
    if ('web-vitals' in window) {
      return;
    }

    // Simple performance monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log slow operations
        if (entry.duration > 100) {
          console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });

    // Monitor Core Web Vitals
    const reportWebVitals = () => {
      // First Contentful Paint (FCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          console.log(`FCP: ${entry.startTime}`);
        });
      }).observe({ type: 'paint', buffered: true });

      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`LCP: ${lastEntry.startTime}`);
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Type assertion for layout-shift entries
          const layoutEntry = entry as any;
          if (layoutEntry.hadRecentInput !== undefined && !layoutEntry.hadRecentInput) {
            clsValue += layoutEntry.value || 0;
          }
        }
        console.log(`CLS: ${clsValue}`);
      }).observe({ type: 'layout-shift', buffered: true });
    };

    // Run performance monitoring
    if (document.readyState === 'complete') {
      reportWebVitals();
    } else {
      window.addEventListener('load', reportWebVitals);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor;