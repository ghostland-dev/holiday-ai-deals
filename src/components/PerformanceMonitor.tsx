import { useEffect, useRef } from 'react';
import { monitoring } from '@/utils/monitoring';

export const PerformanceMonitor: React.FC = () => {
  const mountTime = useRef(Date.now());

  useEffect(() => {
    const componentMountTime = Date.now() - mountTime.current;
    monitoring.reportMetric('component-mount', componentMountTime);

    // Monitor route changes
    const handleRouteChange = () => {
      monitoring.logPageView(window.location.pathname);
    };

    // Monitor visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        monitoring.reportMetric('app-focus', 1);
      } else {
        monitoring.reportMetric('app-blur', 1);
      }
    };

    // Monitor memory usage periodically
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        monitoring.reportMetric('memory-usage', memory.usedJSHeapSize, {
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        });
      }
    }, 30000); // Every 30 seconds

    // Monitor slow interactions
    let interactionStartTime: number;
    const handleInteractionStart = () => {
      interactionStartTime = performance.now();
    };

    const handleInteractionEnd = () => {
      if (interactionStartTime) {
        const interactionTime = performance.now() - interactionStartTime;
        if (interactionTime > 100) { // Log interactions longer than 100ms
          monitoring.reportMetric('slow-interaction', interactionTime);
        }
      }
    };

    // Add event listeners
    window.addEventListener('popstate', handleRouteChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mousedown', handleInteractionStart);
    document.addEventListener('mouseup', handleInteractionEnd);
    document.addEventListener('keydown', handleInteractionStart);
    document.addEventListener('keyup', handleInteractionEnd);

    return () => {
      clearInterval(memoryInterval);
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousedown', handleInteractionStart);
      document.removeEventListener('mouseup', handleInteractionEnd);
      document.removeEventListener('keydown', handleInteractionStart);
      document.removeEventListener('keyup', handleInteractionEnd);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;