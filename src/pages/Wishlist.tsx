import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, Star, MapPin, Calendar, Euro } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import EmptyState from "@/components/EmptyState";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  dealId: string;
  title: string;
  destination: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image?: string;
  rating?: number;
  provider: string;
  availableFrom?: string;
  availableTo?: string;
  addedAt: string;
}

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample data - in a real app, this would come from your database
  useEffect(() => {
    if (user) {
      // Simulate loading wishlist items
      setTimeout(() => {
        setWishlistItems([
          {
            id: "1",
            dealId: "deal1",
            title: "Séjour romantique à Paris",
            destination: "Paris, France",
            price: 299,
            originalPrice: 399,
            currency: "EUR",
            image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=250&fit=crop",
            rating: 4.8,
            provider: "TravelExpert",
            availableFrom: "2024-03-01",
            availableTo: "2024-06-30",
            addedAt: "2024-01-15"
          },
          {
            id: "2",
            dealId: "deal2", 
            title: "Aventure à Tokyo",
            destination: "Tokyo, Japon",
            price: 899,
            originalPrice: 1199,
            currency: "EUR",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop",
            rating: 4.9,
            provider: "AsiaTravel",
            availableFrom: "2024-04-01",
            availableTo: "2024-08-31",
            addedAt: "2024-01-20"
          }
        ]);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
    toast.success("Offre supprimée de votre liste de souhaits");
  };

  const calculateSavings = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  if (!user) {
    return (
      <>
        <SEOHead 
          title="Ma Liste de Souhaits - TravelAI"
          description="Gérez votre liste de souhaits de voyages sur TravelAI"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <EmptyState
                type="no-favorites"
                title="Connectez-vous pour voir votre liste"
                description="Vous devez être connecté pour accéder à votre liste de souhaits."
                actionLabel="Se connecter"
                onAction={() => window.location.href = "/login"}
              />
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Ma Liste de Souhaits - TravelAI"
          description="Gérez votre liste de souhaits de voyages sur TravelAI"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Ma Liste de Souhaits - TravelAI"
        description="Gérez votre liste de souhaits de voyages sur TravelAI"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-foreground">Ma Liste de Souhaits</h1>
                <p className="text-muted-foreground">
                  {wishlistItems.length} offre{wishlistItems.length !== 1 ? 's' : ''} sauvegardée{wishlistItems.length !== 1 ? 's' : ''}
                </p>
              </div>

              {wishlistItems.length === 0 ? (
                <EmptyState
                  type="no-favorites"
                  title="Votre liste de souhaits est vide"
                  description="Ajoutez des offres à votre liste de souhaits pour les retrouver facilement plus tard."
                  actionLabel="Découvrir les offres"
                  onAction={() => window.location.href = "/"}
                />
              ) : (
                <div className="grid gap-6">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        {item.image && (
                          <div className="md:w-80 h-48 md:h-auto">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                              <div className="flex items-center text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{item.destination}</span>
                                {item.rating && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="text-sm">{item.rating}</span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <span>Par {item.provider}</span>
                                {item.availableFrom && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>Disponible jusqu'au {new Date(item.availableTo!).toLocaleDateString()}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.originalPrice && (
                              <Badge variant="destructive">
                                -{calculateSavings(item.price, item.originalPrice)}%
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex items-center">
                                <Euro className="w-5 h-5 text-primary mr-1" />
                                <span className="text-2xl font-bold text-primary">{item.price}</span>
                              </div>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  €{item.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline">
                                Comparer
                              </Button>
                              <Button>
                                Voir l'offre
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {wishlistItems.length > 0 && (
                <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">💡 Conseil TravelAI</h3>
                  <p className="text-muted-foreground">
                    Les prix peuvent fluctuer rapidement. Nous vous recommandons de surveiller vos offres favorites 
                    et de réserver dès que le prix vous convient. Vous recevrez des alertes si les prix baissent !
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Wishlist;