import { useEffect } from 'react';
import { Link as RouterLink, LinkProps, useLocation } from 'react-router-dom';
import { analytics } from '@/utils/analytics';
import { seoManager } from '@/utils/seo';

// Enhanced Link component that tracks clicks and updates SEO
interface TrackedLinkProps extends LinkProps {
  trackingCategory?: string;
  trackingLabel?: string;
  seoUpdate?: boolean;
}

export const Link = ({ 
  to, 
  children, 
  trackingCategory = 'navigation', 
  trackingLabel, 
  seoUpdate = false,
  onClick,
  ...props 
}: TrackedLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Track the link click
    analytics.track({
      action: 'link_click',
      category: trackingCategory,
      label: trackingLabel || to.toString(),
      custom_parameters: {
        destination: to,
        source: window.location.pathname
      }
    });

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <RouterLink 
      to={to} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

// Hook to track page views and update SEO
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    analytics.trackPageView(location.pathname);

    // Update SEO based on current route
    const routeSEOConfig = getRouteSEOConfig(location.pathname);
    if (routeSEOConfig) {
      seoManager.updatePageSEO(routeSEOConfig);
    }
  }, [location]);
};

// SEO configurations for different routes
const getRouteSEOConfig = (pathname: string) => {
  const configs = {
    '/': {
      title: 'TravelAI - Trouvez les Meilleurs Deals Voyage avec l\'IA | Économisez 40%',
      description: 'TravelAI utilise l\'intelligence artificielle Gemini pour scanner Booking, SkyScanner, Expedia et vous proposer les meilleurs deals voyage personnalisés. Économisez jusqu\'à 40% sur vos vacances.',
      keywords: 'voyage, deals, ia, booking, skyscanner, expedia, vacances, économies, packs voyage',
      type: 'website'
    },
    '/blog': {
      title: 'Blog Voyage & IA | TravelAI - Conseils et Tendances Voyage',
      description: 'Découvrez les secrets du voyage intelligent, les analyses de notre IA et les tendances qui révolutionnent l\'industrie du voyage.',
      keywords: 'blog voyage, conseils voyage, ia voyage, tendances voyage, guides voyage',
      type: 'blog'
    },
    '/contact': {
      title: 'Contactez TravelAI | Support Client & Questions',
      description: 'Une question sur nos services IA ? Contactez notre équipe d\'experts voyage pour une assistance personnalisée.',
      keywords: 'contact travelai, support client, aide voyage, questions',
      type: 'website'
    },
    '/privacy': {
      title: 'Politique de Confidentialité | TravelAI - Protection des Données',
      description: 'Découvrez comment TravelAI protège vos données personnelles et respecte votre vie privée selon le RGPD.',
      keywords: 'confidentialité, rgpd, protection données, vie privée',
      type: 'website',
      noindex: false
    },
    '/terms': {
      title: 'Conditions Générales d\'Utilisation | TravelAI',
      description: 'Conditions d\'utilisation de la plateforme TravelAI, commissions d\'affiliation et responsabilités.',
      keywords: 'conditions utilisation, cgu, mentions légales, affiliation',
      type: 'website',
      noindex: false
    },
    '/dashboard': {
      title: 'Mon Compte TravelAI | Dashboard Voyage Personnel',
      description: 'Gérez vos voyages, consultez vos économies et accédez à vos packs IA personnalisés.',
      keywords: 'compte travelai, dashboard, mes voyages, historique',
      type: 'webapp',
      noindex: true
    }
  };

  return configs[pathname as keyof typeof configs];
};

export default Link;