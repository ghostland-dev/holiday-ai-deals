import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, X, Check } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    
    // Initialize analytics and tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        personalization_storage: 'granted'
      });
    }
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
    
    // Update consent based on preferences
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        personalization_storage: preferences.personalization ? 'granted' : 'denied'
      });
    }
  };

  const handleRejectAll = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background/95 via-background/90 to-transparent backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto border-primary/20 shadow-2xl">
        <CardContent className="p-6">
          {!showSettings ? (
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">
                    🍪 Nous utilisons des cookies
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    TravelAI utilise des cookies pour améliorer votre expérience, personnaliser le contenu et 
                    analyser notre trafic. Nos cookies nous aident à vous proposer les meilleurs deals voyage 
                    et à optimiser notre IA.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Badge variant="outline">Nécessaires</Badge>
                    <Badge variant="outline">Analytics</Badge>
                    <Badge variant="outline">Personnalisation</Badge>
                    <Link to="/privacy" className="text-primary hover:underline">
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Paramètres
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                >
                  Refuser
                </Button>
                
                <Button
                  onClick={handleAcceptAll}
                  className="bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Accepter tout
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Préférences des cookies</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Cookies nécessaires</h4>
                    <p className="text-sm text-muted-foreground">
                      Essentiels au fonctionnement du site (connexion, panier, sécurité)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>Obligatoire</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Nous aident à comprendre l'utilisation du site et améliorer nos services
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${preferences.analytics ? 'bg-primary' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${preferences.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Marketing</h4>
                    <p className="text-sm text-muted-foreground">
                      Publicités personnalisées et suivi des conversions
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${preferences.marketing ? 'bg-primary' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${preferences.marketing ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Personnalisation</h4>
                    <p className="text-sm text-muted-foreground">
                      Recommandations IA personnalisées et préférences utilisateur
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.personalization}
                      onChange={(e) => setPreferences({...preferences, personalization: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${preferences.personalization ? 'bg-primary' : 'bg-gray-300'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${preferences.personalization ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                >
                  Refuser tout
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                >
                  Sauvegarder mes préférences
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;