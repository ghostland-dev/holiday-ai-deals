import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, MapPin, ExternalLink, Home, User } from "lucide-react";
import { useAuthContext } from "@/components/AuthProvider";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();
  
  const bookingId = searchParams.get('booking_id');
  const dealTitle = searchParams.get('deal_title') || 'Votre réservation';
  const destination = searchParams.get('destination') || '';
  const price = searchParams.get('price') || '';
  const provider = searchParams.get('provider') || '';

  useEffect(() => {
    // Redirect to home after 30 seconds if no action
    const timer = setTimeout(() => {
      navigate('/');
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-green-600 mb-2">
                Réservation Confirmée !
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                Félicitations ! Votre voyage est maintenant réservé.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Booking Details */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Détails de votre réservation
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Voyage:</span>
                    <span className="font-medium">{dealTitle}</span>
                  </div>
                  
                  {destination && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Destination:</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{destination}</span>
                      </div>
                    </div>
                  )}
                  
                  {price && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Prix total:</span>
                      <span className="font-bold text-lg text-green-600">{price}€</span>
                    </div>
                  )}
                  
                  {provider && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Fournisseur:</span>
                      <Badge variant="outline">{provider}</Badge>
                    </div>
                  )}
                  
                  {bookingId && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">ID de réservation:</span>
                      <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                        {bookingId}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Prochaines étapes</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold text-xs">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Confirmation par email</p>
                      <p className="text-muted-foreground">Vous recevrez un email de confirmation dans les prochaines minutes.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-600 font-bold text-xs">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Documents de voyage</p>
                      <p className="text-muted-foreground">Préparez vos documents (passeport, visa si nécessaire).</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 font-bold text-xs">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Profitez de votre voyage !</p>
                      <p className="text-muted-foreground">N'oubliez pas de partager vos photos avec #TravelAI</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6">
                {user ? (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Mon Dashboard
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Se connecter
                  </Button>
                )}
                
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Retour à l'accueil
                </Button>
                
                <Button 
                  onClick={() => navigate('/#deals')}
                  className="bg-gradient-ocean hover:shadow-glow flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Autres offres
                </Button>
              </div>
              
              {/* Success Message */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Merci de votre confiance ! L'équipe TravelAI vous souhaite un excellent voyage. 
                  <span className="block mt-1">
                    Une question ? Notre support client est disponible 24/7.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Success;