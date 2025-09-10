import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  MapPin, 
  Calendar,
  Heart,
  Clock,
  Star,
  TrendingUp,
  Gift,
  Settings,
  Download,
  Share2
} from "lucide-react";
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  totalTrips: number;
  totalSavings: number;
  favoriteDestinations: string[];
  loyaltyPoints: number;
}

interface Trip {
  id: string;
  destination: string;
  dates: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalCost: number;
  savings: number;
  provider: string;
  image: string;
}

interface Favorite {
  id: string;
  type: 'destination' | 'deal' | 'pack';
  title: string;
  location: string;
  price: number;
  image: string;
  savedDate: string;
}

const UserDashboard = () => {
  const [user] = useState<UserProfile>({
    name: "Marie Dubois",
    email: "marie.dubois@email.com", 
    joinDate: "Mars 2024",
    totalTrips: 8,
    totalSavings: 2340,
    favoriteDestinations: ["Bali", "Maldives", "Santorin"],
    loyaltyPoints: 1250
  });

  const [trips] = useState<Trip[]>([
    {
      id: "1",
      destination: "Maldives - Resort Luxury",
      dates: "15-22 Août 2024",
      status: 'upcoming',
      totalCost: 2899,
      savings: 847,
      provider: "Booking.com",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=300&h=200&fit=crop"
    },
    {
      id: "2",
      destination: "Paris - Weekend Romantique", 
      dates: "3-5 Juin 2024",
      status: 'completed',
      totalCost: 450,
      savings: 120,
      provider: "SkyScanner",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop"
    },
    {
      id: "3",
      destination: "Safari Kenya Deluxe",
      dates: "20-30 Sept 2024", 
      status: 'upcoming',
      totalCost: 3499,
      savings: 950,
      provider: "Expedia",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=300&h=200&fit=crop"
    }
  ]);

  const [favorites] = useState<Favorite[]>([
    {
      id: "1",
      type: 'destination',
      title: "Santorini Magic",
      location: "Santorin, Grèce",
      price: 1299,
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=300&h=200&fit=crop",
      savedDate: "Il y a 2 jours"
    },
    {
      id: "2", 
      type: 'pack',
      title: "Pack IA Asie Culturelle",
      location: "Thaïlande, Vietnam, Cambodge",
      price: 1899,
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=300&h=200&fit=crop",
      savedDate: "Il y a 1 semaine"
    }
  ]);

  const getStatusColor = (status: Trip['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-500/10 text-red-700 border-red-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      {/* Header Profile */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="bg-gradient-ocean text-white text-2xl font-bold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Bonjour {user.name.split(' ')[0]} 👋</h1>
          <p className="text-muted-foreground mb-4">
            Membre TravelAI depuis {user.joinDate}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.totalTrips}</div>
              <div className="text-sm text-muted-foreground">Voyages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{user.totalSavings}€</div>
              <div className="text-sm text-muted-foreground">Économisés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.loyaltyPoints}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{favorites.length}</div>
              <div className="text-sm text-muted-foreground">Favoris</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
          <Button size="sm" className="bg-gradient-ocean">
            <Gift className="w-4 h-4 mr-2" />
            Utiliser mes Points
          </Button>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trips">Mes Voyages</TabsTrigger>
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
          <TabsTrigger value="ai-packs">Packs IA</TabsTrigger>
          <TabsTrigger value="rewards">Récompenses</TabsTrigger>
        </TabsList>

        {/* Trips Tab */}
        <TabsContent value="trips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Mes Réservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {trips.map((trip) => (
                  <div key={trip.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:shadow-card transition-all">
                    <img 
                      src={trip.image} 
                      alt={trip.destination}
                      className="w-full md:w-32 h-24 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{trip.destination}</h3>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status === 'upcoming' ? 'À venir' : 
                           trip.status === 'completed' ? 'Terminé' : 'Annulé'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.dates}
                        </div>
                        <div>via {trip.provider}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-lg font-bold">{trip.totalCost}€</span>
                            <span className="text-sm text-muted-foreground ml-2">total</span>
                          </div>
                          <Badge className="bg-green-500/10 text-green-700">
                            -{trip.savings}€ économisés
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Partager
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Mes Favoris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favorites.map((favorite) => (
                  <div key={favorite.id} className="group border rounded-lg overflow-hidden hover:shadow-card transition-all">
                    <img 
                      src={favorite.image} 
                      alt={favorite.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{favorite.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {favorite.type === 'destination' ? 'Destination' : 
                           favorite.type === 'pack' ? 'Pack IA' : 'Deal'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4" />
                        {favorite.location}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-accent">{favorite.price}€</span>
                          <p className="text-xs text-muted-foreground">Ajouté {favorite.savedDate}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button size="sm" className="bg-gradient-ocean">
                            Voir l'Offre
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Packs Tab */}
        <TabsContent value="ai-packs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Mes Packs IA Personnalisés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Créez votre premier Pack IA</h3>
                <p className="text-muted-foreground mb-6">
                  Notre IA Gemini va analyser vos préférences pour créer des packs voyage uniques.
                </p>
                <Button className="bg-gradient-sunset">
                  Générer un Pack IA Maintenant
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Programme de Fidélité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-ocean/10 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">Points TravelAI</h3>
                    <p className="text-muted-foreground">Gagnez des points à chaque réservation</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{user.loyaltyPoints}</div>
                    <div className="text-sm text-muted-foreground">points disponibles</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="font-semibold mb-2">Réduction 50€</h4>
                      <p className="text-sm text-muted-foreground mb-3">500 points</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Échanger
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Pack IA Premium</h4>
                      <p className="text-sm text-muted-foreground mb-3">800 points</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Échanger
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Gift className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Surprise Box</h4>
                      <p className="text-sm text-muted-foreground mb-3">1200 points</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Échanger
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;