import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  CreditCard, 
  Database, 
  Users, 
  BarChart3, 
  Smartphone,
  Lock,
  Zap,
  CheckCircle,
  Globe,
  Bell,
  Search
} from 'lucide-react';

export const ProductionReadyBadge: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Sécurité Enterprise',
      description: 'Rate limiting, CSRF protection, validation d\'entrée, headers de sécurité'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Paiements Stripe',
      description: 'Intégration complète avec abonnements, paiements ponctuels et webhooks'
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'Base de Données',
      description: 'Supabase avec authentification, temps réel et stockage sécurisé'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Authentification',
      description: 'Social login (Google, GitHub), reset password, gestion utilisateur'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Analytics & Monitoring',
      description: 'Google Analytics, monitoring erreurs, métriques performance'
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: 'PWA Complète',
      description: 'Service worker, offline, notifications push, installation'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'SEO Optimisé',
      description: 'Meta tags, structured data, sitemap, robots.txt'
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: 'RGPD Conforme',
      description: 'Gestion cookies, consentement, politiques de confidentialité'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Performance',
      description: 'Lazy loading, caching, compression, monitoring vitaux'
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: 'Notifications',
      description: 'Push notifications, email templates, alertes temps réel'
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: 'Recherche Avancée',
      description: 'Recherche intelligente avec suggestions et caching'
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: 'Error Handling',
      description: 'Error boundaries, retry logic, fallback interfaces'
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="group">
        <Badge 
          variant="default" 
          className="bg-green-500 hover:bg-green-600 text-white cursor-pointer shadow-lg"
        >
          ✅ Production Ready
        </Badge>
        
        <div className="absolute bottom-full right-0 mb-2 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Card className="shadow-xl border-2 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Plateforme Production-Ready
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                TravelAI est maintenant une plateforme SaaS complète et prête pour la production
              </p>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="text-green-500 mt-0.5">
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="pt-3 border-t">
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">
                    🚀 Prêt pour le déploiement
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductionReadyBadge;