import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Users } from "lucide-react";

const popularDestinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=300&fit=crop",
    description: "La ville lumière vous attend avec ses monuments emblématiques et sa culture raffinée.",
    rating: 4.8,
    deals: 42,
    startingPrice: 299,
    tags: ["Culture", "Gastronomie", "Romance"]
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japon",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=300&fit=crop",
    description: "Une métropole fascinante où tradition et modernité se rencontrent harmonieusement.",
    rating: 4.9,
    deals: 38,
    startingPrice: 899,
    tags: ["Technologie", "Culture", "Cuisine"]
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonésie",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=500&h=300&fit=crop",
    description: "Île paradisiaque offrant temples mystiques, plages idylliques et culture authentique.",
    rating: 4.7,
    deals: 56,
    startingPrice: 599,
    tags: ["Plage", "Spiritualité", "Nature"]
  },
  {
    id: 4,
    name: "New York",
    country: "États-Unis",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop",
    description: "La ville qui ne dort jamais, capitale mondiale de la finance et des arts.",
    rating: 4.6,
    deals: 67,
    startingPrice: 499,
    tags: ["Urbain", "Shopping", "Spectacles"]
  },
  {
    id: 5,
    name: "Santorin",
    country: "Grèce",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
    description: "Île volcanique aux maisons blanches et couchers de soleil spectaculaires.",
    rating: 4.9,
    deals: 29,
    startingPrice: 449,
    tags: ["Romance", "Plage", "Photographie"]
  },
  {
    id: 6,
    name: "Marrakech",
    country: "Maroc",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d0?w=500&h=300&fit=crop",
    description: "Ville rouge aux souks colorés, palais somptueux et jardins enchanteurs.",
    rating: 4.5,
    deals: 45,
    startingPrice: 349,
    tags: ["Exotisme", "Histoire", "Artisanat"]
  }
];

const categories = [
  { name: "Tous", active: true },
  { name: "Europe", active: false },
  { name: "Asie", active: false },
  { name: "Afrique", active: false },
  { name: "Amérique", active: false },
  { name: "Océanie", active: false }
];

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <SEOHead 
        title="Destinations de Voyage - Découvrez le Monde avec TravelAI"
        description="Explorez nos destinations de voyage les plus populaires. Trouvez des offres exclusives pour Paris, Tokyo, Bali, New York et bien plus encore."
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Destinations de Rêve
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Découvrez les destinations les plus prisées et trouvez votre prochaine aventure
                </p>
                <div className="max-w-2xl mx-auto">
                  <SearchBar 
                    onSearch={(query) => setSearchQuery(query)}
                    placeholder="Rechercher une destination..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories Filter */}
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.name)}
                    className="transition-all duration-200"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Destinations Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularDestinations.map((destination) => (
                  <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90">
                          {destination.deals} offres
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{destination.name}</CardTitle>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground ml-1">{destination.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{destination.country}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {destination.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {destination.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">€{destination.startingPrice}</span>
                          <span className="text-sm text-muted-foreground ml-1">à partir de</span>
                        </div>
                        <Button>
                          Voir les offres
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Travel Tips Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Conseils de Voyage</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <Calendar className="w-8 h-8 text-primary mb-2" />
                      <CardTitle>Meilleure période</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Consultez nos guides saisonniers pour choisir le moment idéal pour votre voyage et bénéficier des meilleurs tarifs.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <Users className="w-8 h-8 text-primary mb-2" />
                      <CardTitle>Voyage en groupe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Découvrez nos offres spéciales pour les groupes et familles, avec des réductions attractives sur les réservations multiples.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <MapPin className="w-8 h-8 text-primary mb-2" />
                      <CardTitle>Destinations cachées</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Explorez nos suggestions de destinations moins connues mais tout aussi fascinantes pour une expérience unique.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Destinations;