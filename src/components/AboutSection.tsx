import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  Award,
  Sparkles,
  Target,
  Heart,
  Zap
} from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Avancée Gemini",
      description: "Notre intelligence artificielle analyse plus de 100M d'offres en temps réel pour vous trouver les meilleurs deals."
    },
    {
      icon: TrendingUp,
      title: "Économies Garanties", 
      description: "En moyenne, nos utilisateurs économisent 35% sur leurs voyages comparé aux réservations directes."
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Partenariats officiels avec les plus grandes plateformes. Vos données et paiements sont 100% sécurisés."
    },
    {
      icon: Clock,
      title: "Gain de Temps",
      description: "Fini les heures de recherche ! Notre IA fait le travail en quelques secondes et vous présente les meilleures options."
    }
  ];

  const stats = [
    { 
      icon: Users,
      value: "50K+", 
      label: "Utilisateurs actifs",
      description: "Nous font confiance chaque mois"
    },
    { 
      icon: Award,
      value: "98%", 
      label: "Taux de satisfaction",
      description: "De nos voyageurs recommandent TravelAI"
    },
    { 
      icon: Target,
      value: "€3.2M", 
      label: "Économies totales",
      description: "Générées pour nos utilisateurs en 2024"
    },
    { 
      icon: Zap,
      value: "5sec", 
      label: "Temps moyen",
      description: "Pour trouver le deal parfait"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Main About Content */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-sunset px-4 py-2 rounded-full text-white font-semibold mb-8">
            <Heart className="w-5 h-5" />
            Notre Mission
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Révolutionner
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Votre Façon de Voyager
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            TravelAI combine l'intelligence artificielle la plus avancée avec les meilleures plateformes 
            de voyage pour vous offrir des économies exceptionnelles et une expérience de réservation 
            ultra-personnalisée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-ocean hover:shadow-glow transition-all duration-300 px-8"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Commencer Maintenant
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              En Savoir Plus
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center group hover:shadow-card transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-ocean rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-ocean opacity-5 rounded-3xl"></div>
          <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                TravelAI en Chiffres
              </h3>
              <p className="text-lg text-muted-foreground">
                Des résultats qui parlent d'eux-mêmes
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-sunset rounded-xl mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-foreground mb-1">
                      {stat.label}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technology Partners */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold mb-8 text-muted-foreground">
            Nos Partenaires Technologiques
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-lg px-4 py-2">
                <Brain className="w-5 h-5 mr-2" />
                Google Gemini AI
              </Badge>
            </div>
            <div className="text-2xl font-bold">Booking.com</div>
            <div className="text-2xl font-bold">SkyScanner</div>
            <div className="text-2xl font-bold">Expedia</div>
            <div className="text-2xl font-bold">Agoda</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;