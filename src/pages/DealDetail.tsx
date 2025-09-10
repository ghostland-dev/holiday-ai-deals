import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, MapPin, Calendar, Users, Heart, Share2, Clock, 
  Plane, Wifi, Car, Coffee, Utensils, Waves, 
  CheckCircle, AlertCircle, ArrowLeft, Phone, Mail,
  Camera, Shield, Award, Zap
} from "lucide-react";
import { toast } from "sonner";

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample data - in real app, fetch from API using the ID
  const deal = {
    id: "1",
    title: "Séjour romantique à Paris - Hôtel 4* avec vue sur la Tour Eiffel",
    description: "Découvrez la magie de Paris depuis votre suite avec vue panoramique sur la Tour Eiffel. Séjour de 3 nuits dans un hôtel de luxe situé au cœur du 7ème arrondissement.",
    longDescription: "Plongez dans l'atmosphère romantique de la Ville Lumière avec ce séjour d'exception. Votre hôtel 4 étoiles vous offre une vue imprenable sur la Tour Eiffel depuis votre chambre. Situé dans le prestigieux 7ème arrondissement, vous serez à quelques pas des monuments les plus emblématiques de Paris : le Musée d'Orsay, les Invalides, et bien sûr la Tour Eiffel. L'hôtel propose des services haut de gamme incluant un spa, un restaurant gastronomique et un service de conciergerie disponible 24h/24.",
    destination: "Paris, France",
    price: 299,
    originalPrice: 399,
    currency: "EUR",
    provider: "TravelExpert",
    rating: 4.8,
    reviewsCount: 342,
    category: "hotels",
    featured: true,
    availableFrom: "2024-03-01",
    availableTo: "2024-06-30",
    duration: "3 nuits",
    maxGuests: 2,
    images: [
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=500&fit=crop"
    ],
    amenities: [
      { icon: Wifi, name: "WiFi gratuit" },
      { icon: Car, name: "Parking privé" },
      { icon: Coffee, name: "Room service 24h" },
      { icon: Utensils, name: "Restaurant gastronomique" },
      { icon: Waves, name: "Spa & Wellness" },
      { icon: Shield, name: "Coffre-fort" }
    ],
    highlights: [
      "Vue panoramique sur la Tour Eiffel",
      "Localisation premium 7ème arrondissement",
      "Petit-déjeuner continental inclus",
      "Accès gratuit au spa",
      "Service de conciergerie 24h/24",
      "Champagne d'accueil offert"
    ],
    includes: [
      "3 nuits en chambre deluxe avec vue Tour Eiffel",
      "Petit-déjeuner continental pour 2 personnes",
      "Accès illimité au spa et centre de bien-être",
      "WiFi haut débit gratuit",
      "Service de conciergerie",
      "Champagne de bienvenue"
    ],
    excludes: [
      "Vols aller-retour",
      "Transferts aéroport",
      "Repas (hors petit-déjeuner)",
      "Activités et excursions",
      "Assurance voyage",
      "Dépenses personnelles"
    ],
    cancellationPolicy: "Annulation gratuite jusqu'à 48h avant l'arrivée. Au-delà, 50% du montant total sera retenu.",
    tags: ["Romance", "Luxe", "Vue exceptionnelle", "Centre-ville"]
  };

  const reviews = [
    {
      id: "1",
      userName: "Marie & Pierre",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      date: "2024-01-15",
      title: "Séjour magique pour notre lune de miel",
      content: "Absolument parfait ! La vue depuis notre chambre était à couper le souffle, surtout au coucher du soleil. L'hôtel est impeccablement situé et le personnel aux petits soins. Nous reviendrons c'est sûr !",
      helpful: 24,
      photos: ["https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=200&h=150&fit=crop"]
    },
    {
      id: "2",
      userName: "Sophie L.",
      rating: 4,
      date: "2024-01-08",
      title: "Excellent rapport qualité-prix",
      content: "Très bonne expérience globale. Chambre spacieuse et propre, vue magnifique comme promis. Seul bémol : le petit-déjeuner pourrait être plus varié. Mais je recommande !",
      helpful: 18
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, [id]);

  const calculateSavings = () => {
    if (!deal.originalPrice) return 0;
    return Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: deal.title,
        text: deal.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papiers");
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  if (loading) {
    return (
      <>
        <SEOHead title="Chargement..." description="" />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <div className="animate-pulse">
                <div className="h-96 bg-muted rounded-lg mb-8"></div>
                <div className="h-8 bg-muted rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
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
        title={`${deal.title} - TravelAI`}
        description={deal.description}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          {/* Back Button */}
          <div className="container mx-auto px-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux offres
            </Button>
          </div>

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                
                {/* Image Gallery */}
                <div className="relative mb-8">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <img 
                      src={deal.images[activeImageIndex]}
                      alt={deal.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {activeImageIndex + 1} / {deal.images.length}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleShare}
                        className="bg-white/80 hover:bg-white"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleFavorite}
                        className={`bg-white/80 hover:bg-white ${isFavorite ? 'text-red-500' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {deal.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden ${
                          activeImageIndex === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={image}
                          alt={`Vue ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deal Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{deal.title}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{deal.destination}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{deal.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>Jusqu'à {deal.maxGuests} personnes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium ml-1">{deal.rating}</span>
                          </div>
                          <span className="text-muted-foreground">({deal.reviewsCount} avis)</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Par {deal.provider}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {deal.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                          <Zap className="w-3 h-3 mr-1" />
                          Coup de cœur
                        </Badge>
                      )}
                      {deal.originalPrice && (
                        <Badge variant="destructive">
                          -{calculateSavings()}% de réduction
                        </Badge>
                      )}
                      <Badge variant="outline">
                        <Award className="w-3 h-3 mr-1" />
                        Annulation gratuite
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {deal.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Tabs Content */}
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Aperçu</TabsTrigger>
                      <TabsTrigger value="amenities">Services</TabsTrigger>
                      <TabsTrigger value="reviews">Avis</TabsTrigger>
                      <TabsTrigger value="location">Localisation</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">
                            {deal.longDescription}
                          </p>
                        </CardContent>
                      </Card>

                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                              Inclus dans l'offre
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {deal.includes.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                              Non inclus
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {deal.excludes.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <AlertCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Points forts</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-3">
                            {deal.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                                <span className="text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="amenities" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Services et équipements</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4">
                            {deal.amenities.map((amenity, index) => {
                              const Icon = amenity.icon;
                              return (
                                <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                                  <Icon className="w-5 h-5 text-primary mr-3" />
                                  <span className="text-sm font-medium">{amenity.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="space-y-6">
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <Card key={review.id}>
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <Avatar>
                                  <AvatarImage src={review.userAvatar} />
                                  <AvatarFallback>
                                    {review.userName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium">{review.userName}</span>
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {new Date(review.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  <h4 className="font-medium mb-2">{review.title}</h4>
                                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                                    {review.content}
                                  </p>
                                  
                                  {review.photos && (
                                    <div className="flex gap-2 mb-3">
                                      {review.photos.map((photo, index) => (
                                        <img
                                          key={index}
                                          src={photo}
                                          alt={`Photo ${index + 1}`}
                                          className="w-16 h-12 object-cover rounded cursor-pointer"
                                        />
                                      ))}
                                    </div>
                                  )}
                                  
                                  <div className="text-sm text-muted-foreground">
                                    {review.helpful} personnes ont trouvé cet avis utile
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="location" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Localisation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                            <MapPin className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground">
                            Situé au cœur du 7ème arrondissement de Paris, à proximité immédiate 
                            de la Tour Eiffel et des principaux monuments parisiens.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">€{deal.price}</span>
                      {deal.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          €{deal.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Prix total pour {deal.duration}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                      onClick={() => navigate('/booking', { state: { dealId: deal.id } })}
                    >
                      Réserver maintenant
                    </Button>
                    
                    <Button variant="outline" size="lg" className="w-full">
                      Ajouter au panier
                    </Button>
                    
                    <div className="pt-4 border-t space-y-3">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span>Annulation gratuite</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span>Confirmation immédiate</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span>Paiement sécurisé</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t space-y-2">
                      <h4 className="font-medium">Besoin d'aide ?</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>+33 1 23 45 67 89</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>support@travelai.fr</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DealDetail;