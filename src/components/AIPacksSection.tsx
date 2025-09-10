import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Brain, Clock, Users, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AIPackSuggestion {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  locations: string[];
  highlights: string[];
  aiGenerated: boolean;
}

const AIPacksSection = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    budget: "",
    duration: "",
    interests: "",
    travelers: ""
  });
  
  const [aiSuggestions, setAiSuggestions] = useState<AIPackSuggestion[]>([
    {
      id: "ai-1",
      title: "Aventure Asiatique Culturelle",
      description: "Un voyage immersif à travers les temples du Cambodge, les rizières du Vietnam et les marchés de Thaïlande. Parfait pour les amateurs de culture et d'authenticité.",
      duration: "14 jours",
      price: 1899,
      locations: ["Bangkok", "Siem Reap", "Ho Chi Minh"],
      highlights: ["Temples d'Angkor", "Cuisine locale", "Cours de cuisine", "Guide francophone"],
      aiGenerated: true
    },
    {
      id: "ai-2", 
      title: "Évasion Romantique Méditerranée",
      description: "Couchers de soleil en Santorin, gastronomie italienne à Rome et plages privées en Croatie. L'IA a optimisé chaque étape pour un maximum de romantisme.",
      duration: "10 jours",
      price: 2299,
      locations: ["Santorin", "Rome", "Dubrovnik"],
      highlights: ["Suites avec vue mer", "Dîners privés", "Excursions VIP", "Spa couples"],
      aiGenerated: true
    }
  ]);

  const handleGenerateAIPack = async () => {
    if (!userPreferences.budget || !userPreferences.interests) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir au moins le budget et vos centres d'intérêt.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulation d'un appel à l'API Gemini
    setTimeout(() => {
      const newPack: AIPackSuggestion = {
        id: `ai-${Date.now()}`,
        title: `Pack Personnalisé ${userPreferences.interests}`,
        description: `Un voyage sur mesure basé sur vos préférences : ${userPreferences.interests}. L'IA Gemini a analysé plus de 10,000 combinaisons pour vous proposer cette expérience unique.`,
        duration: userPreferences.duration || "7 jours",
        price: parseInt(userPreferences.budget) || 1500,
        locations: ["Destination 1", "Destination 2", "Destination 3"],
        highlights: ["Expériences uniques", "Optimisation IA", "Meilleur rapport qualité-prix", "Support 24/7"],
        aiGenerated: true
      };
      
      setAiSuggestions(prev => [newPack, ...prev]);
      setIsGenerating(false);
      
      toast({
        title: "Pack généré avec succès !",
        description: "Votre pack personnalisé est prêt. Consultez les détails ci-dessous.",
      });
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-sunset px-4 py-2 rounded-full text-white font-semibold mb-6">
            <Sparkles className="w-5 h-5" />
            Powered by Gemini AI
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Packs Voyage
            <span className="block text-primary">Générés par IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Notre IA analyse vos préférences, budget et disponibilités pour créer des packs voyage uniques. 
            Chaque suggestion est optimisée pour vous offrir la meilleure expérience au meilleur prix.
          </p>
        </div>

        {/* AI Pack Generator */}
        <Card className="mb-16 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Brain className="w-6 h-6 text-primary" />
              Générateur IA Personnalisé
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Budget (€)</label>
                <Input
                  placeholder="ex: 2000"
                  value={userPreferences.budget}
                  onChange={(e) => setUserPreferences({...userPreferences, budget: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Durée</label>
                <Input
                  placeholder="ex: 10 jours"
                  value={userPreferences.duration}
                  onChange={(e) => setUserPreferences({...userPreferences, duration: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Centres d'intérêt</label>
              <Textarea
                placeholder="ex: culture, gastronomie, aventure, détente, plage..."
                value={userPreferences.interests}
                onChange={(e) => setUserPreferences({...userPreferences, interests: e.target.value})}
                rows={3}
              />
            </div>
            
            <Button 
              onClick={handleGenerateAIPack}
              disabled={isGenerating}
              className="w-full md:w-auto bg-gradient-ocean hover:shadow-glow transition-all duration-300"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Générer Mon Pack IA
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Generated Packs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {aiSuggestions.map((pack) => (
            <Card key={pack.id} className="group hover:shadow-card transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {pack.title}
                  </CardTitle>
                  {pack.aiGenerated && (
                    <Badge className="bg-gradient-sunset text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      IA
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {pack.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {pack.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    {pack.locations.join(" • ")}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {pack.highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-end justify-between pt-4 border-t">
                  <div>
                    <span className="text-3xl font-bold text-accent">
                      {pack.price}€
                    </span>
                    <p className="text-sm text-muted-foreground">par personne</p>
                  </div>
                  <Button className="bg-gradient-sunset hover:shadow-glow transition-all duration-300">
                    Réserver ce Pack
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIPacksSection;