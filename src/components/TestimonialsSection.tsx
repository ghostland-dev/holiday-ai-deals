import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Verified } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  savings: number;
  verified: boolean;
  tripDestination: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Marie Dubois",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b098?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      title: "Voyage de rêve aux Maldives",
      content: "L'IA de TravelAI a trouvé un deal incroyable pour les Maldives ! J'ai économisé plus de 800€ par rapport aux autres sites. Le pack était parfaitement adapté à mes envies de détente et luxe.",
      savings: 847,
      verified: true,
      tripDestination: "Maldives"
    },
    {
      id: "2", 
      name: "Jean-Pierre Martin",
      location: "Lyon, France",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      title: "Safari au Kenya inoubliable",
      content: "Le générateur IA a créé un itinéraire sur mesure pour notre famille. Tout était organisé parfaitement, des vols aux hébergements. Une expérience magique au Kenya !",
      savings: 1200,
      verified: true,
      tripDestination: "Kenya"
    },
    {
      id: "3",
      name: "Sophie Laurent",
      location: "Marseille, France", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      title: "Week-end romantique à Rome",
      content: "En 5 minutes, j'avais mon pack complet pour Rome : vol, hôtel de charme, restaurants recommandés. L'IA a vraiment compris ce que nous recherchions pour notre anniversaire.",
      savings: 320,
      verified: true,
      tripDestination: "Rome, Italie"
    },
    {
      id: "4",
      name: "Thomas Bernard",
      location: "Toulouse, France",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", 
      rating: 5,
      title: "Aventure culturelle en Asie",
      content: "Le circuit de 3 semaines en Asie proposé par l'IA était exactement ce que je voulais. Temples, gastronomie, rencontres... Chaque étape était pensée intelligemment.",
      savings: 950,
      verified: true,
      tripDestination: "Asie du Sud-Est"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ce Que Disent
            <span className="block text-primary">Nos Voyageurs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plus de 10,000 voyageurs nous font confiance pour trouver leurs deals parfaits. 
            Découvrez leurs expériences authentiques avec TravelAI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group hover:shadow-card transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Verified className="w-3 h-3 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <div className="pl-6">
                    <h5 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                      {testimonial.title}
                    </h5>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {testimonial.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Voyage: <span className="text-foreground font-medium">{testimonial.tripDestination}</span>
                  </div>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    Économie: {testimonial.savings}€
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
            <p className="text-muted-foreground">Voyageurs satisfaits</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">€2.5M</div>
            <p className="text-muted-foreground">Économies générées</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <p className="text-muted-foreground">Note moyenne</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">24h</div>
            <p className="text-muted-foreground">Support client</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;