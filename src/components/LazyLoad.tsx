import { Suspense, lazy } from 'react';
import LoadingSpinner from './LoadingSpinner';

// Lazy load heavy components for better performance
export const LazyUserDashboard = lazy(() => import('./UserDashboard'));
export const LazyAdminDashboard = lazy(() => import('./AdminDashboard'));
export const LazyBlog = lazy(() => import('../pages/Blog'));
export const LazyContact = lazy(() => import('../pages/Contact'));
export const LazyPrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
export const LazyTerms = lazy(() => import('../pages/Terms'));

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LazyWrapper = ({ children, fallback }: LazyWrapperProps) => {
  const defaultFallback = (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner 
        size="lg" 
        variant="travel" 
        text="Chargement en cours..." 
      />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;