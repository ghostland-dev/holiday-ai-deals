import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface Deal {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  provider: string;
  affiliateLink: string;
  timeLeft: string;
  highlights: string[];
}

const DealsSection = () => {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "1",
      title: "Séjour Luxury Maldives Resort",
      location: "Maldives",
      price: 899,
      originalPrice: 1299,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=300&fit=crop",
      provider: "Booking.com",
      affiliateLink: "#booking-affiliate-link-1",
      timeLeft: "23h 45m",
      highlights: ["All Inclusive", "Spa", "Plongée"]
    },
    {
      id: "2", 
      title: "Vol + Hôtel Paris Premium",
      location: "Paris, France",
      price: 299,
      originalPrice: 450,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
      provider: "SkyScanner",
      affiliateLink: "#skyscanner-affiliate-link-1",
      timeLeft: "12h 20m",
      highlights: ["Centre-ville", "Vol inclus", "Petit-déj"]
    },
    {
      id: "3",
      title: "Safari Kenya Deluxe",
      location: "Nairobi, Kenya", 
      price: 1599,
      originalPrice: 2100,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop",
      provider: "Expedia",
      affiliateLink: "#expedia-affiliate-link-1",
      timeLeft: "6h 15m",
      highlights: ["Safari Big 5", "Guide expert", "Logement luxury"]
    }
  ]);

  const calculateSavings = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Deals Exclusifs
            <span className="block text-accent">Disponibles Maintenant</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nos algorithmes IA scannent en temps réel pour vous trouver les meilleures offres. 
            Réservez avant qu'elles ne disparaissent !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-card transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="destructive" className="bg-accent text-accent-foreground">
                    -{calculateSavings(deal.originalPrice, deal.price)}%
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    {deal.timeLeft}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {deal.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {deal.rating}
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {deal.location}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {deal.highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-accent">
                        {deal.price}€
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        {deal.originalPrice}€
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">par personne</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    via {deal.provider}
                  </Badge>
                </div>

                <Button 
                  asChild
                  className="w-full bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                >
                  <a href={deal.affiliateLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir l'Offre
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline" 
            className="px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Voir Plus de Deals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;