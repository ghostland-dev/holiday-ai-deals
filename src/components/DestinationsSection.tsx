import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Users } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  averagePrice: number;
  popularityScore: number;
  bestDeals: number;
  description: string;
  bestTimeToVisit: string;
}

const DestinationsSection = () => {
  const destinations: Destination[] = [
    {
      id: "1",
      name: "Bali",
      country: "Indonésie", 
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
      averagePrice: 899,
      popularityScore: 95,
      bestDeals: 24,
      description: "Temples mystiques, rizières verdoyantes et plages paradisiaques",
      bestTimeToVisit: "Avr-Oct"
    },
    {
      id: "2",
      name: "Santorin", 
      country: "Grèce",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
      averagePrice: 1299,
      popularityScore: 92,
      bestDeals: 18,
      description: "Couchers de soleil époustouflants et architecture cycladique",
      bestTimeToVisit: "Mai-Sep"
    },
    {
      id: "3",
      name: "Tokyo",
      country: "Japon",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop", 
      averagePrice: 1599,
      popularityScore: 89,
      bestDeals: 31,
      description: "Mégalopole futuriste entre tradition et modernité",
      bestTimeToVisit: "Mar-Mai, Sep-Nov"
    },
    {
      id: "4",
      name: "Maldives",
      country: "Maldives",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&h=300&fit=crop",
      averagePrice: 2199,
      popularityScore: 96,
      bestDeals: 12,
      description: "Lagons turquoise et bungalows sur pilotis",
      bestTimeToVisit: "Nov-Avr"
    },
    {
      id: "5",
      name: "Marrakech",
      country: "Maroc",
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73685?w=400&h=300&fit=crop",
      averagePrice: 599,
      popularityScore: 87,
      bestDeals: 28,
      description: "Médina authentique, souks colorés et palais somptueux",
      bestTimeToVisit: "Oct-Avr"
    },
    {
      id: "6",
      name: "Dubaï",
      country: "Émirats Arabes Unis",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
      averagePrice: 1099,
      popularityScore: 90,
      bestDeals: 22,
      description: "Luxe absolu entre désert et gratte-ciel futuristes",
      bestTimeToVisit: "Nov-Mar"
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Destinations
            <span className="block text-primary">Tendances 2024</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les destinations les plus populaires sélectionnées par notre IA. 
            Chaque destination est analysée en temps réel pour vous garantir les meilleurs prix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group hover:shadow-card transition-all duration-300 transform hover:scale-105 overflow-hidden">
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {destination.popularityScore}% populaire
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {destination.bestDeals} deals
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {destination.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">
                      {destination.averagePrice}€
                    </div>
                    <div className="text-sm text-muted-foreground">
                      dès
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    Meilleure période: {destination.bestTimeToVisit}
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                >
                  Voir les Offres
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
            Découvrir Plus de Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;