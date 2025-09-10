import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Users, Plane, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: "flight", label: "Vols", icon: Plane },
    { id: "hotel", label: "Hôtels", icon: MapPin },
    { id: "package", label: "Packages", icon: Users },
    { id: "activity", label: "Activités", icon: Calendar }
  ];

  const priceRanges = [
    { label: "Moins de 200€", value: "200" },
    { label: "200€ - 500€", value: "500" },
    { label: "500€ - 1000€", value: "1000" },
    { label: "Plus de 1000€", value: "" }
  ];

  const popularDestinations = [
    "Paris, France", "Tokyo, Japon", "New York, USA", "Bali, Indonésie",
    "Rome, Italie", "Londres, UK", "Barcelone, Espagne", "Dubai, EAU"
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-deals', {
        body: {
          destination: searchQuery,
          category: selectedCategory || undefined,
          maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
          limit: 20
        }
      });

      if (error) throw error;

      // Here you would typically update a global state or redirect to results
      console.log('Search results:', data);
      
      // For now, scroll to deals section
      const dealsSection = document.getElementById('deals');
      if (dealsSection) {
        dealsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationClick = (destination: string) => {
    setSearchQuery(destination);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trouvez Votre Prochaine Aventure
            </h2>
            <p className="text-lg text-muted-foreground">
              Recherchez parmi des milliers d'offres personnalisées par notre IA
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Main Search Bar */}
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Où voulez-vous voyager ? (ex: Paris, Bali, Tokyo...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={loading || !searchQuery.trim()}
                    className="h-14 px-8 bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    {loading ? "Recherche..." : "Rechercher"}
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filtres:</span>
                  </div>
                  
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Badge
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/10 transition-colors"
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.id ? "" : category.id
                          )}
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {category.label}
                        </Badge>
                      );
                    })}
                  </div>

                  {/* Price Filter */}
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="px-3 py-1 text-sm border rounded-md bg-background"
                  >
                    <option value="">Budget</option>
                    {priceRanges.map((range, index) => (
                      <option key={index} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Popular Destinations */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Destinations populaires:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularDestinations.map((destination) => (
                      <Badge
                        key={destination}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80 transition-colors"
                        onClick={() => handleDestinationClick(destination)}
                      >
                        {destination}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Offres analysées</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">35%</div>
              <div className="text-sm text-muted-foreground">Économies moyennes</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Mise à jour</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;