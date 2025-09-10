import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, MapPin, Calendar, Users, Heart, Filter, SortAsc, Grid3X3, List, Zap, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Deal {
  id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  originalPrice?: number;
  currency: string;
  imageUrl?: string;
  provider: string;
  category: string;
  featured: boolean;
  availableFrom?: string;
  availableTo?: string;
  tags?: string[];
  clickCount: number;
}

const Deals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-deals');
      if (error) throw error;
      setDeals(data.deals || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast.error("Erreur lors du chargement des offres");
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = deal.price >= priceRange[0] && deal.price <= priceRange[1];
    const matchesCategory = selectedCategory === "all" || deal.category === selectedCategory;
    const matchesDestination = selectedDestination === "all" || deal.destination.includes(selectedDestination);
    
    return matchesSearch && matchesPrice && matchesCategory && matchesDestination;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popular":
        return b.clickCount - a.clickCount;
      case "newest":
        return new Date(b.availableFrom || "").getTime() - new Date(a.availableFrom || "").getTime();
      default: // featured
        return b.featured ? 1 : -1;
    }
  });

  const calculateSavings = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const categories = ["all", "hotels", "flights", "packages", "activities", "cars"];
  const destinations = ["all", "Europe", "Asie", "Amérique", "Afrique", "Océanie"];

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Offres de Voyage - TravelAI"
          description="Découvrez les meilleures offres de voyage sélectionnées par notre IA"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <div className="animate-pulse space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-muted rounded-lg"></div>
                ))}
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
        title="Offres de Voyage - TravelAI"
        description="Découvrez les meilleures offres de voyage sélectionnées par notre IA"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Offres Exclusives
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {sortedDeals.length} offres sélectionnées par notre IA
                </p>
                
                {/* Quick Search */}
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <Input
                      placeholder="Rechercher une destination..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Filters Sidebar */}
              <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Filtres
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Prix (€{priceRange[0]} - €{priceRange[1]})
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={2000}
                        min={0}
                        step={50}
                        className="mb-4"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Catégorie</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les catégories</SelectItem>
                          <SelectItem value="hotels">Hôtels</SelectItem>
                          <SelectItem value="flights">Vols</SelectItem>
                          <SelectItem value="packages">Séjours</SelectItem>
                          <SelectItem value="activities">Activités</SelectItem>
                          <SelectItem value="cars">Location de voiture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Destination */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Destination</label>
                      <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les destinations</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Asie">Asie</SelectItem>
                          <SelectItem value="Amérique">Amérique</SelectItem>
                          <SelectItem value="Afrique">Afrique</SelectItem>
                          <SelectItem value="Océanie">Océanie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={() => {
                        setSearchQuery("");
                        setPriceRange([0, 2000]);
                        setSelectedCategory("all");
                        setSelectedDestination("all");
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Réinitialiser les filtres
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="flex-1">
                {/* Controls Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filtres
                    </Button>
                    <span className="text-muted-foreground">
                      {sortedDeals.length} résultat{sortedDeals.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Recommandés</SelectItem>
                        <SelectItem value="price-asc">Prix croissant</SelectItem>
                        <SelectItem value="price-desc">Prix décroissant</SelectItem>
                        <SelectItem value="popular">Plus populaires</SelectItem>
                        <SelectItem value="newest">Plus récents</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-r-none"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-l-none"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Deals Grid/List */}
                <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                  {sortedDeals.map((deal) => (
                    <Card key={deal.id} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
                      <div className={`relative ${viewMode === 'list' ? 'w-80' : ''}`}>
                        {deal.imageUrl ? (
                          <img 
                            src={deal.imageUrl} 
                            alt={deal.title}
                            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                              viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                            }`}
                          />
                        ) : (
                          <div className={`bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ${
                            viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                          }`}>
                            <Plane className="w-12 h-12 text-primary" />
                          </div>
                        )}

                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {deal.featured && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                              <Zap className="w-3 h-3 mr-1" />
                              Coup de cœur
                            </Badge>
                          )}
                          {deal.originalPrice && (
                            <Badge variant="destructive">
                              -{calculateSavings(deal.price, deal.originalPrice)}%
                            </Badge>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <CardTitle className={viewMode === 'list' ? 'text-lg' : 'text-xl'}>
                            {deal.title}
                          </CardTitle>
                        </div>
                        
                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{deal.destination}</span>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {deal.description}
                        </p>

                        {deal.tags && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {deal.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-primary">
                                €{deal.price}
                              </span>
                              {deal.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  €{deal.originalPrice}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Par {deal.provider}
                            </span>
                          </div>
                          
                          <Button>
                            Voir l'offre
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {sortedDeals.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Aucune offre trouvée</h3>
                    <p className="text-muted-foreground">
                      Essayez de modifier vos filtres ou votre recherche
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Deals;