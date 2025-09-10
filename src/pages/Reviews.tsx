import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, ThumbsDown, Filter, MapPin } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  destination: string;
  title: string;
  content: string;
  date: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
  photos?: string[];
}

const reviews: Review[] = [
  {
    id: "1",
    userName: "Marie Dubois",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    destination: "Paris, France",
    title: "Séjour parfait dans la ville lumière",
    content: "Un voyage absolument magique ! L'hôtel était parfaitement situé près du Louvre, la chambre était spacieuse et élégante. Nous avons pu visiter tous les monuments emblématiques à pied. Le service client de TravelAI a été exceptionnel, avec des recommandations personnalisées qui ont rendu notre séjour inoubliable. Je recommande vivement !",
    date: "2024-01-15",
    helpful: 24,
    notHelpful: 2,
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=300&h=200&fit=crop"
    ]
  },
  {
    id: "2",
    userName: "Jean Martin",
    rating: 4,
    destination: "Tokyo, Japon",
    title: "Dépaysement total garanti",
    content: "Tokyo est une ville fascinante ! Grâce aux conseils de TravelAI, nous avons découvert des quartiers authentiques loin des sentiers battus. Le système de transport était bien expliqué dans leur guide. Seul petit bémol : l'hôtel était un peu excentré, mais cela nous a permis de vivre comme des locaux. Une expérience enrichissante !",
    date: "2024-01-10",
    helpful: 18,
    notHelpful: 1,
    verified: true
  },
  {
    id: "3",
    userName: "Sophie Leroy",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    destination: "Bali, Indonésie",
    title: "Paradis tropical au rendez-vous",
    content: "Bali a dépassé toutes nos attentes ! Les plages sont à couper le souffle, la culture balinaise est riche et accueillante. TravelAI nous a trouvé un resort avec un rapport qualité-prix exceptionnel. Les activités proposées (temples, rizières, plongée) étaient parfaitement organisées. Nous reviendrons c'est sûr !",
    date: "2024-01-08",
    helpful: 32,
    notHelpful: 0,
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=300&h=200&fit=crop"
    ]
  },
  {
    id: "4",
    userName: "Pierre Moreau",
    rating: 3,
    destination: "New York, États-Unis",
    title: "Ville impressionnante mais chère",
    content: "New York est une ville qui ne laisse pas indifférent ! L'énergie de Manhattan est contagieuse, les musées sont exceptionnels. Cependant, le coût de la vie est très élevé, même avec les bons plans de TravelAI. L'hôtel était correct mais bruyant. Malgré tout, c'est une expérience à vivre au moins une fois.",
    date: "2024-01-05",
    helpful: 15,
    notHelpful: 3,
    verified: false
  }
];

const Reviews = () => {
  const [selectedRating, setSelectedRating] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredReviews = reviews.filter(review => {
    if (selectedRating === "all") return true;
    return review.rating === parseInt(selectedRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful;
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      default: // recent
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <SEOHead 
        title="Avis Clients - TravelAI"
        description="Découvrez les avis authentiques de nos voyageurs sur leurs expériences avec TravelAI. Notes, photos et témoignages vérifiés."
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4 text-foreground">Avis Clients</h1>
                <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center mb-1">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Basé sur {reviews.length} avis
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => {
                        const count = reviews.filter(r => r.rating === rating).length;
                        const percentage = (count / reviews.length) * 100;
                        return (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-400"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filtres:</span>
                </div>
                
                <select 
                  value={selectedRating} 
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background"
                >
                  <option value="all">Toutes les notes</option>
                  <option value="5">5 étoiles</option>
                  <option value="4">4 étoiles</option>
                  <option value="3">3 étoiles</option>
                  <option value="2">2 étoiles</option>
                  <option value="1">1 étoile</option>
                </select>

                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background"
                >
                  <option value="recent">Plus récents</option>
                  <option value="helpful">Plus utiles</option>
                  <option value="rating-high">Note décroissante</option>
                  <option value="rating-low">Note croissante</option>
                </select>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {sortedReviews.map((review) => (
                  <Card key={review.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback>
                            {review.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{review.userName}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Vérifié
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3 mr-1" />
                            {review.destination}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <h4 className="font-medium mb-3">{review.title}</h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {review.content}
                      </p>
                      
                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {review.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <span className="text-sm text-muted-foreground">
                          Cet avis vous a-t-il été utile ?
                        </span>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {review.helpful}
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <ThumbsDown className="w-3 h-3 mr-1" />
                            {review.notHelpful}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Call to action */}
              <div className="mt-12 text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Vous avez voyagé avec nous ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Partagez votre expérience et aidez d'autres voyageurs à faire leur choix
                </p>
                <Button size="lg">
                  Laisser un avis
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Reviews;