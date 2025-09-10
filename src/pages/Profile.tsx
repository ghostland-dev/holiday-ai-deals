import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Settings, CreditCard, Bell, MapPin, Calendar,
  Plane, Star, Award, Heart, Clock, Camera, Edit3,
  Shield, Key, Globe, Smartphone
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  // Mock user data - in real app, fetch from API
  const userProfile = {
    id: user.id,
    email: user.email,
    firstName: "Marie",
    lastName: "Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    memberSince: "2023-06-15",
    loyaltyPoints: 2450,
    loyaltyTier: "Gold",
    totalTrips: 12,
    totalSaved: 1250,
    phone: "+33 6 12 34 56 78",
    address: {
      street: "123 Rue de Rivoli",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    },
    preferences: {
      travelStyle: ["Luxe", "Culture", "Romance"],
      destinations: ["Europe", "Asie"],
      budget: "500-1000€",
      notifications: {
        email: true,
        sms: false,
        push: true,
        deals: true,
        reminders: true
      }
    },
    recentBookings: [
      {
        id: "1",
        destination: "Paris, France",
        date: "2024-02-15",
        status: "completed",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=100&h=75&fit=crop",
        price: 299
      },
      {
        id: "2", 
        destination: "Tokyo, Japon",
        date: "2024-04-20",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&h=75&fit=crop",
        price: 899
      }
    ],
    savedOffers: [
      {
        id: "1",
        title: "Weekend à Rome",
        destination: "Rome, Italie",
        price: 189,
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=100&h=75&fit=crop"
      },
      {
        id: "2",
        title: "Séjour à Barcelone", 
        destination: "Barcelone, Espagne",
        price: 245,
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=100&h=75&fit=crop"
      }
    ]
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'gold': return 'text-yellow-600 bg-yellow-50';
      case 'platinum': return 'text-gray-600 bg-gray-50';
      case 'diamond': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'upcoming': return 'À venir';
      case 'cancelled': return 'Annulé';
      default: return 'En cours';
    }
  };

  return (
    <>
      <SEOHead 
        title="Mon Profil - TravelAI"
        description="Gérez votre profil, vos réservations et vos préférences de voyage"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Profile Header */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback className="text-2xl">
                          {userProfile.firstName[0]}{userProfile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">
                          {userProfile.firstName} {userProfile.lastName}
                        </h1>
                        <Badge className={getTierColor(userProfile.loyaltyTier)}>
                          <Award className="w-3 h-3 mr-1" />
                          Membre {userProfile.loyaltyTier}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{userProfile.email}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{userProfile.totalTrips}</div>
                          <div className="text-sm text-muted-foreground">Voyages</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{userProfile.loyaltyPoints}</div>
                          <div className="text-sm text-muted-foreground">Points</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">€{userProfile.totalSaved}</div>
                          <div className="text-sm text-muted-foreground">Économisés</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {new Date().getFullYear() - new Date(userProfile.memberSince).getFullYear()}
                          </div>
                          <div className="text-sm text-muted-foreground">Ans</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => navigate("/profile/settings")}>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Modifier le profil
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/profile/preferences")}>
                        <Settings className="w-4 h-4 mr-2" />
                        Préférences
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Aperçu</TabsTrigger>
                  <TabsTrigger value="bookings">Réservations</TabsTrigger>
                  <TabsTrigger value="favorites">Favoris</TabsTrigger>
                  <TabsTrigger value="rewards">Récompenses</TabsTrigger>
                  <TabsTrigger value="settings">Paramètres</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    {/* Recent Bookings */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          Voyages récents
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {userProfile.recentBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                            <img 
                              src={booking.image}
                              alt={booking.destination}
                              className="w-12 h-9 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{booking.destination}</h4>
                              <p className="text-xs text-muted-foreground">{new Date(booking.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)} variant="secondary">
                                {getStatusText(booking.status)}
                              </Badge>
                              <p className="text-sm font-medium mt-1">€{booking.price}</p>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full" onClick={() => navigate("/profile/bookings")}>
                          Voir toutes les réservations
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Saved Offers */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Heart className="w-5 h-5 mr-2" />
                          Offres sauvegardées
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {userProfile.savedOffers.map((offer) => (
                          <div key={offer.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                            <img 
                              src={offer.image}
                              alt={offer.title}
                              className="w-12 h-9 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{offer.title}</h4>
                              <p className="text-xs text-muted-foreground">{offer.destination}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-primary">€{offer.price}</p>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full" onClick={() => navigate("/wishlist")}>
                          Voir tous les favoris
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Actions rapides</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col" onClick={() => navigate("/deals")}>
                          <Plane className="w-6 h-6 mb-2" />
                          <span className="text-sm">Nouvelles offres</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col" onClick={() => navigate("/profile/preferences")}>
                          <Settings className="w-6 h-6 mb-2" />
                          <span className="text-sm">Préférences</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col" onClick={() => navigate("/profile/payments")}>
                          <CreditCard className="w-6 h-6 mb-2" />
                          <span className="text-sm">Paiements</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col" onClick={() => navigate("/support")}>
                          <Bell className="w-6 h-6 mb-2" />
                          <span className="text-sm">Support</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mes réservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Gestion des réservations</h3>
                        <p className="text-muted-foreground mb-4">
                          Consultez et gérez toutes vos réservations depuis cette section
                        </p>
                        <Button onClick={() => navigate("/profile/bookings")}>
                          Accéder aux réservations
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="favorites">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mes favoris</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Liste de souhaits</h3>
                        <p className="text-muted-foreground mb-4">
                          Retrouvez toutes vos offres favorites et suivez les évolutions de prix
                        </p>
                        <Button onClick={() => navigate("/wishlist")}>
                          Voir mes favoris
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rewards">
                  <Card>
                    <CardHeader>
                      <CardTitle>Programme de fidélité</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Points Balance */}
                      <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                        <h3 className="text-2xl font-bold mb-2">{userProfile.loyaltyPoints} points</h3>
                        <p className="text-muted-foreground">Solde actuel</p>
                <Badge className={getTierColor(userProfile.loyaltyTier)}>
                  Statut: {userProfile.loyaltyTier}
                </Badge>
                      </div>

                      {/* Rewards Actions */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <Button variant="outline" className="h-16" onClick={() => navigate("/rewards")}>
                          <Award className="w-5 h-5 mr-2" />
                          Utiliser mes points
                        </Button>
                        <Button variant="outline" className="h-16">
                          <Star className="w-5 h-5 mr-2" />
                          Historique des points
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="grid gap-6">
                    
                    {/* Account Settings */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Paramètres du compte</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate("/profile/settings")}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Informations personnelles
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate("/profile/payments")}
                        >
                          <CreditCard className="w-4 h-4 mr-3" />
                          Moyens de paiement
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate("/profile/notifications")}
                        >
                          <Bell className="w-4 h-4 mr-3" />
                          Notifications
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Sécurité</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Key className="w-4 h-4 mr-3" />
                          Changer le mot de passe
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-3" />
                          Authentification à deux facteurs
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Smartphone className="w-4 h-4 mr-3" />
                          Sessions actives
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Preferences */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Préférences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate("/profile/preferences")}
                        >
                          <MapPin className="w-4 h-4 mr-3" />
                          Préférences de voyage
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Globe className="w-4 h-4 mr-3" />
                          Langue et région
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;